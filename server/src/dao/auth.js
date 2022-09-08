const db = require('../config/db');

// 회원가입 - user_id 중복 확인
const getSignupNameDao = (dto, callback) => {
  db.query(
    `
    SELECT COUNT(*) AS result FROM user WHERE user_id = ?
    `,
    [dto.id],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows[0]);
      }
    },
  );
};

// 회원가입 - user_email 중복 확인
const getSignupEmailDao = (dto, callback) => {
  db.query(
    `
    SELECT COUNT(*) AS result FROM user WHERE user_email = ?
    `,
    [dto.email],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows[0]);
      }
    },
  );
};

// 회원가입
const postSignupDao = (dto, callback) => {
  db.query(
    `
    INSERT INTO user(user_id, user_type, user_name, user_email, user_hash, user_password) \
    VALUES(?, ?, ?, ?, ?, ?)
    `,
    [dto.id, dto.type, dto.name, dto.email, dto.hash, dto.password],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, dto);
      }
    },
  );
};

module.exports = {
  getSignupNameDao,
  getSignupEmailDao,
  postSignupDao,
};
