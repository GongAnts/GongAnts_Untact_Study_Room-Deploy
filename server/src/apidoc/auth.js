/////////////////////////////////////////// Version 1.0.0
/**
 * @api {get} /auth 로그인 정보
 *
 * @apiVersion 1.0.0
 * @apiName 로그인 정보
 * @apiGroup Auth
 * @apiDescription 로그인 여부 및 사용자 정보를 확인합니다. (* 표시는 로컬 로그인, 구글 로그인 모두 해당되는 항목입니다.)
 * @apiSuccess {String} user_id 아이디(*)
 * @apiSuccess {String} user_name 닉네임(*)
 * @apiSuccess {String} user_email 이메일(*)
 * @apiSuccess {String} user_hash 비밀번호 해시값
 * @apiSuccess {String} user_password 비밀번호 (배포시 삭제 예정)
 * @apiSuccess {Datetime} user_date 회원가입 일자
 * @apiSuccess {Boolean} user_google 구글 로그인 여부(*)
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": "utest",
 *       "user_type": "local",
 *       "user_name": "테스트",
 *       "user_email": "test@test.com",
 *       "user_hash": "$2b$10$7Ozh2zcG1T8N2uHBa4LnmOkM61POeABZb78oHm57QDkGYhQsgGzeG",
 *       "user_password": "test",
 *       "user_date": "2022-04-08T15:12:09.000Z",
 *       "user_google": false
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": "12345678901234567890",
 *       "user_name": "홍길동",
 *       "user_email": "test@gmail.com",
 *       "user_google": true
 *     }
 *
 *
 * @apiError {String} msg 로그아웃 메시지
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "msg": "logout"
 *     }
 */

/**
 * @api {post} /auth/signin 로컬 로그인
 * @apiVersion 1.0.0
 * @apiName 로컬 로그인
 * @apiGroup Auth
 * @apiDescription 로컬 로그인을 시도합니다.
 * @apiParam {String} user_id 아이디(*)
 * @apiParam {String} user_password 비밀번호(*)
 * @apiSuccess {String} user_id 아이디
 * @apiSuccess {String} user_name 닉네임
 * @apiSuccess {String} user_email 이메일
 * @apiSuccess {String} user_hash 비밀번호 해시값
 * @apiSuccess {String} user_password 비밀번호 (배포시 삭제 예정)
 * @apiSuccess {Datetime} user_date 회원가입 일자
 * @apiSuccess {Boolean} user_google 구글 로그인 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": "utest",
 *       "user_type": "local",
 *       "user_name": "테스트",
 *       "user_email": "test@test.com",
 *       "user_hash": "$2b$10$7Ozh2zcG1T8N2uHBa4LnmOkM61POeABZb78oHm57QDkGYhQsgGzeG",
 *       "user_password": "test",
 *       "user_date": "2022-04-08T15:12:09.000Z",
 *       "user_google": false
 *     }
 *
 * @apiError {String} name 미존재, password 불일치 시
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       Unauthorized
 *     }
 */

/**
 * @api {get} /auth/google 구글 로그인
 * @apiVersion 1.0.0
 * @apiName 구글 로그인
 * @apiGroup Auth
 * @apiDescription 구글 로그인을 시도합니다. (직접 페이지 로드 해야합니다.)
 * @apiSuccess {String} user_id 구글 로그인 토큰값
 * @apiSuccess {String} user_name 닉네임
 * @apiSuccess {String} user_email 이메일
 * @apiSuccess {Boolean} user_google 구글 로그인 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": "g12345678901234567890",
 *       "user_type": "google",
 *       "user_name": "홍길동",
 *       "user_email": "test@gmail.com",
 *       "user_google": true
 *     }
 *
 */

/**
 * @api {get} /auth/signout 로그아웃
 *
 * @apiVersion 1.0.0
 * @apiName 로그아웃
 * @apiGroup Auth
 * @apiDescription 현재 로그인되어 있는 사용자를 로그아웃합니다.
 * @apiSuccess {String} msg 로그아웃 메시지
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "msg": "logout"
 *     }
 */

/**
 * @api {post} /auth/signup 로컬 회원가입
 *
 * @apiVersion 1.0.0
 * @apiName 회원가입
 * @apiGroup Auth
 * @apiDescription 로컬 회원가입을 합니다. (user_id, user_email 만 중복값 확인을 수행합니다.)
 * @apiBody {String} user_id 아이디(*)
 * @apiBody {String} user_password 비밀번호(*)
 * @apiBody {String} user_name 닉네임(*)
 * @apiBody {String} user_email 이메일(*)
 * @apiSuccess {String} user_id 아이디
 * @apiSuccess {String} user_name 닉네임
 * @apiSuccess {String} user_email 이메일
 * @apiSuccess {String} user_password 비밀번호
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": "signuptest",
 *       "user_name": "signuptest",
 *       "user_email": "signuptest@test.com",
 *       "user_password": "signuptest"
 *     }
 *
 * @apiError {String} msg1 이미 존재하는 user_id일 경우
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "msg1": "Incorrect user_id."
 *     }
 *
 * @apiError {String} msg2 이미 존재하는 user_email일 경우 (구글 로그인도 포함 _구글 로그인 계정의 경우, 로컬 회원가입 불가)
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "msg2": "Incorrect user_email."
 *     }
 */

