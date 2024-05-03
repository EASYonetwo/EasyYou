import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserSerive';

const CompLogin = () => {
  const [_type, _setType] = useState('password')
  const [_icon, _setIcon] = useState(faEyeSlash)
  const [_loginId, _setLoginId] = useState()
  const [_loginPw, _setLoginPw] = useState()
  const navigate = useNavigate()
  const fnClickHander = (() => {
    _setType(v => (v === 'password') ? 'text' : 'password')
    _setIcon(v => (v === faEyeSlash) ? faEye : faEyeSlash)
  })

  function fnLogin(e) {
    e.preventDefault()
    const log = {
      id: _loginId,
      password: _loginPw
    }
    UserService.login(log).then(res=>{
      console.log(res.data)
    })
  }

  return (
    <div className='Login_main'>
      <form className='Login_box'>
        <h3>로그인</h3>
        <div className='Login_id'>
          <span>아이디</span>
          <input type="text" value={_loginId || ''} onChange={e => { _setLoginId(e.target.value) }} placeholder='아이디를 입력해 주세요' />
        </div>
        <div className='Login_pw'>
          <span>비밀번호</span>
          <input type={_type} value={_loginPw || ''} onChange={e => { _setLoginPw(e.target.value) }} placeholder='비밀번호를 입력해 주세요.' autoComplete="off" />
          <FontAwesomeIcon icon={_icon} onClick={fnClickHander} className='eye_h' />
        </div>
        <button className='Login_btn' onClick={fnLogin}>로그인</button>
        <button className='Member_btn' onClick={(e) => { e.preventDefault(); navigate('/member') }}>회원가입</button>
      </form>
    </div>
  );
};

export default CompLogin;