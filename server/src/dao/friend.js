const db = require('../config/db');

// 친구 검색
const getSearchFriendDao = (dto, callback) => {
  db.query(
    `
    SELECT user_id, user_name, user_email FROM user WHERE user_email = ?
    `,
    [dto.friendEmail],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows[0]);
      }
    },
  );
};

// 친구 상태 조회
const getFriendStateDao = (dto, callback) => {
  db.query(
    `
    SELECT state FROM friendrequest WHERE send_email = ? AND receive_email = ?
    `,
    [dto.userEmail, dto.friendEmail],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows[0]);
      }
    },
  );
};

// 친구 리스트 조회
const getFriendListDao = (dto, callback) => {
  db.query(
    `
    SELECT u.user_id, u.user_name, u.user_email, state FROM user u \
    INNER JOIN friend f ON u.user_email = f.friend_email \
    WHERE f.user_email = ?
    `,
    [dto.userEmail],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    },
  );
};

// 친구 요청 조회
const getFriendRequestDao = (dto, callback) => {
  db.query(
    `
    SELECT u.user_id, u.user_name, u.user_email FROM user u \
    INNER JOIN friendrequest f ON u.user_email = f.send_email \
    WHERE f.receive_email = ? AND state = 0
    `,
    [dto.userEmail],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    },
  );
};

// 친구 요청 보내기
const postFriendRequestDao = (dto, callback) => {
  db.query(
    `
    INSERT INTO friendrequest(send_email, receive_email) VALUES(?, ?)
    `,
    [dto.userEmail, dto.friendEmail],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    },
  );
};

// 친구 요청 처리
const putFriendRequestDao = (dto, callback) => {
  db.query(
    `
    UPDATE friendrequest SET state = ? WHERE send_email = ? AND receive_email = ?
    `,
    [dto.state, dto.friendEmail, dto.userEmail],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    },
  );
};

// 친구 요청 승인 -> friend 테이블에 컬럼 추가
const postFriendDao = (dto, callback) => {
  db.query(
    `
    INSERT INTO friend(user_email, friend_email) VALUES(?, ?), (?, ?)
    `,
    [dto.friendEmail, dto.userEmail, dto.userEmail, dto.friendEmail],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    },
  );
};

// 친구 삭제
const deleteFriendDao = (dto, callback) => {
  db.query(
    `
    DELETE FROM friend WHERE user_email = ? AND friend_email = ?;
    DELETE FROM friend WHERE user_email = ? AND friend_email = ? 
    `,
    [dto.friendEmail, dto.userEmail, dto.userEmail, dto.friendEmail],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, rows);
      }
    },
  );
};

module.exports = {
  getFriendStateDao,
  getSearchFriendDao,
  getFriendListDao,
  getFriendRequestDao,
  postFriendRequestDao,
  putFriendRequestDao,
  postFriendDao,
  deleteFriendDao,
};
