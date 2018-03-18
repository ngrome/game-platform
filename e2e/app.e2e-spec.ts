import { browser } from 'protractor';
import { AppPage } from './app.po';

describe('game-platform App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display a login form', () => {
    page.navigateTo();
    browser.wait(page.getLoginPageReady().getAttribute('class'), 10000);
    console.log(page.getParagraphTextByClass('.login100-form-title'));
    expect(page.getParagraphTextByClass('.login100-form-title'))
      .toEqual('Login');
  });
});
