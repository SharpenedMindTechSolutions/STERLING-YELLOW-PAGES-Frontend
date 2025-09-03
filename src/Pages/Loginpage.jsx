import React, { useEffect } from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import Login from '../Components/Auth/Login'


function Loginpage() {
    useEffect(() => {
            window.scrollTo(0, 0);
          }, []);
    return (
        <div>
            <Header />
            <Login />
            <Footer />

        </div>
    )
}

export default Loginpage