const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Meditation tests', function() {

    var agent = request.agent(infra.app);

    it('Create meditation', function(done) {
        loadMeditationCreateModel();
        const createModel = TestCache.MeditationCreateModel;
        agent
            .post(`/api/v1/assets/meditations/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['MEDITATION_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('MeditationType');
                expect(response.body.Data).to.have.property('RecommendedDurationMin');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.MeditationCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.MeditationCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.MeditationCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.MeditationCreateModel.Description);
                expect(response.body.Data.MeditationType).to.equal(TestCache.MeditationCreateModel.MeditationType);
                expect(response.body.Data.RecommendedDurationMin).to.equal(TestCache.MeditationCreateModel.RecommendedDurationMin);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.MeditationCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.MeditationCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.MeditationCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.MeditationCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get meditation by id', function(done) {
        const id = `${TestCache.MEDITATION_ID}`
        agent
            .get(`/api/v1/assets/meditations/${TestCache.MEDITATION_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('MeditationType');
                expect(response.body.Data).to.have.property('RecommendedDurationMin');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.MeditationCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.MeditationCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.MeditationCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.MeditationCreateModel.Description);
                expect(response.body.Data.MeditationType).to.equal(TestCache.MeditationCreateModel.MeditationType);
                expect(response.body.Data.RecommendedDurationMin).to.equal(TestCache.MeditationCreateModel.RecommendedDurationMin);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.MeditationCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.MeditationCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.MeditationCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.MeditationCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search meditation records', function(done) {
        loadMeditationQueryString();
        const queryString = TestCache.MeditationQueryString;
        agent
            .get(`/api/v1/assets/meditations/search${queryString}`)
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

    it('Update meditation', function(done) {
        loadMeditationUpdateModel();
        const updateModel = TestCache.MeditationUpdateModel;
        const id = `${TestCache.MEDITATION_ID}`
        agent
            .put(`/api/v1/assets/meditations/${TestCache.MEDITATION_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('MeditationType');
                expect(response.body.Data).to.have.property('RecommendedDurationMin');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.MeditationCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.MeditationCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.MeditationCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.MeditationCreateModel.Description);
                expect(response.body.Data.MeditationType).to.equal(TestCache.MeditationCreateModel.MeditationType);
                expect(response.body.Data.RecommendedDurationMin).to.equal(TestCache.MeditationCreateModel.RecommendedDurationMin);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.MeditationCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.MeditationCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.MeditationCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.MeditationCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete meditation', function(done) {
        const id = `${TestCache.MEDITATION_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/meditations/${TestCache.MEDITATION_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/meditations/${TestCache.MEDITATION_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.MeditationCreateModel;
        agent
            .post(`/api/v1/assets/meditations/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['MEDITATION_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('MeditationType');
                expect(response.body.Data).to.have.property('RecommendedDurationMin');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.MeditationCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.MeditationCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.MeditationCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.MeditationCreateModel.Description);
                expect(response.body.Data.MeditationType).to.equal(TestCache.MeditationCreateModel.MeditationType);
                expect(response.body.Data.RecommendedDurationMin).to.equal(TestCache.MeditationCreateModel.RecommendedDurationMin);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.MeditationCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.MeditationCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.MeditationCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.MeditationCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadMeditationCreateModel() {
    const model = {
        AssetCode: "MEDITATION-CC-2",
        Name: "Mindfulness meditation",
        Description: ".....",
        MeditationType: "Mindfulness",
        RecommendedDurationMin: 20,
        Version: "V1",

    };
    TestCache.MeditationCreateModel = model;
}

function loadMeditationUpdateModel() {
    const model = {
        AssetCode: "MEDITATION-CC-2",
        Name: "Mindfulness meditation",
        Description: ".....",
        MeditationType: "Mindfulness",
        RecommendedDurationMin: 20,
        Tags: ['Peaceful mind', 'Bliss'],
        Version: "V1",

    };
    TestCache.MeditationUpdateModel = model;
}

function loadMeditationQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&meditationType=xyz&recommendedDurationMin=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////