import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardService from '../../service/BoardService';

const CompBoardDT = ({ data, num }) => {
  const { countLikes, countViews, regdate, title, user } = data

  const navigate = useNavigate()
  function fnDetailPage() {
    navigate('/BoardDD')
  }

  useEffect(()=>{
    BoardService.getBoardOne(num).then(res=>{
      console.log(res.data.boardVo)
    })
  })

return (
    <tr onClick={fnDetailPage}>
      <td>{num}</td>
      <td className='Board-title'>{title}</td>
      <td>{user.id}</td>
      <td>{regdate.split('T', 1)}</td>
      <td>{countLikes}</td>
      <td>{countViews}</td>
    </tr >
);
};

export default CompBoardDT;