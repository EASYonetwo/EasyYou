import React from 'react';

const CompBoardFD = () => {
  return (
    <div className='BoardFD'>
      <div className='BoardFD-btns'>
        <button className='back-btn'>목록</button>
        <div className='BoardFD-btns-user'>
          <button className='rewrite-btn'>수정</button>
          <button className='delete-btn'>삭제</button>
        </div>
      </div>
      <div className='BoardFD-dataText'>
        <h4>제목</h4>
        <div>
          <span>작성자</span>
          <span>날짜 조회수</span>
        </div>
      </div>
      <div className='BoardFD-content'>
        <div className='content'>Data</div>
      </div>
      <div className='BoardFD-likeHate'>
        <span>like</span>
        <span>hate</span>
      </div>
      <div className='BoardFD-prevNext'>
        <div className='prev'>이전글 &gt; 제목 </div>
        <div className='next'>다음글 &gt; 제목 </div>
      </div>
      <div className='BoardFD-comment'>
        <div className='comment-title'>파일(개수)</div>
        <ul className='comment-main'>
          <li>
            <div className='main-img'><img src="" alt="" /></div>
            <div>[파일명] [파일크기]</div>
            <button>다운로드</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CompBoardFD;