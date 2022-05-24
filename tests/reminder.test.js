const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Reminder tests', function() {

    var agent = request.agent(infra.app);

    it('Create reminder', function(done) {
        loadReminderCreateModel();
        const createModel = TestCache.ReminderCreateModel;
        agent
            .post(`/api/v1/assets/reminders/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['REMINDER_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.ReminderCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ReminderCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ReminderCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ReminderCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ReminderCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ReminderCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ReminderCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ReminderCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get reminder by id', function(done) {
        const id = `${TestCache.REMINDER_ID}`
        agent
            .get(`/api/v1/assets/reminders/${TestCache.REMINDER_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.ReminderCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ReminderCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ReminderCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ReminderCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ReminderCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ReminderCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ReminderCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ReminderCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search reminder records', function(done) {
        loadReminderQueryString();
        const queryString = TestCache.ReminderQueryString;
        agent
            .get(`/api/v1/assets/reminders/search${queryString}`)
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

    it('Update reminder', function(done) {
        loadReminderUpdateModel();
        const updateModel = TestCache.ReminderUpdateModel;
        const id = `${TestCache.REMINDER_ID}`
        agent
            .put(`/api/v1/assets/reminders/${TestCache.REMINDER_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.ReminderCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ReminderCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ReminderCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ReminderCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ReminderCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ReminderCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ReminderCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ReminderCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete reminder', function(done) {
        const id = `${TestCache.REMINDER_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/reminders/${TestCache.REMINDER_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/reminders/${TestCache.REMINDER_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.ReminderCreateModel;
        agent
            .post(`/api/v1/assets/reminders/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['REMINDER_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.ReminderCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ReminderCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ReminderCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ReminderCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ReminderCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ReminderCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ReminderCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ReminderCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadReminderCreateModel() {
    const model = {
        AssetCode: "REMINDER-CC-2",
        Name: "Take a walk",
        Description: ".....",
        Version: "V1",

    };
    TestCache.ReminderCreateModel = model;
}

function loadReminderUpdateModel() {
    const model = {
        AssetCode: "REMINDER-CC-2",
        Name: "Take a walk",
        Description: ".....",
        Tags: ['Schedule', 'Tasks'],
        Version: "V1",

    };
    TestCache.ReminderUpdateModel = model;
}

function loadReminderQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////