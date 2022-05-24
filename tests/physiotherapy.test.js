const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Physiotherapy tests', function() {

    var agent = request.agent(infra.app);

    it('Create physiotherapy', function(done) {
        loadPhysiotherapyCreateModel();
        const createModel = TestCache.PhysiotherapyCreateModel;
        agent
            .post(`/api/v1/assets/physiotherapy/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['PHYSIOTHERAPY_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('RecommendedDurationMin');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.PhysiotherapyCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.PhysiotherapyCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.PhysiotherapyCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.PhysiotherapyCreateModel.Description);
                expect(response.body.Data.RecommendedDurationMin).to.equal(TestCache.PhysiotherapyCreateModel.RecommendedDurationMin);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.PhysiotherapyCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.PhysiotherapyCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.PhysiotherapyCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.PhysiotherapyCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get physiotherapy by id', function(done) {
        const id = `${TestCache.PHYSIOTHERAPY_ID}`
        agent
            .get(`/api/v1/assets/physiotherapy/${TestCache.PHYSIOTHERAPY_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('RecommendedDurationMin');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.PhysiotherapyCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.PhysiotherapyCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.PhysiotherapyCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.PhysiotherapyCreateModel.Description);
                expect(response.body.Data.RecommendedDurationMin).to.equal(TestCache.PhysiotherapyCreateModel.RecommendedDurationMin);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.PhysiotherapyCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.PhysiotherapyCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.PhysiotherapyCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.PhysiotherapyCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search physiotherapy records', function(done) {
        loadPhysiotherapyQueryString();
        const queryString = TestCache.PhysiotherapyQueryString;
        agent
            .get(`/api/v1/assets/physiotherapy/search${queryString}`)
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

    it('Update physiotherapy', function(done) {
        loadPhysiotherapyUpdateModel();
        const updateModel = TestCache.PhysiotherapyUpdateModel;
        const id = `${TestCache.PHYSIOTHERAPY_ID}`
        agent
            .put(`/api/v1/assets/physiotherapy/${TestCache.PHYSIOTHERAPY_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('RecommendedDurationMin');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.PhysiotherapyCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.PhysiotherapyCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.PhysiotherapyCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.PhysiotherapyCreateModel.Description);
                expect(response.body.Data.RecommendedDurationMin).to.equal(TestCache.PhysiotherapyCreateModel.RecommendedDurationMin);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.PhysiotherapyCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.PhysiotherapyCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.PhysiotherapyCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.PhysiotherapyCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete physiotherapy', function(done) {
        const id = `${TestCache.PHYSIOTHERAPY_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/physiotherapy/${TestCache.PHYSIOTHERAPY_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/physiotherapy/${TestCache.PHYSIOTHERAPY_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.PhysiotherapyCreateModel;
        agent
            .post(`/api/v1/assets/physiotherapy/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['PHYSIOTHERAPY_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('RecommendedDurationMin');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.PhysiotherapyCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.PhysiotherapyCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.PhysiotherapyCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.PhysiotherapyCreateModel.Description);
                expect(response.body.Data.RecommendedDurationMin).to.equal(TestCache.PhysiotherapyCreateModel.RecommendedDurationMin);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.PhysiotherapyCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.PhysiotherapyCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.PhysiotherapyCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.PhysiotherapyCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadPhysiotherapyCreateModel() {
    const model = {
        AssetCode: "PHYSIOTHERAPY-CC-2",
        Name: "Joint Flexibility",
        Description: ".....",
        RecommendedDurationMin: 20,
        Version: "V1",

    };
    TestCache.PhysiotherapyCreateModel = model;
}

function loadPhysiotherapyUpdateModel() {
    const model = {
        AssetCode: "PHYSIOTHERAPY-CC-2",
        Name: "Joint Flexibility",
        Description: ".....",
        RecommendedDurationMin: 20,
        Tags: ['Flexibility', 'Muscle movement', 'Post trauma recovery'],
        Version: "V1",

    };
    TestCache.PhysiotherapyUpdateModel = model;
}

function loadPhysiotherapyQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&recommendedDurationMin=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////