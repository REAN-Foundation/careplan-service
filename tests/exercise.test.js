const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Exercise tests', function() {

    var agent = request.agent(infra.app);

    it('Create exercise', function(done) {
        loadExerciseCreateModel();
        const createModel = TestCache.ExerciseCreateModel;
        agent
            .post(`/api/v1/assets/exercises/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['EXERCISE_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('ExerciseType');
                expect(response.body.Data).to.have.property('IntensityLevel');
                expect(response.body.Data).to.have.property('RecommendedDurationMin');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.ExerciseCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ExerciseCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ExerciseCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ExerciseCreateModel.Description);
                expect(response.body.Data.ExerciseType).to.equal(TestCache.ExerciseCreateModel.ExerciseType);
                expect(response.body.Data.IntensityLevel).to.equal(TestCache.ExerciseCreateModel.IntensityLevel);
                expect(response.body.Data.RecommendedDurationMin).to.equal(TestCache.ExerciseCreateModel.RecommendedDurationMin);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ExerciseCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ExerciseCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ExerciseCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ExerciseCreateModel.Version);

            })
            .expect(201, done);
    });

    it('Get exercise by id', function(done) {
        const id = `${TestCache.EXERCISE_ID}`
        agent
            .get(`/api/v1/assets/exercises/${TestCache.EXERCISE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('ExerciseType');
                expect(response.body.Data).to.have.property('IntensityLevel');
                expect(response.body.Data).to.have.property('RecommendedDurationMin');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.ExerciseCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ExerciseCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ExerciseCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ExerciseCreateModel.Description);
                expect(response.body.Data.ExerciseType).to.equal(TestCache.ExerciseCreateModel.ExerciseType);
                expect(response.body.Data.IntensityLevel).to.equal(TestCache.ExerciseCreateModel.IntensityLevel);
                expect(response.body.Data.RecommendedDurationMin).to.equal(TestCache.ExerciseCreateModel.RecommendedDurationMin);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ExerciseCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ExerciseCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ExerciseCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ExerciseCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Search exercise records', function(done) {
        loadExerciseQueryString();
        const queryString = TestCache.ExerciseQueryString;
        agent
            .get(`/api/v1/assets/exercises/search${queryString}`)
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

    it('Update exercise', function(done) {
        loadExerciseUpdateModel();
        const updateModel = TestCache.ExerciseUpdateModel;
        const id = `${TestCache.EXERCISE_ID}`
        agent
            .put(`/api/v1/assets/exercises/${TestCache.EXERCISE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('ExerciseType');
                expect(response.body.Data).to.have.property('IntensityLevel');
                expect(response.body.Data).to.have.property('RecommendedDurationMin');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.ExerciseCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ExerciseCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ExerciseCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ExerciseCreateModel.Description);
                expect(response.body.Data.ExerciseType).to.equal(TestCache.ExerciseCreateModel.ExerciseType);
                expect(response.body.Data.IntensityLevel).to.equal(TestCache.ExerciseCreateModel.IntensityLevel);
                expect(response.body.Data.RecommendedDurationMin).to.equal(TestCache.ExerciseCreateModel.RecommendedDurationMin);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ExerciseCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ExerciseCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ExerciseCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ExerciseCreateModel.Version);

            })
            .expect(200, done);
    });

    it('Delete exercise', function(done) {
        const id = `${TestCache.EXERCISE_ID}`

        //Delete
        agent
            .delete(`/api/v1/assets/exercises/${TestCache.EXERCISE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/assets/exercises/${TestCache.EXERCISE_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.ExerciseCreateModel;
        agent
            .post(`/api/v1/assets/exercises/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['EXERCISE_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('AssetCode');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('ExerciseType');
                expect(response.body.Data).to.have.property('IntensityLevel');
                expect(response.body.Data).to.have.property('RecommendedDurationMin');
                expect(response.body.Data).to.have.property('AssetCategory');
                expect(response.body.Data).to.have.property('OwnerUserId');
                expect(response.body.Data).to.have.property('Tags');
                expect(response.body.Data).to.have.property('Version');

                expect(response.body.Data.id).to.equal(TestCache.ExerciseCreateModel.id);
                expect(response.body.Data.AssetCode).to.equal(TestCache.ExerciseCreateModel.AssetCode);
                expect(response.body.Data.Name).to.equal(TestCache.ExerciseCreateModel.Name);
                expect(response.body.Data.Description).to.equal(TestCache.ExerciseCreateModel.Description);
                expect(response.body.Data.ExerciseType).to.equal(TestCache.ExerciseCreateModel.ExerciseType);
                expect(response.body.Data.IntensityLevel).to.equal(TestCache.ExerciseCreateModel.IntensityLevel);
                expect(response.body.Data.RecommendedDurationMin).to.equal(TestCache.ExerciseCreateModel.RecommendedDurationMin);
                expect(response.body.Data.AssetCategory).to.equal(TestCache.ExerciseCreateModel.AssetCategory);
                expect(response.body.Data.OwnerUserId).to.equal(TestCache.ExerciseCreateModel.OwnerUserId);
                expect(response.body.Data.Tags).to.equal(TestCache.ExerciseCreateModel.Tags);
                expect(response.body.Data.Version).to.equal(TestCache.ExerciseCreateModel.Version);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadExerciseCreateModel() {
    const model = {
        AssetCode: "EXERCISE-CC-2",
        Name: "Nutrition",
        Description: ".....",
        ExerciseType: "Aerobic",
        IntensityLevel: "Moderate",
        RecommendedDurationMin: 20,
        Version: "V1",

    };
    TestCache.ExerciseCreateModel = model;
}

function loadExerciseUpdateModel() {
    const model = {
        AssetCode: "EXERCISE-CC-2",
        Name: "Nutrition",
        Description: ".....",
        ExerciseType: "Aerobic",
        IntensityLevel: "Moderate",
        RecommendedDurationMin: 20,
        Tags: ['Maternity', 'Neo-natal-care'],
        Version: "V1",

    };
    TestCache.ExerciseUpdateModel = model;
}

function loadExerciseQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?assetCode=xyz&name=xyz&description=xyz&exerciseType=xyz&intensityLevel=xyz&recommendedDurationMin=xyz&assetCategory=xyz&tags=xyz&version=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////