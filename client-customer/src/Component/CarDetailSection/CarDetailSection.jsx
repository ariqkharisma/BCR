import React, {Fragment, useEffect, useState} from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DateRange } from 'react-date-range';
import { useDispatch, useSelector } from "react-redux";
import { carsGetById } from "../../Feature/Cars/cars-slice";
import { orderPost } from "../../Feature/Order/order-slice";
import SearchBar from "../SearchBar/SearchBar";
import './CarDetailSection.css';



function CarDetailSection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const car = useSelector(state => {return state.cars.car});
   
    const user = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState(true);


    const [carName, setCarName] = useState('');
    const [carCategory, setCarCategory] = useState('');
    const [carPrice, setCarPrice] = useState('');
    const [carStatus, setCarStatus] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();

    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
    ]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [dateDisplay, setDateDisplay] = useState('d-none')

    let { id } = useParams();

    const handleSubmit = async () => {
        if (!user) {
            alert('Kamu belum login, silahkan login terlebih dahulu untuk melanjutkan pembayaran');
            navigate('/login');
        }
        const values = {
            start_rent_at: date[0].startDate,
            finish_rent_at: date[0].endDate,
            car_id: car && car.id,
            user_id: user && user.user.id,
            status: 'unpaid',
            car: car && car.id,
            user: user && user.user.id,
        }
        const { payload } = await dispatch(orderPost(values));
        navigate(`/order/${payload.data.id}`);
    }

    const getCar = async() => {
        try {
            await dispatch(carsGetById(id));
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
        
    }

    function getNumberOfDays(start, end) {
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

    useEffect(() => {
        getCar();
    },[])

   
    return (
        <Fragment>
            <SearchBar carName={carName} setCarName={setCarName} carCategory={carCategory} setCarCategory={setCarCategory} carPrice={carPrice} setCarPrice={setCarPrice} carStatus={carStatus} setCarStatus={setCarStatus} setSearchParams={setSearchParams}/>
            { loading === false ? (
                car && car.id && car.attributes ? (
                <section className="mb-5" id="carDetail">
                    <div className="container">
                        <div className="row d-flex flex-row-reverse justify-content-evenly mx-1">
                            <div className="col-lg-4">
                                <div className="row card p-3">
                                    <div className="py-2">
                                        {car.attributes.image.data? (<img src={car.attributes.image.data.attributes.formats.small.url} alt="car" style={{width: '100%', height: '100%'}} /> ) : (<img src="/Assets/dummy.png" alt="car" style={{width: '100%'}} /> )} 
                                    </div>
                                    <div className="d-flex flex-column">
                                        {car.attributes.name? (<h4>{car.attributes.name}</h4>) : <h4>Tidak ada nama</h4> }
                                        {car.attributes.category? (<p className="font-weight-normal mb-1"><i className="fa-regular fa-user mr-2"></i> {car.attributes.category}</p>) : (<p className="font-weight-normal mb-1"><i className="fa-regular fa-user mr-2"></i>tidak ada data</p>)}
                                        {car.attributes.price? (<p className="font-weight-normal"><i className="fa-solid fa-dollar-sign mr-3"></i>Rp {car.attributes.price.toLocaleString('en-US')}/hari</p>) : (<p className="font-weight-normal"><i className="fa-solid fa-dollar-sign mr-3"></i> Rp. 0</p>)}
                                    </div>
                                    <div className="width-100">
                                        <form>
                                            <label htmlFor="rentalDate" className="font-weight-normal">Tentukan lama sewa mobil</label>
                                            <input required name="rental-date" id="rentalDate" value={date[0].startDate && date[0].endDate ? date[0].startDate.toLocaleString('id').slice(0, 10) + " - " + date[0].endDate.toLocaleString('id').slice(0, 10) : ''} className="px-2" style={{height: "36px", width: "100%"}} onFocus={() => setDateDisplay('d-flex')} onChange={() => {setStartDate(date[0].startDate); setEndDate(date[0].endDate)}}></input>
                                        </form>
                                        
                                        <div className={`flex-column position-absolute ml-3 ${dateDisplay}`} style={{zIndex: '1000', left: '0'}}>
                                            <DateRange
                                                editableDateInputs={true}
                                                onChange={item => setDate([item.selection])}    
                                                moveRangeOnFirstSelection={false}
                                                ranges={date}
                                                rangeColors={['#35B0A7']}
                                                dateDisplayFormat='d MMM yyyy'
                                                className="border"
                                            />
                                            <button className="btn text-light" style={{width:'334px', backgroundColor:'#35B0A7'}} onClick={() => {setDateDisplay('d-none')}}>Pilih Tanggal</button> 
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between my-3">
                                        <h5>Total</h5>
                                        {car.attributes.price? (<h5>Rp {date[0].endDate ? (car.attributes.price * getNumberOfDays(date[0].startDate, date[0].endDate)).toLocaleString('en-US') : car.attributes.price.toLocaleString('en-US')}</h5>) : (<h5>Rp. 0</h5>)}
                                    </div>
                                    <div>
                                        {date[0].endDate ? <button className="btn btn-success text-light w-100 mb-2" onClick={handleSubmit}>Lanjutkan Pembayaran</button> : <button disabled className="btn btn-success text-light w-100 mb-2">Lanjutkan Pembayaran</button> }
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 card p-4">
                                <h4>Tentang Paket</h4>
                                <h5 className="my-3">Include</h5>
                                <ul className="lh-lg" style={{listStyleType: "disc"}}>
                                    <li>Apa saja yang termasuk dalam paket misal durasi max 12 jam</li>
                                    <li>Sudah termasuk bensin selama 12 jam</li>
                                    <li>Sudah termasuk Tiket Wisata </li>
                                    <li>Sudah termasuk Tiket Wisata </li>
                                </ul>
                                <h5 className="my-3">Exclude</h5>
                                <ul className="lh-lg" style={{listStyleType: "disc"}}>
                                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                                    <li>Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam</li>
                                    <li>Tidak termasuk akomodasi penginapan</li>
                                </ul>
                                <h5 className="my-3">Refund, Reschedule, Overtime</h5>
                                <ul className="lh-lg" style={{listStyleType: "disc"}}>
                                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                                    <li>Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam</li>
                                    <li>Tidak termasuk akomodasi penginapan</li>
                                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                                    <li>Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam</li>
                                    <li>Tidak termasuk akomodasi penginapan</li>
                                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                                    <li>Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam</li>
                                    <li>Tidak termasuk akomodasi penginapan</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section> ) 
                : (<h2 className="d-flex justify-content-center m-5"> Mobil Tidak Ditemukan</h2>)
            )
             : (<h2 className="d-flex justify-content-center m-5">Loading...</h2>) 
            }
        </Fragment>
        )
    }


export default CarDetailSection;