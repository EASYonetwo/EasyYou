import React from 'react';

const CompBoardFT = ({ data }) => {
  const {countLikes, countViews, regdate,title,user,boardseq, content} = data
  return (
    <tr>
      <td>seq{boardseq}</td>
      <td>{title}{content.slice(-3)}</td>
      <td>{user.id}</td>
      <td>{regdate.split('T15',1)}</td>
      <td>{countLikes}</td>
      <td>{countViews}</td>
    </tr >
  );
};

export default CompBoardFT;