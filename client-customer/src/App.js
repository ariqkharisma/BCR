import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './App.css';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Car from './Pages/Car';
import CarDetail from './Pages/CarDetail';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Search from './Pages/Search'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Payment from './Pages/Payment';
import Etiket from './Pages/Etiket';
import MyOrder from './Pages/MyOrder';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='car'>
            <Route index element={<Car />} />
            <Route path=':id' element={<CarDetail />} />
          </Route>
          <Route path='search' element={<Search />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='etiket/:id' element={<Etiket />} />
          <Route path='order' element={<MyOrder />} />
          <Route path='order/:id' element={<Payment />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;