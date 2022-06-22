const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Assessment tests', function() {

    var agent = request.agent(infra.app);

    it('Create assessment', function(done) {
        loadAssessmentCreateModel();
        const createModel = TestCache.AssessmentCreateModel;
        agent
            .post(`/api/v1/assets/assessments/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['ASSESSMENT_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('Template');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.AssessmentCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.AssessmentCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.AssessmentCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.AssessmentCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.AssessmentCreateModel.AssetCategory);
                expect(response.body.Data.Template).to.equal(TestCache.AssessmentCreateModel.Template);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.AssessmentCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.AssessmentCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.AssessmentCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get assessment by id', function(done) {
        const id = `${TestCache.ASSESSMENT_ID}`
        agent
            .get(`/api/v1/assets/assessments/${TestCache.ASSESSMENT_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('Template');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.AssessmentCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.AssessmentCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.AssessmentCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.AssessmentCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.AssessmentCreateModel.AssetCategory);
                expect(response.body.Data.Template).to.equal(TestCache.AssessmentCreateModel.Template);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.AssessmentCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.AssessmentCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.AssessmentCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search assessment records', function(done) {
        loadAssessmentQueryString();
        const queryString = TestCache.AssessmentQueryString;
        agent
            .get(`/api/v1/assets/assessments/search${queryString}`)
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

    it('Update assessment', function(done) {
        loadAssessmentUpdateModel();
        const updateModel = TestCache.AssessmentUpdateModel;
        const id = `${TestCache.ASSESSMENT_ID}`
        agent
            .put(`/api/v1/assets/assessments/${TestCache.ASSESSMENT_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('Template');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.AssessmentCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.AssessmentCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.AssessmentCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.AssessmentCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.AssessmentCreateModel.AssetCategory);
                expect(response.body.Data.Template).to.equal(TestCache.AssessmentCreateModel.Template);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.AssessmentCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.AssessmentCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.AssessmentCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete assessment', function(done) {
        const id = `${TestCache.ASSESSMENT_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/assessments/${TestCache.ASSESSMENT_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/assessments/${TestCache.ASSESSMENT_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.AssessmentCreateModel;
        agent
            .post(`/api/v1/assets/assessments/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['ASSESSMENT_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('Template');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.AssessmentCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.AssessmentCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.AssessmentCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.AssessmentCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.AssessmentCreateModel.AssetCategory);
                expect(response.body.Data.Template).to.equal(TestCache.AssessmentCreateModel.Template);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.AssessmentCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.AssessmentCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.AssessmentCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadAssessmentCreateModel() {
    const model = {
        AssetCode: "ASSESSMENT-HF-12",
        Name: "Nutrition",
        Description: ".....",
        Template: "{}",
        Version: "V1",

    };
    TestCache.AssessmentCreateModel = model;
}

function loadAssessmentUpdateModel() {
    const model = {
        AssetCode: "ASSESSMENT-HF-12",
        Name: "Nutrition",
        Description: ".....",
        Template: "{}",
        Tags: ['Maternity', 'Neo-natal-care'],
        Version: "V1",

    };
    TestCache.AssessmentUpdateModel = model;
}

function loadAssessmentQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&assetCategory=xyz&template=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////