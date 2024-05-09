import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardService from '../../service/BoardService';
import CompBoardDT from './CompBoardDT';


const CompBoardD = () => {
  const [_data, _setData] = useState()
  const [_showPage, _setShowPage] = useState(3)
  const [_currentPage, _setCurrentPage] = useState(1)
  const [_totalPage, _setTotalPage] = useState()
  const [_arr, _setArr] = useState()
  const navigate = useNavigate()

  function fnClickBtn(e) {
    _setCurrentPage(parseInt(e.target.value))
    document.querySelectorAll('.page-nav > button').forEach(v => {
      v.classList.remove('active')
    })
    e.target.classList.add('active')
  }

  function fnClickPrev() {
    document.querySelectorAll('.page-nav > button').forEach(v => {
      v.classList.remove('active')
    })
    if (_currentPage <= 1) {
      alert('첫 페이지입니다.')
      document.querySelectorAll('.page-nav > button').forEach(v => {
        if (_currentPage === parseInt(v.value)) {
          v.classList.add('active')
        }
      })
    }
    else {
      _setCurrentPage(v => v - 1)
    }
  }

  function fnClickNext() {
    document.querySelectorAll('.page-nav > button').forEach(v => {
      v.classList.remove('active')
    })
    if (_currentPage < _totalPage) {
      _setCurrentPage(v => v + 1)
    }
    else {
      alert('마지막 페이지입니다.')
      document.querySelectorAll('.page-nav > button').forEach(v => {
        if (_currentPage === parseInt(v.value)) {
          v.classList.add('active')
        }
      })
    }
  }



  useEffect(() => {
    BoardService.getReplyBoardAll().then(res => {
      let firstBoard = ((_currentPage - 1) * _showPage)
      let lastBoard = _currentPage * _showPage
      let totalPage = Math.ceil((res.data.length) / _showPage)
      let arr = Array.from({ length: totalPage })
      _setTotalPage(totalPage)
      _setArr(arr)
      _setData(res.data.slice(firstBoard, lastBoard))
      document.querySelector('.page-nav > button').classList.remove('active')
      document.querySelectorAll('.page-nav > button').forEach(v => {
        if (_currentPage === parseInt(v.value)) {
          v.classList.add('active')
        }
      })
    })

  }, [_currentPage, _showPage])

  return (
    <div className='BoardD'>
      <div className='BoardD-t'>
        <h3>댓글게시판</h3>
        <button onClick={() => { navigate('/BoardDI') }}>글작성</button>
      </div>
      <div className='BoardD-m'>
        <select onClick={(e) => { _setShowPage(e.target.value) }}>
          <option value="3">3</option>
          <option value="6">6</option>
        </select>
        <span>검색:</span>
        <input type="text" />
      </div>
      <div className='BoardD-b'>
        <table className="BoardD-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>좋아요</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {
              (_data) &&
              _data.map((v, index) => <CompBoardDT data={v} key={index} />)
            }
          </tbody>
        </table>
      </div>
      <div className='page-nav'>
      <button onClick={fnClickPrev}>이전</button>
        {
          (_arr) && _arr.map((v, index) => <button onClick={fnClickBtn} key={index} value={index + 1}>{index + 1}</button>)

        }
        <button onClick={fnClickNext}>다음</button>
      </div>
    </div>
  );
};

export default CompBoardD;