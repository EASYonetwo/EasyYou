import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

const CompHeader = () => {
  const {_isLogin,_setIsLogin,_loginId} = useContext(AppContext)


  function fnClickHander(e) {
    e.preventDefault()
    document.querySelector(`.Board_main >.Board_aco`).classList.toggle('active')
  }

  function fnCancleHander() {
    document.querySelector(`.Board_main >.Board_aco`).classList.remove('active')
  }
  function fnLogOut (){
    _setIsLogin(false)
  }



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
          <li className='main_btn'><Link to="/EasyPort">유태경의 포트폴리오</Link></li>
          <li className='main_btn'><Link to="/YouPort">이지원의 포트폴리오</Link></li>
          <li className='login-l'>
            <ul>
              {
                (_isLogin === true) ? <li>{_loginId}님 안녕하세요 </li> : <li><Link to="/Login">로그인</Link></li>
              }
            </ul>
          </li>
          <li className='login-r'>
            <ul>
              {
                (_isLogin === true) ? <li><Link to="/" onClick={fnLogOut}>로그아웃</Link></li> : <li><Link to="/Member">회원가입</Link></li>
              }
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CompHeader;