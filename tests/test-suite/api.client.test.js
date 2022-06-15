const request = require('supertest');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;

const infra = require('../index');

///////////////////////////////////////////////////////////////////////////

describe('Api client tests', function() {

    var agent = request.agent(infra.app);

    it('Create api client', function(done) {
        loadApiClientCreateModel();
        const createModel = TestCache.ApiClientCreateModel;
        agent
            .post(`/api/v1/api-clients/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['API_CLIENT_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('ClientName');
                expect(response.body.Data).to.have.property('ClientCode');
                expect(response.body.Data).to.have.property('ClientInterfaceType');
                expect(response.body.Data).to.have.property('IsPrivileged');
                expect(response.body.Data).to.have.property('CountryCode');
                expect(response.body.Data).to.have.property('Phone');
                expect(response.body.Data).to.have.property('Email');
                expect(response.body.Data).to.have.property('Password');
                expect(response.body.Data).to.have.property('ApiKey');
                expect(response.body.Data).to.have.property('ValidFrom');
                expect(response.body.Data).to.have.property('ValidTill');

                expect(response.body.Data.id).to.equal(TestCache.ApiClientCreateModel.id);
                expect(response.body.Data.ClientName).to.equal(TestCache.ApiClientCreateModel.ClientName);
                expect(response.body.Data.ClientCode).to.equal(TestCache.ApiClientCreateModel.ClientCode);
                expect(response.body.Data.ClientInterfaceType).to.equal(TestCache.ApiClientCreateModel.ClientInterfaceType);
                expect(response.body.Data.IsPrivileged).to.equal(TestCache.ApiClientCreateModel.IsPrivileged);
                expect(response.body.Data.CountryCode).to.equal(TestCache.ApiClientCreateModel.CountryCode);
                expect(response.body.Data.Phone).to.equal(TestCache.ApiClientCreateModel.Phone);
                expect(response.body.Data.Email).to.equal(TestCache.ApiClientCreateModel.Email);
                expect(response.body.Data.Password).to.equal(TestCache.ApiClientCreateModel.Password);
                expect(response.body.Data.ApiKey).to.equal(TestCache.ApiClientCreateModel.ApiKey);
                expect(response.body.Data.ValidFrom).to.equal(TestCache.ApiClientCreateModel.ValidFrom);
                expect(response.body.Data.ValidTill).to.equal(TestCache.ApiClientCreateModel.ValidTill);

            })
            .expect(201, done);
    });

    it('Get api client by id', function(done) {
        const id = `${TestCache.API_CLIENT_ID}`
        agent
            .get(`/api/v1/api-clients/${TestCache.API_CLIENT_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('ClientName');
                expect(response.body.Data).to.have.property('ClientCode');
                expect(response.body.Data).to.have.property('ClientInterfaceType');
                expect(response.body.Data).to.have.property('IsPrivileged');
                expect(response.body.Data).to.have.property('CountryCode');
                expect(response.body.Data).to.have.property('Phone');
                expect(response.body.Data).to.have.property('Email');
                expect(response.body.Data).to.have.property('Password');
                expect(response.body.Data).to.have.property('ApiKey');
                expect(response.body.Data).to.have.property('ValidFrom');
                expect(response.body.Data).to.have.property('ValidTill');

                expect(response.body.Data.id).to.equal(TestCache.ApiClientCreateModel.id);
                expect(response.body.Data.ClientName).to.equal(TestCache.ApiClientCreateModel.ClientName);
                expect(response.body.Data.ClientCode).to.equal(TestCache.ApiClientCreateModel.ClientCode);
                expect(response.body.Data.ClientInterfaceType).to.equal(TestCache.ApiClientCreateModel.ClientInterfaceType);
                expect(response.body.Data.IsPrivileged).to.equal(TestCache.ApiClientCreateModel.IsPrivileged);
                expect(response.body.Data.CountryCode).to.equal(TestCache.ApiClientCreateModel.CountryCode);
                expect(response.body.Data.Phone).to.equal(TestCache.ApiClientCreateModel.Phone);
                expect(response.body.Data.Email).to.equal(TestCache.ApiClientCreateModel.Email);
                expect(response.body.Data.Password).to.equal(TestCache.ApiClientCreateModel.Password);
                expect(response.body.Data.ApiKey).to.equal(TestCache.ApiClientCreateModel.ApiKey);
                expect(response.body.Data.ValidFrom).to.equal(TestCache.ApiClientCreateModel.ValidFrom);
                expect(response.body.Data.ValidTill).to.equal(TestCache.ApiClientCreateModel.ValidTill);

            })
            .expect(200, done);
    });

    it('Search api client records', function(done) {
        loadApiClientQueryString();
        const queryString = TestCache.ApiClientQueryString;
        agent
            .get(`/api/v1/api-clients/search${queryString}`)
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

    it('Update api client', function(done) {
        loadApiClientUpdateModel();
        const updateModel = TestCache.ApiClientUpdateModel;
        const id = `${TestCache.API_CLIENT_ID}`
        agent
            .put(`/api/v1/api-clients/${TestCache.API_CLIENT_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('ClientName');
                expect(response.body.Data).to.have.property('ClientCode');
                expect(response.body.Data).to.have.property('ClientInterfaceType');
                expect(response.body.Data).to.have.property('IsPrivileged');
                expect(response.body.Data).to.have.property('CountryCode');
                expect(response.body.Data).to.have.property('Phone');
                expect(response.body.Data).to.have.property('Email');
                expect(response.body.Data).to.have.property('Password');
                expect(response.body.Data).to.have.property('ApiKey');
                expect(response.body.Data).to.have.property('ValidFrom');
                expect(response.body.Data).to.have.property('ValidTill');

                expect(response.body.Data.id).to.equal(TestCache.ApiClientCreateModel.id);
                expect(response.body.Data.ClientName).to.equal(TestCache.ApiClientCreateModel.ClientName);
                expect(response.body.Data.ClientCode).to.equal(TestCache.ApiClientCreateModel.ClientCode);
                expect(response.body.Data.ClientInterfaceType).to.equal(TestCache.ApiClientCreateModel.ClientInterfaceType);
                expect(response.body.Data.IsPrivileged).to.equal(TestCache.ApiClientCreateModel.IsPrivileged);
                expect(response.body.Data.CountryCode).to.equal(TestCache.ApiClientCreateModel.CountryCode);
                expect(response.body.Data.Phone).to.equal(TestCache.ApiClientCreateModel.Phone);
                expect(response.body.Data.Email).to.equal(TestCache.ApiClientCreateModel.Email);
                expect(response.body.Data.Password).to.equal(TestCache.ApiClientCreateModel.Password);
                expect(response.body.Data.ApiKey).to.equal(TestCache.ApiClientCreateModel.ApiKey);
                expect(response.body.Data.ValidFrom).to.equal(TestCache.ApiClientCreateModel.ValidFrom);
                expect(response.body.Data.ValidTill).to.equal(TestCache.ApiClientCreateModel.ValidTill);

            })
            .expect(200, done);
    });

    it('Delete api client', function(done) {
        const id = `${TestCache.API_CLIENT_ID}`

        //Delete
        agent
            .delete(`/api/v1/api-clients/${TestCache.API_CLIENT_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(response => {
                expect(response.body.Data).to.have.property('Deleted');
                expect(response.body.Data.Deleted).to.equal(true);
            })
            .expect(200, done);

        //Check again if exists!
        agent
            .get(`/api/v1/api-clients/${TestCache.API_CLIENT_ID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TestCache.AdminJwt}`)
            .expect(404, done);

        //Recreate it again because we need it again
        const createModel = TestCache.ApiClientCreateModel;
        agent
            .post(`/api/v1/api-clients/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                TestCache['API_CLIENT_ID'] = response.body.Data.id;
                //assert.exists(response.body.Data.Xyz, 'Xyz exists.');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('ClientName');
                expect(response.body.Data).to.have.property('ClientCode');
                expect(response.body.Data).to.have.property('ClientInterfaceType');
                expect(response.body.Data).to.have.property('IsPrivileged');
                expect(response.body.Data).to.have.property('CountryCode');
                expect(response.body.Data).to.have.property('Phone');
                expect(response.body.Data).to.have.property('Email');
                expect(response.body.Data).to.have.property('Password');
                expect(response.body.Data).to.have.property('ApiKey');
                expect(response.body.Data).to.have.property('ValidFrom');
                expect(response.body.Data).to.have.property('ValidTill');

                expect(response.body.Data.id).to.equal(TestCache.ApiClientCreateModel.id);
                expect(response.body.Data.ClientName).to.equal(TestCache.ApiClientCreateModel.ClientName);
                expect(response.body.Data.ClientCode).to.equal(TestCache.ApiClientCreateModel.ClientCode);
                expect(response.body.Data.ClientInterfaceType).to.equal(TestCache.ApiClientCreateModel.ClientInterfaceType);
                expect(response.body.Data.IsPrivileged).to.equal(TestCache.ApiClientCreateModel.IsPrivileged);
                expect(response.body.Data.CountryCode).to.equal(TestCache.ApiClientCreateModel.CountryCode);
                expect(response.body.Data.Phone).to.equal(TestCache.ApiClientCreateModel.Phone);
                expect(response.body.Data.Email).to.equal(TestCache.ApiClientCreateModel.Email);
                expect(response.body.Data.Password).to.equal(TestCache.ApiClientCreateModel.Password);
                expect(response.body.Data.ApiKey).to.equal(TestCache.ApiClientCreateModel.ApiKey);
                expect(response.body.Data.ValidFrom).to.equal(TestCache.ApiClientCreateModel.ValidFrom);
                expect(response.body.Data.ValidTill).to.equal(TestCache.ApiClientCreateModel.ValidTill);

            })
            .expect(201, done);
    });

});

///////////////////////////////////////////////////////////////////////////

function loadApiClientCreateModel() {
    const model = {
        ClientName: "Rean Patient App",
        ClientInterfaceType: "Educational",
        IsPrivileged: True,
        Password: "",
        ApiKey: "",

    };
    TestCache.ApiClientCreateModel = model;
}

function loadApiClientUpdateModel() {
    const model = {
        ClientName: "Rean Patient App",
        ClientCode: "REANPAT",
        ClientInterfaceType: "Educational",
        IsPrivileged: True,
        CountryCode: "",
        Phone: "",
        Email: "",
        Password: "",
        ApiKey: "",
        ValidFrom: "2022-01-01",
        ValidTill: "2023-01-01",

    };
    TestCache.ApiClientUpdateModel = model;
}

function loadApiClientQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?clientName=xyz&clientCode=xyz&clientInterfaceType=xyz&isPrivileged=xyz&countryCode=xyz&phone=xyz&email=xyz&validFrom=xyz&validTill=xyz'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////