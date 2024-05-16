import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';

const CompYou = () => {
  const [_auth, _setAuth] = useState();
  const [_makeArr, _setMakeArr] = useState(['1', '2', '3','4','5','6']);
  const { _isLogin } = useContext(AppContext)
  
  
  useEffect(() => {
    let user
    if (_isLogin) {
      user = JSON.parse(window.localStorage.getItem('UserStorage'))
      _setAuth(user.auth)
    }
  }, [_isLogin])
  
  
  function fnCheckBtn() {
    if (_isLogin === false) {
      alert('로그인후 이용해주세요');
    }
    else {
      if (_auth === 'L') {
        window.open('http://ytkhosting.dothome.co.kr/portfolio/index.php');
      } else {
        alert('회원가입시 선택했던 사람의 포트폴리오만 볼 수 있습니다.\n추가로 보시려면 회원가입해주세요.');
      }
    }
  }

  return (
    <div className='portfolio-y'>
      <div className='portfolio-img'>
        {_makeArr.map(v =>
          <figure className={`img img${v}`}>
            <img src={`/img/Yportfolio${v}.png`} alt='' />
          </figure>
        )}
      </div>
      <button className='showPortfolio' onClick={fnCheckBtn}>portfolio 전체 보러가기</button>
    </div>
  );
};

export default CompYou;