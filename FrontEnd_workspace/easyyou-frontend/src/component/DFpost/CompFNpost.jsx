import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faN } from "@fortawesome/free-solid-svg-icons";

const CompFNpost = ({data}) => {
   const {file,title,user,regdate} = data
  return (
    <div className='Fpost'>
      <span className='New'><FontAwesomeIcon icon={faN} /></span>
      <p className='Mimg'><img src='' alt="" onClick={()=>{window.open({file})}}/></p>
      <p className='Text'>{title}</p>
      <p className='Person'>{user.id}</p>
      <p className='Day'>{regdate.split('T',1)}</p>
    </div>
    
  );
};

export default CompFNpost;