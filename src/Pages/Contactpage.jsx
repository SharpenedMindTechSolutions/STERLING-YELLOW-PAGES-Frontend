import React from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import Contact from '../Components/Common/Contact'
import { useEffect } from 'react';
import ContactMap from '../Components/Common/ContactMap';
import BranchDetails from '../Components/Common/BranchDetails';
import { Link } from 'react-router-dom';
import QuickContact from '../Components/Common/QuickContact';


function Contactpage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <QuickContact />
            <Header />
            <div className="py-20 bg-yellowCustom">
                <div className="max-w-3xl mx-auto text-center px-4">
                    <h1 className="text-5xl font-bold text-black mb-4">Contact Us</h1>
                    <p className="text-xl text-black">
                        Get in touch with your nearest Yellow Pages branch. We’re here to help you connect with local businesses, services, and opportunities across Tamil Nadu.
                    </p>
                </div>
            </div>
            <Contact />
            <ContactMap />
            <BranchDetails />
            {/* call to action  */}
            <div className="bg-black text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Don't see your business category?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        We're always adding new categories. Contact us to suggest one!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            viewTransition

                            to="/contact"
                            className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                        >
                            Contact Us
                        </Link>
                        <Link
                            to="/login"
                            viewTransition

                            className="bg-yellowCustom text-black px-8 py-3 rounded-lg  transition-colors font-medium"
                        >
                            List Your Business
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contactpage