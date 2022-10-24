import React from 'react'


function OrderDetailBar({order, car}) {

    return (
        <section id="orderDetailBar" className="mb-5" style={{marginTop: "-90px"}}>
                <div className="container d-flex justify-content-center">
                    <div className="card p-4" style={{boxShadow:"0 0 10px rgba(0, 0, 0, 0.1)", width: "100%"}}>
                        <h5>Detail Pesananmu</h5>
                        <div className="order-detail row">
                            <div className="col-md-3 col-6 d-flex flex-column">
                                <p className='m-0'>Nama Mobil</p>
                                <p style={{fontWeight: 400}} className='m-0'>{car && car.attributes && car.attributes.name}</p>
                            </div>

                            <div className="col-md-3 col-6 d-flex flex-column">
                                <p className="m-0">Kategori</p>
                                <p style={{fontWeight: 400}} className='m-0'>{car && car.attributes && car.attributes.category}</p>
                            </div>

                            <div className="col-md-3 col-6 d-flex flex-column">
                                <p className='m-0'>Mulai Sewa</p>
                                <p style={{fontWeight: 400}} className='m-0'>{order && order.attributes && order.attributes.start_rent_at}</p>
                            </div>

                            <div className="col-md-3 col-6 d-flex flex-column">
                                <p className='m-0'>Selesai Sewa</p>
                                <p style={{fontWeight: 400}} className='m-0'>{order && order.attributes && order.attributes.finish_rent_at}</p>
                            </div>
                        </div>                 
                    </div>
                </div>
            </section>
    )
}

export default OrderDetailBar