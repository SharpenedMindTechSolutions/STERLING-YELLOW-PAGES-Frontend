import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion'; 

const API = import.meta.env.VITE_API_BASE_URL ;

function BranchDetails() {
    const [branchData, setBranchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const res = await axios.get(`${API}user/ads/get-branch`);
                setBranchData(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching branch data:', err);
                setError('Failed to load branch data');
                setLoading(false);
            }
        };

        fetchBranches();
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Loading branch details...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        hover: { scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.15)' },
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-10">
            <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4">
                All Branch Details in Tamil Nadu Location
            </h1>

            {branchData.map((region, index) => (
                <div key={index}>
                    <h2 className="text-2xl font-bold text-black mb-6 border-b pb-2">
                        {region.region}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
                        {region.branches.map((branch, i) => (
                            <motion.div
                                key={i}
                                className="bg-yellowCustom border border-yellowCustom rounded-md p-4 shadow-sm text-black cursor-pointer"
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                variants={cardVariants}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                                {/* City */}
                                <h3 className="text-lg font-semibold flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-black" />
                                    {branch.city}
                                </h3>

                                {/* Address */}
                                <p className="text-sm mt-1">{branch.address}</p>

                                {/* Phone Numbers */}
                                {branch.phones?.length > 0 && (
                                    <div className="mt-2 flex items-center text-sm">
                                        <Phone className="w-4 h-4 mr-1 text-black" />
                                        <p>{branch.phones.join(', ')}</p>
                                    </div>
                                )}

                                {/* Email */}
                                {branch.email && (
                                    <div className="flex items-center text-sm mt-1">
                                        <Mail className="w-4 h-4 mr-1 text-black" />
                                        <p>{branch.email}</p>
                                    </div>
                                )}

                                {/* Website */}
                                {branch.web && (
                                    <p className="text-sm text-blue-600 underline mt-2">
                                        <a
                                            href={`https://${branch.web}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {branch.web}
                                        </a>
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BranchDetails;
