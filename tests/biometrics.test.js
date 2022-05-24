const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Biometrics tests', function() {

    var agent = request.agent(infra.app);

    it('Create biometrics', function(done) {
        loadBiometricsCreateModel();
        const createModel = TestCache.BiometricsCreateModel;
        agent
            .post(`/api/v1/assets/biometrics/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['BIOMETRICS_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('BiometricsType');
                expect(response.body.Data).to.have.property('MeasurementUnit');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.BiometricsCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.BiometricsCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.BiometricsCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.BiometricsCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.BiometricsCreateModel.AssetCategory);
                expect(response.body.Data.BiometricsType).to.equal(TestCache.BiometricsCreateModel.BiometricsType);
                expect(response.body.Data.MeasurementUnit).to.equal(TestCache.BiometricsCreateModel.MeasurementUnit);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.BiometricsCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.BiometricsCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.BiometricsCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get biometrics by id', function(done) {
        const id = `${TestCache.BIOMETRICS_ID}`
        agent
            .get(`/api/v1/assets/biometrics/${TestCache.BIOMETRICS_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('BiometricsType');
                expect(response.body.Data).to.have.property('MeasurementUnit');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.BiometricsCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.BiometricsCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.BiometricsCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.BiometricsCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.BiometricsCreateModel.AssetCategory);
                expect(response.body.Data.BiometricsType).to.equal(TestCache.BiometricsCreateModel.BiometricsType);
                expect(response.body.Data.MeasurementUnit).to.equal(TestCache.BiometricsCreateModel.MeasurementUnit);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.BiometricsCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.BiometricsCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.BiometricsCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search biometrics records', function(done) {
        loadBiometricsQueryString();
        const queryString = TestCache.BiometricsQueryString;
        agent
            .get(`/api/v1/assets/biometrics/search${queryString}`)
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

    it('Update biometrics', function(done) {
        loadBiometricsUpdateModel();
        const updateModel = TestCache.BiometricsUpdateModel;
        const id = `${TestCache.BIOMETRICS_ID}`
        agent
            .put(`/api/v1/assets/biometrics/${TestCache.BIOMETRICS_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('BiometricsType');
                expect(response.body.Data).to.have.property('MeasurementUnit');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.BiometricsCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.BiometricsCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.BiometricsCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.BiometricsCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.BiometricsCreateModel.AssetCategory);
                expect(response.body.Data.BiometricsType).to.equal(TestCache.BiometricsCreateModel.BiometricsType);
                expect(response.body.Data.MeasurementUnit).to.equal(TestCache.BiometricsCreateModel.MeasurementUnit);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.BiometricsCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.BiometricsCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.BiometricsCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete biometrics', function(done) {
        const id = `${TestCache.BIOMETRICS_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/biometrics/${TestCache.BIOMETRICS_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/biometrics/${TestCache.BIOMETRICS_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.BiometricsCreateModel;
        agent
            .post(`/api/v1/assets/biometrics/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['BIOMETRICS_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('BiometricsType');
                expect(response.body.Data).to.have.property('MeasurementUnit');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.BiometricsCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.BiometricsCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.BiometricsCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.BiometricsCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.BiometricsCreateModel.AssetCategory);
                expect(response.body.Data.BiometricsType).to.equal(TestCache.BiometricsCreateModel.BiometricsType);
                expect(response.body.Data.MeasurementUnit).to.equal(TestCache.BiometricsCreateModel.MeasurementUnit);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.BiometricsCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.BiometricsCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.BiometricsCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadBiometricsCreateModel() {
    const model = {
        AssetCode: "BIOMETRICS-HF-12",
        Name: "Nutrition",
        Description: ".....",
        BiometricsType: "Blood pressure",
        MeasurementUnit: "mmHg",
        Version: "V1",

    };
    TestCache.BiometricsCreateModel = model;
}

function loadBiometricsUpdateModel() {
    const model = {
        AssetCode: "BIOMETRICS-HF-12",
        Name: "Nutrition",
        Description: ".....",
        BiometricsType: "Blood pressure",
        MeasurementUnit: "mmHg",
        Tags: ['Maternity', 'Neo-natal-care'],
        Version: "V1",

    };
    TestCache.BiometricsUpdateModel = model;
}

function loadBiometricsQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&assetCategory=xyz&biometricsType=xyz&measurementUnit=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////