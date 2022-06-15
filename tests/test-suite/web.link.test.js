const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Web link tests', function() {

    var agent = request.agent(infra.app);

    it('Create web link', function(done) {
        loadWebLinkCreateModel();
        const createModel = TestCache.WebLinkCreateModel;
        agent
            .post(`/api/v1/assets/web-links/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['WEB_LINK_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.WebLinkCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.WebLinkCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.WebLinkCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.WebLinkCreateModel.Description);
                expect(response.body.Data.Url).to.equal(TestCache.WebLinkCreateModel.Url);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.WebLinkCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.WebLinkCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.WebLinkCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.WebLinkCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get web link by id', function(done) {
        const id = `${TestCache.WEB_LINK_ID}`
        agent
            .get(`/api/v1/assets/web-links/${TestCache.WEB_LINK_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.WebLinkCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.WebLinkCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.WebLinkCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.WebLinkCreateModel.Description);
                expect(response.body.Data.Url).to.equal(TestCache.WebLinkCreateModel.Url);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.WebLinkCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.WebLinkCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.WebLinkCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.WebLinkCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search web link records', function(done) {
        loadWebLinkQueryString();
        const queryString = TestCache.WebLinkQueryString;
        agent
            .get(`/api/v1/assets/web-links/search${queryString}`)
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

    it('Update web link', function(done) {
        loadWebLinkUpdateModel();
        const updateModel = TestCache.WebLinkUpdateModel;
        const id = `${TestCache.WEB_LINK_ID}`
        agent
            .put(`/api/v1/assets/web-links/${TestCache.WEB_LINK_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.WebLinkCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.WebLinkCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.WebLinkCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.WebLinkCreateModel.Description);
                expect(response.body.Data.Url).to.equal(TestCache.WebLinkCreateModel.Url);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.WebLinkCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.WebLinkCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.WebLinkCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.WebLinkCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete web link', function(done) {
        const id = `${TestCache.WEB_LINK_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/web-links/${TestCache.WEB_LINK_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/web-links/${TestCache.WEB_LINK_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.WebLinkCreateModel;
        agent
            .post(`/api/v1/assets/web-links/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['WEB_LINK_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('Url');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.WebLinkCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.WebLinkCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.WebLinkCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.WebLinkCreateModel.Description);
                expect(response.body.Data.Url).to.equal(TestCache.WebLinkCreateModel.Url);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.WebLinkCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.WebLinkCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.WebLinkCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.WebLinkCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadWebLinkCreateModel() {
    const model = {
        AssetCode: "WEBLINK-CC-1",
        Name: "Know your condition!",
        Description: "Studies confirm that working out with a partner ...",
        Url: "http://watchlearnlive.heart.org/CVML_Player.php?moduleSelect=hrtflr",
        Version: "V1",

    };
    TestCache.WebLinkCreateModel = model;
}

function loadWebLinkUpdateModel() {
    const model = {
        AssetCode: "WEBLINK-CC-1",
        Name: "Know your condition!",
        Description: "Studies confirm that working out with a partner ...",
        Url: "http://watchlearnlive.heart.org/CVML_Player.php?moduleSelect=hrtflr",
        Tags: ['Maternity', 'Neo-natal-care'],
        Version: "V1",

    };
    TestCache.WebLinkUpdateModel = model;
}

function loadWebLinkQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&url=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////