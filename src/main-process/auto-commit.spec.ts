/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as fs from 'fs';
import Axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { IPCResponse } from 'src/common/types';
import { AutoCommit, ProcessCollection } from './auto-commit';
import { SVN_STATUS_HTML } from './test/mocked-data';

const autoCommit = new AutoCommit();
jest.mock('axios');

describe('toCheckMOAMStatus$()', () => {
  beforeEach(() => {
    // @ts-ignore
    autoCommit.branchName = '5G20A';
    // @ts-ignore
    autoCommit.componentName = 'MOAM';
  });

  it('should be successful', (done) => {
    mocked(Axios.get).mockResolvedValueOnce({ data: SVN_STATUS_HTML });

    // @ts-ignore
    return autoCommit.toCheckMOAMStatus$().subscribe((isUnlocked: boolean) => {
      expect(isUnlocked).toBeDefined();
      done();
    });
  });

  it('should throw error when no such component', (done) => {
    mocked(Axios.get).mockResolvedValueOnce({ data: SVN_STATUS_HTML });

    // @ts-ignore
    autoCommit.componentName = 'test';
    // @ts-ignore
    return autoCommit.toCheckMOAMStatus$().subscribe(
      () => {},
      (err) => {
        const { res }: { res: IPCResponse } = err;
        expect(res).toBeDefined();
        expect(res.isSuccessed).toBeFalsy();
        expect(res.error.name).toBe(ProcessCollection.CHECK_SVN_STATUS);
        expect(res.error.message).toBe(`Couldn't find corresponding component status for "test"`);
        done();
      },
    );
  });

  it('should throw error when no such branch', (done) => {
    mocked(Axios.get).mockRejectedValueOnce({
      response: { status: 404 },
    });

    // @ts-ignore
    autoCommit.branchName = 'test';
    // @ts-ignore
    return autoCommit.toCheckMOAMStatus$().subscribe(
      () => {},
      (err) => {
        const { res }: { res: IPCResponse } = err;
        expect(res).toBeDefined();
        expect(res.isSuccessed).toBeFalsy();
        expect(res.error.name).toBe(ProcessCollection.CHECK_SVN_STATUS);
        expect(res.error.message).toBe(`Couldn't find corresponding branch info for "test"`);
        done();
      },
    );
  });

  it('should use specific url when branch is trunk', (done) => {
    const expectedURL = 'http://maddash.nsn-net.net/api/1/jenkins/lte_trunk/jobs/MOAM+trunk.STATUS';

    mocked(Axios.get).mockResolvedValueOnce({
      data: {
        data: {
          lock: {
            locked: false,
            lockedLastUpdate: '2020-06-21T01:43:44.608000+00:00',
            locksType: 'jsonconf',
            repository: 'BTS_SC_MOAM_LTE',
          },
          title: 'MOAM',
        }
      },
    });

    // @ts-ignore
    autoCommit.branchName = 'trunk';
    // @ts-ignore
    return autoCommit.toCheckMOAMStatus$().subscribe((isUnlocked) => {
      expect(Axios.get).toHaveBeenCalledWith(expectedURL, {});
      expect(isUnlocked).toBeTruthy();
      done();
    });
  });

  it('should use specific url when branch is SBTS20B', (done) => {
    const expectedURL = 'http://maddash.nsn-net.net/api/1/jenkins/sbts20b/jobs/MOAM+SBTS20B.STATUS';

    mocked(Axios.get).mockResolvedValueOnce({
      data: {
        data: {
          lock: {
            locked: false,
            lockedLastUpdate: '2020-06-21T01:43:44.608000+00:00',
            locksType: 'jsonconf',
            repository: 'BTS_SC_MOAM_LTE',
          },
          title: 'MOAM',
        }
      },
    });

    // @ts-ignore
    autoCommit.branchName = 'SBTS20B';
    // @ts-ignore
    return autoCommit.toCheckMOAMStatus$().subscribe((isUnlocked) => {
      expect(Axios.get).toHaveBeenCalledWith(expectedURL, {});
      expect(isUnlocked).toBeTruthy();
      done();
    });
  });
});

describe('formCommitMsg$()', () => {
  it('should be successful', (done) => {
    const prontoTitle = 'Just for test';
    const description = 'Just for test';
    const reviewBoardID = 1;
    return (
      autoCommit
        // @ts-ignore
        .formCommitMsg$({
          prontoTitle,
          description,
          reviewBoardID,
        })
        .subscribe((path) => {
          const commitMsg = fs.readFileSync(path).toString();
          expect(commitMsg).toBe(
            [
              `REFERENCE : PR ${prontoTitle}`,
              `PRODUCT : LTE`,
              `COMPLETED : YES`,
              `DESCRIPTION : ${description}`,
              `ACCEPTED_BY : RB ${reviewBoardID}`,
            ].join('\n'),
          );
          done();
        })
    );
  });
});

describe('toGetPreparedDiff$()', () => {
  it('should use diff from specific diff if it exist', (done) => {
    const reviewBoardID = 1;
    const specificDiff = '/test';
    return (
      autoCommit
        // @ts-ignore
        .toGetPreparedDiff$({
          reviewBoardID,
          specificDiff,
        })
        .subscribe((path) => {
          expect(path).toBe(specificDiff);
          done();
        })
    );
  });
});
