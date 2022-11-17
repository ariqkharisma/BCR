import { React, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";


const useNavigateSearch = () => {
    const navigate = useNavigate();
    return (pathName, params) => navigate(`${pathName}?${createSearchParams(params)}`);
}


function SearchBar() {
    const [carName, setCarName] = useState('');
    const [carCategory, setCarCategory] = useState('');
    const [carPrice, setCarPrice] = useState(0);
    const [isRented, setIsRented] = useState('');
    
    const navigateSearch = useNavigateSearch();
    const goToSearch = () => navigateSearch('/search', {name: `${carName}`, category:`${carCategory}`, price: `${carPrice}`, isRented:`${isRented}`});
    
    const handleOnClick = async (e) => {
        e.preventDefault();
        if (carName && carCategory && carPrice && isRented) {
            goToSearch();
        } else alert('Semua Kolom Pencarian Harus Diisi')
    }

    return (
        <section id="searchBar" className="mb-5" style={{marginTop: "-90px"}}>
            <div className="container d-flex justify-content-center">
                <div className="card p-3" style={{boxShadow:"0 0 10px rgba(0, 0, 0, 0.1)", width: "100%"}}>
                    <h5>Pencarian</h5>
                    <form>
                        <div className="row">
                            <div className="col-lg-3 d-flex flex-column justify-content-between">
                                <label htmlFor="name">Nama Mobil</label>
                                <input placeholder="Masukkan Nama Mobil" required className="p-2" type="text" id="name" name="name" style={{height: '35px'}} onChange={(e) => {setCarName(e.target.value)}}/>
                            </div>

                            <div className="col-lg-3 d-flex flex-column justify-content-between">
                                <label htmlFor="category">Kategori</label>
                                <select onChange={e => setCarCategory(e.target.value)} required className="p-2" name="category" id="category" style={{height: '35px'}}>
                                    <option value="">Pilih Kapasitas Mobil</option>
                                    <option value="small"> Small</option>
                                    <option value="medium"> Medium</option>
                                    <option value="big"> Large</option>
                                </select>
                            </div>

                            <div className="col-lg-3 d-flex flex-column justify-content-between">
                                <label htmlFor="price">Harga Maksimum</label>
                                <input placeholder="Masukkan Harga Mobil Maksimum" onChange={e => setCarPrice(e.target.value)} required className="p-2" name="price" id="price" style={{height: '35px'}} />
                        
                            </div>

                            <div className="col-lg-2 d-flex flex-column justify-content-between">
                                <label htmlFor="status">Status</label>
                                <select onChange={e => setIsRented(e.target.value)} required className="p-2" name="status" id="status" style={{height: '35px'}}>
                                    <option value="">Pilih Status</option>
                                    <option value="true">Sedang Disewa</option>
                                    <option value="false">Tersedia</option>
                                </select>
                            </div>

                            <div className="col-lg-1 d-flex align-items-end">
                                <button onClick={handleOnClick} className="btn btn-success p-1" style={{width: "100%"}}>Cari</button>
                            </div>
                        </div>
                    </form>                    
                </div>
            </div>
        </section>
    )
}



export default SearchBar;