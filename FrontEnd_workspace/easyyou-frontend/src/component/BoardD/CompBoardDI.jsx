import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardService from '../../service/BoardService';
import { AppContext } from '../../App';

const CompBoardDI = () => {
  const [_title,_setTitle] =useState()
  const [_content,_setContent] =useState()
  const {_loginId, _setLoginId} =useContext(AppContext) 
  const navigate = useNavigate()

  function fnUpdate (){
    let postArr ={
      title:_title,
      content:_content,
      id:_loginId
    }
    BoardService.insertReplyBoard(postArr).then(res=>{
      if(res){
        alert('성공')
      }
      else{
        alert('실패')
      }
    })
    
  }
  function fnCancle(){
    
  }

  return (
    <>
      <div className='BoardDI-t'>
        <h3>문의글 입력</h3>
        <button onClick={() => navigate('/BoardD')}>뒤로가기</button>
      </div>
      <div className='BoardDI-b'>
        <div className='person'>
          <span>작성자</span>
          <span>{_loginId}</span>
        </div>
        <div className='title'>
          <span>제목</span>
          <input type="text" value={_title||''} onChange={e=>_setTitle(e.target.value)} />
        </div>
        <div className='content'>
          <span>내용</span>
          <textarea value={_content||''} onChange={e=>_setContent(e.target.value)}></textarea>
        </div>
      </div>
      <div className='btn'>
        <button onClick={fnUpdate} className='Bbtn-u'>올리기</button>
        <button onClick={fnCancle} className='Bbtn-c'>취소</button>
      </div>
    </>
  );
};

export default CompBoardDI;