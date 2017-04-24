var User = require('../lib/mongo').User;

module.exports = { //record the method of user;
    // 注册一个用户
    create: function create(user) {
        return User.create(user).exec();
    },

    getUserByName: function(name) {
        return User
            .findOne({ name: name })
            .addCreatedAt()
            .exec();
    }
};