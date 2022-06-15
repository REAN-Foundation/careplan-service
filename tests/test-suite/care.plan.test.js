const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Care plan tests', function() {

    var agent = request.agent(infra.app);

    it('Create care plan', function(done) {
        loadCarePlanCreateModel();
        const createModel = TestCache.CarePlanCreateModel;
        agent
            .post(`/api/v1/careplans/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['CARE_PLAN_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Code');
                expect(response.body.Data).to.have.property('CategoryId');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('Version');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('IsActive');

                expect(response.body.Data.id).to.equal(TestCache.CarePlanCreateModel.id);
                expect(response.body.Data.Code).to.equal(TestCache.CarePlanCreateModel.Code);
                expect(response.body.Data.CategoryId).to.equal(TestCache.CarePlanCreateModel.CategoryId);
                expect(response.body.Data.Name).to.equal(TestCache.CarePlanCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.CarePlanCreateModel.Description);
                expect(response.body.Data.Version).to.equal(TestCache.CarePlanCreateModel.Version);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.CarePlanCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.CarePlanCreateModel.Tags);
                expect(response.body.Data.IsActive).to.equal(TestCache.CarePlanCreateModel.IsActive);

            })
            .expect(201, done);
    });

    it('Get care plan by id', function(done) {
        const id = `${TestCache.CARE_PLAN_ID}`
        agent
            .get(`/api/v1/careplans/${TestCache.CARE_PLAN_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Code');
                expect(response.body.Data).to.have.property('CategoryId');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('Version');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('IsActive');

                expect(response.body.Data.id).to.equal(TestCache.CarePlanCreateModel.id);
                expect(response.body.Data.Code).to.equal(TestCache.CarePlanCreateModel.Code);
                expect(response.body.Data.CategoryId).to.equal(TestCache.CarePlanCreateModel.CategoryId);
                expect(response.body.Data.Name).to.equal(TestCache.CarePlanCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.CarePlanCreateModel.Description);
                expect(response.body.Data.Version).to.equal(TestCache.CarePlanCreateModel.Version);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.CarePlanCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.CarePlanCreateModel.Tags);
                expect(response.body.Data.IsActive).to.equal(TestCache.CarePlanCreateModel.IsActive);

            })
            .expect(200, done);
    });

    it('Search care plan records', function(done) {
        loadCarePlanQueryString();
        const queryString = TestCache.CarePlanQueryString;
        agent
            .get(`/api/v1/careplans/search${queryString}`)
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

    it('Update care plan', function(done) {
        loadCarePlanUpdateModel();
        const updateModel = TestCache.CarePlanUpdateModel;
        const id = `${TestCache.CARE_PLAN_ID}`
        agent
            .put(`/api/v1/careplans/${TestCache.CARE_PLAN_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Code');
                expect(response.body.Data).to.have.property('CategoryId');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('Version');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('IsActive');

                expect(response.body.Data.id).to.equal(TestCache.CarePlanCreateModel.id);
                expect(response.body.Data.Code).to.equal(TestCache.CarePlanCreateModel.Code);
                expect(response.body.Data.CategoryId).to.equal(TestCache.CarePlanCreateModel.CategoryId);
                expect(response.body.Data.Name).to.equal(TestCache.CarePlanCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.CarePlanCreateModel.Description);
                expect(response.body.Data.Version).to.equal(TestCache.CarePlanCreateModel.Version);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.CarePlanCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.CarePlanCreateModel.Tags);
                expect(response.body.Data.IsActive).to.equal(TestCache.CarePlanCreateModel.IsActive);

            })
            .expect(200, done);
    });

    it('Delete care plan', function(done) {
        const id = `${TestCache.CARE_PLAN_ID}`

        //Delete
        agent
            .delete(`/api/v1/careplans/${TestCache.CARE_PLAN_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/careplans/${TestCache.CARE_PLAN_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.CarePlanCreateModel;
        agent
            .post(`/api/v1/careplans/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['CARE_PLAN_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Code');
                expect(response.body.Data).to.have.property('CategoryId');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('Version');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('IsActive');

                expect(response.body.Data.id).to.equal(TestCache.CarePlanCreateModel.id);
                expect(response.body.Data.Code).to.equal(TestCache.CarePlanCreateModel.Code);
                expect(response.body.Data.CategoryId).to.equal(TestCache.CarePlanCreateModel.CategoryId);
                expect(response.body.Data.Name).to.equal(TestCache.CarePlanCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.CarePlanCreateModel.Description);
                expect(response.body.Data.Version).to.equal(TestCache.CarePlanCreateModel.Version);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.CarePlanCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.CarePlanCreateModel.Tags);
                expect(response.body.Data.IsActive).to.equal(TestCache.CarePlanCreateModel.IsActive);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadCarePlanCreateModel() {
    const model = {
        Code: "REAN-Maternity-2",
        CategoryId: TestCache.CATEGORY_ID,
        Name: "Maternity Care Plan for Remote Population",
        Description: "This is maternity care plan specifically designed for remote areas with low resource settings.",
        Version: "1.0.0",
        OwnerUserId: TestCache.OWNER_USER_ID,
        Tags: [Maternity, Child - Care, Malnutrition],

    };
    TestCache.CarePlanCreateModel = model;
}

function loadCarePlanUpdateModel() {
    const model = {
        Code: "REAN-Maternity-2",
        CategoryId: TestCache.CATEGORY_ID,
        Name: "Maternity Care Plan for Remote Population",
        Description: "This is maternity care plan specifically designed for remote areas with low resource settings.",
        Version: "1.0.0",
        OwnerUserId: TestCache.OWNER_USER_ID,
        Tags: [Maternity, Child - Care, Malnutrition],

    };
    TestCache.CarePlanUpdateModel = model;
}

function loadCarePlanQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?code=xyz&categoryId=xyz&name=xyz&version=xyz&ownerUserId=xyz&tags=xyz&isActive=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////