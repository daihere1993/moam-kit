import * as path from 'path';
import { RCEDAChannel } from './rcaeda.channel';
import { getTestDir } from '@electron/app/utils';
import { IPCMessage } from '@moam-kit/types';

describe('RCEDAChannel()', () => {
  const channel = new RCEDAChannel();

  it('should be successful when everything is fine.', () => {
    const fakeEvent = { reply: jest.fn() };
    
    channel.handle(fakeEvent as any, { data: path.join(getTestDir(), 'RCAEDA.xlsx') });

    expect(fakeEvent.reply.mock.calls[0][0]).toBe(IPCMessage.RCAEDA_ANALYZE_RES);
  });

  describe('Private methods - getFormattedDate()', () => {
    it('should get correct data', () => {
      const data = (channel as any).getFormattedDate(path.join(getTestDir(), 'RCAEDA.xlsx'));
      expect(data).toEqual({
        RUMAG2: [
          {
            prId: "PR534504",
            isLegacy: true,
            feature: "",
            rbLink: "http://biedronka.emea.nsn-net.net/r/75599/",
            changedFiles: [
            ],
          },
          {
            prId: "PR531878 / PR531199 / PR532852",
            isLegacy: false,
            feature: "5GC001524-B",
            rbLink: "http://biedronka.emea.nsn-net.net/r/73718/",
            changedFiles: [
            ],
          },
        ],
      });
    });
  });
});
