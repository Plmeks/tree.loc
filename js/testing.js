app.service('testingService', function() {
    this.test = function(name, result, expected) {
        QUnit.test(name, function( assert ) {
            assert.ok( result == expected, "Passed!" );
        });
    };
});

