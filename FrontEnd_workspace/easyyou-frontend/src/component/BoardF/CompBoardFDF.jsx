import React, { useEffect, useState } from 'react';

const CompBoardFDF = ({ data }) => {
  const { filename, filesize, file } = data
  const [_form, _setForm] = useState()
  const [_isDownloading,_setIsDownloading] = useState()

  useEffect(() => {
    _setForm(data.filename.split('.')[data.filename.split('.').length - 1])
  }, [_form, data])

  const fnDownload = () => {
  };


  return (
    <div>
      <div className='main-img'  >
        {(_form) && (_form === 'jpg' || _form === 'png' || _form === 'jpeg') ? <img src={`data:image/${_form};base64,${file}`} alt="" /> : <img src="/img/notImg.png" alt="" />}
      </div>
      <div className='main-file'>
        <span className='name'>{(data) && filename}</span>
        <span className='size'>[{(data) && filesize}] byte </span>
      </div>
      <button onClick={fnDownload} >다운로드</button>
    </div>
  );
};

export default CompBoardFDF;