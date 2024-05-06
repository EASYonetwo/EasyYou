import React from 'react';

const CompFHpost = ({data}) => {
  const {file,title,user,regdate} = data
  return (
    <div className='Fpost'>
      <span className='Hot'> Hot</span>
      <p className='Mimg'><img src='' alt="" onClick={()=>{window.open({file})}}/></p>
      <p className='Text'>{title}</p>
      <p className='Person'>{user.id}</p>
      <p className='Day'>{regdate.split('T15',1)}</p>
    </div>
  );
};

export default CompFHpost;