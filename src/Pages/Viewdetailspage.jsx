import React, { useEffect } from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import ViewDetails from '../Layout/ViewDetails'

function Viewdetailspage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Header />
            <ViewDetails />
            <Footer />
        </div>
    )
}

export default Viewdetailspage