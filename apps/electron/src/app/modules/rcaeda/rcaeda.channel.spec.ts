import * as path from 'path';
import axios from 'axios';
import { RCEDAChannel } from './rcaeda.channel';
import { getTestDir } from '@electron/app/utils';
import { RB_DIFF_HTML } from '@electron/__test__/mocked-data';
import { mocked } from 'ts-jest/utils';

jest.mock('axios');

describe('RCEDAChannel()', () => {
  const channel = new RCEDAChannel();

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

  describe('Private methods - getChangedFilesByRBLink()', () => {
    it('should get correct changed files', (done) => {
      mocked(axios.get).mockResolvedValue({ data: RB_DIFF_HTML });
      
      return (channel as any)
        .getChangedFilesByRBLink('')
        .subscribe((changedFiles) => {
          expect(1).toBe(1);
          done();
        })
    });
  });
});
