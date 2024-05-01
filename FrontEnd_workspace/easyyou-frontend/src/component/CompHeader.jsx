import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CompHeader = () => {
  const [_login, _setLogin] = useState(false)

  const fnClickHander = ((e) => {
    e.preventDefault()
    document.querySelector(`.Board_main >.Board_aco`).classList.toggle('active')
  })

  const fnCancleHander = (() => {
    document.querySelector(`.Board_main >.Board_aco`).classList.remove('active')
  })

  const fnChangeHander=(()=>{
    _setLogin(v=>!v)
  })

  return (
    <div className='header'>
      <div className='header-m'>
        <ul className='nav'>
          <li className='logo' onClick={fnCancleHander}><Link to="/">EASY-YOU</Link></li>
          <li className='Board_main main_btn'>
            <span onClick={fnClickHander}>게시판</span>
            <ul className='Board_aco'>
              <li onClick={fnCancleHander}><Link to="/BoardD">댓글게시판</Link></li>
              <li onClick={fnCancleHander}><Link to="/BoardF">파일게시판</Link></li>
            </ul>
          </li>
          <li className='main_btn' onClick={fnCancleHander}><Link to="/EasyPort">Easy's 포트폴리오</Link></li>
          <li className='main_btn' onClick={fnCancleHander}><Link to="/YouPort">You's 포트폴리오</Link></li>
          <li className='login-l' onClick={fnCancleHander}>
            <ul>
              {
                (_login === true) ? <li>로그인정보</li> : <li><Link  onClick={fnChangeHander} to="/Login">로그인</Link></li>
              }
            </ul>
          </li>
          <li className='login-r' onClick={fnCancleHander}>
            <ul>
              {
                (_login === true) ? <li><Link  onClick={fnChangeHander} to="/">로그아웃</Link></li> : <li><Link to="/Member">회원가입</Link></li>
              }
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CompHeader;