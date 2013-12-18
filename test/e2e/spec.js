/* globals describe, beforeEach, it, expect, by, browser, element*/
(function() {
  'use strict';

  describe('wallet app', function() {

    describe('list', function() {
      beforeEach(function() {
        browser.get('http://localhost/personal/wallet/app/#/');
      });

      it('should list bills', function() {
        var billList = element.all(by.repeater('bill in bills'));
        expect(billList.count()).toEqual(0);
      });

      it('should add a bill', function() {
        element(by.model('money')).sendKeys('1');
        element(by.css('[name=billForm] button')).click();

        var billList = element.all(by.repeater('bill in bills'));
        expect(billList.count()).toEqual(1);
        expect(billList.get(0).getText()).toMatch(/\[帮付\]¥1/);
      });
    });
  });
})();
