const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Checkup tests', function() {

    var agent = request.agent(infra.app);

    it('Create checkup', function(done) {
        loadCheckupCreateModel();
        const createModel = TestCache.CheckupCreateModel;
        agent
            .post(`/api/v1/assets/checkups/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['CHECKUP_ID'] = response.body.Data.id;
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

                expect(response.body.Data.id).to.equal(TestCache.CheckupCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.CheckupCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.CheckupCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.CheckupCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.CheckupCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.CheckupCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.CheckupCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.CheckupCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get checkup by id', function(done) {
        const id = `${TestCache.CHECKUP_ID}`
        agent
            .get(`/api/v1/assets/checkups/${TestCache.CHECKUP_ID}`)
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

                expect(response.body.Data.id).to.equal(TestCache.CheckupCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.CheckupCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.CheckupCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.CheckupCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.CheckupCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.CheckupCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.CheckupCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.CheckupCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search checkup records', function(done) {
        loadCheckupQueryString();
        const queryString = TestCache.CheckupQueryString;
        agent
            .get(`/api/v1/assets/checkups/search${queryString}`)
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

    it('Update checkup', function(done) {
        loadCheckupUpdateModel();
        const updateModel = TestCache.CheckupUpdateModel;
        const id = `${TestCache.CHECKUP_ID}`
        agent
            .put(`/api/v1/assets/checkups/${TestCache.CHECKUP_ID}`)
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

                expect(response.body.Data.id).to.equal(TestCache.CheckupCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.CheckupCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.CheckupCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.CheckupCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.CheckupCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.CheckupCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.CheckupCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.CheckupCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete checkup', function(done) {
        const id = `${TestCache.CHECKUP_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/checkups/${TestCache.CHECKUP_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/checkups/${TestCache.CHECKUP_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.CheckupCreateModel;
        agent
            .post(`/api/v1/assets/checkups/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['CHECKUP_ID'] = response.body.Data.id;
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

                expect(response.body.Data.id).to.equal(TestCache.CheckupCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.CheckupCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.CheckupCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.CheckupCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.CheckupCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.CheckupCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.CheckupCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.CheckupCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadCheckupCreateModel() {
    const model = {
        AssetCode: "CHECKUP-HF-12",
        Name: "Chest X-ray",
        Description: ".....",
        Version: "V1",

    };
    TestCache.CheckupCreateModel = model;
}

function loadCheckupUpdateModel() {
    const model = {
        AssetCode: "CHECKUP-HF-12",
        Name: "Chest X-ray",
        Description: ".....",
        Tags: ['Maternity', 'Neo-natal-care'],
        Version: "V1",

    };
    TestCache.CheckupUpdateModel = model;
}

function loadCheckupQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////