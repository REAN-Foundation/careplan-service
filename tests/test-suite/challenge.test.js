const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Challenge tests', function() {

    var agent = request.agent(infra.app);

    it('Create challenge', function(done) {
        loadChallengeCreateModel();
        const createModel = TestCache.ChallengeCreateModel;
        agent
            .post(`/api/v1/assets/challenges/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['CHALLENGE_ID'] = response.body.Data.id;
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

                expect(response.body.Data.id).to.equal(TestCache.ChallengeCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ChallengeCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ChallengeCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ChallengeCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ChallengeCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ChallengeCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ChallengeCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ChallengeCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get challenge by id', function(done) {
        const id = `${TestCache.CHALLENGE_ID}`
        agent
            .get(`/api/v1/assets/challenges/${TestCache.CHALLENGE_ID}`)
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

                expect(response.body.Data.id).to.equal(TestCache.ChallengeCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ChallengeCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ChallengeCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ChallengeCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ChallengeCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ChallengeCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ChallengeCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ChallengeCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search challenge records', function(done) {
        loadChallengeQueryString();
        const queryString = TestCache.ChallengeQueryString;
        agent
            .get(`/api/v1/assets/challenges/search${queryString}`)
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

    it('Update challenge', function(done) {
        loadChallengeUpdateModel();
        const updateModel = TestCache.ChallengeUpdateModel;
        const id = `${TestCache.CHALLENGE_ID}`
        agent
            .put(`/api/v1/assets/challenges/${TestCache.CHALLENGE_ID}`)
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

                expect(response.body.Data.id).to.equal(TestCache.ChallengeCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ChallengeCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ChallengeCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ChallengeCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ChallengeCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ChallengeCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ChallengeCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ChallengeCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete challenge', function(done) {
        const id = `${TestCache.CHALLENGE_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/challenges/${TestCache.CHALLENGE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/challenges/${TestCache.CHALLENGE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.ChallengeCreateModel;
        agent
            .post(`/api/v1/assets/challenges/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['CHALLENGE_ID'] = response.body.Data.id;
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

                expect(response.body.Data.id).to.equal(TestCache.ChallengeCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ChallengeCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ChallengeCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ChallengeCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ChallengeCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ChallengeCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ChallengeCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ChallengeCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadChallengeCreateModel() {
    const model = {
        AssetCode: "CHALLENGE-HF-12",
        Name: "Nutrition",
        Description: ".....",
        Version: "V1",

    };
    TestCache.ChallengeCreateModel = model;
}

function loadChallengeUpdateModel() {
    const model = {
        AssetCode: "CHALLENGE-HF-12",
        Name: "Nutrition",
        Description: ".....",
        Tags: ['Maternity', 'Neo-natal-care'],
        Version: "V1",

    };
    TestCache.ChallengeUpdateModel = model;
}

function loadChallengeQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////