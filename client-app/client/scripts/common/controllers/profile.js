'use strict';
var _ = require('lodash');
var controllername = 'profile';
var loopback = require('loopback');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['Field', 'User', 'Profile'];

    function controller(Field, User, Profile) {
        var vm = this;
        vm.controllername = fullname;
        vm.profile = {};
        vm.medicalField = [{
            'title': 'pain',
            'array': []
        }, {
            'title': 'examination',
            'array': []
        }, {
            'title': 'reason of coming',
            'array': []
        }];

        vm.reload = function() {
            Profile.find()
                .$promise
                .then(function(data) {
                        console.log('data', data);
                        console.log('data', data.length);
                        if (data.length === 0) {
                            console.log('Create new field!!');

                            Profile.create({
                                    'field': {},
                                    'title': 'profile',
                                    'medicalField': vm.medicalField
                                })
                                .$promise
                                .then(function(data) {
                                    console.log(data);
                                    vm.profile = data[0];
                                });
                        } else {
                            console.log('Find field --> receive it!!');
                            vm.profile = _.find(data);
                            console.log('vm.profile', vm.profile);
                        }
                    },
                    function(err) {
                        console.log(err);
                    });
        };
        vm.reload();

        vm.saveData = function() {
            Profile.find()
                .$promise
                .then(function(data) {
                    console.log(data);
                    data[0].field = {
                        'email': vm.profile.field.email,
                        'firstName': vm.profile.field.firstName,
                        'lastName': vm.profile.field.lastName,
                        'birthDate': vm.profile.field.birthDate,
                        'phone': vm.profile.field.phone,
                        'adress': vm.profile.field.adress
                    };

                    data[0].medicalField = vm.profile.medicalField;
                    data[0].$save(function(data) {
                        console.log('mydata', data);
                        vm.reload();
                        vm.edit = !vm.edit;

                    }, function(err) {
                        console.log('myerer', err);
                    });
                    return data;
                });
        };

        vm.addMedicalField = function() {
            var test = {
                'title': vm.newField,
                'array': []
            };
            vm.profile.medicalField.push(test);
        };

        vm.addMedicalElement = function(field) {
            field.array.push(vm.diagnostic);
        };

        vm.deleteMedicalElement = function(field, $index) {
            field.array.splice($index, 1);
        };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
