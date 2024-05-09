import React from 'react';

const CompBoardDT = ({ data}) => {
  const { countLikes, countViews, regdate, title, user} = data

  return (
    <tr>
      <td></td>
      <td>{title}</td>
      <td>{user.id}</td>
      <td>{regdate.split('T15', 1)}</td>
      <td>{countLikes}</td>
      <td>{countViews}</td>
    </tr >
  );
};

export default CompBoardDT;