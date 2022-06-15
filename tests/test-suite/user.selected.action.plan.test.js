const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('User selected action plan tests', function() {

    var agent = request.agent(infra.app);

    it('Create user selected action plan', function(done) {
        loadUserSelectedActionPlanCreateModel();
        const createModel = TestCache.UserSelectedActionPlanCreateModel;
        agent
            .post(`/api/v1/user-selected-action-plans/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['USER_SELECTED_ACTION_PLAN_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('UserId');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('AssetId');
                expect(response.body.Data).to.have.property('AssetType');
                expect(response.body.Data).to.have.property('AdditionalDetails');
                expect(response.body.Data).to.have.property('StartDate');
                expect(response.body.Data).to.have.property('EndDate');
                expect(response.body.Data).to.have.property('ProgressStatus');

                expect(response.body.Data.id).to.equal(TestCache.UserSelectedActionPlanCreateModel.id);
                expect(response.body.Data.Name).to.equal(TestCache.UserSelectedActionPlanCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.UserSelectedActionPlanCreateModel.Description);
                expect(response.body.Data.UserId).to.equal(TestCache.UserSelectedActionPlanCreateModel.UserId);
                expect(response.body.Data.CareplanId).to.equal(TestCache.UserSelectedActionPlanCreateModel.CareplanId);
                expect(response.body.Data.AssetId).to.equal(TestCache.UserSelectedActionPlanCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.UserSelectedActionPlanCreateModel.AssetType);
                expect(response.body.Data.AdditionalDetails).to.equal(TestCache.UserSelectedActionPlanCreateModel.AdditionalDetails);
                expect(response.body.Data.StartDate).to.equal(TestCache.UserSelectedActionPlanCreateModel.StartDate);
                expect(response.body.Data.EndDate).to.equal(TestCache.UserSelectedActionPlanCreateModel.EndDate);
                expect(response.body.Data.ProgressStatus).to.equal(TestCache.UserSelectedActionPlanCreateModel.ProgressStatus);

            })
            .expect(201, done);
    });

    it('Get user selected action plan by id', function(done) {
        const id = `${TestCache.USER_SELECTED_ACTION_PLAN_ID}`
        agent
            .get(`/api/v1/user-selected-action-plans/${TestCache.USER_SELECTED_ACTION_PLAN_ID}`)
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
                expect(response.body.Data).to.have.property('AdditionalDetails');
                expect(response.body.Data).to.have.property('StartDate');
                expect(response.body.Data).to.have.property('EndDate');
                expect(response.body.Data).to.have.property('ProgressStatus');

                expect(response.body.Data.id).to.equal(TestCache.UserSelectedActionPlanCreateModel.id);
                expect(response.body.Data.Name).to.equal(TestCache.UserSelectedActionPlanCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.UserSelectedActionPlanCreateModel.Description);
                expect(response.body.Data.UserId).to.equal(TestCache.UserSelectedActionPlanCreateModel.UserId);
                expect(response.body.Data.CareplanId).to.equal(TestCache.UserSelectedActionPlanCreateModel.CareplanId);
                expect(response.body.Data.AssetId).to.equal(TestCache.UserSelectedActionPlanCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.UserSelectedActionPlanCreateModel.AssetType);
                expect(response.body.Data.AdditionalDetails).to.equal(TestCache.UserSelectedActionPlanCreateModel.AdditionalDetails);
                expect(response.body.Data.StartDate).to.equal(TestCache.UserSelectedActionPlanCreateModel.StartDate);
                expect(response.body.Data.EndDate).to.equal(TestCache.UserSelectedActionPlanCreateModel.EndDate);
                expect(response.body.Data.ProgressStatus).to.equal(TestCache.UserSelectedActionPlanCreateModel.ProgressStatus);

            })
            .expect(200, done);
    });

    it('Search user selected action plan records', function(done) {
        loadUserSelectedActionPlanQueryString();
        const queryString = TestCache.UserSelectedActionPlanQueryString;
        agent
            .get(`/api/v1/user-selected-action-plans/search${queryString}`)
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

    it('Update user selected action plan', function(done) {
        loadUserSelectedActionPlanUpdateModel();
        const updateModel = TestCache.UserSelectedActionPlanUpdateModel;
        const id = `${TestCache.USER_SELECTED_ACTION_PLAN_ID}`
        agent
            .put(`/api/v1/user-selected-action-plans/${TestCache.USER_SELECTED_ACTION_PLAN_ID}`)
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
                expect(response.body.Data).to.have.property('AdditionalDetails');
                expect(response.body.Data).to.have.property('StartDate');
                expect(response.body.Data).to.have.property('EndDate');
                expect(response.body.Data).to.have.property('ProgressStatus');

                expect(response.body.Data.id).to.equal(TestCache.UserSelectedActionPlanCreateModel.id);
                expect(response.body.Data.Name).to.equal(TestCache.UserSelectedActionPlanCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.UserSelectedActionPlanCreateModel.Description);
                expect(response.body.Data.UserId).to.equal(TestCache.UserSelectedActionPlanCreateModel.UserId);
                expect(response.body.Data.CareplanId).to.equal(TestCache.UserSelectedActionPlanCreateModel.CareplanId);
                expect(response.body.Data.AssetId).to.equal(TestCache.UserSelectedActionPlanCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.UserSelectedActionPlanCreateModel.AssetType);
                expect(response.body.Data.AdditionalDetails).to.equal(TestCache.UserSelectedActionPlanCreateModel.AdditionalDetails);
                expect(response.body.Data.StartDate).to.equal(TestCache.UserSelectedActionPlanCreateModel.StartDate);
                expect(response.body.Data.EndDate).to.equal(TestCache.UserSelectedActionPlanCreateModel.EndDate);
                expect(response.body.Data.ProgressStatus).to.equal(TestCache.UserSelectedActionPlanCreateModel.ProgressStatus);

            })
            .expect(200, done);
    });

    it('Delete user selected action plan', function(done) {
        const id = `${TestCache.USER_SELECTED_ACTION_PLAN_ID}`

        //Delete
        agent
            .delete(`/api/v1/user-selected-action-plans/${TestCache.USER_SELECTED_ACTION_PLAN_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/user-selected-action-plans/${TestCache.USER_SELECTED_ACTION_PLAN_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.UserSelectedActionPlanCreateModel;
        agent
            .post(`/api/v1/user-selected-action-plans/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['USER_SELECTED_ACTION_PLAN_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('UserId');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('AssetId');
                expect(response.body.Data).to.have.property('AssetType');
                expect(response.body.Data).to.have.property('AdditionalDetails');
                expect(response.body.Data).to.have.property('StartDate');
                expect(response.body.Data).to.have.property('EndDate');
                expect(response.body.Data).to.have.property('ProgressStatus');

                expect(response.body.Data.id).to.equal(TestCache.UserSelectedActionPlanCreateModel.id);
                expect(response.body.Data.Name).to.equal(TestCache.UserSelectedActionPlanCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.UserSelectedActionPlanCreateModel.Description);
                expect(response.body.Data.UserId).to.equal(TestCache.UserSelectedActionPlanCreateModel.UserId);
                expect(response.body.Data.CareplanId).to.equal(TestCache.UserSelectedActionPlanCreateModel.CareplanId);
                expect(response.body.Data.AssetId).to.equal(TestCache.UserSelectedActionPlanCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.UserSelectedActionPlanCreateModel.AssetType);
                expect(response.body.Data.AdditionalDetails).to.equal(TestCache.UserSelectedActionPlanCreateModel.AdditionalDetails);
                expect(response.body.Data.StartDate).to.equal(TestCache.UserSelectedActionPlanCreateModel.StartDate);
                expect(response.body.Data.EndDate).to.equal(TestCache.UserSelectedActionPlanCreateModel.EndDate);
                expect(response.body.Data.ProgressStatus).to.equal(TestCache.UserSelectedActionPlanCreateModel.ProgressStatus);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadUserSelectedActionPlanCreateModel() {
    const model = {
        Name: "Reduce Fasting Blood Glucose",
        Description: ".....",
        UserId: TestCache.USER_ID,
        CareplanId: TestCache.CAREPLAN_ID,
        AdditionalDetails: "...",
        StartDate: "2022-01-01",
        EndDate: "2023-01-01",

    };
    TestCache.UserSelectedActionPlanCreateModel = model;
}

function loadUserSelectedActionPlanUpdateModel() {
    const model = {
        Name: "Reduce Fasting Blood Glucose",
        Description: ".....",
        UserId: TestCache.USER_ID,
        CareplanId: TestCache.CAREPLAN_ID,
        AdditionalDetails: "...",
        StartDate: "2022-01-01",
        EndDate: "2023-01-01",

    };
    TestCache.UserSelectedActionPlanUpdateModel = model;
}

function loadUserSelectedActionPlanQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?name=xyz&description=xyz&careplanId=xyz&assetId=xyz&assetType=xyz&additionalDetails=xyz&startDate=xyz&endDate=xyz&progressStatus=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////