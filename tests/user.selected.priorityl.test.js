const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('User selected priority tests', function() {

    var agent = request.agent(infra.app);

    it('Create user selected priority', function(done) {
        loadUserSelectedPriorityCreateModel();
        const createModel = TestCache.UserSelectedPriorityCreateModel;
        agent
            .post(`/api/v1/user-selected-priorities/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['USER_SELECTED_PRIORITYL_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('UserId');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('AssetId');
                expect(response.body.Data).to.have.property('AssetType');
                expect(response.body.Data).to.have.property('StartDate');

                expect(response.body.Data.id).to.equal(TestCache.UserSelectedPriorityCreateModel.id);
                expect(response.body.Data.Name).to.equal(TestCache.UserSelectedPriorityCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.UserSelectedPriorityCreateModel.Description);
                expect(response.body.Data.UserId).to.equal(TestCache.UserSelectedPriorityCreateModel.UserId);
                expect(response.body.Data.CareplanId).to.equal(TestCache.UserSelectedPriorityCreateModel.CareplanId);
                expect(response.body.Data.AssetId).to.equal(TestCache.UserSelectedPriorityCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.UserSelectedPriorityCreateModel.AssetType);
                expect(response.body.Data.StartDate).to.equal(TestCache.UserSelectedPriorityCreateModel.StartDate);

            })
            .expect(201, done);
    });

    it('Get user selected priority by id', function(done) {
        const id = `${TestCache.USER_SELECTED_PRIORITYL_ID}`
        agent
            .get(`/api/v1/user-selected-priorities/${TestCache.USER_SELECTED_PRIORITYL_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('UserId');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('AssetId');
                expect(response.body.Data).to.have.property('AssetType');
                expect(response.body.Data).to.have.property('StartDate');

                expect(response.body.Data.id).to.equal(TestCache.UserSelectedPriorityCreateModel.id);
                expect(response.body.Data.Name).to.equal(TestCache.UserSelectedPriorityCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.UserSelectedPriorityCreateModel.Description);
                expect(response.body.Data.UserId).to.equal(TestCache.UserSelectedPriorityCreateModel.UserId);
                expect(response.body.Data.CareplanId).to.equal(TestCache.UserSelectedPriorityCreateModel.CareplanId);
                expect(response.body.Data.AssetId).to.equal(TestCache.UserSelectedPriorityCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.UserSelectedPriorityCreateModel.AssetType);
                expect(response.body.Data.StartDate).to.equal(TestCache.UserSelectedPriorityCreateModel.StartDate);

            })
            .expect(200, done);
    });

    it('Search user selected priority records', function(done) {
        loadUserSelectedPriorityQueryString();
        const queryString = TestCache.UserSelectedPriorityQueryString;
        agent
            .get(`/api/v1/user-selected-priorities/search${queryString}`)
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

    it('Update user selected priority', function(done) {
        loadUserSelectedPriorityUpdateModel();
        const updateModel = TestCache.UserSelectedPriorityUpdateModel;
        const id = `${TestCache.USER_SELECTED_PRIORITYL_ID}`
        agent
            .put(`/api/v1/user-selected-priorities/${TestCache.USER_SELECTED_PRIORITYL_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('UserId');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('AssetId');
                expect(response.body.Data).to.have.property('AssetType');
                expect(response.body.Data).to.have.property('StartDate');

                expect(response.body.Data.id).to.equal(TestCache.UserSelectedPriorityCreateModel.id);
                expect(response.body.Data.Name).to.equal(TestCache.UserSelectedPriorityCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.UserSelectedPriorityCreateModel.Description);
                expect(response.body.Data.UserId).to.equal(TestCache.UserSelectedPriorityCreateModel.UserId);
                expect(response.body.Data.CareplanId).to.equal(TestCache.UserSelectedPriorityCreateModel.CareplanId);
                expect(response.body.Data.AssetId).to.equal(TestCache.UserSelectedPriorityCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.UserSelectedPriorityCreateModel.AssetType);
                expect(response.body.Data.StartDate).to.equal(TestCache.UserSelectedPriorityCreateModel.StartDate);

            })
            .expect(200, done);
    });

    it('Delete user selected priority', function(done) {
        const id = `${TestCache.USER_SELECTED_PRIORITYL_ID}`

        //Delete
        agent
            .delete(`/api/v1/user-selected-priorities/${TestCache.USER_SELECTED_PRIORITYL_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/user-selected-priorities/${TestCache.USER_SELECTED_PRIORITYL_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.UserSelectedPriorityCreateModel;
        agent
            .post(`/api/v1/user-selected-priorities/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['USER_SELECTED_PRIORITYL_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('UserId');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('AssetId');
                expect(response.body.Data).to.have.property('AssetType');
                expect(response.body.Data).to.have.property('StartDate');

                expect(response.body.Data.id).to.equal(TestCache.UserSelectedPriorityCreateModel.id);
                expect(response.body.Data.Name).to.equal(TestCache.UserSelectedPriorityCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.UserSelectedPriorityCreateModel.Description);
                expect(response.body.Data.UserId).to.equal(TestCache.UserSelectedPriorityCreateModel.UserId);
                expect(response.body.Data.CareplanId).to.equal(TestCache.UserSelectedPriorityCreateModel.CareplanId);
                expect(response.body.Data.AssetId).to.equal(TestCache.UserSelectedPriorityCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.UserSelectedPriorityCreateModel.AssetType);
                expect(response.body.Data.StartDate).to.equal(TestCache.UserSelectedPriorityCreateModel.StartDate);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadUserSelectedPriorityCreateModel() {
    const model = {
        Name: "Stress management",
        Description: ".....",
        UserId: TestCache.USER_ID,
        CareplanId: TestCache.CAREPLAN_ID,
        StartDate: "2022-01-01",

    };
    TestCache.UserSelectedPriorityCreateModel = model;
}

function loadUserSelectedPriorityUpdateModel() {
    const model = {
        Name: "Stress management",
        Description: ".....",
        UserId: TestCache.USER_ID,
        CareplanId: TestCache.CAREPLAN_ID,
        StartDate: "2022-01-01",

    };
    TestCache.UserSelectedPriorityUpdateModel = model;
}

function loadUserSelectedPriorityQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?name=xyz&description=xyz&careplanId=xyz&assetId=xyz&assetType=xyz&startDate=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////