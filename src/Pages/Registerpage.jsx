import React, { useEffect } from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import Register from '../Components/Auth/Register'

function Registerpage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Header />
            <Register />
            <Footer />
        </div>
    )
}

export default Registerpage