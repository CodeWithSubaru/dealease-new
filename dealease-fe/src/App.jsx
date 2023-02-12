import './App.css';
import { Routes, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Home } from './Pages/Buyer/Home';
import { Message } from './Pages/Buyer/Message';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/message' element={<Message />} />
      </Routes>
    </div>
  );
}

export default App;
