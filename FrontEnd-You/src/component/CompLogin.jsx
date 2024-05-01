import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const CompLogin = () => {
  const [_type, _setType] = useState('password')
  const [_icon, _setIcon] = useState(faEyeSlash)

  const fnClickHander = (() => {
    _setType(v => (v === 'password') ? 'text' : 'password')
    _setIcon(v => (v === faEyeSlash) ? faEye : faEyeSlash)
  })

  return (
    <div className='Login_main'>
      <form className='Login_box'>
        <h3>로그인</h3>
        <div className='Login_id'>
          <span>아이디</span>
          <input type="text" placeholder='아이디를 입력해 주세요' />
        </div>
        <div className='Login_pw'>
          <span>비밀번호</span>
          <input type={_type} placeholder='비밀번호를 입력해 주세요.' autoComplete="off" />
          <FontAwesomeIcon icon={_icon} onClick={fnClickHander} className='eye_h' />
        </div>
        <button className='Login_btn' onClick={(e)=>{e.preventDefault() ;alert('로그인했을때')}}>로그인</button>
        <button className='Member_btn' onClick={(e)=>{e.preventDefault() ;alert('회원가입페이지로이동')}}>회원가입</button>
      </form>
    </div>
  );
};

export default CompLogin;