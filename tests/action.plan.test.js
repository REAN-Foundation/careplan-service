const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Action plan tests', function() {

    var agent = request.agent(infra.app);

    it('Create action plan', function(done) {
        loadActionPlanCreateModel();
        const createModel = TestCache.ActionPlanCreateModel;
        agent
            .post(`/api/v1/assets/action-plans/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['ACTION_PLAN_ID'] = response.body.Data.id;
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

                expect(response.body.Data.id).to.equal(TestCache.ActionPlanCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ActionPlanCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ActionPlanCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ActionPlanCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ActionPlanCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ActionPlanCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ActionPlanCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ActionPlanCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get action plan by id', function(done) {
        const id = `${TestCache.ACTION_PLAN_ID}`
        agent
            .get(`/api/v1/assets/action-plans/${TestCache.ACTION_PLAN_ID}`)
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

                expect(response.body.Data.id).to.equal(TestCache.ActionPlanCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ActionPlanCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ActionPlanCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ActionPlanCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ActionPlanCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ActionPlanCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ActionPlanCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ActionPlanCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search action plan records', function(done) {
        loadActionPlanQueryString();
        const queryString = TestCache.ActionPlanQueryString;
        agent
            .get(`/api/v1/assets/action-plans/search${queryString}`)
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

    it('Update action plan', function(done) {
        loadActionPlanUpdateModel();
        const updateModel = TestCache.ActionPlanUpdateModel;
        const id = `${TestCache.ACTION_PLAN_ID}`
        agent
            .put(`/api/v1/assets/action-plans/${TestCache.ACTION_PLAN_ID}`)
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

                expect(response.body.Data.id).to.equal(TestCache.ActionPlanCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ActionPlanCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ActionPlanCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ActionPlanCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ActionPlanCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ActionPlanCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ActionPlanCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ActionPlanCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete action plan', function(done) {
        const id = `${TestCache.ACTION_PLAN_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/action-plans/${TestCache.ACTION_PLAN_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/action-plans/${TestCache.ACTION_PLAN_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.ActionPlanCreateModel;
        agent
            .post(`/api/v1/assets/action-plans/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['ACTION_PLAN_ID'] = response.body.Data.id;
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

                expect(response.body.Data.id).to.equal(TestCache.ActionPlanCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ActionPlanCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ActionPlanCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ActionPlanCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ActionPlanCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ActionPlanCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ActionPlanCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ActionPlanCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadActionPlanCreateModel() {
    const model = {
        AssetCode: "ACTIONPLAN-HF-1",
        Name: "Join the gym",
        Description: "Studies confirm that working out with a partner significantly increases time spent exercising. A study by the Society of Behavioral Medicine showed that working with a partner, especially in a team format, improved performance, doubling the workout time of those who exercised alone.",
        Version: "V1",

    };
    TestCache.ActionPlanCreateModel = model;
}

function loadActionPlanUpdateModel() {
    const model = {
        AssetCode: "ACTIONPLAN-HF-1",
        Name: "Join the gym",
        Description: "Studies confirm that working out with a partner significantly increases time spent exercising. A study by the Society of Behavioral Medicine showed that working with a partner, especially in a team format, improved performance, doubling the workout time of those who exercised alone.",
        Tags: ['Maternity', 'Neo-natal-care'],
        Version: "V1",

    };
    TestCache.ActionPlanUpdateModel = model;
}

function loadActionPlanQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////