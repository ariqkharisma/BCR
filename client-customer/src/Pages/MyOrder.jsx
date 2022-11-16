import React, { Fragment } from 'react';
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import OrderSection from '../Component/OrderSection/OrderSection';


function MyOrder() {
  const { isLoggedIn } = useSelector(state => {return state.auth});
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn && navigate('/login');
  })

  return (
    isLoggedIn &&
    <Fragment>
        <Header height={'200px'}/>
        <OrderSection />
        <Footer />
    </Fragment>
  )
}

export default MyOrder