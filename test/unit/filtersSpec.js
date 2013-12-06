(function() {
  'use strict';

  describe('filter', function() {
    beforeEach(module('wallet.filters'));

    describe('time', function() {
      it('should meet the format', inject(function(timeFilter) {
        expect(timeFilter('2013-12-06T05:55:37.947Z')).toEqual('12-06 13:55');
      }));
    });
  });
})();
