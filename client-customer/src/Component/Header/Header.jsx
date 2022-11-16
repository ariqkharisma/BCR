import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../../Feature/Auth/auth-slice";


function Header(props) {
    const [sidebar, setSidebar] = useState('collapse');
    const dispatch = useDispatch();
    const auth = useSelector(state => {return state.auth});
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(authLogout());
        alert('anda berhasil logout');
        navigate(0);
    }

    return (
        <section id="hero" style={{minHeight: `${props.height}`}}>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container mt-3">
                    <a className="navbar-brand text-light px-3 ml-3" href="/">BinarRent</a>
                    <button onClick={() => setSidebar('show')} className="navbar-toggler" type="button"  aria-label='open sidebar'>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`sidebar-background ${sidebar}`} onClick={() => setSidebar('')}></div>
                    <div className={`navbar-collapse ${sidebar}`} id='navbarNav'>
                        <button onClick={() => setSidebar('')} className= {`close-navbar ${sidebar} justify-content-center align-items-center`} type='button' aria-label='close sidebar'>✕</button>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item mr-3">
                                <a className="nav-link" href="/#ourServices">Our Services</a>
                            </li>
                            <li className="nav-item mr-3">
                                <a className="nav-link" href="/#whyUs">Why Us</a>
                            </li>
                            <li className="nav-item mr-3">
                                <a className="nav-link" href="/#testimonial">Testimonial</a>
                            </li>
                            <li className="nav-item mr-3">
                                <a className="nav-link" href="/#faq">FAQ</a>
                            </li>
                            <li className="nav-item mr-3">
                            {auth.isLoggedIn? 
                                    <div className="btn-group d-flex flex-column">
                                        <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fa-regular fa-user mr-2"></i>{auth.user.user.username}
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="/order">My Order</a></li>
                                            <li><a className="dropdown-item" onClick={handleLogout} href="">Logout</a></li>
                                        </ul>
                                    </div> :
                                     <button className="nav-link btn bg-success text-light d-flex justify-content-center px-3" onClick={() => navigate('/signup')}>Register</button>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </section>
    )
}


export default Header;