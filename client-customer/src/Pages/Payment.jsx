import React, { Fragment } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from '../Component/Footer/Footer'
import Header from '../Component/Header/Header'
import OrderDetailBar from '../Component/OrderDetailBar/OrderDetailBar'
import PaymentDetail from '../Component/PaymentDetail/PaymentDetail'
import PaymentTransfer from '../Component/PaymentTransfer/PaymentTransfer'
import ProgressBar from '../Component/ProgressBar/ProgressBar'
import { carsGetById } from '../Feature/Cars/cars-slice'
import { orderGetById } from '../Feature/Order/order-slice'
import NotFound from './NotFound'

function Payment() {
  const dispatch = useDispatch();
  const order = useSelector(state => {return state.order.order});
  const car = useSelector(state => {return state.cars.car});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('payment method');
  const [bank, setBank] = useState();

  const { id } = useParams();

  const getNumberOfDays = (start, end) => {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}

  const getData = async() => {
    try {
      const { payload } = await dispatch(orderGetById(id));
      await dispatch(carsGetById(payload.data.attributes.car_id));
      setLoading(false)
    } catch (error) {
      setLoading(false);
    }    
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    page == 'payment method' ? (
      !loading ? (
        order? (
          <Fragment>
              <Header height={'266px'}/>
              <ProgressBar page={page} setPage={setPage} car={car}/>
              <OrderDetailBar order={order} car={car} />
              <PaymentDetail order={order} car={car} bank={bank} setBank={setBank} setPage={setPage} getNumberOfDays={getNumberOfDays} />
              <Footer />
          </Fragment>
        ) : <NotFound />
      ) : (
        <h1 className='w-100 d-flex justify-content-center align-items-center border' style={{height: '100vh'}}>Loading...</h1>
      )
    ) : page === 'transfer' && 
    <Fragment>
      <Header height={'200px'} />
      <ProgressBar page={page} setPage={setPage} car={car}/>
      <PaymentTransfer order={order} car={car} bank={bank}  getNumberOfDays={getNumberOfDays} />
      <Footer />
    </Fragment>
  )
}

export default Payment;