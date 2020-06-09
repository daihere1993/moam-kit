/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as fs from 'fs';
import Axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { AutoCommit } from './auto-commit';
import { SVN_STATUS_HTML } from './test/mocked-data';

const autoCommit = new AutoCommit();
jest.mock('axios');

describe('toCheckMOAMStatus$()', () => {
  // @ts-ignore
  autoCommit.branchName = 'trunk';
  // @ts-ignore
  autoCommit.componentName = 'MOAM';

  beforeEach(() => {
    mocked(Axios.get).mockResolvedValueOnce({ data: SVN_STATUS_HTML });
  });

  it('should be successful', (done) => {
    // @ts-ignore
    return autoCommit.toCheckMOAMStatus$().subscribe((isUnlocked: boolean) => {
      expect(isUnlocked).toBeDefined();
      done();
    });
  });

  it('should throw error when no such component', (done) => {
    // @ts-ignore
    autoCommit.componentName = 'test';
    // @ts-ignore
    return autoCommit.toCheckMOAMStatus$().subscribe(
      () => {},
      (err) => {
        expect(err.message).toBe(`Couldn't find corresponding component status: test`);
        done();
      },
    );
  });
});

describe('formCommitMsg$()', () => {
  it('should be successful', (done) => {
    const prontoTitle = 'Just for test';
    const description = 'Just for test';
    const reviewBoardID = 1;
    return autoCommit
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
      });
  });
});

describe('toGetPreparedDiff$()', () => {
  it('should use diff from specific diff if it exist', (done) => {
    const reviewBoardID = 1;
    const specificDiff = '/test';
    // @ts-ignore
    return autoCommit.toGetPreparedDiff$({
      reviewBoardID,
      specificDiff,
    }).subscribe((path) => {
      expect(path).toBe(specificDiff);
      done();
    })
  });
});
