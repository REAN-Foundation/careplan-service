const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('User activity response tests', function() {

    var agent = request.agent(infra.app);

    it('Create user activity response', function(done) {
        loadUserActivityResponseCreateModel();
        const createModel = TestCache.UserActivityResponseCreateModel;
        agent
            .post(`/api/v1/user-activity-responses/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['USER_ACTIVITY_RESPONSE_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('UserId');
                expect(response.body.Data).to.have.property('EnrollmentScheduleId');
                expect(response.body.Data).to.have.property('CareplanScheduleId');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('AssetId');
                expect(response.body.Data).to.have.property('AssetType');
                expect(response.body.Data).to.have.property('Response');
                expect(response.body.Data).to.have.property('TimeResponded');
                expect(response.body.Data).to.have.property('ProgressStatus');

                expect(response.body.Data.id).to.equal(TestCache.UserActivityResponseCreateModel.id);
                expect(response.body.Data.UserId).to.equal(TestCache.UserActivityResponseCreateModel.UserId);
                expect(response.body.Data.EnrollmentScheduleId).to.equal(TestCache.UserActivityResponseCreateModel.EnrollmentScheduleId);
                expect(response.body.Data.CareplanScheduleId).to.equal(TestCache.UserActivityResponseCreateModel.CareplanScheduleId);
                expect(response.body.Data.CareplanId).to.equal(TestCache.UserActivityResponseCreateModel.CareplanId);
                expect(response.body.Data.AssetId).to.equal(TestCache.UserActivityResponseCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.UserActivityResponseCreateModel.AssetType);
                expect(response.body.Data.Response).to.equal(TestCache.UserActivityResponseCreateModel.Response);
                expect(response.body.Data.TimeResponded).to.equal(TestCache.UserActivityResponseCreateModel.TimeResponded);
                expect(response.body.Data.ProgressStatus).to.equal(TestCache.UserActivityResponseCreateModel.ProgressStatus);

            })
            .expect(201, done);
    });

    it('Get user activity response by id', function(done) {
        const id = `${TestCache.USER_ACTIVITY_RESPONSE_ID}`
        agent
            .get(`/api/v1/user-activity-responses/${TestCache.USER_ACTIVITY_RESPONSE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('UserId');
                expect(response.body.Data).to.have.property('EnrollmentScheduleId');
                expect(response.body.Data).to.have.property('CareplanScheduleId');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('AssetId');
                expect(response.body.Data).to.have.property('AssetType');
                expect(response.body.Data).to.have.property('Response');
                expect(response.body.Data).to.have.property('TimeResponded');
                expect(response.body.Data).to.have.property('ProgressStatus');

                expect(response.body.Data.id).to.equal(TestCache.UserActivityResponseCreateModel.id);
                expect(response.body.Data.UserId).to.equal(TestCache.UserActivityResponseCreateModel.UserId);
                expect(response.body.Data.EnrollmentScheduleId).to.equal(TestCache.UserActivityResponseCreateModel.EnrollmentScheduleId);
                expect(response.body.Data.CareplanScheduleId).to.equal(TestCache.UserActivityResponseCreateModel.CareplanScheduleId);
                expect(response.body.Data.CareplanId).to.equal(TestCache.UserActivityResponseCreateModel.CareplanId);
                expect(response.body.Data.AssetId).to.equal(TestCache.UserActivityResponseCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.UserActivityResponseCreateModel.AssetType);
                expect(response.body.Data.Response).to.equal(TestCache.UserActivityResponseCreateModel.Response);
                expect(response.body.Data.TimeResponded).to.equal(TestCache.UserActivityResponseCreateModel.TimeResponded);
                expect(response.body.Data.ProgressStatus).to.equal(TestCache.UserActivityResponseCreateModel.ProgressStatus);

            })
            .expect(200, done);
    });

    it('Search user activity response records', function(done) {
        loadUserActivityResponseQueryString();
        const queryString = TestCache.UserActivityResponseQueryString;
        agent
            .get(`/api/v1/user-activity-responses/search${queryString}`)
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

    it('Update user activity response', function(done) {
        loadUserActivityResponseUpdateModel();
        const updateModel = TestCache.UserActivityResponseUpdateModel;
        const id = `${TestCache.USER_ACTIVITY_RESPONSE_ID}`
        agent
            .put(`/api/v1/user-activity-responses/${TestCache.USER_ACTIVITY_RESPONSE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('UserId');
                expect(response.body.Data).to.have.property('EnrollmentScheduleId');
                expect(response.body.Data).to.have.property('CareplanScheduleId');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('AssetId');
                expect(response.body.Data).to.have.property('AssetType');
                expect(response.body.Data).to.have.property('Response');
                expect(response.body.Data).to.have.property('TimeResponded');
                expect(response.body.Data).to.have.property('ProgressStatus');

                expect(response.body.Data.id).to.equal(TestCache.UserActivityResponseCreateModel.id);
                expect(response.body.Data.UserId).to.equal(TestCache.UserActivityResponseCreateModel.UserId);
                expect(response.body.Data.EnrollmentScheduleId).to.equal(TestCache.UserActivityResponseCreateModel.EnrollmentScheduleId);
                expect(response.body.Data.CareplanScheduleId).to.equal(TestCache.UserActivityResponseCreateModel.CareplanScheduleId);
                expect(response.body.Data.CareplanId).to.equal(TestCache.UserActivityResponseCreateModel.CareplanId);
                expect(response.body.Data.AssetId).to.equal(TestCache.UserActivityResponseCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.UserActivityResponseCreateModel.AssetType);
                expect(response.body.Data.Response).to.equal(TestCache.UserActivityResponseCreateModel.Response);
                expect(response.body.Data.TimeResponded).to.equal(TestCache.UserActivityResponseCreateModel.TimeResponded);
                expect(response.body.Data.ProgressStatus).to.equal(TestCache.UserActivityResponseCreateModel.ProgressStatus);

            })
            .expect(200, done);
    });

    it('Delete user activity response', function(done) {
        const id = `${TestCache.USER_ACTIVITY_RESPONSE_ID}`

        //Delete
        agent
            .delete(`/api/v1/user-activity-responses/${TestCache.USER_ACTIVITY_RESPONSE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/user-activity-responses/${TestCache.USER_ACTIVITY_RESPONSE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.UserActivityResponseCreateModel;
        agent
            .post(`/api/v1/user-activity-responses/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['USER_ACTIVITY_RESPONSE_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('UserId');
                expect(response.body.Data).to.have.property('EnrollmentScheduleId');
                expect(response.body.Data).to.have.property('CareplanScheduleId');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('AssetId');
                expect(response.body.Data).to.have.property('AssetType');
                expect(response.body.Data).to.have.property('Response');
                expect(response.body.Data).to.have.property('TimeResponded');
                expect(response.body.Data).to.have.property('ProgressStatus');

                expect(response.body.Data.id).to.equal(TestCache.UserActivityResponseCreateModel.id);
                expect(response.body.Data.UserId).to.equal(TestCache.UserActivityResponseCreateModel.UserId);
                expect(response.body.Data.EnrollmentScheduleId).to.equal(TestCache.UserActivityResponseCreateModel.EnrollmentScheduleId);
                expect(response.body.Data.CareplanScheduleId).to.equal(TestCache.UserActivityResponseCreateModel.CareplanScheduleId);
                expect(response.body.Data.CareplanId).to.equal(TestCache.UserActivityResponseCreateModel.CareplanId);
                expect(response.body.Data.AssetId).to.equal(TestCache.UserActivityResponseCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.UserActivityResponseCreateModel.AssetType);
                expect(response.body.Data.Response).to.equal(TestCache.UserActivityResponseCreateModel.Response);
                expect(response.body.Data.TimeResponded).to.equal(TestCache.UserActivityResponseCreateModel.TimeResponded);
                expect(response.body.Data.ProgressStatus).to.equal(TestCache.UserActivityResponseCreateModel.ProgressStatus);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadUserActivityResponseCreateModel() {
    const model = {
        UserId: TestCache.USER_ID,
        EnrollmentScheduleId: TestCache.ENROLLMENT_SCHEDULE_ID,
        Response: "{}",

    };
    TestCache.UserActivityResponseCreateModel = model;
}

function loadUserActivityResponseUpdateModel() {
    const model = {
        UserId: TestCache.USER_ID,
        EnrollmentScheduleId: TestCache.ENROLLMENT_SCHEDULE_ID,
        Response: "{}",

    };
    TestCache.UserActivityResponseUpdateModel = model;
}

function loadUserActivityResponseQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?careplanId=xyz&assetId=xyz&assetType=xyz&response=xyz&timeResponded=xyz&progressStatus=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////