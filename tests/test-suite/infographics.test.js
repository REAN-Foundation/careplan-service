const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Infographics tests', function() {

    var agent = request.agent(infra.app);

    it('Create infographics', function(done) {
        loadInfographicsCreateModel();
        const createModel = TestCache.InfographicsCreateModel;
        agent
            .post(`/api/v1/assets/infographics/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['INFOGRAPHICS_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('FileResourceId');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.InfographicsCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.InfographicsCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.InfographicsCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.InfographicsCreateModel.Description);
                expect(response.body.Data.Url).to.equal(TestCache.InfographicsCreateModel.Url);
                expect(response.body.Data.FileResourceId).to.equal(TestCache.InfographicsCreateModel.FileResourceId);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.InfographicsCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.InfographicsCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.InfographicsCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.InfographicsCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get infographics by id', function(done) {
        const id = `${TestCache.INFOGRAPHICS_ID}`
        agent
            .get(`/api/v1/assets/infographics/${TestCache.INFOGRAPHICS_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('FileResourceId');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.InfographicsCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.InfographicsCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.InfographicsCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.InfographicsCreateModel.Description);
                expect(response.body.Data.Url).to.equal(TestCache.InfographicsCreateModel.Url);
                expect(response.body.Data.FileResourceId).to.equal(TestCache.InfographicsCreateModel.FileResourceId);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.InfographicsCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.InfographicsCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.InfographicsCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.InfographicsCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search infographics records', function(done) {
        loadInfographicsQueryString();
        const queryString = TestCache.InfographicsQueryString;
        agent
            .get(`/api/v1/assets/infographics/search${queryString}`)
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

    it('Update infographics', function(done) {
        loadInfographicsUpdateModel();
        const updateModel = TestCache.InfographicsUpdateModel;
        const id = `${TestCache.INFOGRAPHICS_ID}`
        agent
            .put(`/api/v1/assets/infographics/${TestCache.INFOGRAPHICS_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('FileResourceId');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.InfographicsCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.InfographicsCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.InfographicsCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.InfographicsCreateModel.Description);
                expect(response.body.Data.Url).to.equal(TestCache.InfographicsCreateModel.Url);
                expect(response.body.Data.FileResourceId).to.equal(TestCache.InfographicsCreateModel.FileResourceId);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.InfographicsCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.InfographicsCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.InfographicsCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.InfographicsCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete infographics', function(done) {
        const id = `${TestCache.INFOGRAPHICS_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/infographics/${TestCache.INFOGRAPHICS_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/infographics/${TestCache.INFOGRAPHICS_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.InfographicsCreateModel;
        agent
            .post(`/api/v1/assets/infographics/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['INFOGRAPHICS_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('FileResourceId');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.InfographicsCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.InfographicsCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.InfographicsCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.InfographicsCreateModel.Description);
                expect(response.body.Data.Url).to.equal(TestCache.InfographicsCreateModel.Url);
                expect(response.body.Data.FileResourceId).to.equal(TestCache.InfographicsCreateModel.FileResourceId);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.InfographicsCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.InfographicsCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.InfographicsCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.InfographicsCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadInfographicsCreateModel() {
    const model = {
        AssetCode: "INFOGRAPHICS-CC-1",
        Name: "Know your condition!",
        Description: "Studies confirm that working out with a partner ...",
        Url: "http://watchlearnlive.heart.org/CVML_Player.php?moduleSelect=hrtflr",
        Version: "V1",

    };
    TestCache.InfographicsCreateModel = model;
}

function loadInfographicsUpdateModel() {
    const model = {
        AssetCode: "INFOGRAPHICS-CC-1",
        Name: "Know your condition!",
        Description: "Studies confirm that working out with a partner ...",
        Url: "http://watchlearnlive.heart.org/CVML_Player.php?moduleSelect=hrtflr",
        Tags: ['Maternity', 'Neo-natal-care'],
        Version: "V1",

    };
    TestCache.InfographicsUpdateModel = model;
}

function loadInfographicsQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&url=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////