import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import CompBoardDDDD from './CompBoardDDDD';


const CompBoardDDD = ({ data, etcData }) => {
  const [_darr, setDarr] = useState()
  const { id, content, regdate, countDislikes, countLikes, groupnum } = data


  function fnClick() {
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

  }, [])

  return (
    <>
      <div className='comment-main'>
        <div className='comment-id'>{id}</div>
        <div className='comment-content'>{content}</div>
        <div className='comment-date'>{regdate.slice(0, 10)} {regdate.slice(11, 19)}</div>
        <div className='comment-btns'>
          <button className='btn-text' onClick={fnClick}>답글 {etcData.filter(v => v.groupnum === groupnum).length} </button>
          <button className='btn-like'><FontAwesomeIcon icon={faThumbsUp} /> {countDislikes}</button>
          <button className='btn-hate'><FontAwesomeIcon icon={faThumbsDown} /> {countLikes}</button>
        </div>
        <nav className='comment-navbar' onClick={(e)=>{e.currentTarget.classList.toggle('active')}}>
          <FontAwesomeIcon icon={faEllipsisVertical} />
          <div className='comment-delete' onClick={()=>{(window.confirm('삭제하시겠습니까?')===true)&& console.log('삭제')}}>
            {/* 삭제할 때 아이디 맞나 안맞나 확인해야하는 작업해야함  */}
            <span>삭제</span>
          </div>
        </nav>
      </div>
      {(_darr) && _darr.map(v => <CompBoardDDDD key={v.replyseq} data={v} etcData={etcData} />)}
    </>
  );
};

export default CompBoardDDD;