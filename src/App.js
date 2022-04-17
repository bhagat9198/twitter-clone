import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/global.css';

import Home from './pages/Home';
import Post from './pages/Posts';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/query/:query' element={<Post />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
