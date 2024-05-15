import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from "@fortawesome/free-solid-svg-icons";

const CompDHpost = ({data}) => {
  const { title , user,regdate} = data
  return (
    <div className='Dpost'>
      <span className='Hot'><FontAwesomeIcon icon={faFire} /></span>
      <p className='Text'>{title}</p>
      <p className='Person'>{user.id}</p>
      <p className='Day'>{regdate.split('T',1)}</p>
    </div>
  );
};

export default CompDHpost;