require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dao = require('../../dao/auth');
const logger =
  process.env.NODE_ENV === 'production'
    ? require('../productionLogger')
    : require('../devLogger');

// Google AOuth Passport 정의
module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URIS,
  },
  function (accessToken, refreshToken, profile, cb) {
    const userdata = {
      user_id: 'g' + profile.id,
      user_type: 'google',
      user_name: profile.displayName,
      user_email: profile.emails[0].value,
    };
    const dto = {
      id: 'g' + profile.id,
      type: 'google',
      name: profile.displayName,
      email: profile.emails[0].value,
    };
    try {
      dao.getSignupEmailDao(dto, function (err, data) {
        if (err) {
          logger.error(`[googleLogin] ${err}`);
          return cb(err);
        } else {
          // 동일 user_email 존재
          if (data.result > 0) {
            logger.error('[googleLogin] 이미 존재하는 user_email 입니다.');
            return cb(null, userdata);
          } else {
            dao.postSignupDao(dto, function (err, data) {
              if (err) {
                logger.error(`[googleLogin] DB 저장 실패 | ${err}`);
                return cb(err);
              } else {
                return cb(null, userdata);
              }
            });
          }
        }
      });
    } catch (err) {
      logger.error(`[googleLogin] ${err}`);
      return cb(err);
    }
  },
);
