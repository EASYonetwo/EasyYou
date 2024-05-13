import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import BoardService from '../../service/BoardService';

const CompBoardDD = () => {
  const { _isLogin, _setIsLogin, _loginId, _setLoginId } = useContext(AppContext)
  const navigate = useNavigate()


  return (
    <div className='BoardDD'>
      <div className='BoardDD-btns'>
        <button className='back-btn' onClick={()=>{navigate('/BoardD')}}>목록</button>
        <div className='BoardDD-btns-user'>
          <button className='rewrite-btn'>수정</button>
          <button className='delete-btn'>삭제</button>
        </div>

      </div>
      <div className='BoardDD-dataText'>
        <h4>제목</h4>
        <div>
          <span>작성자</span>
          <span>날짜 조회수</span>
        </div>
      </div>
      <div className='BoardDD-content'>
        <div className='content'>Data</div>
      </div>
      <div className='BoardDD-likeHate'>
        <span>like</span>
        <span>hate</span>
      </div>
      <div className='BoardDD-prevNext'>
        <div className='prev'>이전글 &gt; 제목 </div>
        <div className='next'>다음글 &gt; 제목 </div>
      </div>
      <div className='BoardDD-comment'>
        <div className='comment-title'>댓글(개수)</div>
        <div className='comment-main'>
          <textarea></textarea>
          <button>버튼</button>
        </div>
        <div className='comment-comment'>
          <div className='comment-id'>아이디</div>
          <div className='comment-content'>댓글</div>
          <div className='comment-date'>날짜</div>
          <div className='comment-btns'>
            <button className='btn-text'>답글 </button>
            <button className='btn-like'>font </button>
            <button className='btn-hate'>font </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompBoardDD;