import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { carsGetById } from '../../Feature/Cars/cars-slice';

function PaymentDetail({order, car, bank, setBank, setPage, getNumberOfDays}) {
    const diffOfDays = getNumberOfDays(order.attributes.start_rent_at, order.attributes.finish_rent_at);
    const totalPrice = (diffOfDays * car.attributes.price).toLocaleString('en-US');

    return (
        <section className="mb-5" id="paymentDetail">
            <div className="container">
                <div className="row d-flex justify-content-evenly mx-1">
                    <div className="col-lg-7 p-0">
                        <div className='card p-4'>
                            <h5>Pilih Bank Transfer</h5>
                            <p className='font-weight-normal'>Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau Mobile Banking</p>
                            <div>
                                <div className='d-flex py-3' style={{borderBottom: '1px solid #EEEEEE', cursor: 'pointer'}} onClick={() => {setBank('BCA')}}>
                                    <p className='m-0 py-2 d-flex justify-content-center align-items-center card' style={{width:'85px'}}>BCA</p>
                                    <p className='m-0 px-3 d-flex align-items-center font-weight-normal'>BCA Transfer</p>
                                    {bank === 'BCA' && <h3 className='m-0 px-4 py-1 d-flex align-items-center' style={{ position: 'absolute', right: '0'}}><i className="fa-solid fa-check" style={{color: '#5CB85F'}}></i></h3>}
                                </div>
                                <div className='d-flex py-3' style={{borderBottom: '1px solid #EEEEEE', cursor: 'pointer'}} onClick={() => {setBank('BNI')}}>
                                    <p className='m-0 py-2 d-flex justify-content-center align-items-center card' style={{width:'85px'}}>BNI</p>
                                    <p className='m-0 px-3 d-flex align-items-center font-weight-normal'>BNI Transfer</p>
                                    {bank === 'BNI' && <h3 className='m-0 px-4 py-1 d-flex align-items-center' style={{ position: 'absolute', right: '0'}}><i className="fa-solid fa-check" style={{color: '#5CB85F'}}></i></h3>}
                                </div>
                                <div className='d-flex py-3' style={{borderBottom: '1px solid  #EEEEEE', cursor: 'pointer'}} onClick={() => {setBank('Mandiri')}}>
                                    <p className='m-0 py-2 d-flex justify-content-center align-items-center card' style={{width: '85px'}}>Mandiri</p>
                                    <p className='m-0 px-3 d-flex align-items-center font-weight-normal'>Mandiri Transfer</p>
                                    {bank === 'Mandiri' && <h3 className='m-0 px-4 py-1 d-flex align-items-center' style={{ position: 'absolute', right: '0'}}><i className="fa-solid fa-check" style={{color: '#5CB85F'}}></i></h3>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 card p-4">
                        <div>
                            <h5 className="mb-1" >{car && car.attributes && car.attributes.name}</h5>
                            <p className='font-weight-normal'><i className="fa-regular fa-user mr-2"></i>{car && car.attributes && car.attributes.category}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p>Total</p>
                            <p>Rp. {totalPrice}</p>
                        </div>
                        <div style={{borderBottom: 'solid #D0D0D0 2px'}}>
                            <p className='mb-1'>Harga</p>
                            <ul className='p-0'>
                                <li className='d-flex justify-content-between font-weight-normal'>
                                    <p className='mb-1'>Sewa Mobil Rp. {car.attributes.price.toLocaleString('en-US')} x {diffOfDays} Hari</p>
                                    <p className='mb-1'>Rp. {totalPrice}</p>
                                </li>
                            </ul>
                            <p className='mb-1'>Biaya Lainnya</p>
                            <ul className='p-0'>
                                <li className='d-flex justify-content-between font-weight-normal'>
                                    <p className='mb-1'>Pajak</p>
                                    <p className='mb-1 text-success'>Termasuk</p>
                                </li>
                                <li className='d-flex justify-content-between font-weight-normal'>
                                    <p className='mb-1'>Biaya makan supir</p>
                                    <p className='mb-1 text-success'>Termasuk</p>
                                </li>
                            </ul>
                            <p className='mb-1'>Belum Termasuk</p>
                            <ul className='p-0'>
                                <li className='d-flex justify-content-between font-weight-normal'>
                                    <p className='mb-1'>Bensin</p>
                                </li>
                                <li className='d-flex justify-content-between font-weight-normal'>
                                    <p className='mb-1'>Tol dan parkir</p>
                                </li>
                            </ul>                        
                        </div>
                        <div className='d-flex justify-content-between mt-3'>
                            <h5>Total</h5>
                            <h5>Rp. {totalPrice}</h5>
                        </div>
                        <div>
                            {bank ? <button className='btn btn-success w-100 mt-3' onClick={() => setPage('transfer')}>Bayar</button> : <button className='btn btn-success w-100 mt-3' disabled>Bayar</button>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PaymentDetail