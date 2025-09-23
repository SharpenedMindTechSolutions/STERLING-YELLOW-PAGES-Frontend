import React, { useEffect } from 'react'
import Header from '../../Layout/Header'
import Footer from '../../Layout/Footer'
import Profile from '../../User/Profile'
import QuickContact from '../../Components/Common/QuickContact'

function Profilepage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <QuickContact />
            <Header />
            <Profile />
            <Footer />
        </div>
    )
}

export default Profilepage