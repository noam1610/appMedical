'use strict';
var controllername = 'create';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['Patient', '$state', 'Profile'];

    function controller(Patient, $state, Profile) {
        var vm = this;
        vm.controllername = fullname;
        Profile.find().$promise
            .then(function(data) {
                vm.profileId = data.id;
            });

        vm.create = function() {

            Patient.create({
                'id': Math.floor(Math.random() * 100000),
                'profileId': vm.profileId,
                'firstName': vm.patient.firstName,
                'lastName': vm.patient.lastName,
                'ID': vm.patient.ID,
                'yearBirth': vm.patient.yearBirth,
                'email': vm.patient.email,
                'phone': vm.patient.phone,
                'adress': vm.patient.adress

            }, function(data) {
                console.log('createProd', data);
                $state.go('profile');
            }, function(err) {
                console.log('createProd--err', err);
                $state.go('profile');
            });
        };
    };

    // Patient.create({
    //         'firstName': vm.patient.firstName,
    //         'lastName': vm.patient.lastName,
    //         'ID': vm.patient.ID,
    //         'yearBirth': vm.patient.yearBirth,
    //         'email': vm.patient.email,
    //         'phone': vm.patient.phone,
    //         'adress': vm.patient.adress
    //     })
    //     .$promise
    //     .then(function(data) {
    //         console.log('-------data-------', data);
    //     }, function(err) {
    //         console.log(err);
    //     });
    // Profile.find()
    //     .$promise
    //     .then(function(data) {
    //             console.log('data--create', data);
    //             console.log('data--create)lenght', data.length);
    //             Patient.create({
    //                 'profileId': data[0].id,
    //                 'firstName': vm.patient.firstName,
    //                 'lastName': vm.patient.lastName,
    //                 'ID': vm.patient.ID,
    //                 'yearBirth': vm.patient.yearBirth,
    //                 'email': vm.patient.email,
    //                 'phone': vm.patient.phone,
    //                 'adress': vm.patient.adress

    //             }, function(patient, err) {
    //                 console.log('err-create-patient', err);
    //                 console.log('patient-create-patient', patient);
    //             });
    //         },
    //         function(err) {
    //             console.log('err-create', err);
    //         });

    // Profile.find()
    //     .$promise
    //     .then(function(data) {
    //         data.find().patiens.create({
    //             'firstName': vm.patient.firstName,
    //             'lastName': vm.patient.lastName,
    //             'ID': vm.patient.ID,
    //             'yearBirth': vm.patient.yearBirth,
    //             'email': vm.patient.email,
    //             'phone': vm.patient.phone,
    //             'adress': vm.patient.adress
    //         }, function(err, order) {
    //             console.log('err--', err);
    //             console.log('order', order);
    //         });
    //     });

    controller.$inject = deps;
    app.controller(fullname, controller);
};
