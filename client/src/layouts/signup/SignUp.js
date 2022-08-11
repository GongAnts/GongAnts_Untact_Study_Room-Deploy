import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { REGISTER_REQUEST } from 'redux/types.js';

// UI components //
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Button from '@mui/material/Button';

function SignUp() {
  const [form, setValue] = useState({
    user_id: '',
    user_name: '',
    user_email: '',
    user_password: '',
    passwordCheck: '',
  });

  const onChangeValue = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { user_id, user_name, user_email, user_password, passwordCheck } =
        form;
      console.log(user_id, user_email, user_password);

      if (user_password !== passwordCheck) {
        alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
      } else {
        const user = { user_id, user_name, user_email, user_password };

        dispatch({
          type: REGISTER_REQUEST,
          payload: user,
        });
      }
    },
    [form, dispatch],
  );

  return (
    <div className="container">
      <section className="bg-gray-200 h-screen w-screen flex justify-center items-center">
        <div className="shadow-lg w-96 rounded-lg h-3/6 bg-white">
          <div className="text-center">
            <div className="signup-form mt-12">
              <h2 className="text-3xl m-3 font-medium">회원가입</h2>
              <form method="POST" id="login-form">
                <div className="form-group mt-5">
                  <label for="user_id">
                    <AccountBoxIcon></AccountBoxIcon>
                  </label>
                  <input
                    className="input-sm"
                    type="text"
                    name="user_id"
                    id="user_id"
                    placeholder="ID"
                    onChange={onChangeValue}
                  />
                </div>
                <div className="form-group">
                  <label for="user_name">
                    <AssignmentIndIcon></AssignmentIndIcon>
                  </label>
                  <input
                    className="input-sm"
                    type="text"
                    name="user_name"
                    id="user_name"
                    placeholder="User Name"
                    onChange={onChangeValue}
                  />
                </div>
                <div className="form-group">
                  <label for="user_email">
                    <MailIcon></MailIcon>
                  </label>
                  <input
                    className="input-sm"
                    type="email"
                    name="user_email"
                    id="user_email"
                    placeholder="email"
                    onChange={onChangeValue}
                  />
                </div>
                <div className="form-group">
                  <label for="user_password">
                    <LockIcon></LockIcon>
                  </label>
                  <input
                    className="input-sm"
                    type="password"
                    name="user_password"
                    id="user_password"
                    placeholder="Password"
                    onChange={onChangeValue}
                  />
                </div>
                <div className="form-group">
                  <label for="passwordCheck">
                    <LockIcon></LockIcon>
                  </label>
                  <input
                    className="input-sm"
                    type="password"
                    name="passwordCheck"
                    id="passwordCheck"
                    placeholder="Password 확인"
                    onChange={onChangeValue}
                  />
                </div>
                <div className="form-group form-button mt-5">
                  <Button
                    type="submit"
                    className="w-3/5"
                    variant="contained"
                    onClick={onSubmit}
                  >
                    Sign Up
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
