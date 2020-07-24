import * as fs from 'fs';
import * as path from 'path';
import { SyncCodeChannel } from './sync-code.channel';
import { getTestDir } from '@electron/app/utils';

describe('SyncCodeChannel()', () => {
  const store = {} as any;
  const channel = new SyncCodeChannel(store);

  describe('private methods - getOriginalFilesInfo()', () => {
    it('should be successful', () => {
      const diff = fs.readFileSync(path.join(getTestDir(), 'test.diff')).toString();
      const originalFiles = (channel as any).getOriginalFilesInfo(diff);
      expect(originalFiles.length).toBe(5);
      expect(originalFiles[0]).toBe('test/sct/testcases/Rumag/FhsSetDataTime.ttcn3	(nonexistent)');
    });
  });
});
