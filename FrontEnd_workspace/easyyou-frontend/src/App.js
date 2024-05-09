import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompFooter from "./component/CompFooter";
import CompHeader from "./component/CompHeader";
import CompMain from "./component/CompMain";
import CompBoardD from "./component/BoardD/CompBoardD"
import CompBoardF from "./component/BoardF/CompBoardF"
import CompYou from './component/Portfolio/CompYou';
import CompEasy from './component/Portfolio/CompEasy';
import CompLogin from './component/CompLogin';
import CompMember from './component/CompMember';
import { createContext, useEffect, useState } from 'react';
import CompBoardDI from './component/BoardD/CompBoardDI';
export const AppContext = createContext()

function UserId() {
  let userId
  let userLogin
  if (window.localStorage.getItem('UserStorage')) {
    userId = JSON.parse(window.localStorage.getItem('UserStorage'))
    userLogin = true
  }
  else {
    userId = ''
    userLogin = false
  }
  return { userId, userLogin }
}

function App() {
  const [_isLogin, _setIsLogin] = useState(UserId().userLogin)
  const [_loginId, _setLoginId] = useState(UserId().userId.id)

  useEffect(() => {
    setTimeout(() => {
      window.localStorage.setItem('UserStorage','')
    },1000*30)
  })
  return (
    <div className="App">
      <BrowserRouter>
        <AppContext.Provider value={{ _isLogin, _setIsLogin, _loginId, _setLoginId }}>
          <CompHeader></CompHeader>
          <Routes>
            <Route path='/' element={<CompMain />} />
            <Route path='/BoardD' element={<CompBoardD />} />
            <Route path='/BoardDI' element={<CompBoardDI/>}/>
            <Route path='/BoardF' element={<CompBoardF />} />
            <Route path='/YouPort' element={<CompYou />} />
            <Route path='/EasyPort' element={<CompEasy />} />
            <Route path='/login' element={<CompLogin />} />
            <Route path='/Member' element={<CompMember />} />
          </Routes>
        </AppContext.Provider>
        <CompFooter></CompFooter>
      </BrowserRouter>
    </div>
  );
}

export default App;
