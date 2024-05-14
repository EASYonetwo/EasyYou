import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import BoardService from '../../service/BoardService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEye } from "@fortawesome/free-solid-svg-icons";
import CompBoardDDD from './CompBoardDDD';
const CompBoardDD = () => {
  const { _isLogin, _loginId } = useContext(AppContext)
  const location = useLocation()
  const dataSeq = location.state.data.boardseq
  const navigate = useNavigate()
  const [_getData, _setGetData] = useState()
  const [_comment, _setComment] = useState()

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

  function fnComment (e){
    _setComment(e.target.value)
  }

  function fnClickComment (){

  }

  return (
    <div className='BoardDD'>
      <div className='BoardDD-btns'>
        <button className='back-btn' onClick={() => { navigate('/BoardD') }}>목록</button>
        <button className='delete-btn' onClick={() => {/* 삭제된 데이터 보내기  */ }}>삭제</button>
      </div>
      <div className='BoardDD-dataText'>
        <h4>{(_getData) && _getData.boardVo.title}</h4>
        <div>
          <span>{(_getData) && _getData.boardVo.user.id}</span>
          <span>{(_getData) && _getData.boardVo.regdate.split('T', 1)}</span>
          <span>{(_getData) && _getData.boardVo.countViews} <FontAwesomeIcon icon={faEye} /> </span>
        </div>

      </div>
      <div className='BoardDD-content'>
        <div className='content'>{(_getData) && _getData.boardVo.content}</div>
      </div>
      <div className='BoardDD-likeHate'>
        <button onClick={fnClicklikeBtn} className='like' ><FontAwesomeIcon icon={faThumbsUp} /> {(_getData) && _getData.boardVo.countLikes}</button>
        <button onClick={fnClickdisLikeBtn} className='disLike' ><FontAwesomeIcon icon={faThumbsDown} /> {(_getData) && _getData.boardVo.countDislikes}</button>
      </div>

      <div className='BoardDD-comment'>
        <div className='comment-title'>
          댓글
          ({(_getData) && _getData.replyVos.length})
        </div>
        <div className='comment-input'>
          <textarea onChange={fnComment} value={_comment||''}></textarea>
          <button onClick={fnClickComment}>버튼</button>
        </div>
        
          {
            (_getData) && _getData.replyVos.filter(v=>v.depthnum===0).map(v=><CompBoardDDD key={v.replyseq} data={v} etcData={_getData.replyVos.filter(v=>v.depthnum!==0)}/>)
          }
        
      </div>
    </div>
  );
};

export default CompBoardDD;