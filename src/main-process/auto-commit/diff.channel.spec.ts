import * as path from 'path';
import * as fs from 'fs';
import { IPCResponse, IPCMessage } from '@app/common/types';
import { of } from 'rxjs';
import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import DiffChannel from './diff.channel';

jest.mock('../utils');
jest.mock('axios');

const TEST_DIFF_PATH = path.join(__dirname, '../test/test.diff')

describe('DiffChannel()', () => {
  const channel = new DiffChannel();

  afterEach(() => {
    jest.restoreAllMocks()
  });

  it('should have right channel name', () => {
    expect(channel.name).toBe(IPCMessage.PREPARE_DIFF_REQ);
  });

  it('should reply response IPC message when everything is fine', () => {
    const fakeEvent = { reply: jest.fn() };
    const fakeRes: IPCResponse = {
      isSuccessed: true,
      data: {
        path: 'test',
        changedAmount: 1,
      },
    };
    jest.spyOn(channel as any, 'getPreparedDiff').mockReturnValue(of(fakeRes));

    channel.handle(fakeEvent as any, {});

    expect(fakeEvent.reply).toHaveBeenCalledTimes(1);
    expect(fakeEvent.reply.mock.calls[0][0]).toEqual(IPCMessage.PREPARE_DIFF_RES);
    expect(fakeEvent.reply.mock.calls[0][1]).toEqual(fakeRes);
  });

  describe('private methods - getPreparedDiff()', () => {
    it('should return specificDiff path if it is exist', (done) => {
      const fakeDate = { specificDiff: TEST_DIFF_PATH };
      jest.spyOn(channel as any, 'getChangedFiledAmount').mockReturnValue(0);

      return (channel as any).getPreparedDiff(fakeDate).subscribe((res: IPCResponse) => {
        const expectedRes: IPCResponse = {
          isSuccessed: true,
          data: {
            path: fakeDate.specificDiff,
            changedAmount: 0,
          },
        };
        expect(res).toEqual(expectedRes);
        done();
      });
    });

    it('should return diff path which create by RB.', (done) => {
      const expectedPath = TEST_DIFF_PATH;
      jest.spyOn(channel as any, 'downLoadDiff').mockReturnValue(of(expectedPath));
      jest.spyOn(channel as any, 'getChangedFiledAmount').mockReturnValue(0);

      return (channel as any).getPreparedDiff({}).subscribe((res: IPCResponse) => {
        const expectedRes: IPCResponse = {
          isSuccessed: true,
          data: {
            path: expectedPath,
            changedAmount: 0,
          },
        };
        expect(res).toEqual(expectedRes);
        done();
      });
    });
  });

  describe('private methods - getChangedFiledAmount()', () => {
    it('should get correct change file amount.', () => {
      const content = fs.readFileSync(TEST_DIFF_PATH).toString();
      console.debug((channel as any).getChangedFiledAmount(content));
      expect((channel as any).getChangedFiledAmount(content)).toBe(5);
    });
  });

  describe('private methods - downLoadDiff()', () => {
    it('should be successful.', (done) => {
      const targetPath = path.join(__dirname, '../test/tmp/test.diff');
      const expectedContent = fs.readFileSync(TEST_DIFF_PATH).toString();
      const fakeStream = fs.createReadStream(TEST_DIFF_PATH);
      mocked(axios.get).mockResolvedValueOnce({ data: fakeStream });

      return (channel as any).downLoadDiff('', targetPath).subscribe((diffPath: string) => {
        expect(diffPath).toBe(targetPath);
        expect(fs.readFileSync(diffPath).toString()).toEqual(expectedContent);
        fs.unlinkSync(diffPath);
        done();
      })
    });
  });
});
