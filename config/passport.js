const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const Waiter = require("../src/db/models/index");

const opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY;

module.exports = passport => {
  passport.use(
    new jwtStrategy(opts, (jwt_payload, done) => {
      Waiter.findById(jwt_payload.id)
        .then(waiter => {
          if (waiter) {
            return done(null, waiter);
          }
          return done(null, false);
        })
        .catch(err => console.error(err));
    })
  );
};
