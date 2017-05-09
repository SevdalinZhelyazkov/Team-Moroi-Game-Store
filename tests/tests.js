import { usersData } from 'usersData';
import { gamesData } from 'gamesData';
import { requester } from 'requester';
import { KINVEY } from 'kinvey';
import { UTILS } from 'utils';

mocha.setup('bdd');

let expect = chai.expect;

const LOGIN_URL = 'https://baas.kinvey.com/user/kid_BJIASAnyZ/login/';
const REGISTER_URL = 'https://baas.kinvey.com/user/kid_BJIASAnyZ/';
const user = {
    username: 'test2',
    password: 'test2'
};

// const LOGIN_URL = 'https://baas.kinvey.com/user/kid_BJIASAnyZ/login/';
// const REGISTER_URL = 'https://baas.kinvey.com/user/kid_BJIASAnyZ/';
// const user = {
//     username: 'test2',
//     password: 'test2'
// };

const GAMES_RESULT = {
    result: []
};
const GET_ALL_GAMES_URL = `https://baas.kinvey.com/appdata/kid_BJIASAnyZ/games/`;

const GENRE_NAME = 'platformName';
const GENRE_FILTER = JSON.stringify({
    "platform": GENRE_NAME
});
const GET_ALL_GAMES_BY_GENRE_URL = `https://baas.kinvey.com/appdata/kid_BJIASAnyZ/games/?query=${GENRE_FILTER}`;

const TITLE_NAME = 'titleName';
const TITLE_FILTER = JSON.stringify({
    "title": TITLE_NAME
});
const GET_ALL_GAMES_BY_TITLE_URL = `https://baas.kinvey.com/appdata/kid_BJIASAnyZ/games/?query=${TITLE_FILTER}`;

