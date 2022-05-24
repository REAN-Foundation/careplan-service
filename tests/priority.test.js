const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Priority tests', function() {

    var agent = request.agent(infra.app);

    it('Create priority', function(done) {
        loadPriorityCreateModel();
        const createModel = TestCache.PriorityCreateModel;
        agent
            .post(`/api/v1/assets/priorities/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['PRIORITY_ID'] = response.body.Data.id;
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

                expect(response.body.Data.id).to.equal(TestCache.PriorityCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.PriorityCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.PriorityCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.PriorityCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.PriorityCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.PriorityCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.PriorityCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.PriorityCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get priority by id', function(done) {
        const id = `${TestCache.PRIORITY_ID}`
        agent
            .get(`/api/v1/assets/priorities/${TestCache.PRIORITY_ID}`)
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

                expect(response.body.Data.id).to.equal(TestCache.PriorityCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.PriorityCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.PriorityCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.PriorityCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.PriorityCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.PriorityCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.PriorityCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.PriorityCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search priority records', function(done) {
        loadPriorityQueryString();
        const queryString = TestCache.PriorityQueryString;
        agent
            .get(`/api/v1/assets/priorities/search${queryString}`)
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

    it('Update priority', function(done) {
        loadPriorityUpdateModel();
        const updateModel = TestCache.PriorityUpdateModel;
        const id = `${TestCache.PRIORITY_ID}`
        agent
            .put(`/api/v1/assets/priorities/${TestCache.PRIORITY_ID}`)
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

                expect(response.body.Data.id).to.equal(TestCache.PriorityCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.PriorityCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.PriorityCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.PriorityCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.PriorityCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.PriorityCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.PriorityCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.PriorityCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete priority', function(done) {
        const id = `${TestCache.PRIORITY_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/priorities/${TestCache.PRIORITY_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/priorities/${TestCache.PRIORITY_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.PriorityCreateModel;
        agent
            .post(`/api/v1/assets/priorities/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['PRIORITY_ID'] = response.body.Data.id;
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

                expect(response.body.Data.id).to.equal(TestCache.PriorityCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.PriorityCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.PriorityCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.PriorityCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.PriorityCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.PriorityCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.PriorityCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.PriorityCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadPriorityCreateModel() {
    const model = {
        AssetCode: "PRIORITY-CC-2",
        Name: "Weight management",
        Description: ".....",
        Version: "V1",

    };
    TestCache.PriorityCreateModel = model;
}

function loadPriorityUpdateModel() {
    const model = {
        AssetCode: "PRIORITY-CC-2",
        Name: "Weight management",
        Description: ".....",
        Tags: ['Maternity', 'Neo-natal-care'],
        Version: "V1",

    };
    TestCache.PriorityUpdateModel = model;
}

function loadPriorityQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////