const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Video tests', function() {

    var agent = request.agent(infra.app);

    it('Create video', function(done) {
        loadVideoCreateModel();
        const createModel = TestCache.VideoCreateModel;
        agent
            .post(`/api/v1/assets/video/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['VIDEO_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Transcript');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('FileResourceId');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.VideoCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.VideoCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.VideoCreateModel.Name);
                expect(response.body.Data.Transcript).to.equal(TestCache.VideoCreateModel.Transcript);
                expect(response.body.Data.Url).to.equal(TestCache.VideoCreateModel.Url);
                expect(response.body.Data.FileResourceId).to.equal(TestCache.VideoCreateModel.FileResourceId);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.VideoCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.VideoCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.VideoCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.VideoCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get video by id', function(done) {
        const id = `${TestCache.VIDEO_ID}`
        agent
            .get(`/api/v1/assets/video/${TestCache.VIDEO_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Transcript');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('FileResourceId');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.VideoCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.VideoCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.VideoCreateModel.Name);
                expect(response.body.Data.Transcript).to.equal(TestCache.VideoCreateModel.Transcript);
                expect(response.body.Data.Url).to.equal(TestCache.VideoCreateModel.Url);
                expect(response.body.Data.FileResourceId).to.equal(TestCache.VideoCreateModel.FileResourceId);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.VideoCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.VideoCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.VideoCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.VideoCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search video records', function(done) {
        loadVideoQueryString();
        const queryString = TestCache.VideoQueryString;
        agent
            .get(`/api/v1/assets/video/search${queryString}`)
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

    it('Update video', function(done) {
        loadVideoUpdateModel();
        const updateModel = TestCache.VideoUpdateModel;
        const id = `${TestCache.VIDEO_ID}`
        agent
            .put(`/api/v1/assets/video/${TestCache.VIDEO_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Transcript');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('FileResourceId');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.VideoCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.VideoCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.VideoCreateModel.Name);
                expect(response.body.Data.Transcript).to.equal(TestCache.VideoCreateModel.Transcript);
                expect(response.body.Data.Url).to.equal(TestCache.VideoCreateModel.Url);
                expect(response.body.Data.FileResourceId).to.equal(TestCache.VideoCreateModel.FileResourceId);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.VideoCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.VideoCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.VideoCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.VideoCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete video', function(done) {
        const id = `${TestCache.VIDEO_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/video/${TestCache.VIDEO_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/video/${TestCache.VIDEO_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.VideoCreateModel;
        agent
            .post(`/api/v1/assets/video/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['VIDEO_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Transcript');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('FileResourceId');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.VideoCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.VideoCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.VideoCreateModel.Name);
                expect(response.body.Data.Transcript).to.equal(TestCache.VideoCreateModel.Transcript);
                expect(response.body.Data.Url).to.equal(TestCache.VideoCreateModel.Url);
                expect(response.body.Data.FileResourceId).to.equal(TestCache.VideoCreateModel.FileResourceId);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.VideoCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.VideoCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.VideoCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.VideoCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadVideoCreateModel() {
    const model = {
        AssetCode: "VIDEO-AB-1",
        Name: "Know your condition!",
        Transcript: "Studies confirm that working out with a partner ...",
        Url: "http://watchlearnlive.heart.org/CVML_Player.php?moduleSelect=hrtflr",
        Version: "V1",

    };
    TestCache.VideoCreateModel = model;
}

function loadVideoUpdateModel() {
    const model = {
        AssetCode: "VIDEO-AB-1",
        Name: "Know your condition!",
        Transcript: "Studies confirm that working out with a partner ...",
        Url: "http://watchlearnlive.heart.org/CVML_Player.php?moduleSelect=hrtflr",
        Tags: ['Maternity', 'Neo-natal-care'],
        Version: "V1",

    };
    TestCache.VideoUpdateModel = model;
}

function loadVideoQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&transcript=xyz&url=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////