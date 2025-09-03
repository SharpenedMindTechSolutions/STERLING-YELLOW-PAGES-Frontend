import React, { useEffect } from 'react';
import { CheckCircle2, Users, Star, TrendingUp, Shield, Phone, Globe, Mail } from 'lucide-react';
import { History, PhoneCall } from "lucide-react";

const Aboutus = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const stats = [
        { icon: Users, label: 'Active Businesses', value: '1,200+' },
        { icon: Star, label: 'Reviews', value: '15,000+' },
        { icon: TrendingUp, label: 'Monthly Visitors', value: '50,000+' },
        { icon: Shield, label: 'Verified Listings', value: '95%' },
    ];

    const points = [
        'Consumers and businesses rely on Sterling Yellow Pages when making important purchasing decisions.',
        '87% of references to the Yellow Pages result in either a purchase or an intent to purchase.',
        "59% of consumers haven’t made up their minds when they turn to the Yellow Pages—giving advertisers a final sales message at the point of decision.",
        'Advertising in Sterling Yellow Pages gets results and efficiently targets your market—proven by usage studies, call count tracking, and ROI analysis.',
        'Sterling Yellow Pages is the oldest independent Yellow Pages publisher in the southern districts of Tamil Nadu.',
        'Free Dial Option: Just call for any information at any time; details/SMS will be sent to your mobile.',
    ];

    return (
        <>
            <div className="min-h-screen">

                {/* Hero */}
                <section className="bg-yellowCustom text-black py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">About Us</h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                            Today, people are choosing <span className="font-semibold">Sterling Yellow Pages</span>.
                        </p>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-16 bg-black text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((s, i) => (
                            <div key={i} className="text-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    <s.icon className="w-8 h-8 text-yellowCustom" />
                                </div>
                                <div className="text-3xl font-bold mb-2">{s.value}</div>
                                <div>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why People Choose Sterling */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Why People Choose Sterling Yellow Pages
                            </h2>
                            <p className="text-lg text-gray-600 mt-2">
                                Insights captured from our printed directory page.
                            </p>
                        </div>

                     <div className="grid md:grid-cols-2 gap-6">
                           {points.map((p, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-4 p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-lg hover:border-yellowCustom transition-all duration-300 transform hover:-translate-y-2"
                                >
                                    <CheckCircle2 className="w-6 h-6 text-yellowCustom flex-shrink-0 mt-1" />
                                    <p className="text-gray-800">{p}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-6 rounded-2xl bg-yellowCustom/20 border border-yellow-300">
                            <div className="flex items-center gap-3 mb-2">
                                <History className="w-7 h-7 text-yellow-600" />
                                <h3 className="text-2xl font-semibold text-gray-900">
                                    Our Legacy in Tamil Nadu
                                </h3>
                            </div>
                            <p className="text-gray-800">
                                From print to digital, Sterling Yellow Pages has served communities for
                                decades as the oldest independent publisher across the southern districts
                                of Tamil Nadu—connecting customers with trusted local businesses at the
                                exact moment of decision.
                            </p>
                        </div>

                        {/* Free Dial Option */}
                        <div className="mt-6 p-6 rounded-2xl bg-black text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <PhoneCall className="w-7 h-7 text-yellow-400" />
                                <h3 className="text-2xl font-semibold">Free Dial Option</h3>
                            </div>
                            <p className="text-blue-100">
                                Just call for any information at any time. You’ll receive the details via
                                SMS on your mobile.
                            </p>
                        </div>

                        {/* Contact from the page */}
                        <div className="mt-10 grid md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-xl border bg-white flex items-center gap-4">
                                <Phone className="w-6 h-6 text-yellowCustom" />
                                <div>
                                    <div className="font-semibold text-gray-900">Toll-Free</div>
                                    <a href="tel:18005991363" className="text-gray-700 hover:underline">
                                        1800 599 1363
                                    </a>
                                </div>
                            </div>
                            <div className="p-6 rounded-xl border bg-white flex items-center gap-4">
                                <Globe className="w-6 h-6 text-yellowCustom" />
                                <div>
                                    <div className="font-semibold text-gray-900">Website</div>
                                    <a
                                        href="https://www.sterlingonnet.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-gray-700 hover:underline"
                                    >
                                        https://www.sterlingonnet.com/                                    </a>
                                </div>
                            </div>
                            <div className="p-6 rounded-xl border bg-white flex items-center gap-4">
                                <Mail className="w-6 h-6 text-yellowCustom" />
                                <div>
                                    <div className="font-semibold text-gray-900">Email</div>
                                    <a
                                        href="mailto:chennaisterlingyp@gmail.com"
                                        className="text-gray-700 hover:underline"
                                    >
                                        chennaisterlingyp@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
};

export default Aboutus;



