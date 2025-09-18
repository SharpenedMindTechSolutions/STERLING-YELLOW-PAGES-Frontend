import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Searchpage from './Pages/Searchpage';
import Categoriespage from './Pages/Categoriespage';
import Viewdetailspage from './Pages/Viewdetailspage';
import Contactpage from './Pages/Contactpage';
import Registerpage from './Pages/Registerpage';
import Loginpage from './Pages/Loginpage';
import Forgotpasswordpage from './Pages/Forgotpasswordpage';
import Resetpasswordpage from './Pages/Resetpasswordpage';
import PostAdspage from './Pages/PostAdspage';
import UserDashboardpage from './Pages/userpage/UserDashboardpage';
import Profilepage from './Pages/userpage/Profilepage';
import AdminRegisterpage from './Components/admin/adminpage/AdminRegisterpage';
import AdminLoginpage from './Components/admin/adminpage/AdminLoginpage';
import AdminDashboard from './Components/admin/adminpage/AdminDashboard';
import Searchservicespage from './Pages/userpage/Searchservicespage';
import IndividualCategoryPage from "./Pages/IndividualCategory";
import Aboutuspage from './Pages/Aboutuspage';
import CategoryviewDetailspage from './Pages/userpage/CategoryviewDetailspage';


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/forgot-password" element={<Forgotpasswordpage />} />
          <Route path="/reset-password/:token" element={<Resetpasswordpage />} />
          <Route path="aboutus" element={<Aboutuspage />} />
          <Route path="/search" element={<Searchpage />} />
          <Route path="/searchservice" element={<Searchservicespage />} />
          <Route path="/categories" element={<Categoriespage />} />
          <Route path="/viewdetail/:id" element={<Viewdetailspage />} />
          <Route path="contact" element={<Contactpage />} />
          <Route path="/category/:categoryName" element={<IndividualCategoryPage />} />
          <Route path="/categoryviewdetail/:id" element={<CategoryviewDetailspage/>} />
        

          {/* user dashboard routes */}
          <Route path='/post-ad/:id' element={<PostAdspage />} />
          <Route path="/dashboard/:id" element={<UserDashboardpage />} />
          <Route path="/profile/:id" element={<Profilepage />} />


          {/* admin dashbaord */}
          <Route path="admin/register" element={<AdminRegisterpage />} />
          <Route path="admin/login" element={<AdminLoginpage />} />
          <Route path="admin/dashboard/:id" element={<AdminDashboard />} />
        </Routes>
      </div>

    </BrowserRouter>
  )
}

export default App