/////////////////////////////////////////// Version 2.0.0
/**
 * @api {get} /auth 로그인 정보
 *
 * @apiVersion 2.0.0
 * @apiName 로그인 정보
 * @apiGroup Auth
 * @apiDescription 로그인 여부 및 사용자 정보를 확인합니다.
 * @apiSuccess {String} user_id 아이디
 * @apiSuccess {String} user_name 닉네임
 * @apiSuccess {String} user_email 이메일
 * @apiSuccess {String} user_hash 비밀번호 해시값
 * @apiSuccess {String} user_password 비밀번호 (배포시 삭제 예정)
 * @apiSuccess {Datetime} user_date 회원가입 일자
 * @apiSuccessExample [로컬 계정으로 로그인된 상태] Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": "utest",
 *       "user_type": "local",
 *       "user_name": "테스트",
 *       "user_email": "test@test.com",
 *       "user_hash": "$2b$10$7Ozh2zcG1T8N2uHBa4LnmOkM61POeABZb78oHm57QDkGYhQsgGzeG",
 *       "user_password": "test",
 *       "user_date": "2022-01-01T01:01:01.000Z",
 *     }
 *
 * @apiSuccessExample [구글 계정으로 로그인된 상태] Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": "12345678901234567890",
 *       "user_name": "홍길동",
 *       "user_email": "test@gmail.com",
 *     }
 *
 *
 * @apiError {String} msg 로그아웃 메시지
 * @apiSuccessExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "msg": "logout"
 *     }
 */

/**
 * @api {post} /auth/signin 로컬 로그인
 * @apiVersion 2.0.0
 * @apiName 로컬 로그인
 * @apiGroup Auth
 * @apiDescription 로컬 로그인을 시도합니다.
 * @apiParam {String} user_id 아이디(*)
 * @apiParam {String} user_password 비밀번호(*)
 * @apiSuccess {String} user_id 아이디
 * @apiSuccess {String} user_type 계정 타입
 * @apiSuccess {String} user_name 닉네임
 * @apiSuccess {String} user_email 이메일
 * @apiSuccess {String} user_hash 비밀번호 해시값
 * @apiSuccess {String} user_password 비밀번호 (배포시 삭제 예정)
 * @apiSuccess {Datetime} user_date 회원가입 일자
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": "utest",
 *       "user_type": "local",
 *       "user_name": "테스트",
 *       "user_email": "test@test.com",
 *       "user_hash": "$2b$10$7Ozh2zcG1T8N2uHBa4LnmOkM61POeABZb78oHm57QDkGYhQsgGzeG",
 *       "user_password": "test",
 *       "user_date": "2022-01-01T01:01:01.000Z",
 *     }
 *
 * @apiErrorExample [아이디 또는 비빌번호 불일치] Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       Unauthorized
 *     }
 */

/**
 * @api {get} /auth/google 구글 로그인
 * @apiVersion 2.0.0
 * @apiName 구글 로그인
 * @apiGroup Auth
 * @apiDescription 구글 로그인을 시도합니다. (직접 페이지 로드 후 구글 auth로 연결)
 * @apiSuccess {String} user_id 구글 로그인 토큰
 * @apiSuccess {String} user_type 계정 타입
 * @apiSuccess {String} user_name 닉네임
 * @apiSuccess {String} user_email 이메일
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": "g12345678901234567890",
 *       "user_type": "google",
 *       "user_name": "홍길동",
 *       "user_email": "test@gmail.com"
 *     }
 *
 */

/**
 * @api {get} /auth/signout 로그아웃
 *
 * @apiVersion 2.0.0
 * @apiName 로그아웃
 * @apiGroup Auth
 * @apiDescription 현재 로그인되어 있는 사용자를 로그아웃합니다.
 * @apiSuccess {String} msg 로그아웃 메시지
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "msg": "logout"
 *     }
 */

/**
 * @api {post} /auth/signup 로컬 회원가입
 *
 * @apiVersion 2.0.0
 * @apiName 회원가입
 * @apiGroup Auth
 * @apiDescription 로컬 회원가입을 합니다. (user_id, user_email : 중복값 확인 수행)
 * @apiBody {String} user_id 아이디(*)
 * @apiBody {String} user_password 비밀번호(*)
 * @apiBody {String} user_name 닉네임(*)
 * @apiBody {String} user_email 이메일(*)
 * @apiSuccess {String} user_id 아이디
 * @apiSuccess {String} user_name 닉네임
 * @apiSuccess {String} user_email 이메일
 * @apiSuccess {String} user_password 비밀번호
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": "signuptest",
 *       "user_name": "signuptest",
 *       "user_email": "signuptest@test.com",
 *       "user_password": "signuptest"
 *     }
 *
 * @apiError err1 이미 user_id가 존재할 경우
 * @apiErrorExample [err1] Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "Incorrect user_id."
 *     }
 *
 * @apiError err2 이미 user_email이 존재할 경우 (구글 로그인도 포함 _구글 로그인 계정의 경우, 로컬 회원가입 불가)
 * @apiErrorExample [err2] Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "Incorrect user_email."
 *     }
 */
