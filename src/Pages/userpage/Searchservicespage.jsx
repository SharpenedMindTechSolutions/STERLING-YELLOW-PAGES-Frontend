import React, { useEffect, useState } from "react";
import QuickContact from "../../Components/Common/QuickContact";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import { MapPin, Phone } from "lucide-react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API = import.meta.env.VITE_API_BASE_URL;

function Searchservicespage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const location = searchParams.get("location") || "";
    const limit = 9; // items per page

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${API}user/ads/search`,
                    {
                        params: { q: query, category, location, page, limit },
                    }
                );
                setBusinesses(response.data.businesses);
                setTotalPages(response.data.pagination.totalPages);
            } catch (error) {
                console.error("Error fetching businesses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBusinesses();
    }, [query, category, location, page]);

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <QuickContact />
            <Header />

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight">
                    Search Results
                </h2>

                {loading ? (
                    <div className="text-center py-10">
                        <p className="text-gray-600 text-lg animate-pulse">Loading...</p>
                    </div>
                ) : businesses.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-600 text-lg">No businesses found.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {businesses.map((business) => (
                                <div
                                    key={business._id}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
                                >
                                    <div className="relative">
                                        <img
                                            src={business.images?.[0] || "/placeholder.jpg"}
                                            alt={business.name}
                                            className="w-full h-52 object-cover"
                                        />
                                        <span className="absolute top-3 left-3 bg-yellow-300 text-black text-xs font-medium px-3 py-1 rounded-full shadow">
                                            {business.category}
                                        </span>
                                    </div>

                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {business.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {business.description
                                                ? business.description.slice(0, 100) + (business.description.length > 100 ? "..." : "")
                                                : "No description available."}
                                        </p>

                                        <div className="mt-auto space-y-2 text-sm text-gray-700">
                                            <p className="flex items-center text-sm text-gray-600">
                                                <MapPin className="w-4 h-4 mr-2 text-yellow-500" />
                                                {business.address
                                                    ? business.address.slice(0, 30) + (business.address.length > 30 ? "..." : "")
                                                    : "Address not available"}
                                            </p>

                                            <p className="flex items-center">
                                                <Phone className="w-4 h-4 mr-2 text-yellow-500" />
                                                {business.phone || "N/A"}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => navigate(`/viewdetail/${business._id}`)}
                                            className="mt-5 w-full bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 text-black py-2 rounded-lg font-medium shadow-sm"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}


                        <div className="flex justify-center items-center gap-4 mt-10">
                            <button
                                onClick={handlePrev}
                                disabled={page === 1}
                                className={`px-4 py-2 rounded-lg flex items-center gap-1 ${page === 1
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-yellow-400 hover:bg-yellow-500 text-black"
                                    }`}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <span className="text-gray-700 font-medium">
                                {page} of {totalPages}
                            </span>

                            <button
                                onClick={handleNext}
                                disabled={page === totalPages}
                                className={`px-4 py-2 rounded-lg flex items-center gap-1 ${page === totalPages
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-yellow-400 hover:bg-yellow-500 text-black"
                                    }`}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default Searchservicespage;
