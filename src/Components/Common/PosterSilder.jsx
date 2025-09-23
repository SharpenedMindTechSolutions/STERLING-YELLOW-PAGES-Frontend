import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL ;


export default function PosterSlider() {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Fetch ads with auth header
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get(`${API}user/ads/getads`);
        const adsArray = Array.isArray(res.data) ? res.data : res.data?.ads;
        if (adsArray && Array.isArray(adsArray)) {
          const formatted = adsArray.map(ad => ({
            id: ad._id,
            image: ad.imageUrl || ad.image || "",
            title: ad.title || "",
            date: ad.date || "",
          }));
          setAds(formatted);
        } else {
          setAds([]);
        }
      } catch (err) {
        console.error("Failed to fetch ads", err);
        setAds([]);
      }
    };

    fetchAds();
  }, []);


  const totalSlides = ads.length;

  const goNext = () => setCurrentIndex(prev => (prev + 1) % totalSlides);
  const goPrev = () => setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  const goTo = (index) => setCurrentIndex(index);

  useEffect(() => {
    if (ads.length > 0) {
      const interval = setInterval(goNext, 5000);
      return () => clearInterval(interval);
    }
  }, [ads]);

  if (ads.length === 0) {
    return (
      <section className="w-full py-12 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
          No Ads Available Yet
        </h2>
        <p className="text-gray-500 mt-2">Check back soon for new advertisements!</p>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto sm:px-2 mt-10 mb-6">
        <div className="p-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Recently Posted Ads
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mt-2">
            Catch the latest opportunities and promotions!
          </p>
        </div>

        {/* Nav buttons */}
        <button
          onClick={goPrev}
          className="absolute top-1/2 left-4 z-20 -translate-y-1/2 hidden sm:flex bg-yellowCustom hover:bg-gray-200 p-0 sm:p-3 rounded-full shadow"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goNext}
          className="absolute top-1/2 right-4 z-20 -translate-y-1/2 hidden sm:flex bg-yellowCustom hover:bg-gray-200 p-0 sm:p-3 rounded-full shadow"
        >
          <ChevronRight className="w-6 h-6" />
        </button>


        {/* Slider */}
        <div className="overflow-hidden w-full pt-4 ">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}vw)`,
              width: `${totalSlides * 100}vw`,
            }}
          >
            {ads.map((ad) => (
              <div key={ad.id} className="w-screen flex-shrink-0  ">
                <div className="relative h-60 sm:h-60 md:h-[500px] overflow-hidden ">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-90 py-4">
                    <div className="max-w-7xl mx-auto">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-yellowCustom">
                        {ad.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-yellowCustom">
                        {new Date(ad.date).toDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="max-w-7xl mx-auto px-4 pb-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mt-6 space-x-2">
              {ads.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`h-3 w-3 rounded-full transition ${currentIndex === idx ? 'bg-yellow-500' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>




      </div>
    
    </section>
  );
}
