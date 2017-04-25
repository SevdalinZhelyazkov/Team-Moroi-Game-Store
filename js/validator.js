const VALIDATOR = {
    validateName: function(name) {
        if (typeof name !== 'string' || name.length < 3 || name.length > 24 || name.match(/[^a-zA-Z0-9 ]/)) {
            throw new Error('Invalid name!');
        }
    },
    validatePassword: function(password) {
        if (typeof password !== 'string' || name.length < 3 || name.length > 24 || name.match(/[^a-zA-Z0-9 ]/)) {
            throw new Error('Invalid password!');
        }
    }
};
