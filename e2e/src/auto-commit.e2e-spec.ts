import { RequestMock, Selector, RequestLogger } from 'testcafe';
import { isEqual } from 'lodash';
import { AutoCommitInfo, APPData, IPCMessage } from '../../src/common/types';

const fakeData = {
  branches: [
    {
      name: 'trunk',
      pcDir: 'C:\\N-5CG8300N4C-Data\\zowu\\Development\\oam\\moam\\trunk',
      serverDir: '/var/fpwork/zowu/moam/trunk/moam/',
    },
    {
      name: '5G19B_FDD',
      pcDir: 'C:\\N-5CG8300N4C-Data\\zowu\\Development\\oam\\moam\\5G19B_FDD',
      serverDir: '/var/fpwork/zowu/moam/5g19b_fdd/moam',
    },
    {
      name: 'SBTS20B',
      pcDir: 'C:\\N-5CG8300N4C-Data\\zowu\\Development\\oam\\moam\\SBTS20B',
      serverDir: '/var/fpwork/zowu/moam/SBTS20B-2/moam',
    },
    {
      name: 'trunk_META',
      pcDir: 'C:\\N-5CG8300N4C-Data\\zowu\\Development\\oam\\moam\\meta_trunk',
      serverDir: '/var/fpwork/zowu/moam/trunk/meta',
    },
    {
      name: '5G20A_B1',
      pcDir: 'C:\\N-5CG8300N4C-Data\\zowu\\Development\\oam\\moam\\5G20A_B1',
      serverDir: '/var/fpwork/zowu/moam/5G20A_B1/moam',
    },
  ],
};

const host = 'http://localhost:3200';

const logger = RequestLogger(
  {
    url: `${host}/sendFakeIPCMessage/${IPCMessage.AUTO_COMMIT_REQ}`,
    method: 'post',
  },
  {
    logRequestBody: true,
  },
);

const mock = RequestMock()
  .onRequestTo(`${host}/get/mocked/data`)
  .respond(JSON.stringify(fakeData), 200);

fixture('Auto Commit Page')
  .page(`${host}/auto-commit`)
  .requestHooks([mock, logger])
  .before(async (ctx) => {
    ctx.data = fakeData;
  });

test('should use right data when click auto-commit button', async (t) => {
  const data: APPData = t.fixtureCtx.data as APPData;

  const expectedBranch = data.branches[1];
  const expectedReviewBoardID = 69810;
  const expectedProntoTitle = 'pronto title';
  const expectedDescription = 'description';

  const selectorBtn = Selector('branch-selector');
  const secondBranchItem = Selector('nz-option-item').nth(1);
  const reviewBoardIDInput = Selector('input').withAttribute('formcontrolname', 'reviewBoardID');
  const prontoTitle = Selector('input').withAttribute('formcontrolname', 'prontoTitle');
  const description = Selector('textarea').withAttribute('formcontrolname', 'description');
  const commitBtn = Selector('nz-form-control button');

  await t
    // Select second branch
    .click(selectorBtn)
    .click(secondBranchItem)
    // Fill review board id
    .typeText(reviewBoardIDInput, expectedReviewBoardID.toString())
    // Fill pronto title
    .typeText(prontoTitle, expectedProntoTitle)
    // Fill description
    .typeText(description, expectedDescription)
    // Click auto commit button
    .click(commitBtn)
    .expect(
      logger.contains((r) => {
        const value: AutoCommitInfo = JSON.parse(r.request.body.toString()).data;
        return (
          isEqual(value.branch, expectedBranch) &&
          isEqual(value.reviewBoardID, expectedReviewBoardID.toString()) &&
          isEqual(value.prontoTitle, expectedProntoTitle) &&
          isEqual(value.description, expectedDescription)
        );
      }),
    )
    .ok();
});
