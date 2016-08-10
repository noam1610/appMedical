'use strict';
var controllername = 'visit';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['Profile', '$scope', '$log', '$modal', '$state'];

    function controller(Profile, $scope, $log, $modal, $state) {
        var vm = this;
        vm.controllername = fullname;
        var month = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ];

        vm.loadDate = function() {
            var d = new Date();
            vm.date = d.getDate() + ' ' + month[d.getMonth()] + ' ' + d.getFullYear();
            console.log(vm.date);
        };
        vm.loadDate();

        Profile.find().$promise
            .then(function(data) {
                console.log(data);
                vm.profile = data[0];
            }, function(err) {
                console.log(err);
            });

        vm.saveVisit = function() {
            var modal = $modal.open({
                animation: true,
                template: require('../views/myModal.html'),
                controller: app.name + '.visit as vm',
                scope: $scope,
                // size: size,
                resolve: {

                }
            });

        };

        vm.ok = function() {
            $state.go('visit');
        };

        $scope.ok = function() {
            $state.go('visit');
        };

        // $scope.items = [
        //     'The first choice!',
        //     'And another choice for you.',
        //     'but wait! A third!'
        // ];

        // $scope.status = {
        //     isopen: false
        // };

        // $scope.toggled = function(open) {
        //     $log.log('Dropdown is now: ', open);
        // };

        // $scope.toggleDropdown = function($event) {
        //     $event.preventDefault();
        //     $event.stopPropagation();
        //     $scope.status.isopen = !$scope.status.isopen;
        // };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
