const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Careplan activity tests', function() {

    var agent = request.agent(infra.app);

    it('Create careplan activity', function(done) {
        loadCareplanActivityCreateModel();
        const createModel = TestCache.CareplanActivityCreateModel;
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

                expect(response.body.Data.id).to.equal(TestCache.CareplanActivityCreateModel.id);
                expect(response.body.Data.AssetId).to.equal(TestCache.CareplanActivityCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.CareplanActivityCreateModel.AssetType);
                expect(response.body.Data.CareplanId).to.equal(TestCache.CareplanActivityCreateModel.CareplanId);
                expect(response.body.Data.Day).to.equal(TestCache.CareplanActivityCreateModel.Day);
                expect(response.body.Data.TimeSlot).to.equal(TestCache.CareplanActivityCreateModel.TimeSlot);

            })
            .expect(201, done);
    });

    it('Get careplan activity by id', function(done) {
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

                expect(response.body.Data.id).to.equal(TestCache.CareplanActivityCreateModel.id);
                expect(response.body.Data.AssetId).to.equal(TestCache.CareplanActivityCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.CareplanActivityCreateModel.AssetType);
                expect(response.body.Data.CareplanId).to.equal(TestCache.CareplanActivityCreateModel.CareplanId);
                expect(response.body.Data.Day).to.equal(TestCache.CareplanActivityCreateModel.Day);
                expect(response.body.Data.TimeSlot).to.equal(TestCache.CareplanActivityCreateModel.TimeSlot);

            })
            .expect(200, done);
    });

    it('Search careplan activity records', function(done) {
        loadCareplanActivityQueryString();
        const queryString = TestCache.CareplanActivityQueryString;
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

    it('Update careplan activity', function(done) {
        loadCareplanActivityUpdateModel();
        const updateModel = TestCache.CareplanActivityUpdateModel;
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

                expect(response.body.Data.id).to.equal(TestCache.CareplanActivityCreateModel.id);
                expect(response.body.Data.AssetId).to.equal(TestCache.CareplanActivityCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.CareplanActivityCreateModel.AssetType);
                expect(response.body.Data.CareplanId).to.equal(TestCache.CareplanActivityCreateModel.CareplanId);
                expect(response.body.Data.Day).to.equal(TestCache.CareplanActivityCreateModel.Day);
                expect(response.body.Data.TimeSlot).to.equal(TestCache.CareplanActivityCreateModel.TimeSlot);

            })
            .expect(200, done);
    });

    it('Delete careplan activity', function(done) {
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
        const createModel = TestCache.CareplanActivityCreateModel;
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

                expect(response.body.Data.id).to.equal(TestCache.CareplanActivityCreateModel.id);
                expect(response.body.Data.AssetId).to.equal(TestCache.CareplanActivityCreateModel.AssetId);
                expect(response.body.Data.AssetType).to.equal(TestCache.CareplanActivityCreateModel.AssetType);
                expect(response.body.Data.CareplanId).to.equal(TestCache.CareplanActivityCreateModel.CareplanId);
                expect(response.body.Data.Day).to.equal(TestCache.CareplanActivityCreateModel.Day);
                expect(response.body.Data.TimeSlot).to.equal(TestCache.CareplanActivityCreateModel.TimeSlot);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadCareplanActivityCreateModel() {
    const model = {
        AssetId: TestCache.ASSET_ID,
        AssetType: "Message",
        CareplanId: TestCache.CAREPLAN_ID,
        Day: 15,
        TimeSlot: "Morning",

    };
    TestCache.CareplanActivityCreateModel = model;
}

function loadCareplanActivityUpdateModel() {
    const model = {
        AssetId: TestCache.ASSET_ID,
        AssetType: "Message",
        CareplanId: TestCache.CAREPLAN_ID,
        Day: 15,
        TimeSlot: "Morning",

    };
    TestCache.CareplanActivityUpdateModel = model;
}

function loadCareplanActivityQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetId=xyz&assetType=xyz&careplanId=xyz&day=xyz&timeSlot=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////