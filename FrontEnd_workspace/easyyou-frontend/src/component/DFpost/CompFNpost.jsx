import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faN } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const CompFNpost = ({data}) => {
  const { title , user,regdate,file} = data
  const navigate = useNavigate()
  function fnClickhandler (e){
    navigate("/BoardFD", {state:{data}})
  }
  return (
    <div className='Fpost' onClick={fnClickhandler}>
      <span className='New'><FontAwesomeIcon icon={faN} /></span>
      <p className='Mimg'><img src='' alt="" onClick={()=>{window.open({file})}}/></p>
      <p className='Text'>{title}</p>
      <p className='Person'>{user.id}</p>
      <p className='Day'>{regdate.split('T',1)}</p>
    </div>
    
  );
};

export default CompFNpost;