import React, { Fragment } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { orderGetById } from '../../Feature/Order/order-slice';
import { useParams } from 'react-router-dom';


function EtiketSection() {
    const dispatch = useDispatch();
    const { order } = useSelector(state => {return state.order});
    const { id } = useParams();

    useEffect(() => {
        dispatch(orderGetById(id));
    }, [])
  
  return (
    <section id='etiketSection'>
        <div className="container">
            { order && order.status === 'paid'? 
            <>
            <div className="text-center pt-2">
                <i className="fa-solid fa-check p-2 m-3" style={{fontSize: '24px', color: 'white', backgroundColor: '#5CB85F', borderRadius:'50%'}}></i>
                <h5>Pembayaran berhasil!</h5>
                <p className='fw-normal'>Tunjukkan invoice ini ke petugas BCR di titik temu.</p>
            </div>
            <div className="d-flex justify-content-center">
                <div className="card mt-3 shadow p-3 mb-5 bg-body rounded w-75">
                    <div className="card-body">
                        <div className="d-flex flex-row justify-content-between">
                            <div className="p-2">
                                <h5>Invoice</h5>
                                <p className='fw-normal'>*no invoice</p>
                            </div>
                            <div className="p-2">
                                <button type="button" className="d-flex btn" style={{border:'solid 1px #0D28A6'}}>
                                    <i className="fa-solid fa-download" style={{color: '#0D28A6'}}></i>
                                    <p className="ml-2 mb-0" style={{color: '#0D28A6'}}>Unduh</p>
                                </button>
                            </div>
                        </div>

                        <div
                            style={{
                                border: '1px solid rgba(0, 0, 0, .3)',
                                display: 'flex',
                                justifyContent: 'center',
                                height: '162px',
                                marginBottom: '24px',
                                overflow: 'hidden',
                            }}
                        >
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                                <Viewer width={700} fileUrl="/sample.pdf" />
                            </Worker>
                        </div >
                    </div>
                </div>
            </div>
            </> : <h1>menunggu konfirmasi</h1>
            }
        </div>
    </section>
  )
}

export default EtiketSection;