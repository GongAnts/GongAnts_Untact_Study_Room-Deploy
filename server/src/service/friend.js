const dao = require('../dao/friend');

// 친구 검색
const getSearchFriendService = (dto, callback) => {
  let state;
  dao.getSearchFriendDao(dto, function (err, data) {
    if (err) return callback(err, data);
    this.data = data;
  });
  dao.getFriendStateDao(dto, function (err, data) {
    if (err) return callback(err, data);
    if (data === undefined) state = -1;
    else state = data['state'];
    this.data['state'] = state;
    return callback(err, this.data);
  });
};

// 친구 리스트 조회
const getFriendListService = (dto, callback) => {
  dao.getFriendListDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 친구 요청 조회
const getFriendRequestService = (dto, callback) => {
  dao.getFriendRequestDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 친구 요청 보내기
const postFriendRequestService = (dto, callback) => {
  dao.postFriendRequestDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 친구 요청 처리
const putFriendRequestService = (dto, callback) => {
  // 친구 요청 승인 -> 친구 테이블에 친구 컬럼 추가하는 과정
  if (dto.state == 1) {
    dao.postFriendDao(dto, function (err, data) {
      if (err) return callback(err);
    });
  }
  dao.putFriendRequestDao(dto, function (err, data) {
    return callback(err, data);
  });
};

// 친구 삭제
const deleteFriendService = (dto, callback) => {
  dao.deleteFriendDao(dto, function (err, data) {
    return callback(err, data);
  });
};

module.exports = {
  getSearchFriendService,
  getFriendListService,
  getFriendRequestService,
  postFriendRequestService,
  putFriendRequestService,
  deleteFriendService,
};
