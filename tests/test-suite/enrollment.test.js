const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Enrollment tests', function() {

    var agent = request.agent(infra.app);

    it('Create enrollment', function(done) {
        loadEnrollmentCreateModel();
        const createModel = TestCache.EnrollmentCreateModel;
        agent
            .post(`/api/v1/enrollments/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['ENROLLMENT_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('UserId');
                expect(response.body.Data).to.have.property('StartDate');
                expect(response.body.Data).to.have.property('EndDate');
                expect(response.body.Data).to.have.property('EnrollmentDate');
                expect(response.body.Data).to.have.property('ProgressStatus');

                expect(response.body.Data.id).to.equal(TestCache.EnrollmentCreateModel.id);
                expect(response.body.Data.CareplanId).to.equal(TestCache.EnrollmentCreateModel.CareplanId);
                expect(response.body.Data.UserId).to.equal(TestCache.EnrollmentCreateModel.UserId);
                expect(response.body.Data.StartDate).to.equal(TestCache.EnrollmentCreateModel.StartDate);
                expect(response.body.Data.EndDate).to.equal(TestCache.EnrollmentCreateModel.EndDate);
                expect(response.body.Data.EnrollmentDate).to.equal(TestCache.EnrollmentCreateModel.EnrollmentDate);
                expect(response.body.Data.ProgressStatus).to.equal(TestCache.EnrollmentCreateModel.ProgressStatus);

            })
            .expect(201, done);
    });

    it('Get enrollment by id', function(done) {
        const id = `${TestCache.ENROLLMENT_ID}`
        agent
            .get(`/api/v1/enrollments/${TestCache.ENROLLMENT_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('UserId');
                expect(response.body.Data).to.have.property('StartDate');
                expect(response.body.Data).to.have.property('EndDate');
                expect(response.body.Data).to.have.property('EnrollmentDate');
                expect(response.body.Data).to.have.property('ProgressStatus');

                expect(response.body.Data.id).to.equal(TestCache.EnrollmentCreateModel.id);
                expect(response.body.Data.CareplanId).to.equal(TestCache.EnrollmentCreateModel.CareplanId);
                expect(response.body.Data.UserId).to.equal(TestCache.EnrollmentCreateModel.UserId);
                expect(response.body.Data.StartDate).to.equal(TestCache.EnrollmentCreateModel.StartDate);
                expect(response.body.Data.EndDate).to.equal(TestCache.EnrollmentCreateModel.EndDate);
                expect(response.body.Data.EnrollmentDate).to.equal(TestCache.EnrollmentCreateModel.EnrollmentDate);
                expect(response.body.Data.ProgressStatus).to.equal(TestCache.EnrollmentCreateModel.ProgressStatus);

            })
            .expect(200, done);
    });

    it('Search enrollment records', function(done) {
        loadEnrollmentQueryString();
        const queryString = TestCache.EnrollmentQueryString;
        agent
            .get(`/api/v1/enrollments/search${queryString}`)
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

    it('Update enrollment', function(done) {
        loadEnrollmentUpdateModel();
        const updateModel = TestCache.EnrollmentUpdateModel;
        const id = `${TestCache.ENROLLMENT_ID}`
        agent
            .put(`/api/v1/enrollments/${TestCache.ENROLLMENT_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('UserId');
                expect(response.body.Data).to.have.property('StartDate');
                expect(response.body.Data).to.have.property('EndDate');
                expect(response.body.Data).to.have.property('EnrollmentDate');
                expect(response.body.Data).to.have.property('ProgressStatus');

                expect(response.body.Data.id).to.equal(TestCache.EnrollmentCreateModel.id);
                expect(response.body.Data.CareplanId).to.equal(TestCache.EnrollmentCreateModel.CareplanId);
                expect(response.body.Data.UserId).to.equal(TestCache.EnrollmentCreateModel.UserId);
                expect(response.body.Data.StartDate).to.equal(TestCache.EnrollmentCreateModel.StartDate);
                expect(response.body.Data.EndDate).to.equal(TestCache.EnrollmentCreateModel.EndDate);
                expect(response.body.Data.EnrollmentDate).to.equal(TestCache.EnrollmentCreateModel.EnrollmentDate);
                expect(response.body.Data.ProgressStatus).to.equal(TestCache.EnrollmentCreateModel.ProgressStatus);

            })
            .expect(200, done);
    });

    it('Delete enrollment', function(done) {
        const id = `${TestCache.ENROLLMENT_ID}`

        //Delete
        agent
            .delete(`/api/v1/enrollments/${TestCache.ENROLLMENT_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/enrollments/${TestCache.ENROLLMENT_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.EnrollmentCreateModel;
        agent
            .post(`/api/v1/enrollments/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['ENROLLMENT_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('UserId');
                expect(response.body.Data).to.have.property('StartDate');
                expect(response.body.Data).to.have.property('EndDate');
                expect(response.body.Data).to.have.property('EnrollmentDate');
                expect(response.body.Data).to.have.property('ProgressStatus');

                expect(response.body.Data.id).to.equal(TestCache.EnrollmentCreateModel.id);
                expect(response.body.Data.CareplanId).to.equal(TestCache.EnrollmentCreateModel.CareplanId);
                expect(response.body.Data.UserId).to.equal(TestCache.EnrollmentCreateModel.UserId);
                expect(response.body.Data.StartDate).to.equal(TestCache.EnrollmentCreateModel.StartDate);
                expect(response.body.Data.EndDate).to.equal(TestCache.EnrollmentCreateModel.EndDate);
                expect(response.body.Data.EnrollmentDate).to.equal(TestCache.EnrollmentCreateModel.EnrollmentDate);
                expect(response.body.Data.ProgressStatus).to.equal(TestCache.EnrollmentCreateModel.ProgressStatus);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadEnrollmentCreateModel() {
    const model = {
        CareplanId: TestCache.CAREPLAN_ID,
        UserId: TestCache.USER_ID,

    };
    TestCache.EnrollmentCreateModel = model;
}

function loadEnrollmentUpdateModel() {
    const model = {
        CareplanId: TestCache.CAREPLAN_ID,
        UserId: TestCache.USER_ID,
        StartDate: "",
        EndDate: "",
        EnrollmentDate: "",

    };
    TestCache.EnrollmentUpdateModel = model;
}

function loadEnrollmentQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?careplanId=xyz&progressStatus=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////