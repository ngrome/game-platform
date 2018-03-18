import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getLoginPageReady() {
    return element(by.css('.container-login100'));
  }

  getParagraphTextByClass(className) {
    console.log('Find element for className:', className);
    const _element = element(by.css(className)).getText();
    return element;
  }
}
