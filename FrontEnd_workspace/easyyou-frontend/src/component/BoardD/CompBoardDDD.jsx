import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import CompBoardDDDD from './CompBoardDDDD';
import BoardService from '../../service/BoardService';
import { AppContext } from '../../App';
import { useLocation } from 'react-router-dom';


const CompBoardDDD = ({ data, etcData, getdata, replyData }) => {
  const { _isLogin, _loginId } = useContext(AppContext)
  const { id, content, regdate, countDislikes, countLikes, groupnum, replyseq, replyDislikes, replyLikes } = data
  const [_darr, setDarr] = useState()
  const location = useLocation()


  function fnClickD() {
    let darr
    if (!_darr) {
      darr = etcData.filter(v => v.groupnum === groupnum)
      setDarr(darr)
    }
    else {
      darr = undefined
      setDarr(darr)
    }
  }

  useEffect(() => {
/*     replyData.filter(v => {
      if (v.replyLikes === "Y") {
        document.querySelector('.btn-like').classList.add('active')
      }
      else {
        document.querySelector('.btn-like').classList.remove('active')
      }
      if (v.replyDislikes === "Y") {
        document.querySelector('.btn-hate').classList.add('active')
      }
      else {
        document.querySelector('.btn-hate').classList.remove('active')
      }
    }
    ) */


    if (!_isLogin) {
      document.querySelectorAll('.comment-delete > button').forEach(v => {
        v.disabled = "true"
      })
    }








  }, [_loginId, _isLogin, getdata, replyData])

  function fnCommentDelect() {
    if (_isLogin) {
      if (_loginId === id) {
        if (window.confirm('삭제하시겠습니까?') === true) {
          BoardService.deleteReply(data.replyseq).then(res => {
            window.location.reload(location);
          })
        }
      } else {
        alert('본인것만 가능합니다.')

      }//not equal id
    }
    else {
      alert('로그인 후 이용 가능합니다.')
    }//not login


  }

  function fnClicklikeBtn(e) {
    if (_isLogin) {
      let seq = replyseq
      let userId = _loginId
      if (replyLikes === "Y") {
        BoardService.cancelReplyLikes(seq, userId).then(res => {
          window.location.reload(location)
        })
      }
      else {
        BoardService.replyLikes(seq, userId).then(res => {
          window.location.reload(location)
        })
      }
      e.currentTarget.classList.toggle('active')
    }
    else {
      alert('로그인후 이용가능합니다.')
    }

  }
  function fnClickdisLikeBtn(e) {
    if (_isLogin) {
      let seq = replyseq
      let userId = _loginId
      if (replyDislikes === "Y") {
        BoardService.cancelReplyDislikes(seq, userId).then(res => {
          window.location.reload(location)
        })
      }
      else {
        BoardService.replyDislikes(seq, userId).then(res => {
          window.location.reload(location)
        })
      }
      e.currentTarget.classList.toggle('active')
    }
    else {
      alert('로그인후 이용가능합니다.')
    }
  }




  return (
    <>
      <div className='comment-main'>
        <div className='comment-id'>{id}</div>
        <div className='comment-content'>{content}</div>
        <div className='comment-date'>{regdate.slice(0, 10)} {regdate.slice(11, 19)}</div>
        <div className='comment-btns'>
          <button className='btn-text' onClick={fnClickD}>답글 {etcData.filter(v => v.groupnum === groupnum).length} </button>
          <button onClick={fnClicklikeBtn} className='btn-like'><FontAwesomeIcon icon={faThumbsUp} /> {countLikes}</button>
          <button onClick={fnClickdisLikeBtn} className='btn-hate'><FontAwesomeIcon icon={faThumbsDown} /> {countDislikes}</button>
        </div>
        <nav className='comment-navbar' onClick={(e) => { e.currentTarget.classList.toggle('active') }}>
          <FontAwesomeIcon icon={faEllipsisVertical} />
          <div className='comment-delete' onClick={fnCommentDelect}>
            <button>삭제</button>
          </div>
        </nav>
      </div>
      {(_darr) && _darr.map(v => <CompBoardDDDD key={v.replyseq} data={v} etcData={etcData} />)}
    </>
  );
};

export default CompBoardDDD;