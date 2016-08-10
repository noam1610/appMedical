'use strict';
var controllername = 'patient';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['Patient', '$stateParams', 'Visit', 'Profile', '$state'];

    function controller(Patient, $stateParams, Visit, Profile, $state) {
        var vm = this;
        vm.controllername = fullname;
        vm.patient = {};


        vm.newVisit = function() {
            $state.go('visit', {
                id: $stateParams.id
            });
        };

        Patient.find({
                'filter': {
                    'where': {
                        'ID': $stateParams.id
                    }
                }
            })
            .$promise
            .then(function(patient) {
                console.log('patient', patient);
                vm.patient = patient[0];
                console.log(vm.patient.id);
                //vm.visits = vm.getVisit(vm.patient.id);

            });

        vm.getVisit = function(identifiant) {
            return Patient.visits({
                    id: identifiant
                }).$promise
                .then(function(data, err) {
                    console.log(data);
                    console.log(err);
                });
        };

        // Visit.create({
        //     'id': Math.floor(Math.random() * 100000),
        //     'patientId': $stateParams.id

        // }, function(data) {
        //     console.log('createProd', data);
        //     Patient
        // }, function(err) {
        //     console.log('createProd--err', err);
        // });

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
