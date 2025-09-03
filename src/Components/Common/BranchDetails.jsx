// import React from 'react'
// import { branchData } from '../../Data/BranchData'
// import { Phone, Mail, MapPin } from 'lucide-react';

// function BranchDetails() {
//     return (
//         <div className="max-w-7xl mx-auto p-6 space-y-10">
//             <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-black mb-6">
//                 All Branch Details in Tamil Nadu Location
//             </h1>

//             {branchData.map((region, index) => (
//                 <div key={index}>
//                     <h2 className="text-2xl font-bold text-black mb-6 border-b pb-2">
//                         {region.region}
//                     </h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {region.branches.map((branch, i) => (
//                             <div
//                                 key={i}
//                                 className="bg-yellowCustom hover:bg-yellow-100 border border-yellowCustom rounded-md p-4 shadow-sm hover:shadow-md transition text-black"
//                             >
//                                 {/* City with MapPin */}
//                                 <h3 className="text-lg font-semibold flex items-center gap-1">
//                                     <MapPin className="w-4 h-4 text-black" />
//                                     {branch.city}
//                                 </h3>

//                                 {/* Address */}
//                                 <p className="text-sm mt-1">{branch.address}</p>

//                                 {/* Phone */}
//                                 {branch.phone?.length > 0 && (
//                                     <div className="mt-2 flex items-center text-sm">
//                                         <Phone className="w-4 h-4 mr-1 text-black" />
//                                         <p>{branch.phone.join(', ')}</p>
//                                     </div>
//                                 )}

//                                 {/* Email */}
//                                 {branch.email && (
//                                     <div className="flex items-center text-sm mt-1">
//                                         <Mail className="w-4 h-4 mr-1 text-black" />
//                                         <p>{branch.email}</p>
//                                     </div>
//                                 )}

//                                 {/* Website */}
//                                 {branch.web && (
//                                     <p className="text-sm text-blue-600 underline mt-2">
//                                         <a
//                                             href={`https://${branch.web}`}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             {branch.web}
//                                         </a>
//                                     </p>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default BranchDetails



import React from 'react';
import { branchData } from '../../Data/BranchData';
import { Phone, Mail, MapPin } from 'lucide-react';

function BranchDetails() {
    return (
        <div className="max-w-7xl mx-auto p-6 space-y-10">
            <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-black mb-6">
                All Branch Details in Tamil Nadu Location
            </h1>

            {branchData.map((region, index) => (
                <div key={index}>
                    <h2 className="text-2xl font-bold text-black mb-6 border-b pb-2">
                        {region.region}
                    </h2>

                    {/* Two-column layout (like col-6 col-6) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {region.branches.map((branch, i) => (
                            <div
                                key={i}
                                className="bg-yellowCustom hover:bg-yellow-100 border border-yellowCustom rounded-md p-4 shadow-sm hover:shadow-md transition text-black"
                            >
                                {/* City */}
                                <h3 className="text-lg font-semibold flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-black" />
                                    {branch.city}
                                </h3>

                                {/* Address */}
                                <p className="text-sm mt-1">{branch.address}</p>

                                {/* Phone Numbers */}
                                {branch.phone?.length > 0 && (
                                    <div className="mt-2 flex items-center text-sm">
                                        <Phone className="w-4 h-4 mr-1 text-black" />
                                        <p>{branch.phone.join(', ')}</p>
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
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BranchDetails;
