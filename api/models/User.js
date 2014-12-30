module.exports = {
	schema: true,

	attributes: {
		email: {
			type: 'string',
			required: true,
			unique: true
		},
		encryptedPassword: {
			type: 'string'
		}
	},

	beforeCreate: function(values, next) {
		bcrypt.genSalt(10, function(err, salt) {
			if (err) return next(err);

			bcrypt.hash(values.password, salt, function(err, hash) {
			if (err) return next(err);

			values.encryptedPassword = hash;
				next();
			});
		});
	},

	validPassword: function(password, user, cb) {
		bcrypt.compare(password, user.encryptedPassword, function(err, match) {
			if (err) cb(err);

			if (match) {
				cb(null, true);
			} else {
				cb(err);
			}
		});
	}
};