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



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CompHeader></CompHeader>
        <Routes>
          <Route path='/' element={<CompMain />} />
          <Route path='/BoardD' element={<CompBoardD />} />
          <Route path='/BoardF' element={<CompBoardF />} />
          <Route path='/YouPort' element={<CompYou />} />
          <Route path='/EasyPort' element={<CompEasy />} />
          <Route path='/login' element={<CompLogin />} />
          <Route path='/Member' element={<CompMember />} />
        </Routes>
        <CompFooter></CompFooter>
      </BrowserRouter>
    </div>
  );
}

export default App;
