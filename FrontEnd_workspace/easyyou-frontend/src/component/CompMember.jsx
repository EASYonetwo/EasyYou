import React from 'react';

const CompMember = () => {
  return (
    <div className='Member_main'>
      <form className='Member_box'>
        <h3>회원가입</h3>
        <div className='Member_id'>
          <span>아이디*</span>
          <input type="text" placeholder='아이디를 입력해 주세요'/>
          <button onClick={(e)=>{e.preventDefault() ;alert()}}>중복검사</button>
        </div>
        <div className='Member_pw'>
          <span>비밀번호*</span>
          <input type="text" placeholder='비밀번호를 입력해 주세요'/>
        </div>
        <div className='port_se'>
          <span>누구의 포트폴리오를 보고 싶으십니까?</span>
          <select name="portfolio">
            <option value="Easy's">Easy's</option>
            <option value="You's">You's</option>
          </select>
        </div>
        <button className='Member_btn' onClick={(e)=>{e.preventDefault() ;alert('회원가입완료')}}>회원가입</button>
      </form>
    </div>
  );
};

export default CompMember;