import React, { useState } from 'react';
import { D_GArr, D_CArr, F_GArr, F_CArr } from '../DArr';
import CompDHpost from './DFpost/CompDHpost';
import CompDNpost from './DFpost/CompDNpost';
import CompFHpost from './DFpost/CompFHpost';
import CompFNpost from './DFpost/CompFNpost';

const CompMain = () => {
  const [_DGarr, _setDGarr] = useState(D_GArr)
  const [_DCarr, _setDCarr] = useState(D_CArr)
  const [_FGarr, _setFGArr] = useState(F_GArr)
  const [_FCarr, _setFCArr] = useState(F_CArr)

  return (
    <>
      <div className='Main-h'>
        <div className='board-d'>
          <h2>댓글 게시판</h2>
          <div className='board-d-h'>
            {
              _DGarr.map(v => <CompDHpost key={v.id} />)
            }
          </div>

          <div className='board-d-c'>
            {
              _DCarr.map(v => <CompDNpost key={v.id} />)
            }
          </div>
        </div>
        <div className='board-f'>
          <h2>댓글 게시판</h2>
          <div className='board-f-h'>
            {
              _FGarr.map(v => <CompFHpost key={v.id} />)
            }
          </div>  
          <div className='board-f-c'>
            {
              _FCarr.map(v => <CompFNpost key={v.id} />)
            }
          </div>
        </div>
      </div>
      <div className='Main-b'>
        <div className='card-e'>
          <h3>이지원</h3>
          <p>a@naver.com</p>
          <p>010-1234-5678</p>
        </div>
        <div className='card-y'>
          <h3>유태경</h3>
          <p>a@naver.com</p>
          <p>010-1234-5678</p>
        </div>
      </div>
    </>
  );
};

export default CompMain;