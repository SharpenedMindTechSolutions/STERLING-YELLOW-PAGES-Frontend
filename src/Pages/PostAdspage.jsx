import React, { useEffect } from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import PostAds from '../Components/Common/PostAds'
import QuickContact from '../Components/Common/QuickContact';
import { useParams } from 'react-router-dom';

function PostAdspage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();

  return (
    <div>
      <QuickContact />
      <Header />
      <PostAds />
      <Footer />
    </div>
  )
}

export default PostAdspage