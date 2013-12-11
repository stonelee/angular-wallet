(function() {
  'use strict';

  describe('service', function() {
    beforeEach(function() {
      module('LocalStorageModule');
      module('wallet.services');

      this.addMatchers({
        toBeDate: function(expected) {
          var d = new Date(this.actual);
          return Object.prototype.toString.call(d) == '[object Date]' && !isNaN(d.getTime());
        }
      });

    });


    it('should toBeDate', function() {
      expect(new Date()).toBeDate();
      expect(new Date('d')).not.toBeDate();

      expect(new Date().toString()).toBeDate();
      expect('d').not.toBeDate();
    });


    describe('Bill', function() {
      var Bill;
      beforeEach(inject(function(_Bill_) {
        Bill = _Bill_;
        Bill.clearAll();

        jasmine.Clock.useMock();
      }));


      it('should save new data', function() {
        expect(Bill.query().length).toBe(0);
        var bill = Bill.save({
          money: 1
        });
        expect(bill.id).toBeTruthy();
        expect(bill.created).toBeDate();
        expect(bill.updated).toBeFalsy();
        expect(bill.money).toBe(1);

        expect(Bill.query().length).toBe(1);
      });

      it('should update data', function() {
        expect(Bill.query().length).toBe(0);
        var b = Bill.save({
          money: 1
        });
        expect(Bill.query().length).toBe(1);

        var bill = Bill.save({
          id: b.id
        }, {
          money: -1
        });

        expect(bill.id).toBe(b.id);
        expect(bill.created).toBeDate();
        expect(bill.updated).toBeDate();
        expect(bill.money).toBe(-1);

        expect(Bill.query().length).toBe(1);
      });

      it('should keep reverse order', function() {
        setTimeout(function() {
          Bill.save({
            money: 1
          });
        }, 1000);
        setTimeout(function() {
          Bill.save({
            money: 2
          });
        }, 2000);
        setTimeout(function() {
          Bill.save({
            money: 3
          });
        }, 3000);

        jasmine.Clock.tick(3001);
        expect(_.pluck(Bill.query(), 'money')).toEqual([3, 2, 1]);
      });

      it('should get data', function() {
        var b = Bill.save({
          money: 1
        });
        var bill = Bill.get({
          id: b.id
        });
        expect(bill.money).toBe(1);
      });

      it('should remove data', function() {
        expect(Bill.query().length).toBe(0);
        var bill = Bill.save({
          money: 1
        });
        expect(Bill.query().length).toBe(1);
        Bill.remove({
          id: bill.id
        });
        expect(Bill.query().length).toBe(0);
      });
    });
  });
})();
