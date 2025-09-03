import React, { useEffect } from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import Forgotpassword from '../Components/Auth/Forgotpassword'

function Forgotpasswordpage() {
     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div>
        <Header/>
        <Forgotpassword/>
        <Footer/>
    </div>
  )
}

export default Forgotpasswordpage