const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Article tests', function() {

    var agent = request.agent(infra.app);

    it('Create article', function(done) {
        loadArticleCreateModel();
        const createModel = TestCache.ArticleCreateModel;
        agent
            .post(`/api/v1/assets/articles/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['ARTICLE_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Summary');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('FileResourceId');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.ArticleCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ArticleCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ArticleCreateModel.Name);
                expect(response.body.Data.Summary).to.equal(TestCache.ArticleCreateModel.Summary);
                expect(response.body.Data.Url).to.equal(TestCache.ArticleCreateModel.Url);
                expect(response.body.Data.FileResourceId).to.equal(TestCache.ArticleCreateModel.FileResourceId);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ArticleCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ArticleCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ArticleCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ArticleCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get article by id', function(done) {
        const id = `${TestCache.ARTICLE_ID}`
        agent
            .get(`/api/v1/assets/articles/${TestCache.ARTICLE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Summary');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('FileResourceId');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.ArticleCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ArticleCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ArticleCreateModel.Name);
                expect(response.body.Data.Summary).to.equal(TestCache.ArticleCreateModel.Summary);
                expect(response.body.Data.Url).to.equal(TestCache.ArticleCreateModel.Url);
                expect(response.body.Data.FileResourceId).to.equal(TestCache.ArticleCreateModel.FileResourceId);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ArticleCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ArticleCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ArticleCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ArticleCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search article records', function(done) {
        loadArticleQueryString();
        const queryString = TestCache.ArticleQueryString;
        agent
            .get(`/api/v1/assets/articles/search${queryString}`)
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

    it('Update article', function(done) {
        loadArticleUpdateModel();
        const updateModel = TestCache.ArticleUpdateModel;
        const id = `${TestCache.ARTICLE_ID}`
        agent
            .put(`/api/v1/assets/articles/${TestCache.ARTICLE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Summary');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('FileResourceId');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.ArticleCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ArticleCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ArticleCreateModel.Name);
                expect(response.body.Data.Summary).to.equal(TestCache.ArticleCreateModel.Summary);
                expect(response.body.Data.Url).to.equal(TestCache.ArticleCreateModel.Url);
                expect(response.body.Data.FileResourceId).to.equal(TestCache.ArticleCreateModel.FileResourceId);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ArticleCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ArticleCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ArticleCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ArticleCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete article', function(done) {
        const id = `${TestCache.ARTICLE_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/articles/${TestCache.ARTICLE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/articles/${TestCache.ARTICLE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.ArticleCreateModel;
        agent
            .post(`/api/v1/assets/articles/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['ARTICLE_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Summary');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('FileResourceId');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.ArticleCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ArticleCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ArticleCreateModel.Name);
                expect(response.body.Data.Summary).to.equal(TestCache.ArticleCreateModel.Summary);
                expect(response.body.Data.Url).to.equal(TestCache.ArticleCreateModel.Url);
                expect(response.body.Data.FileResourceId).to.equal(TestCache.ArticleCreateModel.FileResourceId);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ArticleCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ArticleCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ArticleCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ArticleCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadArticleCreateModel() {
    const model = {
        AssetCode: "ARTICLE-CC-1",
        Name: "Know your condition!",
        Summary: "Studies confirm that working out with a partner ...",
        Url: "http://watchlearnlive.heart.org/CVML_Player.php?moduleSelect=hrtflr",
        Version: "V1",

    };
    TestCache.ArticleCreateModel = model;
}

function loadArticleUpdateModel() {
    const model = {
        AssetCode: "ARTICLE-CC-1",
        Name: "Know your condition!",
        Summary: "Studies confirm that working out with a partner ...",
        Url: "http://watchlearnlive.heart.org/CVML_Player.php?moduleSelect=hrtflr",
        Tags: ['Maternity', 'Neo-natal-care'],
        Version: "V1",

    };
    TestCache.ArticleUpdateModel = model;
}

function loadArticleQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&summary=xyz&url=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////