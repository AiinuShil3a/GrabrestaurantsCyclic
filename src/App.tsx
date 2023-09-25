import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Navbar from './component/navbar'; // Updated import with capitalized component name
import Restaurant from './pages/restaurant'; // Updated import with capitalized component name
import Add from './pages/add'; // Updated import with capitalized component name
import Search from './pages/search'; // Updated import with capitalized component name
import Edit from './pages/edit';
import SingIn from './pages/signIn'; // Updated import with capitalized component name
import SingUp from './pages/signup'; // Updated import with capitalized component name


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
          <Route path='/signinorsignup' element={<SingIn />} />
          <Route path="/signup" element={<SingUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
