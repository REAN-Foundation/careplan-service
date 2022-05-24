const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Appointment tests', function() {

    var agent = request.agent(infra.app);

    it('Create appointment', function(done) {
        loadAppointmentCreateModel();
        const createModel = TestCache.AppointmentCreateModel;
        agent
            .post(`/api/v1/assets/appointments/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['APPOINTMENT_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AppointmentType');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.AppointmentCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.AppointmentCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.AppointmentCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.AppointmentCreateModel.Description);
                expect(response.body.Data.AppointmentType).to.equal(TestCache.AppointmentCreateModel.AppointmentType);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.AppointmentCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.AppointmentCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.AppointmentCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.AppointmentCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get appointment by id', function(done) {
        const id = `${TestCache.APPOINTMENT_ID}`
        agent
            .get(`/api/v1/assets/appointments/${TestCache.APPOINTMENT_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AppointmentType');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.AppointmentCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.AppointmentCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.AppointmentCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.AppointmentCreateModel.Description);
                expect(response.body.Data.AppointmentType).to.equal(TestCache.AppointmentCreateModel.AppointmentType);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.AppointmentCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.AppointmentCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.AppointmentCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.AppointmentCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search appointment records', function(done) {
        loadAppointmentQueryString();
        const queryString = TestCache.AppointmentQueryString;
        agent
            .get(`/api/v1/assets/appointments/search${queryString}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('TotalCount');
                expect(response.body.Data).to.have.property('RetrievedCount');
                expect(response.body.Data).to.have.property('PageIndex');
                expect(response.body.Data).to.have.property('ItemsPerPage');
                expect(response.body.Data).to.have.property('Order');
                expect(response.body.Data).to.have.property('OrderedBy');
                expect(response.body.Data.TotalCount).to.greaterThan(0);
                expect(response.body.Data.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

    it('Update appointment', function(done) {
        loadAppointmentUpdateModel();
        const updateModel = TestCache.AppointmentUpdateModel;
        const id = `${TestCache.APPOINTMENT_ID}`
        agent
            .put(`/api/v1/assets/appointments/${TestCache.APPOINTMENT_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AppointmentType');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.AppointmentCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.AppointmentCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.AppointmentCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.AppointmentCreateModel.Description);
                expect(response.body.Data.AppointmentType).to.equal(TestCache.AppointmentCreateModel.AppointmentType);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.AppointmentCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.AppointmentCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.AppointmentCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.AppointmentCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete appointment', function(done) {
        const id = `${TestCache.APPOINTMENT_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/appointments/${TestCache.APPOINTMENT_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/appointments/${TestCache.APPOINTMENT_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.AppointmentCreateModel;
        agent
            .post(`/api/v1/assets/appointments/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['APPOINTMENT_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AppointmentType');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.AppointmentCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.AppointmentCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.AppointmentCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.AppointmentCreateModel.Description);
                expect(response.body.Data.AppointmentType).to.equal(TestCache.AppointmentCreateModel.AppointmentType);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.AppointmentCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.AppointmentCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.AppointmentCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.AppointmentCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadAppointmentCreateModel() {
    const model = {
        AssetCode: "APPOINTMENT-CC-2",
        Name: "Nutrition",
        Description: ".....",
        AppointmentType: "Doctor",
        Version: "V1",

    };
    TestCache.AppointmentCreateModel = model;
}

function loadAppointmentUpdateModel() {
    const model = {
        AssetCode: "APPOINTMENT-CC-2",
        Name: "Nutrition",
        Description: ".....",
        AppointmentType: "Doctor",
        Tags: ['Maternity', 'Neo-natal-care'],
        Version: "V1",

    };
    TestCache.AppointmentUpdateModel = model;
}

function loadAppointmentQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&appointmentType=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////