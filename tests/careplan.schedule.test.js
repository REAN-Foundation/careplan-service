const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Careplan schedule tests', function() {

    var agent = request.agent(infra.app);

    it('Create careplan schedule', function(done) {
        loadCareplanScheduleCreateModel();
        const createModel = TestCache.CareplanScheduleCreateModel;
        agent
            .post(`/api/v1/careplan-schedules/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['CAREPLAN_SCHEDULE_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetId');
                expect(response.body.Data).to.have.property('AssetType');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('Day');
                expect(response.body.Data).to.have.property('TimeSlot');

                expect(response.body.Data.id).to.equal(TestCache.CareplanScheduleCreateModel.id);
                expect(response.body.Data.AssetId).to.equal(TestCache.CareplanScheduleCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.CareplanScheduleCreateModel.AssetType);
                expect(response.body.Data.CareplanId).to.equal(TestCache.CareplanScheduleCreateModel.CareplanId);
                expect(response.body.Data.Day).to.equal(TestCache.CareplanScheduleCreateModel.Day);
                expect(response.body.Data.TimeSlot).to.equal(TestCache.CareplanScheduleCreateModel.TimeSlot);

            })
            .expect(201, done);
    });

    it('Get careplan schedule by id', function(done) {
        const id = `${TestCache.CAREPLAN_SCHEDULE_ID}`
        agent
            .get(`/api/v1/careplan-schedules/${TestCache.CAREPLAN_SCHEDULE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetId');
                expect(response.body.Data).to.have.property('AssetType');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('Day');
                expect(response.body.Data).to.have.property('TimeSlot');

                expect(response.body.Data.id).to.equal(TestCache.CareplanScheduleCreateModel.id);
                expect(response.body.Data.AssetId).to.equal(TestCache.CareplanScheduleCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.CareplanScheduleCreateModel.AssetType);
                expect(response.body.Data.CareplanId).to.equal(TestCache.CareplanScheduleCreateModel.CareplanId);
                expect(response.body.Data.Day).to.equal(TestCache.CareplanScheduleCreateModel.Day);
                expect(response.body.Data.TimeSlot).to.equal(TestCache.CareplanScheduleCreateModel.TimeSlot);

            })
            .expect(200, done);
    });

    it('Search careplan schedule records', function(done) {
        loadCareplanScheduleQueryString();
        const queryString = TestCache.CareplanScheduleQueryString;
        agent
            .get(`/api/v1/careplan-schedules/search${queryString}`)
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

    it('Update careplan schedule', function(done) {
        loadCareplanScheduleUpdateModel();
        const updateModel = TestCache.CareplanScheduleUpdateModel;
        const id = `${TestCache.CAREPLAN_SCHEDULE_ID}`
        agent
            .put(`/api/v1/careplan-schedules/${TestCache.CAREPLAN_SCHEDULE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetId');
                expect(response.body.Data).to.have.property('AssetType');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('Day');
                expect(response.body.Data).to.have.property('TimeSlot');

                expect(response.body.Data.id).to.equal(TestCache.CareplanScheduleCreateModel.id);
                expect(response.body.Data.AssetId).to.equal(TestCache.CareplanScheduleCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.CareplanScheduleCreateModel.AssetType);
                expect(response.body.Data.CareplanId).to.equal(TestCache.CareplanScheduleCreateModel.CareplanId);
                expect(response.body.Data.Day).to.equal(TestCache.CareplanScheduleCreateModel.Day);
                expect(response.body.Data.TimeSlot).to.equal(TestCache.CareplanScheduleCreateModel.TimeSlot);

            })
            .expect(200, done);
    });

    it('Delete careplan schedule', function(done) {
        const id = `${TestCache.CAREPLAN_SCHEDULE_ID}`

        //Delete
        agent
            .delete(`/api/v1/careplan-schedules/${TestCache.CAREPLAN_SCHEDULE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/careplan-schedules/${TestCache.CAREPLAN_SCHEDULE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.CareplanScheduleCreateModel;
        agent
            .post(`/api/v1/careplan-schedules/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['CAREPLAN_SCHEDULE_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetId');
                expect(response.body.Data).to.have.property('AssetType');
                expect(response.body.Data).to.have.property('CareplanId');
                expect(response.body.Data).to.have.property('Day');
                expect(response.body.Data).to.have.property('TimeSlot');

                expect(response.body.Data.id).to.equal(TestCache.CareplanScheduleCreateModel.id);
                expect(response.body.Data.AssetId).to.equal(TestCache.CareplanScheduleCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.CareplanScheduleCreateModel.AssetType);
                expect(response.body.Data.CareplanId).to.equal(TestCache.CareplanScheduleCreateModel.CareplanId);
                expect(response.body.Data.Day).to.equal(TestCache.CareplanScheduleCreateModel.Day);
                expect(response.body.Data.TimeSlot).to.equal(TestCache.CareplanScheduleCreateModel.TimeSlot);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadCareplanScheduleCreateModel() {
    const model = {
        AssetId: TestCache.ASSET_ID,
        AssetType: "Message",
        CareplanId: TestCache.CAREPLAN_ID,
        Day: 15,
        TimeSlot: "Morning",

    };
    TestCache.CareplanScheduleCreateModel = model;
}

function loadCareplanScheduleUpdateModel() {
    const model = {
        AssetId: TestCache.ASSET_ID,
        AssetType: "Message",
        CareplanId: TestCache.CAREPLAN_ID,
        Day: 15,
        TimeSlot: "Morning",

    };
    TestCache.CareplanScheduleUpdateModel = model;
}

function loadCareplanScheduleQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetId=xyz&assetType=xyz&careplanId=xyz&day=xyz&timeSlot=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////