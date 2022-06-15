const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Word power tests', function() {

    var agent = request.agent(infra.app);

    it('Create word power', function(done) {
        loadWordPowerCreateModel();
        const createModel = TestCache.WordPowerCreateModel;
        agent
            .post(`/api/v1/assets/word-power/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['WORD_POWER_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Word');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AdditionalResources');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.WordPowerCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.WordPowerCreateModel.AssetCode);
                expect(response.body.Data.Word).to.equal(TestCache.WordPowerCreateModel.Word);
                expect(response.body.Data.Description).to.equal(TestCache.WordPowerCreateModel.Description);
                expect(response.body.Data.AdditionalResources).to.equal(TestCache.WordPowerCreateModel.AdditionalResources);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.WordPowerCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.WordPowerCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.WordPowerCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.WordPowerCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get word power by id', function(done) {
        const id = `${TestCache.WORD_POWER_ID}`
        agent
            .get(`/api/v1/assets/word-power/${TestCache.WORD_POWER_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Word');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AdditionalResources');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.WordPowerCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.WordPowerCreateModel.AssetCode);
                expect(response.body.Data.Word).to.equal(TestCache.WordPowerCreateModel.Word);
                expect(response.body.Data.Description).to.equal(TestCache.WordPowerCreateModel.Description);
                expect(response.body.Data.AdditionalResources).to.equal(TestCache.WordPowerCreateModel.AdditionalResources);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.WordPowerCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.WordPowerCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.WordPowerCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.WordPowerCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search word power records', function(done) {
        loadWordPowerQueryString();
        const queryString = TestCache.WordPowerQueryString;
        agent
            .get(`/api/v1/assets/word-power/search${queryString}`)
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

    it('Update word power', function(done) {
        loadWordPowerUpdateModel();
        const updateModel = TestCache.WordPowerUpdateModel;
        const id = `${TestCache.WORD_POWER_ID}`
        agent
            .put(`/api/v1/assets/word-power/${TestCache.WORD_POWER_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Word');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AdditionalResources');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.WordPowerCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.WordPowerCreateModel.AssetCode);
                expect(response.body.Data.Word).to.equal(TestCache.WordPowerCreateModel.Word);
                expect(response.body.Data.Description).to.equal(TestCache.WordPowerCreateModel.Description);
                expect(response.body.Data.AdditionalResources).to.equal(TestCache.WordPowerCreateModel.AdditionalResources);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.WordPowerCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.WordPowerCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.WordPowerCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.WordPowerCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete word power', function(done) {
        const id = `${TestCache.WORD_POWER_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/word-power/${TestCache.WORD_POWER_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/word-power/${TestCache.WORD_POWER_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.WordPowerCreateModel;
        agent
            .post(`/api/v1/assets/word-power/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['WORD_POWER_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Word');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('AdditionalResources');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.WordPowerCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.WordPowerCreateModel.AssetCode);
                expect(response.body.Data.Word).to.equal(TestCache.WordPowerCreateModel.Word);
                expect(response.body.Data.Description).to.equal(TestCache.WordPowerCreateModel.Description);
                expect(response.body.Data.AdditionalResources).to.equal(TestCache.WordPowerCreateModel.AdditionalResources);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.WordPowerCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.WordPowerCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.WordPowerCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.WordPowerCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadWordPowerCreateModel() {
    const model = {
        AssetCode: "WORDPOWER-AB-1",
        Word: "Nutrition",
        Description: "Nutrition is the biochemical and physiological process by which an organism uses food to support its life. It includes ingestion, absorption, assimilation, biosynthesis, catabolism and excretion.",
        Version: "V1",

    };
    TestCache.WordPowerCreateModel = model;
}

function loadWordPowerUpdateModel() {
    const model = {
        AssetCode: "WORDPOWER-AB-1",
        Word: "Nutrition",
        Description: "Nutrition is the biochemical and physiological process by which an organism uses food to support its life. It includes ingestion, absorption, assimilation, biosynthesis, catabolism and excretion.",
        AdditionalResources: ['https://en.wikipedia.org/wiki/Nutrition', 'https://en.wikipedia.org/wiki/Micronutrient'],
        Tags: ['Maternity', 'Neo-natal-care'],
        Version: "V1",

    };
    TestCache.WordPowerUpdateModel = model;
}

function loadWordPowerQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&word=xyz&description=xyz&additionalResources=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////