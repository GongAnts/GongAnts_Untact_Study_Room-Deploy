import React, { useRef, useState } from 'react';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';

import { LeftOutlined } from '@ant-design/icons';

// Date //
import Datepicker from 'views/Calendar/Datepicker';

// API //
import { SCHEDULE_UPDATE_REQUEST, SCHEDULE_DELETE_REQUEST } from 'redux/types';

function CalendarEditModal({
  idx,
  setOpenModal,
  openModal,
  schedule_id,
  schedule_title,
  schedule_description,
  schedule_priority,
  schedule_date,
}) {
  const [title, setTitle] = useState(`${schedule_title}`);
  const [description, setDescription] = useState(`${schedule_description}`);
  const [priority, setPriority] = useState(`${schedule_priority}`);
  const [date, setDate] = useState(schedule_date.slice(0, 16));
  const [titleError, setTitleError] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // 모달창 바깥 클릭 시 모달 닫히게
  const outSection = useRef();
  useOnClickOutside(outSection, () => {
    setOpenModal(false);
  });

  // 제목이 존재하는지 검사
  const checkValid = () => {
    if (title.length === 0 || title.trim().length === 0) {
      setTitleError(true);
      return true;
    }
    return false;
  };

  // 스케줄 수정
  const onUpdate = () => {
    const yyyymmdd = date.split('T')[0].replaceAll('-', '');
    const time = date.split('T')[1].replaceAll(':', '');
    const data = {
      id: schedule_id,
      date: yyyymmdd,
      time,
      title,
      description,
      priority,
    };
    if (checkValid() === false) {
      dispatch({
        type: SCHEDULE_UPDATE_REQUEST,
        payload: data,
      });
    }
    history.go(0);
  };

  // 스케줄 삭제
  const onDelete = () => {
    dispatch({
      type: SCHEDULE_DELETE_REQUEST,
      payload: schedule_id,
    });
    history.go(0);
  };

  return (
    <div>
      <input type="checkbox" id={`modal${idx}`} className="modal-toggle" />
      <label for={`modal${idx}`} className="modal">
        <label className="modal-box relative" for="">
          <div className="flex align-middle flex-col h-100 items-center">
            <div className="flex mt-2 items-center w-64">
              <TextField
                className="w-full"
                id={`standard-basic ${titleError && 'standard-error'}`}
                label="일정 제목"
                variant="standard"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              {titleError ? (
                <p className="font-light text-xs">일정 제목을 입력해주세요</p>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col pt-3 items-center justify-space w-2/5">
              <Datepicker setDate={setDate} date={date} />
              <select
                className="select w-64 mt-4"
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                }}
              >
                <option disabled selected>
                  중요도를 선택하세요
                </option>
                <option value="상">상</option>
                <option value="중">중</option>
                <option value="하">하</option>
              </select>
              <textarea
                className="textarea mt-4"
                placeholder="상세 메모"
                value={description}
                rows={5}
                cols={30}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
              <div className="flex mt-4">
                <button
                  className="btn btn-outline w-20 mx-1 inline"
                  // onClick={onUpdate}
                >
                  완료
                </button>
                <button
                  className="btn btn-outline w-20 mx-1"
                  onClick={onUpdate}
                >
                  수정
                </button>
                <button
                  class="btn btn-outline btn-warning w-20 mx-1"
                  onClick={onDelete}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
}

export default CalendarEditModal;
