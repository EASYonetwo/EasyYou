import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import BoardService from '../../service/BoardService';

const CompBoardFI = () => {
  const [_title, _setTitle] = useState()
  const [_content, _setContent] = useState()
  const { _loginId } = useContext(AppContext)
  const navigate = useNavigate()

  function fnSubmit(e) {
    e.preventDefault()
    const FD = new FormData(e.currentTarget)
    FD.append("id", _loginId)
    console.log(Object.fromEntries(FD))
    BoardService.insertFileBoard(FD).then(res => {
      if (res) {
        alert('게시물이 등록되었습니다.')
        navigate('/BoardF')
      }

    }).catch((error) => {
      alert('로그인한 후에 다시시도해주세요')
      _setTitle()
      _setContent()
      
    });
    e.currentTarget.reset()
  }


  function fnCancle() {
    navigate('/BoardF')
  }





  return (
    <form onSubmit={fnSubmit} encType="multipart/form-data" className='BoardFI'>
      <div className='BoardFI-t'>
        <h3>문의글 입력</h3>
        <button onClick={() => navigate('/BoardF')}>뒤로가기</button>
      </div>
      <div className='BoardFI-b'>
        <div className='person'>
          <span>작성자</span>
          <span>{_loginId}</span>
          {/* <input type="text" name="id" defaultValue={_loginId} style={{"background":'none',"border":'none'}}/> */}
        </div>
        <div className='title'>
          <span>제목</span>
          <input type="text" value={_title || ''} name='title' onChange={e => _setTitle(e.target.value)} />
        </div>
        <div className='content'>
          <span>내용</span>
          <textarea value={_content || ''} name='content' onChange={e => _setContent(e.target.value)}></textarea>
        </div>
        <div className='file'>
          <span>파일</span> <input type="file" name='files' accept="image/jpeg,.txt" multiple />
        </div>
      </div>
      <div className='btn'>
        <button className='Bbtn-u'>올리기</button>
        <button onClick={fnCancle} className='Bbtn-c'>취소</button>
      </div>
    </form>
  );
};

export default CompBoardFI;