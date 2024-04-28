import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TestComponent from './component/TestComponent';

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<TestComponent/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
