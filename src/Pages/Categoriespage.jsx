import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Utensils,
    Stethoscope,
    Car,
    Scissors,
    Home,
    GraduationCap,
    Smartphone,
    Scale,
    Package // fallback icon
} from 'lucide-react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import QuickContact from '../Components/Common/QuickContact';

const iconMap = {
    utensils: Utensils,
    stethoscope: Stethoscope,
    car: Car,
    scissors: Scissors,
    home: Home,
    'graduation-cap': GraduationCap,
    smartphone: Smartphone,
    scale: Scale,
};

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setCategories([
                { id: 1, name: 'Restaurants', icon: 'utensils', businessCount: 25 },
                { id: 2, name: 'Hospitals', icon: 'stethoscope', businessCount: 10 },
                { id: 3, name: 'Car Services', icon: 'car', businessCount: 18 },
                { id: 4, name: 'Salons', icon: 'scissors', businessCount: 12 },
                { id: 5, name: 'Real Estate', icon: 'home', businessCount: 30 },
                { id: 6, name: 'Education', icon: 'graduation-cap', businessCount: 20 },
                { id: 7, name: 'Mobile Shops', icon: 'smartphone', businessCount: 15 },
                { id: 8, name: 'Legal Services', icon: 'scale', businessCount: 8 },
            ]);
            setLoading(false);
        }, 100);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <QuickContact />
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="bg-yellowCustom">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">Business Categories</h1>
                        <p className="text-xl text-black">
                            Explore businesses by category and find exactly what you're looking for
                        </p>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {loading ? (
                        <p className="text-center text-gray-500">Loading categories...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {categories.map((category) => {
                                const Icon = iconMap[category.icon] || Package;
                                return (
                                    <Link
                                        viewTransition
                                        key={category.id}
                                        to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 group"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellowCustom transition-colors">
                                                <Icon className="w-8 h-8 text-balck" />
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-yellowCustom transition-colors" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {category.businessCount} businesses available
                                        </p>
                                        <div className="flex items-center text-gray-600  group-hover:text-yellowCustom text-sm font-medium">
                                            Browse {category.name.toLowerCase()}
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* CTA Section */}
                <div className="bg-black text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold mb-4">Don't see your business category?</h2>
                        <p className="text-xl text-blue-100 mb-8">
                            We're always adding new categories. Contact us to suggest one!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                viewTransition

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
        </>

    );
};

export default Categories;
