import React, { useEffect } from 'react'
import Header from '../../Layout/Header'
import QuickContact from '../../Components/Common/QuickContact';
import UserDashboard from '../../User/UserDashboard';
import Footer from '../../Layout/Footer';
import { useParams } from 'react-router-dom';

function UserDashboardpage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
        const { id } = useParams();
    return (
        <div>
            
            <QuickContact />
            <Header />
            <UserDashboard />
            <Footer />
        </div>
    )
}

export default UserDashboardpage


