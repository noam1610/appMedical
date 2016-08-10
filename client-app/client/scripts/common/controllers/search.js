'use strict';
var controllername = 'search';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', '$filter', 'Patient', 'Profile'];

    function controller($scope, $filter, Patient, Profile) {
        var vm = this;
        vm.controllername = fullname;
        vm.searchID = '123456789';

        vm.noResult = false;

        $scope.$watch('vm.searchID', function() {

            Patient.find({
                    'filter': {
                        'where': {
                            'ID': vm.searchID
                        }
                    }
                })
                .$promise
                .then(function(patients) {
                    vm.patients = patients;
                    console.log('search', vm.searchID);
                    console.log('mes patients', patients);
                    if (vm.patients.length < 1) {
                        vm.noResult = true;
                    } else {
                        vm.noResult = false;
                    }
                });
        });
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
