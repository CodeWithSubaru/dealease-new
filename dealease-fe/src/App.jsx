import { GlobalStyles } from './GlobalStyle.style';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Buyer/Home';
import { Message } from './Pages/Buyer/Message';

function App() {
  return (
    <div>
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/message' element={<Message />} />
      </Routes>
    </div>
  );
}

export default App;
