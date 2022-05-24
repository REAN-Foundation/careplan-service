const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Message tests', function() {

    var agent = request.agent(infra.app);

    it('Create message', function(done) {
        loadMessageCreateModel();
        const createModel = TestCache.MessageCreateModel;
        agent
            .post(`/api/v1/assets/messages/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['MESSAGE_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('Category');
                expect(response.body.Data).to.have.property('MessageType');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.MessageCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.MessageCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.MessageCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.MessageCreateModel.Description);
                expect(response.body.Data.Category).to.equal(TestCache.MessageCreateModel.Category);
                expect(response.body.Data.MessageType).to.equal(TestCache.MessageCreateModel.MessageType);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.MessageCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.MessageCreateModel.Tags);
                expect(response.body.Data.Url).to.equal(TestCache.MessageCreateModel.Url);
                expect(response.body.Data.Version).to.equal(TestCache.MessageCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get message by id', function(done) {
        const id = `${TestCache.MESSAGE_ID}`
        agent
            .get(`/api/v1/assets/messages/${TestCache.MESSAGE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('Category');
                expect(response.body.Data).to.have.property('MessageType');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.MessageCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.MessageCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.MessageCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.MessageCreateModel.Description);
                expect(response.body.Data.Category).to.equal(TestCache.MessageCreateModel.Category);
                expect(response.body.Data.MessageType).to.equal(TestCache.MessageCreateModel.MessageType);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.MessageCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.MessageCreateModel.Tags);
                expect(response.body.Data.Url).to.equal(TestCache.MessageCreateModel.Url);
                expect(response.body.Data.Version).to.equal(TestCache.MessageCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search message records', function(done) {
        loadMessageQueryString();
        const queryString = TestCache.MessageQueryString;
        agent
            .get(`/api/v1/assets/messages/search${queryString}`)
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

    it('Update message', function(done) {
        loadMessageUpdateModel();
        const updateModel = TestCache.MessageUpdateModel;
        const id = `${TestCache.MESSAGE_ID}`
        agent
            .put(`/api/v1/assets/messages/${TestCache.MESSAGE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('Category');
                expect(response.body.Data).to.have.property('MessageType');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.MessageCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.MessageCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.MessageCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.MessageCreateModel.Description);
                expect(response.body.Data.Category).to.equal(TestCache.MessageCreateModel.Category);
                expect(response.body.Data.MessageType).to.equal(TestCache.MessageCreateModel.MessageType);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.MessageCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.MessageCreateModel.Tags);
                expect(response.body.Data.Url).to.equal(TestCache.MessageCreateModel.Url);
                expect(response.body.Data.Version).to.equal(TestCache.MessageCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete message', function(done) {
        const id = `${TestCache.MESSAGE_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/messages/${TestCache.MESSAGE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/messages/${TestCache.MESSAGE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.MessageCreateModel;
        agent
            .post(`/api/v1/assets/messages/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['MESSAGE_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('Category');
                expect(response.body.Data).to.have.property('MessageType');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.MessageCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.MessageCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.MessageCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.MessageCreateModel.Description);
                expect(response.body.Data.Category).to.equal(TestCache.MessageCreateModel.Category);
                expect(response.body.Data.MessageType).to.equal(TestCache.MessageCreateModel.MessageType);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.MessageCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.MessageCreateModel.Tags);
                expect(response.body.Data.Url).to.equal(TestCache.MessageCreateModel.Url);
                expect(response.body.Data.Version).to.equal(TestCache.MessageCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadMessageCreateModel() {
    const model = {
        AssetCode: "MESSAGE-CC-1",
        Name: "Scheduling at the start of the day makes execution simpler!",
        Description: "1) Write out your plan every day. 2) Plan at the same time every day. 3) Brainstorm a quick to-do list. 4) Divide your task list between Work and Life. ...",
        MessageType: "Educational",
        Version: "V1",

    };
    TestCache.MessageCreateModel = model;
}

function loadMessageUpdateModel() {
    const model = {
        AssetCode: "MESSAGE-CC-1",
        Name: "Scheduling at the start of the day makes execution simpler!",
        Description: "1) Write out your plan every day. 2) Plan at the same time every day. 3) Brainstorm a quick to-do list. 4) Divide your task list between Work and Life. ...",
        MessageType: "Educational",
        Tags: ['Maternity', 'Neo-natal-care'],
        Url: "https://www.appname.com/",
        Version: "V1",

    };
    TestCache.MessageUpdateModel = model;
}

function loadMessageQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&category=xyz&messageType=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////