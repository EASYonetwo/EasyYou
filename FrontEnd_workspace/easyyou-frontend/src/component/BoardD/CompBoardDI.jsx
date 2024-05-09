import React from 'react';

const CompBoardDI = () => {
  return (
    <>
      <div className='BoardD_I-t'>
        <h3>문의글 입력</h3>
        <button>뒤로가기</button>
      </div>
      <div className='BoardD_I-b'>
        <div>
          API
        </div>
        <button className='Bbtn-u'>올리기</button>
        <button className='Bbtn-c'>취소</button>
      </div>
    </>
  );
};

export default CompBoardDI;