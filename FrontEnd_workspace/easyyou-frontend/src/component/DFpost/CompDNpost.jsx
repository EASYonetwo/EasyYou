import React from 'react';

const CompDNpost = ({data}) => {
  const { title , user,regdate} = data
  return (
    <div className='Dpost'>
      <span className='New'>New</span>
      <p className='Text'>{title}</p>
      <p className='Person'>{user.id}</p>
      <p className='Day'>{regdate.split('T',1)}</p>
    </div>
  );
};

export default CompDNpost;