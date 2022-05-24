const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Medication tests', function() {

    var agent = request.agent(infra.app);

    it('Create medication', function(done) {
        loadMedicationCreateModel();
        const createModel = TestCache.MedicationCreateModel;
        agent
            .post(`/api/v1/assets/medications/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['MEDICATION_ID'] = response.body.Data.id;
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

                expect(response.body.Data.id).to.equal(TestCache.MedicationCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.MedicationCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.MedicationCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.MedicationCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.MedicationCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.MedicationCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.MedicationCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.MedicationCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get medication by id', function(done) {
        const id = `${TestCache.MEDICATION_ID}`
        agent
            .get(`/api/v1/assets/medications/${TestCache.MEDICATION_ID}`)
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

                expect(response.body.Data.id).to.equal(TestCache.MedicationCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.MedicationCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.MedicationCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.MedicationCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.MedicationCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.MedicationCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.MedicationCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.MedicationCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search medication records', function(done) {
        loadMedicationQueryString();
        const queryString = TestCache.MedicationQueryString;
        agent
            .get(`/api/v1/assets/medications/search${queryString}`)
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

    it('Update medication', function(done) {
        loadMedicationUpdateModel();
        const updateModel = TestCache.MedicationUpdateModel;
        const id = `${TestCache.MEDICATION_ID}`
        agent
            .put(`/api/v1/assets/medications/${TestCache.MEDICATION_ID}`)
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

                expect(response.body.Data.id).to.equal(TestCache.MedicationCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.MedicationCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.MedicationCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.MedicationCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.MedicationCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.MedicationCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.MedicationCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.MedicationCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete medication', function(done) {
        const id = `${TestCache.MEDICATION_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/medications/${TestCache.MEDICATION_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/medications/${TestCache.MEDICATION_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.MedicationCreateModel;
        agent
            .post(`/api/v1/assets/medications/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['MEDICATION_ID'] = response.body.Data.id;
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

                expect(response.body.Data.id).to.equal(TestCache.MedicationCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.MedicationCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.MedicationCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.MedicationCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.MedicationCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.MedicationCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.MedicationCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.MedicationCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadMedicationCreateModel() {
    const model = {
        AssetCode: "MEDICATION-CC-2",
        Name: "Take your medication",
        Description: ".....",
        Version: "V1",

    };
    TestCache.MedicationCreateModel = model;
}

function loadMedicationUpdateModel() {
    const model = {
        AssetCode: "MEDICATION-CC-2",
        Name: "Take your medication",
        Description: ".....",
        Tags: ['Medication adherence'],
        Version: "V1",

    };
    TestCache.MedicationUpdateModel = model;
}

function loadMedicationQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////