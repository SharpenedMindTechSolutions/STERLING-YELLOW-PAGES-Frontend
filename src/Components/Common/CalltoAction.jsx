import { Link } from 'lucide-react'
import React from 'react'

function CalltoAction() {
  return (
   <div className="bg-black text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Don't see your business category?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        We're always adding new categories. Contact us to suggest one!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                        >
                            Contact Us
                        </Link>
                        <Link
                            to="/post-ad"
                            className="bg-yellowCustom text-black px-8 py-3 rounded-lg  transition-colors font-medium"
                        >
                            List Your Business
                        </Link>
                    </div>
                </div>
            </div>
  )
}

export default CalltoAction