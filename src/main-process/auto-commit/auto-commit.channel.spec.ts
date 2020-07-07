import electron from 'electron';
import axios from 'axios';
import { of, Subject } from 'rxjs';
import { mocked } from 'ts-jest/utils';
import { IPCMessage, IPCError, ProcessCollection } from '@app/common/types';
import AutoCommitChannel from './auto-commit.channel';
import { SVN_STATUS_HTML } from '../test/mocked-data';

jest.mock('electron', () => ({
  ipcMain: {
    on: jest.fn(),
  },
}));

jest.mock('axios');

describe('AutoCommitChannel()', () => {
  const channel = new AutoCommitChannel();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have right channel name', () => {
    expect(channel.name).toBe(IPCMessage.AUTO_COMMIT_REQ);
  });

  it('should also listen STOP event', () => {
    expect(mocked(electron.ipcMain.on).mock.calls[0][0]).toBe(IPCMessage.STOP_AUTO_COMMIT);
  });

  it('should be successful when everything is fine', () => {
    const fakeEvent = { reply: jest.fn() };
    jest.spyOn(channel as any, 'loopToCheckLockInfo').mockReturnValue(of({}));

    channel.handle(fakeEvent as any, {});

    expect(fakeEvent.reply.mock.calls[0][0]).toBe(IPCMessage.REPLY_AUTO_COMMIT_REQ);
    expect((channel as any).cancelStatusCheckInterval).toBeUndefined();
  });

  describe('private methods - loopToCheckLockInfo()', () => {
    it('should be successful to cancel the loop', (done) => {
      const fakeData = { branch: {} };
      const cancelInterval = new Subject<void>();

      jest.spyOn(channel as any, 'hasUnlocked').mockReturnValue(of(false));

      expect.hasAssertions();

      setTimeout(() => {
        cancelInterval.next();
      }, 1000);

      return (channel as any).loopToCheckLockInfo(fakeData, cancelInterval).subscribe(
        () => {},
        () => {},
        () => {
          expect(true).toBeTruthy();
          done();
        },
      );
    });

    it('should commit code when branch unlocked', (done) => {
      const fakeData = { branch: {} };
      const cancelInterval = new Subject<void>();

      jest.spyOn(channel as any, 'hasUnlocked').mockReturnValue(of(true));
      jest.spyOn(channel as any, 'commitCode').mockReturnValue(of({}));

      expect.hasAssertions();

      return (channel as any).loopToCheckLockInfo(fakeData, cancelInterval).subscribe(() => {
        expect((channel as any).commitCode).toHaveBeenCalled();
        cancelInterval.next();
        done();
      });
    });
  });

  describe('private methods - hasUnlocked()', () => {
    it("should throw error when couldn't find the branch", (done) => {
      const branchName = 'test';
      const component = 'test';

      mocked(axios.get).mockRejectedValue({ response: { status: 404 } });

      return (channel as any).hasUnlocked(branchName, component).subscribe(
        () => {},
        ({ res }: IPCError) => {
          expect(res.isSuccessed).toBeFalsy();
          expect(res.error.name).toBe(ProcessCollection.CHECK_SVN_STATUS);
          expect(res.error.message).toBe(`Couldn't find corresponding branch info for "test"`);
          done();
        },
      );
    });

    it('should take specific process when branch is trunk', (done) => {
      const branchName = 'trunk';
      const component = 'OAM';

      mocked(axios.get).mockResolvedValue({
        data: { data: { lock: { locked: false } } },
      });

      return (channel as any).hasUnlocked(branchName, component).subscribe((isUnlocked) => {
        expect(mocked(axios.get).mock.calls[0][0]).toBe(
          `http://maddash.nsn-net.net/api/1/jenkins/lte_trunk/jobs/MOAM+trunk.STATUS`,
        );
        expect(isUnlocked).toBeTruthy();
        done();
      });
    });

    it('should take specific process when branch is SBTS20B', (done) => {
      const branchName = 'SBTS20B';
      const component = 'OAM';

      mocked(axios.get).mockResolvedValue({
        data: { data: { lock: { locked: false } } },
      });

      return (channel as any)
        .hasUnlocked(branchName, component)
        .subscribe((isUnlocked: boolean) => {
          expect(mocked(axios.get).mock.calls[0][0]).toBe(
            `http://maddash.nsn-net.net/api/1/jenkins/sbts20b/jobs/MOAM+SBTS20B.STATUS`,
          );
          expect(isUnlocked).toBeTruthy();
          done();
        });
    });

    it('should be successful when everything is fine', (done) => {
      const branchName = '5G20A';
      const component = 'OAM';

      mocked(axios.get).mockResolvedValue({ data: SVN_STATUS_HTML });

      return (channel as any)
        .hasUnlocked(branchName, component)
        .subscribe((isUnlocked: boolean) => {
          expect(isUnlocked).toBeFalsy();
          done();
        });
    });
  });
});
