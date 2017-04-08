define(function(require) {
    var $ = require('jquery'),
        constants = require('./constants');

    return function() {
        $('body').append('Footer component says: hello' + constants.hello);
    };
});
