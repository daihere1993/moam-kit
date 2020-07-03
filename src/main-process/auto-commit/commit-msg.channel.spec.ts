import * as path from 'path';
import * as fs from 'fs';
import { of } from 'rxjs';
import { IPCMessage, IPCResponse, AutoCommitInfo } from '@app/common/types';
import CommitMsgChannel from './commit-msg.channel';

describe('CommitMsgChannel()', () => {
  const channel = new CommitMsgChannel();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have right channel name.', () => {
    expect(channel).toBe(IPCMessage.PREPARE_COMMIT_MSG_REQ);
  });

  it('should response successfully when everything is fine.', () => {
    const fakeEvent = { reply: jest.fn() };
    const fakeRes: IPCResponse = {
      isSuccessed: true,
      data: 'test',
    };
    jest.spyOn(channel as any, 'prepareCommitMsg').mockReturnValue(of(fakeRes));

    channel.handle(fakeEvent as any, {});

    expect(fakeEvent.reply.mock.calls[0][0]).toBe(IPCMessage.PREPARE_COMMIT_MSG_RES);
    expect(fakeEvent.reply.mock.calls[0][1]).toEqual(fakeRes);
  });

  describe('private methods - prepareCommitMsg()', () => {
    let res: IPCResponse;
    const data: AutoCommitInfo = {
      prontoTitle: 'test',
      description: 'test',
      reviewBoardID: 1,
    };
    const target = path.join(__dirname, '../test/tmp/test.txt');

    beforeAll((done) => {
      return (channel as any).prepareCommitMsg(data, target).subscribe((res_: IPCResponse) => {
        res = res_;
        done();
      });
    });

    afterAll(() => {
      fs.unlinkSync(target);
    });

    it('should return an IPCResponse.', () => {
      expect(res.isSuccessed).toBeDefined();
      expect(res.data).toBeDefined();
    });

    it('should form the right commit message.', () => {
      expect(res.data).toBe(
        [
          `REFERENCE : PR ${data.prontoTitle}`,
          `PRODUCT : LTE`,
          `COMPLETED : YES`,
          `DESCRIPTION : ${data.description}`,
          `ACCEPTED_BY : RB ${data.reviewBoardID}`,
        ].join('\n'),
      );
    });

    it('commit message should be saved into target position.', async () => {
      expect(fs.existsSync(target)).toBeTruthy();
    });
  });
});
