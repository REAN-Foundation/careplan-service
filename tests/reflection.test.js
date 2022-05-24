const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Reflection tests', function() {

    var agent = request.agent(infra.app);

    it('Create reflection', function(done) {
        loadReflectionCreateModel();
        const createModel = TestCache.ReflectionCreateModel;
        agent
            .post(`/api/v1/assets/reflections/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['REFLECTION_ID'] = response.body.Data.id;
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

                expect(response.body.Data.id).to.equal(TestCache.ReflectionCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ReflectionCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ReflectionCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ReflectionCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ReflectionCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ReflectionCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ReflectionCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ReflectionCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get reflection by id', function(done) {
        const id = `${TestCache.REFLECTION_ID}`
        agent
            .get(`/api/v1/assets/reflections/${TestCache.REFLECTION_ID}`)
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

                expect(response.body.Data.id).to.equal(TestCache.ReflectionCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ReflectionCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ReflectionCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ReflectionCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ReflectionCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ReflectionCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ReflectionCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ReflectionCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search reflection records', function(done) {
        loadReflectionQueryString();
        const queryString = TestCache.ReflectionQueryString;
        agent
            .get(`/api/v1/assets/reflections/search${queryString}`)
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

    it('Update reflection', function(done) {
        loadReflectionUpdateModel();
        const updateModel = TestCache.ReflectionUpdateModel;
        const id = `${TestCache.REFLECTION_ID}`
        agent
            .put(`/api/v1/assets/reflections/${TestCache.REFLECTION_ID}`)
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

                expect(response.body.Data.id).to.equal(TestCache.ReflectionCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ReflectionCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ReflectionCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ReflectionCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ReflectionCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ReflectionCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ReflectionCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ReflectionCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete reflection', function(done) {
        const id = `${TestCache.REFLECTION_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/reflections/${TestCache.REFLECTION_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/reflections/${TestCache.REFLECTION_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.ReflectionCreateModel;
        agent
            .post(`/api/v1/assets/reflections/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['REFLECTION_ID'] = response.body.Data.id;
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

                expect(response.body.Data.id).to.equal(TestCache.ReflectionCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ReflectionCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ReflectionCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ReflectionCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ReflectionCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ReflectionCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ReflectionCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ReflectionCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadReflectionCreateModel() {
    const model = {
        AssetCode: "REFLECTION-CC-2",
        Name: "Progress in the last week",
        Description: ".....",
        Version: "V1",

    };
    TestCache.ReflectionCreateModel = model;
}

function loadReflectionUpdateModel() {
    const model = {
        AssetCode: "REFLECTION-CC-2",
        Name: "Progress in the last week",
        Description: ".....",
        Tags: ['Reflection', 'Retrospection'],
        Version: "V1",

    };
    TestCache.ReflectionUpdateModel = model;
}

function loadReflectionQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////