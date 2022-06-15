const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Careplan category tests', function() {

    var agent = request.agent(infra.app);

    it('Create careplan category', function(done) {
        loadCareplanCategoryCreateModel();
        const createModel = TestCache.CareplanCategoryCreateModel;
        agent
            .post(`/api/v1/careplan-categories/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['CAREPLAN_CATEGORY_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Type');
                expect(response.body.Data).to.have.property('Description');

                expect(response.body.Data.id).to.equal(TestCache.CareplanCategoryCreateModel.id);
                expect(response.body.Data.Type).to.equal(TestCache.CareplanCategoryCreateModel.Type);
                expect(response.body.Data.Description).to.equal(TestCache.CareplanCategoryCreateModel.Description);

            })
            .expect(201, done);
    });

    it('Get careplan category by id', function(done) {
        const id = `${TestCache.CAREPLAN_CATEGORY_ID}`
        agent
            .get(`/api/v1/careplan-categories/${TestCache.CAREPLAN_CATEGORY_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Type');
                expect(response.body.Data).to.have.property('Description');

                expect(response.body.Data.id).to.equal(TestCache.CareplanCategoryCreateModel.id);
                expect(response.body.Data.Type).to.equal(TestCache.CareplanCategoryCreateModel.Type);
                expect(response.body.Data.Description).to.equal(TestCache.CareplanCategoryCreateModel.Description);

            })
            .expect(200, done);
    });

    it('Search careplan category records', function(done) {
        loadCareplanCategoryQueryString();
        const queryString = TestCache.CareplanCategoryQueryString;
        agent
            .get(`/api/v1/careplan-categories/search${queryString}`)
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

    it('Update careplan category', function(done) {
        loadCareplanCategoryUpdateModel();
        const updateModel = TestCache.CareplanCategoryUpdateModel;
        const id = `${TestCache.CAREPLAN_CATEGORY_ID}`
        agent
            .put(`/api/v1/careplan-categories/${TestCache.CAREPLAN_CATEGORY_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Type');
                expect(response.body.Data).to.have.property('Description');

                expect(response.body.Data.id).to.equal(TestCache.CareplanCategoryCreateModel.id);
                expect(response.body.Data.Type).to.equal(TestCache.CareplanCategoryCreateModel.Type);
                expect(response.body.Data.Description).to.equal(TestCache.CareplanCategoryCreateModel.Description);

            })
            .expect(200, done);
    });

    it('Delete careplan category', function(done) {
        const id = `${TestCache.CAREPLAN_CATEGORY_ID}`

        //Delete
        agent
            .delete(`/api/v1/careplan-categories/${TestCache.CAREPLAN_CATEGORY_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/careplan-categories/${TestCache.CAREPLAN_CATEGORY_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.CareplanCategoryCreateModel;
        agent
            .post(`/api/v1/careplan-categories/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['CAREPLAN_CATEGORY_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Type');
                expect(response.body.Data).to.have.property('Description');

                expect(response.body.Data.id).to.equal(TestCache.CareplanCategoryCreateModel.id);
                expect(response.body.Data.Type).to.equal(TestCache.CareplanCategoryCreateModel.Type);
                expect(response.body.Data.Description).to.equal(TestCache.CareplanCategoryCreateModel.Description);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadCareplanCategoryCreateModel() {
    const model = {
        Type: "Upcoming class reminder",

    };
    TestCache.CareplanCategoryCreateModel = model;
}

function loadCareplanCategoryUpdateModel() {
    const model = {
        Type: "Upcoming class reminder",
        Description: "Notification type description",

    };
    TestCache.CareplanCategoryUpdateModel = model;
}

function loadCareplanCategoryQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?type=xyz&description=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////