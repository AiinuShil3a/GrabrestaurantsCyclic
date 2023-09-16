import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Navbar from './component/navbar'; // Updated import with capitalized component name
import Restaurant from './pages/restaurant'; // Updated import with capitalized component name
import Add from './pages/add'; // Updated import with capitalized component name
import Search from './pages/search'; // Updated import with capitalized component name
import Edit from './pages/edit';

function App() {
  
  return (
    <BrowserRouter>
      <Navbar />
      <div className='App'>
        <Routes>
          <Route path='/' element={<Restaurant />} />
          <Route path='/add' element={<Add />} />
          <Route path='/search' element={<Search />} />
          <Route path='/Edit/:restaurantId' element={<Edit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
