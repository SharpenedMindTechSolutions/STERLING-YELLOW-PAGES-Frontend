import React from 'react';
import { FaFacebookF, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import logo from "../../assets/logo.jpg";
import { Globe, Mail } from 'lucide-react';

function QuickContact() {
    return (
        <div className="w-full bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 text-center sm:text-left">

                    {/* Logo */}
                    <a href="/" className="flex items-center justify-center sm:justify-start space-x-2">
                        <img
                            src={logo}
                            alt="Sterling Yellow Pages"
                            className="h-20 w-auto object-contain"
                        />
                    </a>

                    {/* Contact Section */}
                    <div className="flex flex-col items-center sm:items-start sm:flex-row sm:gap-6 text-sm text-black">

                        {/* Toll-Free */}
                        <div className="font-medium">
                            Toll Free: <span className="text-black">1800-599-1363</span>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center justify-center gap-4 pt-2 sm:pt-0">
                            <a
                                href="https://www.sterlingonnet.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-black hover:text-yellowCustom underline transition"
                            >
                                <Globe className="w-4 h-4" />
                            </a>
                            <a
                                href="mailto:chennaisterlingyp@gmail.com"
                                className="text-black hover:text-yellowCustom transition flex items-center gap-1"
                                aria-label="Email"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-black hover:text-yellowCustom transition" aria-label="X (Twitter)">
                                <FaXTwitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-black hover:text-yellowCustom transition" aria-label="Facebook">
                                <FaFacebookF className="w-5 h-5" />
                            </a>
                            <a
                                href="https://wa.me/917200038600"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black hover:text-yellowCustom transition"
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default QuickContact;
