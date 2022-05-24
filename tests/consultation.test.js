const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Consultation tests', function() {

    var agent = request.agent(infra.app);

    it('Create consultation', function(done) {
        loadConsultationCreateModel();
        const createModel = TestCache.ConsultationCreateModel;
        agent
            .post(`/api/v1/assets/consultations/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['CONSULTATION_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('ConsultationType');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.ConsultationCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ConsultationCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ConsultationCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ConsultationCreateModel.Description);
                expect(response.body.Data.ConsultationType).to.equal(TestCache.ConsultationCreateModel.ConsultationType);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ConsultationCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ConsultationCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ConsultationCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ConsultationCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get consultation by id', function(done) {
        const id = `${TestCache.CONSULTATION_ID}`
        agent
            .get(`/api/v1/assets/consultations/${TestCache.CONSULTATION_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('ConsultationType');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.ConsultationCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ConsultationCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ConsultationCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ConsultationCreateModel.Description);
                expect(response.body.Data.ConsultationType).to.equal(TestCache.ConsultationCreateModel.ConsultationType);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ConsultationCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ConsultationCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ConsultationCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ConsultationCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search consultation records', function(done) {
        loadConsultationQueryString();
        const queryString = TestCache.ConsultationQueryString;
        agent
            .get(`/api/v1/assets/consultations/search${queryString}`)
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

    it('Update consultation', function(done) {
        loadConsultationUpdateModel();
        const updateModel = TestCache.ConsultationUpdateModel;
        const id = `${TestCache.CONSULTATION_ID}`
        agent
            .put(`/api/v1/assets/consultations/${TestCache.CONSULTATION_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('ConsultationType');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.ConsultationCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ConsultationCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ConsultationCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ConsultationCreateModel.Description);
                expect(response.body.Data.ConsultationType).to.equal(TestCache.ConsultationCreateModel.ConsultationType);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ConsultationCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ConsultationCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ConsultationCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ConsultationCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete consultation', function(done) {
        const id = `${TestCache.CONSULTATION_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/consultations/${TestCache.CONSULTATION_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/consultations/${TestCache.CONSULTATION_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.ConsultationCreateModel;
        agent
            .post(`/api/v1/assets/consultations/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['CONSULTATION_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('ConsultationType');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.ConsultationCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ConsultationCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ConsultationCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ConsultationCreateModel.Description);
                expect(response.body.Data.ConsultationType).to.equal(TestCache.ConsultationCreateModel.ConsultationType);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ConsultationCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ConsultationCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ConsultationCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ConsultationCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadConsultationCreateModel() {
    const model = {
        AssetCode: "CONSULTATION-CC-2",
        Name: "Nutrition",
        Description: ".....",
        ConsultationType: "Tele-consultation",
        Version: "V1",

    };
    TestCache.ConsultationCreateModel = model;
}

function loadConsultationUpdateModel() {
    const model = {
        AssetCode: "CONSULTATION-CC-2",
        Name: "Nutrition",
        Description: ".....",
        ConsultationType: "Tele-consultation",
        Tags: ['Maternity', 'Neo-natal-care'],
        Version: "V1",

    };
    TestCache.ConsultationUpdateModel = model;
}

function loadConsultationQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&consultationType=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////