import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import BoardService from '../../service/BoardService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEye } from "@fortawesome/free-solid-svg-icons";
import CompBoardFDF from './CompBoardFDF';
const CompBoardFD = () => {
  const { _isLogin, _loginId } = useContext(AppContext)
  const location = useLocation()
  const dataSeq = location.state.data.boardseq
  const navigate = useNavigate()
  const [_getData, _setGetData] = useState()

  useEffect(() => {
    let id
    if (_loginId === undefined) { id = null }
    BoardService.getBoardOne(dataSeq, id).then(res => {
      let mainData = res.data
      _setGetData(mainData)
      if (mainData) {
        if (mainData.boardLikes === "Y") {
          document.querySelector('.like').classList.add('active')
        }
        else {
          document.querySelector('.like').classList.remove('active')
        }

        if (mainData.boardDislikes === "Y") {
          document.querySelector('.disLike').classList.add('active')
        }
        else {
          document.querySelector('.disLike').classList.remove('active')
        }

      }
    })




  }, [_isLogin, dataSeq, _loginId])


  function fnClicklikeBtn() {


    document.querySelector('.like').classList.toggle('active')
  }
  function fnClickdisLikeBtn() {


    document.querySelector('.disLike').classList.toggle('active')
  }



  return (
    <div className='BoardFD'>
      <div className='BoardFD-btns'>
        <button className='back-btn' onClick={() => { navigate('/BoardF') }}>목록</button>
        <button className='delete-btn' onClick={() => {/* 삭제된 데이터 보내기  */ }}>삭제</button>
      </div>
      <div className='BoardFD-dataText'>
        <h4>{(_getData) && _getData.boardVo.title}</h4>
        <div>
          <span>{(_getData) && _getData.boardVo.user.id}</span>
          <span>{(_getData) && _getData.boardVo.regdate.split('T', 1)}</span>
          <span>{(_getData) && _getData.boardVo.countViews} <FontAwesomeIcon icon={faEye} /> </span>
        </div>

      </div>
      <div className='BoardFD-content'>
        <div className='content'>{(_getData) && _getData.boardVo.content}</div>
      </div>
      <div className='BoardFD-likeHate'>
        <button onClick={fnClicklikeBtn} className='like' ><FontAwesomeIcon icon={faThumbsUp} /> {(_getData) && _getData.boardVo.countLikes}</button>
        <button onClick={fnClickdisLikeBtn} className='disLike' ><FontAwesomeIcon icon={faThumbsDown} /> {(_getData) && _getData.boardVo.countDislikes}</button>
      </div>

      <div className='BoardFD-file'>
        <div className='file-title'>파일(개수)</div>
        <div className='file-main'>
          {(_getData) && _getData.fileVos.map(v=><CompBoardFDF key={v.fileseq}  data={v}/>)}
        </div>
      </div>
    </div>
  );
};

export default CompBoardFD;