import { Selector, RequestMock } from 'testcafe';
import { APPData } from '@root/common/types';

const fakeData = {
  branches: [
    { name: '1', pcDir: '1', serverDir: '1' },
    { name: '3', pcDir: '22', serverDir: '3' },
    { name: '34', pcDir: '22224444', serverDir: '4' },
    { name: '4', pcDir: '4', serverDir: '4' },
  ],
  lastAutoCommitInfo: {
    prontoTitle: '1',
    description: '1',
    reviewBoardID: '1',
    branch: { name: '34', pcDir: '22224444', serverDir: '4' },
  },
  ssh: { host: '1', username: '1', password: '1' },
};

const host = 'http://localhost:3200';

const mock = RequestMock()
  .onRequestTo(`${host}/get/mocked/data`)
  .respond(JSON.stringify(fakeData), 200);

fixture('Home Page')
  .page(host)
  .requestHooks(mock)
  .before(async (ctx) => {
    ctx.data = fakeData;
  });

test('should display first branch by default', async (t) => {
  const data: APPData = t.fixtureCtx.data as APPData;
  t.expect(Selector('branch-selector .select-button').withText(data.branches[0].name)).ok;
});

test('should be successful when change branch', async (t) => {
  const data: APPData = t.fixtureCtx.data as APPData;
  const selectorBtn = Selector('branch-selector');
  const secondItem = Selector('nz-option-item').nth(2);
  t.click(selectorBtn).click(secondItem).expect(selectorBtn.withText(data.branches[1].name)).ok;
});
