const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Goal tests', function() {

    var agent = request.agent(infra.app);

    it('Create goal', function(done) {
        loadGoalCreateModel();
        const createModel = TestCache.GoalCreateModel;
        agent
            .post(`/api/v1/assets/goals/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['GOAL_ID'] = response.body.Data.id;
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

                expect(response.body.Data.id).to.equal(TestCache.GoalCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.GoalCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.GoalCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.GoalCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.GoalCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.GoalCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.GoalCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.GoalCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get goal by id', function(done) {
        const id = `${TestCache.GOAL_ID}`
        agent
            .get(`/api/v1/assets/goals/${TestCache.GOAL_ID}`)
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

                expect(response.body.Data.id).to.equal(TestCache.GoalCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.GoalCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.GoalCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.GoalCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.GoalCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.GoalCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.GoalCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.GoalCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search goal records', function(done) {
        loadGoalQueryString();
        const queryString = TestCache.GoalQueryString;
        agent
            .get(`/api/v1/assets/goals/search${queryString}`)
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

    it('Update goal', function(done) {
        loadGoalUpdateModel();
        const updateModel = TestCache.GoalUpdateModel;
        const id = `${TestCache.GOAL_ID}`
        agent
            .put(`/api/v1/assets/goals/${TestCache.GOAL_ID}`)
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

                expect(response.body.Data.id).to.equal(TestCache.GoalCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.GoalCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.GoalCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.GoalCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.GoalCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.GoalCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.GoalCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.GoalCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete goal', function(done) {
        const id = `${TestCache.GOAL_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/goals/${TestCache.GOAL_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/goals/${TestCache.GOAL_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.GoalCreateModel;
        agent
            .post(`/api/v1/assets/goals/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['GOAL_ID'] = response.body.Data.id;
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

                expect(response.body.Data.id).to.equal(TestCache.GoalCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.GoalCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.GoalCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.GoalCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.GoalCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.GoalCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.GoalCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.GoalCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadGoalCreateModel() {
    const model = {
        AssetCode: "GOAL-CC-2",
        Name: "Reduce Fasting Blood Glucose",
        Description: ".....",
        Version: "V1",

    };
    TestCache.GoalCreateModel = model;
}

function loadGoalUpdateModel() {
    const model = {
        AssetCode: "GOAL-CC-2",
        Name: "Reduce Fasting Blood Glucose",
        Description: ".....",
        Tags: ['Maternity', 'Neo-natal-care'],
        Version: "V1",

    };
    TestCache.GoalUpdateModel = model;
}

function loadGoalQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////