import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { carsGetAll } from "../../Feature/Cars/cars-slice";
import SearchBar from "../SearchBar/SearchBar";



function CarSection() {
    const dispatch = useDispatch();
    const { cars } = useSelector(state => {return state.cars});
    const [loading, setLoading] = useState(true);
    
    // const [cars, setCars] = useState([]);
    // const [loading, setLoading] = useState(false);

    // const [carName, setCarName] = useState('');
    // const [carCategory, setCarCategory] = useState('');
    // const [carPrice, setCarPrice] = useState('');
    // const [carStatus, setCarStatus] = useState('');
    
    // const [searchParams, setSearchParams] = useSearchParams();
    // const carNameParams = searchParams.get('name');
    // const categoryParams = searchParams.get('category');
    // const priceParams = searchParams.get('price');
    // const statusParams = searchParams.get('isRented')
    

    // const handleLiveSearch = (data) => {
    //     // livesearch cuma bisa pake nama mobil, parameter lainnya belum bisa.
    //     const filteredData = data.filter((car) => {
    //         if (car.name && car.name.toLowerCase().includes(carName.toLowerCase())) {
    //             return true;
    //         }
    //     })
    //     setCars(filteredData);
    // }

    // const handleSearchWithParams = (data) => {
    //     const checkPrice = (price) => {
    //         if (price < 400000 && priceParams == 'lt400') {
    //             return true;
    //         } else if (price >= 400000 && price <= 600000 && priceParams == '400-600') {
    //             return true;
    //         } else if (price > 600000 && priceParams == 'gt600') {
    //             return true;
    //         } else false;
    //     } 
    
    //     const checkStatus = (status) => {
    //         if (status == false && statusParams == 'tersedia') {
    //             return true;
    //         } if (status == true && statusParams == 'disewa') {
    //             return true;
    //         } else false;
    //     }

    //     const filteredData = data.filter((car) => {
    //         if (car.name) {
    //             return car.name.toLowerCase() == carNameParams.toLowerCase() && car.category == categoryParams && checkPrice(car.price) && checkStatus(car.status);
    //         }
    //     })

    //     setCars(filteredData);
    // }
    
    const getAllCars = async() => {
        await dispatch(carsGetAll());
        setLoading(false);
    }

    useEffect(() => {
        getAllCars();
    },[/*carName, carNameParams, categoryParams, statusParams, priceParams*/])

    
    return (
        <Fragment>
            <SearchBar  />
            <section id="cars">
                <div className="container">
                    <div className="row">
                        {   loading === false? (
                                cars.length? (
                                    cars.map((car, index) => {
                                        return (
                                            <div key={index} className="col-lg-4 col-md-6">                   
                                                <div className="card p-3 d-flex flex-column justify-content-between" style={{height: '100%'}}>
                                                    {car.attributes.image? (<img src={car.attributes.image} alt="car" style={{width: '100%', height: '225px', objectFit:'cover'}} /> ) : (<img src="/Assets/dummy.png" alt="car" style={{width: '100%', height: '225px', objectFit:'cover'}}/> )}                                             
                                                    <div>
                                                        {car.attributes.name? (<p className="mt-3 mb-1">{car.attributes.name}</p>) : (<p className="mt-3 mb-1">Tidak ada nama</p>)}
                                                        {car.attributes.price? (<h5>Rp {car.attributes.price.toLocaleString('en-US')}/ Hari</h5>) : (<h5>Tidak Ada Harga</h5>)}
                                                        <p className="font-weight-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  </p>
                                                        <a href={`/car/${car.id}`} className="btn btn-success" style={{width:"100%"}}>Pilih Mobil</a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <h2 className="text-center">Mobil Tidak Ditemukan</h2>
                                )
                        ) : (<h2 className="d-flex justify-content-center">Loading...</h2>) 
                        }
                    </div>
                </div>
            </section>
        </Fragment>
        
    )
}


export default CarSection;
