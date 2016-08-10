'use strict';
var controllername = 'home';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['User', '$state'];

    function controller(User, $state) {
        var vm = this;
        vm.controllername = fullname;

        vm.logIn = function() {

            User.create({
                email: vm.email,
                password: vm.password
            })
            .$promise
            .then(function(data) {
                console.log(data);
                User.login({
                    email: vm.email,
                    password: vm.password
                }, function(data, accessToken, err) {
                    console.log('accessToken', accessToken);
                    console.log('data', data);
                    console.log('err', err);
                    if (!err) {
                        $state.go('profile');
                    }

                });
            });

        };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
