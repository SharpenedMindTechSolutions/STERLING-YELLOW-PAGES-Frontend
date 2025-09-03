import React, { useEffect } from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import ResetPassword from '../Components/Auth/Resetpassword'

function Resetpasswordpage() {
     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div>
        <Header/>
        <ResetPassword/>
        <Footer/>
    </div>
  )
}

export default Resetpasswordpage