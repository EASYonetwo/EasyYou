import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";


const CompBoardDDDD = ({ data }) => {
  const { id, content, regdate } = data

  return (
    <div className='comment-comment-main'>
      <div className='comment-comment-id'>{id}</div>
      <div className='comment-comment-content'>{content}</div>
      <div className='comment-comment-date'>{regdate.slice(0, 10)} {regdate.slice(11, 19)}</div>
      <nav className='comment-comment-navbar'>
        <FontAwesomeIcon icon={faEllipsisVertical} />
        <div className='comment-comment-delete'>
          <span>삭제</span>
        </div>
      </nav>  
      <span className='comment-comment-enter'>
        <FontAwesomeIcon icon={faArrowTurnUp} />
      </span>
    </div>
  );
};

export default CompBoardDDDD;