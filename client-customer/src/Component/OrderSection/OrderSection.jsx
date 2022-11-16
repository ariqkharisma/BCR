import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderGetAll } from '../../Feature/Order/order-slice';

function OrderSection() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const orders = useSelector(state => {return state.order.orders});

    const getAllOrders = async() => {
        try {
            setLoading(true);
            const res = await dispatch(orderGetAll());
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
        
    }

    useEffect(() => {
        getAllOrders();
    },[])

    return (
        <section id='orderSection' className='mb-5'>
            <div className='container'>
                <h1 style={{position:'absolute', top: '140px'}}>My Order</h1>
                <div className='row'>
                {!loading ? 
                    (orders.length ? 
                        orders.map((order, index) => {
                            return (
                                <a key={index} href={`/order/${order.id}`} className='text-black text-decoration-none col-md-4'>
                                    <div className='card p-3'>
                                        <div className='row'>
                                            <div className='col-4'>
                                                <p className='font-weight-normal text-light p-1 mb-0 d-flex justify-content-center' style={{backgroundColor: '#0D28A6', width: '100px'}}>{order.createdAt.slice(0, 10)}</p>
                                            </div>
                                            <div className='col-5 d-flex justify-content-center align-items-center'> 
                                                <p className='mb-0'>Order ID: <span className='font-weight-normal'>{order.id}</span></p>
                                            </div>
                                            <div className='col-3 d-flex justify-content-center align-items-center'>
                                                {order.status === 'paid' ? <p className='mb-0 text-success'>{order.status}</p> : <p className='mb-0 text-danger'>{order.status}</p>
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )
                        }) : <h3 className='d-flex justify-content-center mt-3'>Belum Ada Order</h3>) : 
                    <h3 className='d-flex justify-content-center mt-3'>Loading...</h3>}
                </div>
            </div>
        </section>
    )
}

export default OrderSection;