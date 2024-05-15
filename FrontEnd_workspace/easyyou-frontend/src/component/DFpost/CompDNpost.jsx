import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faN } from "@fortawesome/free-solid-svg-icons";

const CompDNpost = ({data}) => {
  const { title , user,regdate} = data
  return (
    <div className='Dpost'>
      <span className='New'><FontAwesomeIcon icon={faN} /></span>
      <p className='Text'>{title}</p>
      <p className='Person'>{user.id}</p>
      <p className='Day'>{regdate.split('T',1)}</p>
    </div>
  );
};

export default CompDNpost;