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
  });
});
