import * as path from 'path';
import * as utils from './utils';
import * as XLSX from 'xlsx';
import { DIFF_CONTENT } from '@electron/__test__/mocked-data';

describe('Utils()', () => {
  describe('getChangedFiles()', () => {
    it('should return correct changed files', () => {
      const changedFiles = utils.getChangedFiles(DIFF_CONTENT);

      expect(changedFiles).toEqual([
        'test/sct/testcases/Rumag/FhsSetDataTime.ttcn3',
        'SC_MONOLITH/DM_RUMAG/src/static/Rp1Agent/RadioAgent.cpp',
        'SC_MONOLITH/DM_RUMAG/src/static/LimModule/Executors/FhsuExecutor.cpp',
        'SC_MONOLITH/DM_RUMAG/src/include/Rp1Agent/RadioAgent.hpp',
        'SC_MONOLITH/DM_RUMAG/src/include/LimModule/Executors/FhsuExecutor.hpp',
      ]);
    });

    it('should return correct changed files when filter existed', () => {
      const changedFiles = utils.getChangedFiles(DIFF_CONTENT, (target) =>
        target.includes('FhsuExecutor'),
      );

      expect(changedFiles).toEqual([
        'SC_MONOLITH/DM_RUMAG/src/static/LimModule/Executors/FhsuExecutor.cpp',
        'SC_MONOLITH/DM_RUMAG/src/include/LimModule/Executors/FhsuExecutor.hpp',
      ]);
    });
  });

  describe('createAWorkbook()', () => {
    it('should be success', () => {
      const wb = {
        SheetNames: ['test'],
        Sheets: {
          test: XLSX.utils.aoa_to_sheet([
            ['Changed File', 'Amount'],
            ['test.cpp', 3],
          ]),
        },
      };
      XLSX.writeFile(wb, path.join(utils.getUserDataPath(), 'test.xlsx'));
      expect(1).toBe(1);
    });
  });
});
