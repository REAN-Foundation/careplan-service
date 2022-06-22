const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Nutrition tests', function() {

    var agent = request.agent(infra.app);

    it('Create nutrition', function(done) {
        loadNutritionCreateModel();
        const createModel = TestCache.NutritionCreateModel;
        agent
            .post(`/api/v1/assets/nutritions/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['NUTRITION_ID'] = response.body.Data.id;
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

                expect(response.body.Data.id).to.equal(TestCache.NutritionCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.NutritionCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.NutritionCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.NutritionCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.NutritionCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.NutritionCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.NutritionCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.NutritionCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get nutrition by id', function(done) {
        const id = `${TestCache.NUTRITION_ID}`
        agent
            .get(`/api/v1/assets/nutritions/${TestCache.NUTRITION_ID}`)
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

                expect(response.body.Data.id).to.equal(TestCache.NutritionCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.NutritionCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.NutritionCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.NutritionCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.NutritionCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.NutritionCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.NutritionCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.NutritionCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search nutrition records', function(done) {
        loadNutritionQueryString();
        const queryString = TestCache.NutritionQueryString;
        agent
            .get(`/api/v1/assets/nutritions/search${queryString}`)
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

    it('Update nutrition', function(done) {
        loadNutritionUpdateModel();
        const updateModel = TestCache.NutritionUpdateModel;
        const id = `${TestCache.NUTRITION_ID}`
        agent
            .put(`/api/v1/assets/nutritions/${TestCache.NUTRITION_ID}`)
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

                expect(response.body.Data.id).to.equal(TestCache.NutritionCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.NutritionCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.NutritionCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.NutritionCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.NutritionCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.NutritionCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.NutritionCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.NutritionCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete nutrition', function(done) {
        const id = `${TestCache.NUTRITION_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/nutritions/${TestCache.NUTRITION_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/nutritions/${TestCache.NUTRITION_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.NutritionCreateModel;
        agent
            .post(`/api/v1/assets/nutritions/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['NUTRITION_ID'] = response.body.Data.id;
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

                expect(response.body.Data.id).to.equal(TestCache.NutritionCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.NutritionCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.NutritionCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.NutritionCreateModel.Description);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.NutritionCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.NutritionCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.NutritionCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.NutritionCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadNutritionCreateModel() {
    const model = {
        AssetCode: "NUTRITION-CC-2",
        Name: "Breakfast",
        Description: ".....",
        Version: "V1",

    };
    TestCache.NutritionCreateModel = model;
}

function loadNutritionUpdateModel() {
    const model = {
        AssetCode: "NUTRITION-CC-2",
        Name: "Breakfast",
        Description: ".....",
        Tags: ['Nutrients', 'Vitamins'],
        Version: "V1",

    };
    TestCache.NutritionUpdateModel = model;
}

function loadNutritionQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////