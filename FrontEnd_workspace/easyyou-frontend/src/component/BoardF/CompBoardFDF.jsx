import React from 'react';

const CompBoardFDF = ({ data}) => {
  const { filename, filesize} = data










  return (
    <div>
      <div className='main-img'  >
        <img src="" alt="" />
      </div>
      <div className='main-file'>
        <span className='name'>{(data) && filename}</span>
        <span className='size'>{(data) && filesize}</span>
      </div>
      <button >다운로드</button>
    </div>
  );
};

export default CompBoardFDF;