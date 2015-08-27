onload = function() {
    mocha.setup('bdd');
    mocha.checkLeaks();
    mocha.globals(['jQuery']);

    var a = [1, 2, 4];

    function isNumberPresent(no) {
        return a.indexOf(no);
    };

    describe('Trial Mocha array : ' + a.toString(), function() {
        describe('Number 5: Should not be present in [a Array]', function() {
            it('should return -1 when the value is not present', function() {
                isNumberPresent(5).should.equal(-1);
            });
        });

        describe('Number 2: Should be present in [a Array]', function() {
            it('Pending test reporting');
            it('should return 1 when the value is not present', function() {
                isNumberPresent(2).should.equal(1);
            });
        });
    });

    var user = {
        save: function(fn) {
            var self = this;
            setTimeout(function() {
                fn(null, 'async');
            }, 300);
        }
    }

    describe('Asynchronous testing: ', function() {
        describe('User Save ', function() {
            it('User.save(fn)', function(done, fail) {
                user.save(function(resp) {
                    done(resp)
                });
            })
        });

        describe('Should fail under 200ms timeout', function() {
            this.timeout(200);
            it('User.save(fn)', function(done, fail) {
                user.save(function(resp) {
                    done(resp)
                });
            })
        });

        describe('Should fail under 400ms timeout', function() {
            this.timeout(400);
            it('User.save(fn)', function(done, fail) {
                user.save(function(resp) {
                    done(resp)
                });
            })
        });
    });



    mocha.run();

}