describe('User Tests', function(){

    describe('usersData.login() tests', function(){

        beforeEach(function () {
            sinon.stub(requester, 'postJSON', function (user) {
                return new Promise(function (resolve, reject) {
                    resolve(user);
                });
            });
            localStorage.clear();
        });

        afterEach(function () {
            requester.postJSON.restore();
            localStorage.clear();
        });

        it('(1) Expect: usersData.login() to make correct postJSON call', function (done) {
            usersData.login(user)
                .then(() => {
                    expect(requester.postJSON.firstCall.args[0]).to.equal(LOGIN_URL);
                })
                .then(done, done);
        });

        it('(2) Expect: usersData.login() to make exactly one postJSON call', function (done) {
            usersData.login(user)
                .then(() => {
                    expect(requester.postJSON.calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('(3) Expect: usersData.login() to put correct user data', function (done) {
            usersData.login(user)
                .then(() => {
                    const actual = requester.postJSON.firstCall.args[1];
                    const props = Object.keys(actual).sort();

                    expect(props.length).to.equal(2);
                    expect(props[0]).to.equal('password');
                    expect(props[1]).to.equal('username');
                })
                .then(done, done);
        });

    });

    describe('usersData.register() tests', function(){
        beforeEach(function () {
            sinon.stub(requester, 'postJSON', function (user) {
                return new Promise(function (resolve, reject) {
                    resolve(user);
                });
            });
        });

        afterEach(function () {
            requester.postJSON.restore();
        });


        it('(1) Expect: usersData.register() to make correct postJSON call', function (done) {
            usersData.register(user)
                .then(() => {
                    expect(requester.postJSON.firstCall.args[0]).to.equal(REGISTER_URL);
                })
                .then(done, done);
        });

        it('(2) Expect: usersData.register() to make exactly one postJSON call', function (done) {
            usersData.register(user)
                .then((res) => {
                    expect(requester.postJSON.calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('(3) Expect: usersData.login() to put correct user data', function (done) {
            usersData.register(user)
                .then(() => {
                    const actual = requester.postJSON.firstCall.args[1];
                    const props = Object.keys(actual).sort();

                    expect(props.length).to.equal(3);
                    expect(props[0]).to.equal('gamesInCart');
                    expect(props[1]).to.equal('password');
                    expect(props[2]).to.equal('username');
                })
                .then(done, done);
        });
    });

});

describe('Games Tests', function(){

    describe('gamesData.getAllGames() tests', function(){
        beforeEach(function () {
            sinon.stub(requester, 'getJSON', function (user) {
                return new Promise(function (resolve, reject) {
                    resolve(GAMES_RESULT);
                });
            });
        });

        afterEach(function () {
            requester.getJSON.restore();
        });

        it('(1) Expect: gamesData.getAllGames() to make correct getJSON call', function (done) {
            gamesData.getAllGames()
                .then(() => {
                    expect(requester.getJSON.firstCall.args[0]).to.equal(GET_ALL_GAMES_URL);
                })
                .then(done, done);
        });

        it('(2) Expect: gamesData.getAllGames() to make exactly one getJSON call', function (done) {
            gamesData.getAllGames()
                .then(() => {
                    expect(requester.getJSON.calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('(3) expect gamesData.getAllGames() to return correct result', function(done) {
			gamesData.getAllGames()
				.then(obj => {
					expect(obj).to.eql(GAMES_RESULT)
				})
				.then(done, done);
		});
    });

    describe('gamesData.getGamesByGenre(genreName) tests', function(){
        beforeEach(function () {
            sinon.stub(requester, 'getJSON', function (user) {
                return new Promise(function (resolve, reject) {
                    resolve(GAMES_RESULT);
                });
            });
        });

        afterEach(function () {
            requester.getJSON.restore();
        });

        it('(1) Expect: gamesData.getGamesByGenre(genreName) to make correct getJSON call', function (done) {
            gamesData.getGamesByPlatform(GENRE_NAME)
                .then(() => {
                    expect(requester.getJSON.firstCall.args[0]).to.equal(GET_ALL_GAMES_BY_GENRE_URL);
                })
                .then(done, done);
        });

        it('(2) Expect: gamesData.getGamesByGenre(genreName) to make exactly one getJSON call', function (done) {
            gamesData.getGamesByPlatform(GENRE_NAME)
                .then(() => {
                    expect(requester.getJSON.calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('(3) expect gamesData.getGamesByGenre(genreName) to return correct result', function(done) {
			gamesData.getGamesByPlatform(GENRE_NAME)
				.then(obj => {
					expect(obj).to.eql(GAMES_RESULT);
				})
				.then(done, done);
		});
    });

    describe('gamesData.getGameByTitle(titleName) tests', function(){
        beforeEach(function () {
            sinon.stub(requester, 'getJSON', function (user) {
                return new Promise(function (resolve, reject) {
                    resolve(GAMES_RESULT);
                });
            });
        });

        afterEach(function () {
            requester.getJSON.restore();
        });

        it('(1) Expect: gamesData.getGameByTitle(titleName) to make correct getJSON call', function (done) {
            gamesData.getGameByTitle(TITLE_NAME)
                .then(() => {
                    expect(requester.getJSON.firstCall.args[0]).to.equal(GET_ALL_GAMES_BY_TITLE_URL);
                })
                .then(done, done);
        });

        it('(2) Expect: gamesData.getGameByTitle(titleName) to make exactly one getJSON call', function (done) {
            gamesData.getGameByTitle(TITLE_NAME)
                .then(() => {
                    expect(requester.getJSON.calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('(3) expect gamesData.getGamesByTitle(titleName) to return correct result', function(done) {
			gamesData.getGameByTitle(TITLE_NAME)
				.then(obj => {
					expect(obj).to.eql(GAMES_RESULT);
				})
				.then(done, done);
		});
    });
});

describe('UTILS Tests', function () {
    const array = [1, 2, 3, 4, 5, 6, 7, 8];
    const pageNumber = 2;
    const gamesOnPageCount = 4;

    it('(1) createGamesOnPage() should return correct games on page', function () {

        const expected = [5, 6, 7, 8];
        const actual = UTILS.createGamesOnPage(array, pageNumber, gamesOnPageCount);

        expect(actual).to.eql(expected);
    });

    it('(2) createPageIndeces() should create correct indeces', function () {

        const expected = [1, 2];
        const actual = UTILS.createPageIndeces(array, gamesOnPageCount);

        expect(actual).to.eql(expected);
    });

});


mocha.run();
