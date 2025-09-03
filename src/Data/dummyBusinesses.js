const categoryKeywords = {
  "Restaurants": "restaurant",
  "Hospitals": "hospital",
  "Salons": "salon",
  "Technology": "technology",
  "Fitness": "gym",
  "Shopping": "shopping",
  "Hotels": "hotel",
  "Education": "school",
  "Finance": "bank",
  "Clinics": "clinic",
  "Car Services": "car",
  "Real Estate": "realestate",
  "Mobile Shops": "mobile",
  "Legal Services": "lawyer",
  "Healthcare": "healthcare",
  "Automotive": "automotive",
  "Beauty": "beauty",
  "Home Services": "homeservices"
};


export const dummyBusinesses = [
  // 1. Restaurants (id: 1-10)
  { id: 1, name: 'Tasty Bites Restaurant', category: 'Restaurants', description: 'Delicious meals and fast service.', address: '123 Food Street', phone: '+91 9876543210', location: 'Chennai'},
  { id: 2, name: 'Spice Garden', category: 'Restaurants', description: 'Authentic Indian flavors.', address: '45 Spice Lane', phone: '+91 9876501111', location: 'Coimbatore'},
  { id: 3, name: 'Ocean View Dine', category: 'Restaurants', description: 'Seafood specialties.', address: '67 Beach Road', phone: '+91 9876502222', location: 'Madurai'},
  { id: 4, name: 'Urban Grill', category: 'Restaurants', description: 'Grilled food with a twist.', address: '201 Market Street', phone: '+91 9876503333', location: 'Trichy'},
  { id: 5, name: 'Golden Curry House', category: 'Restaurants', description: 'Traditional curry dishes.', address: '89 Curry Bazaar', phone: '+91 9876504444', location: 'Salem'},
  { id: 6, name: 'Veggie Delight', category: 'Restaurants', description: 'Pure vegetarian meals.', address: '56 Green Avenue', phone: '+91 9876505555', location: 'Erode'},
  { id: 7, name: 'Royal Thali', category: 'Restaurants', description: 'Full course thali meals.', address: '12 Regal Road', phone: '+91 9876506666', location: 'Kanyakumari'},
  { id: 8, name: 'Fusion Fiesta', category: 'Restaurants', description: 'Indian & continental fusion.', address: '34 Fusion Lane', phone: '+91 9876507777', location: 'Thanjavur'},
  { id: 9, name: 'Street Bites', category: 'Restaurants', description: 'Best local street food.', address: '22 Market Square', phone: '+91 9876508888', location: 'Tirunelveli'},
  { id: 10, name: 'The Family Diner', category: 'Restaurants', description: 'Casual family dining.', address: '77 Family Plaza', phone: '+91 9876509999', location: 'Vellore'},

  // 2. Hospitals (id: 10-11)
  { id: 11, name: 'City Hospital', category: 'Hospitals', description: '24/7 emergency services.', address: '56 Health Blvd', phone: '+91 9876501234', location: 'Coimbatore'},
  { id: 12, name: 'Care Plus Hospital', category: 'Hospitals', description: 'Multi-specialty care.', address: '11 Care Road', phone: '+91 9876511111', location: 'Chennai'},
  { id: 13, name: 'Green Valley Hospital', category: 'Hospitals', description: 'Best healthcare services.', address: '21 Valley Street', phone: '+91 9876522222', location: 'Trichy'},
  { id: 14, name: 'Sunrise Medical Center', category: 'Hospitals', description: 'Affordable treatment.', address: '101 Sunrise Lane', phone: '+91 9876533333', location: 'Madurai'},
  { id: 15, name: 'Apollo General Hospital', category: 'Hospitals', description: 'Trusted medical experts.', address: '88 Apollo Road', phone: '+91 9876544444', location: 'Salem'},
  { id: 16, name: 'Metro Care Hospital', category: 'Hospitals', description: 'Top doctors and facilities.', address: '76 Metro Plaza', phone: '+91 9876555555', location: 'Erode'},
  { id: 17, name: 'Sacred Heart Hospital', category: 'Hospitals', description: 'Quality heart care.', address: '43 Heart Avenue', phone: '+91 9876566666', location: 'Kanyakumari'},
  { id: 18, name: 'Lotus Women’s Hospital', category: 'Hospitals', description: 'Specialized for women.', address: '92 Lotus Road', phone: '+91 9876577777', location: 'Thanjavur'},
  { id: 19, name: 'Rainbow Children Hospital', category: 'Hospitals', description: 'Caring for kids.', address: '73 Kids Street', phone: '+91 9876588888', location: 'Tirunelveli'},
  { id: 20, name: 'Prime Orthopedic Center', category: 'Hospitals', description: 'Bone & joint care.', address: '19 Ortho Lane', phone: '+91 9876599999', location: 'Vellore'},

  // 3. Salons (id: 21-30)
  { id: 21, name: 'Style Hub Salon', category: 'Salons', description: 'Modern styles and hair treatments.', address: '88 Beauty Lane', phone: '+91 9845678912', location: 'Madurai'},
  { id: 22, name: 'Glam Studio', category: 'Salons', description: 'Makeovers and bridal styling.', address: '90 Style Road', phone: '+91 9876601111', location: 'Chennai'},
  { id: 23, name: 'Cut & Shine', category: 'Salons', description: 'Trendy haircuts.', address: '12 Shine Plaza', phone: '+91 9876602222', location: 'Coimbatore'},
  { id: 24, name: 'Royal Beauty Salon', category: 'Salons', description: 'Premium beauty care.', address: '67 Glam Street', phone: '+91 9876603333', location: 'Trichy'},
  { id: 25, name: 'Glow & Go', category: 'Salons', description: 'Quick facials and treatments.', address: '45 Glow Road', phone: '+91 9876604444', location: 'Salem'},
  { id: 26, name: 'Elite Looks', category: 'Salons', description: 'Personalized grooming.', address: '78 Fashion Square', phone: '+91 9876605555', location: 'Erode'},
  { id: 27, name: 'Blush Beauty Bar', category: 'Salons', description: 'Beauty & relaxation.', address: '23 Rose Lane', phone: '+91 9876606666', location: 'Kanyakumari'},
  { id: 28, name: 'Urban Styles', category: 'Salons', description: 'Trendy urban salon.', address: '16 City Center', phone: '+91 9876607777', location: 'Thanjavur'},
  { id: 29, name: 'Luxe Salon', category: 'Salons', description: 'Luxury beauty treatments.', address: '33 Luxe Avenue', phone: '+91 9876608888', location: 'Tirunelveli'},
  { id: 30, name: 'Chic Cuts', category: 'Salons', description: 'Best haircut experience.', address: '55 Chic Street', phone: '+91 9876609999', location: 'Vellore'},

  // 4. Technology (id: 31-40)
  { id: 31, name: 'Tech World Solutions', category: 'Technology', description: 'Innovative software services.', address: '201 Tech Park', phone: '+91 9876543111', location: 'Trichy'},
  { id: 32, name: 'Smart IT Hub', category: 'Technology', description: 'Custom app development.', address: '77 Code Street', phone: '+91 9876611111', location: 'Chennai'},
  { id: 33, name: 'NextGen Systems', category: 'Technology', description: 'Cloud and AI solutions.', address: '55 Cloud Lane', phone: '+91 9876622222', location: 'Madurai'},
  { id: 34, name: 'CyberEdge Tech', category: 'Technology', description: 'Cybersecurity experts.', address: '88 Secure Ave', phone: '+91 9876633333', location: 'Salem'},
  { id: 35, name: 'FutureTech Labs', category: 'Technology', description: 'R&D in AI & ML.', address: '12 Lab Street', phone: '+91 9876644444', location: 'Coimbatore'},
  { id: 36, name: 'Innovate IT', category: 'Technology', description: 'End-to-end IT services.', address: '22 Startup Hub', phone: '+91 9876655555', location: 'Erode'},
  { id: 37, name: 'Techies Arena', category: 'Technology', description: 'Web & mobile solutions.', address: '33 Arena Road', phone: '+91 9876666666', location: 'Tirunelveli'},
  { id: 38, name: 'CodeCraft IT', category: 'Technology', description: 'Full-stack solutions.', address: '44 Dev Lane', phone: '+91 9876677777', location: 'Kanyakumari'},
  { id: 39, name: 'Digital Spark', category: 'Technology', description: 'Digital transformation experts.', address: '99 Spark Ave', phone: '+91 9876688888', location: 'Thanjavur'},
  { id: 40, name: 'VisionSoft', category: 'Technology', description: 'Enterprise IT solutions.', address: '76 Vision Street', phone: '+91 9876699999', location: 'Vellore'},

  // 5. Fitness (id: 41-50)
  { id: 41, name: 'FitLife Gym', category: 'Fitness', description: 'Premium gym with trainers.', address: '77 Muscle Ave', phone: '+91 9876543222', location: 'Salem'},
  { id: 42, name: 'PowerHouse Fitness', category: 'Fitness', description: 'Strength & conditioning.', address: '12 Power Road', phone: '+91 9876701111', location: 'Chennai'},
  { id: 43, name: 'Flex Gym', category: 'Fitness', description: 'Bodybuilding center.', address: '56 Flex Plaza', phone: '+91 9876702222', location: 'Trichy'},
  { id: 44, name: 'Wellness Yoga Studio', category: 'Fitness', description: 'Yoga & meditation classes.', address: '34 Peace Lane', phone: '+91 9876703333', location: 'Madurai'},
  { id: 45, name: 'CrossFit Tribe', category: 'Fitness', description: 'CrossFit training programs.', address: '67 CrossFit Hub', phone: '+91 9876704444', location: 'Coimbatore'},
  { id: 46, name: 'Active Life Gym', category: 'Fitness', description: 'Affordable gym memberships.', address: '45 Active Road', phone: '+91 9876705555', location: 'Erode'},
  { id: 47, name: 'Muscle Factory', category: 'Fitness', description: 'Strength training zone.', address: '22 Factory Street', phone: '+91 9876706666', location: 'Kanyakumari'},
  { id: 48, name: 'Zen Pilates', category: 'Fitness', description: 'Pilates & posture improvement.', address: '99 Zen Road', phone: '+91 9876707777', location: 'Thanjavur'},
  { id: 49, name: 'Iron Warriors', category: 'Fitness', description: 'Hardcore bodybuilding.', address: '11 Iron Lane', phone: '+91 9876708888', location: 'Vellore'},
  { id: 50, name: 'Sweat Studio', category: 'Fitness', description: 'HIIT and cardio workouts.', address: '76 Sweat Street', phone: '+91 9876709999', location: 'Tirunelveli'},

  // 6. Shopping (id: 51-60)
  { id: 51, name: 'Trendy Mall', category: 'Shopping', description: 'All fashion under one roof.', address: '90 Fashion Street', phone: '+91 9876543333', location: 'Erode'},
  { id: 52, name: 'Fashion Fiesta', category: 'Shopping', description: 'Trendy clothes for all.', address: '23 Fiesta Lane', phone: '+91 9876711111', location: 'Chennai'},
  { id: 53, name: 'Mega Mart', category: 'Shopping', description: 'Household & groceries.', address: '99 Mart Road', phone: '+91 9876722222', location: 'Coimbatore'},
  { id: 54, name: 'City Center Mall', category: 'Shopping', description: 'Entertainment & shopping.', address: '101 City Ave', phone: '+91 9876733333', location: 'Madurai'},
  { id: 55, name: 'Luxury Boutique', category: 'Shopping', description: 'Designer collections.', address: '66 Luxury Plaza', phone: '+91 9876744444', location: 'Trichy'},
  { id: 56, name: 'Budget Bazaar', category: 'Shopping', description: 'Affordable shopping.', address: '12 Budget Lane', phone: '+91 9876755555', location: 'Salem'},
  { id: 57, name: 'Kids World', category: 'Shopping', description: 'Toys & kidswear.', address: '45 Kids Street', phone: '+91 9876766666', location: 'Thanjavur'},
  { id: 58, name: 'ElectroMart', category: 'Shopping', description: 'Electronics & gadgets.', address: '78 Tech Lane', phone: '+91 9876777777', location: 'Kanyakumari'},
  { id: 59, name: 'Daily Needs', category: 'Shopping', description: 'Groceries & essentials.', address: '34 Daily Road', phone: '+91 9876788888', location: 'Tirunelveli'},
  { id: 60, name: 'Home Style Decor', category: 'Shopping', description: 'Home furnishing items.', address: '87 Decor Ave', phone: '+91 9876799999', location: 'Vellore'},

  // 7. Hotels (id: 61-70)
  { id: 61, name: 'Comfort Inn Hotel', category: 'Hotels', description: 'Luxury stay at affordable rates.', address: '12 Resort Road', phone: '+91 9876543444', location: 'Kanyakumari'},
  { id: 62, name: 'Grand Palace Hotel', category: 'Hotels', description: 'Premium rooms and suites.', address: '22 Palace Street', phone: '+91 9876801111', location: 'Chennai'},
  { id: 63, name: 'Sea Breeze Resort', category: 'Hotels', description: 'Beachfront luxury resort.', address: '101 Ocean Road', phone: '+91 9876802222', location: 'Thanjavur'},
  { id: 64, name: 'City Comfort Lodge', category: 'Hotels', description: 'Comfortable business stays.', address: '56 Lodge Lane', phone: '+91 9876803333', location: 'Coimbatore'},
  { id: 65, name: 'Mountain View Hotel', category: 'Hotels', description: 'Scenic mountain resort.', address: '99 Hill Road', phone: '+91 9876804444', location: 'Salem'},
  { id: 66, name: 'Royal Heritage Inn', category: 'Hotels', description: 'Traditional luxury.', address: '78 Heritage Street', phone: '+91 9876805555', location: 'Erode'},
  { id: 67, name: 'Urban Stay Suites', category: 'Hotels', description: 'Serviced apartments.', address: '67 Urban Road', phone: '+91 9876806666', location: 'Trichy'},
  { id: 68, name: 'Elite Residency', category: 'Hotels', description: 'Modern boutique hotel.', address: '11 Elite Plaza', phone: '+91 9876807777', location: 'Madurai'},
  { id: 69, name: 'Airport View Inn', category: 'Hotels', description: 'Stay near the airport.', address: '34 Airport Road', phone: '+91 9876808888', location: 'Tirunelveli'},
  { id: 70, name: 'The Lake House', category: 'Hotels', description: 'Peaceful lakeside stay.', address: '23 Lake Street', phone: '+91 9876809999', location: 'Vellore'},

  // 8. Education (id: 71-80)
  { id: 71, name: 'Bright Minds Academy', category: 'Education', description: 'Coaching for competitive exams.', address: '45 Knowledge Way', phone: '+91 9876543555', location: 'Thanjavur'},
  { id: 72, name: 'Global High School', category: 'Education', description: 'CBSE & International syllabus.', address: '12 Global Lane', phone: '+91 9876811111', location: 'Chennai'},
  { id: 73, name: 'Future Leaders Institute', category: 'Education', description: 'Personality & skill training.', address: '90 Future Road', phone: '+91 9876822222', location: 'Madurai'},
  { id: 74, name: 'Elite Coaching Center', category: 'Education', description: 'Best NEET & JEE coaching.', address: '66 Exam Street', phone: '+91 9876833333', location: 'Coimbatore'},
  { id: 75, name: 'City Kids Academy', category: 'Education', description: 'Kindergarten & daycare.', address: '34 Kids Lane', phone: '+91 9876844444', location: 'Trichy'},
  { id: 76, name: 'SkillHub Training', category: 'Education', description: 'IT & soft skills courses.', address: '22 Hub Road', phone: '+91 9876855555', location: 'Erode'},
  { id: 77, name: 'Scholars University', category: 'Education', description: 'Higher education programs.', address: '78 Uni Plaza', phone: '+91 9876866666', location: 'Salem'},
  { id: 78, name: 'Vision Tutorials', category: 'Education', description: 'Board exam preparation.', address: '56 Vision Road', phone: '+91 9876877777', location: 'Tirunelveli'},
  { id: 79, name: 'Tech Academy', category: 'Education', description: 'Coding & tech skills.', address: '11 Tech Park', phone: '+91 9876888888', location: 'Kanyakumari'},
  { id: 80, name: 'Creative Arts School', category: 'Education', description: 'Drawing, music, dance.', address: '99 Arts Street', phone: '+91 9876899999', location: 'Vellore'},

  // 9. Finance (id: 81-90)
  { id: 81, name: 'Money Matters Bank', category: 'Finance', description: 'Secure banking and loans.', address: '88 Wealth Plaza', phone: '+91 9876543666', location: 'Tirunelveli'},
  { id: 82, name: 'SafeSave Bank', category: 'Finance', description: 'Trusted savings & deposits.', address: '23 Bank Road', phone: '+91 9876901111', location: 'Chennai'},
  { id: 83, name: 'Future Finance Ltd.', category: 'Finance', description: 'Personal loans made easy.', address: '45 Loan Street', phone: '+91 9876902222', location: 'Coimbatore'},
  { id: 84, name: 'Grow Wealth Advisors', category: 'Finance', description: 'Wealth management services.', address: '56 Finance Lane', phone: '+91 9876903333', location: 'Madurai'},
  { id: 85, name: 'Trust Capital', category: 'Finance', description: 'Corporate finance experts.', address: '22 Capital Road', phone: '+91 9876904444', location: 'Trichy'},
  { id: 86, name: 'Secure Life Insurance', category: 'Finance', description: 'Insurance for your future.', address: '12 Life Lane', phone: '+91 9876905555', location: 'Salem'},
  { id: 87, name: 'Prime Mutual Funds', category: 'Finance', description: 'Investment made simple.', address: '78 MF Street', phone: '+91 9876906666', location: 'Erode'},
  { id: 88, name: 'CreditPlus Finance', category: 'Finance', description: 'Credit & card services.', address: '99 Credit Road', phone: '+91 9876907777', location: 'Kanyakumari'},
  { id: 89, name: 'GreenBank Ltd.', category: 'Finance', description: 'Eco-friendly banking.', address: '34 Green Plaza', phone: '+91 9876908888', location: 'Thanjavur'},
  { id: 90, name: 'FutureSecure Loans', category: 'Finance', description: 'Fast loan approvals.', address: '66 Loan Street', phone: '+91 9876909999', location: 'Vellore'},

  // 10. Clinics (id: 91-100)
  { id: 91, name: 'Family Care Clinic', category: 'Clinics', description: 'Best general physician in town.', address: '30 Wellness Street', phone: '+91 9876543777', location: 'Vellore'},
  { id: 92, name: 'Smile Dental Clinic', category: 'Clinics', description: 'Expert dental care.', address: '11 Dental Road', phone: '+91 9876911111', location: 'Chennai'},
  { id: 93, name: 'Vision Eye Care', category: 'Clinics', description: 'Eye specialists & optometry.', address: '67 Vision Lane', phone: '+91 9876922222', location: 'Madurai'},
  { id: 94, name: 'Healing Hands Clinic', category: 'Clinics', description: 'Physiotherapy specialists.', address: '89 Healing Road', phone: '+91 9876933333', location: 'Trichy'},
  { id: 95, name: 'WellCare Clinic', category: 'Clinics', description: 'Affordable healthcare.', address: '34 Care Street', phone: '+91 9876944444', location: 'Coimbatore'},
  { id: 96, name: 'City Women’s Clinic', category: 'Clinics', description: 'Gynecology specialists.', address: '23 Women Road', phone: '+91 9876955555', location: 'Salem'},
  { id: 97, name: 'Pulse Diagnostics', category: 'Clinics', description: 'Blood tests & diagnostics.', address: '77 Pulse Ave', phone: '+91 9876966666', location: 'Erode'},
  { id: 98, name: 'Skin Glow Clinic', category: 'Clinics', description: 'Dermatology services.', address: '90 Skin Plaza', phone: '+91 9876977777', location: 'Kanyakumari'},
  { id: 99, name: 'Ear & Nose ENT Clinic', category: 'Clinics', description: 'ENT specialists.', address: '19 ENT Road', phone: '+91 9876988888', location: 'Tirunelveli'},
  { id: 100, name: 'Wellness Homeopathy', category: 'Clinics', description: 'Homeopathy treatments.', address: '55 Wellness Lane', phone: '+91 9876999999', location: 'Thanjavur'},

  // Car Services (id: 101–110)
{ id: 101, name: "Speedy Auto Garage", category: "Car Services", description: "Complete car repair and maintenance.", address: "12 Auto Street", phone: "+91 9876543101", location: "Chennai"},
{ id: 102, name: "City Car Wash", category: "Car Services", description: "Premium car wash and detailing.", address: "45 Clean Road", phone: "+91 9876543102", location: "Coimbatore"},
{ id: 103, name: "Tire Tech", category: "Car Services", description: "Tyre sales and fitting services.", address: "89 Wheel Lane", phone: "+91 9876543103", location: "Madurai"},
{ id: 104, name: "Engine Experts", category: "Car Services", description: "Engine diagnostics and repair.", address: "23 Power Road", phone: "+91 9876543104", location: "Trichy"},
{ id: 105, name: "Swift Service Center", category: "Car Services", description: "Quick servicing for all car brands.", address: "67 Fast Avenue", phone: "+91 9876543105", location: "Salem"},
{ id: 106, name: "Elite Auto Works", category: "Car Services", description: "Luxury car maintenance specialists.", address: "34 Premium Lane", phone: "+91 9876543106", location: "Erode"},
{ id: 107, name: "City Motors", category: "Car Services", description: "Car sales and authorized servicing.", address: "56 Market Road", phone: "+91 9876543107", location: "Kanyakumari"},
{ id: 108, name: "Auto Electric Hub", category: "Car Services", description: "Car electrical repair and accessories.", address: "77 Spark Street", phone: "+91 9876543108", location: "Thanjavur"},
{ id: 109, name: "Brake & Clutch Zone", category: "Car Services", description: "Expert brake and clutch servicing.", address: "11 Safety Road", phone: "+91 9876543109", location: "Tirunelveli"},
{ id: 110, name: "Car Care Studio", category: "Car Services", description: "Complete car care under one roof.", address: "99 Shine Street", phone: "+91 9876543110", location: "Vellore"},

// Real Estate (id: 111–120)
{ id: 111, name: "Dream Homes Realty", category: "Real Estate", description: "Buy and sell residential properties.", address: "123 Housing Street", phone: "+91 9876543111", location: "Chennai"},
{ id: 112, name: "Metro Properties", category: "Real Estate", description: "Affordable apartments in prime locations.", address: "45 City Road", phone: "+91 9876543112", location: "Coimbatore"},
{ id: 113, name: "Elite Estates", category: "Real Estate", description: "Luxury villas and gated communities.", address: "89 Luxury Lane", phone: "+91 9876543113", location: "Madurai"},
{ id: 114, name: "Green Land Developers", category: "Real Estate", description: "Plots and land for investment.", address: "23 Eco Road", phone: "+91 9876543114", location: "Trichy"},
{ id: 115, name: "Skyline Realty", category: "Real Estate", description: "High-rise apartments and penthouses.", address: "67 Skyline Avenue", phone: "+91 9876543115", location: "Salem"},
{ id: 116, name: "Safe Deals Realty", category: "Real Estate", description: "Trusted real estate consultants.", address: "34 Trust Lane", phone: "+91 9876543116", location: "Erode"},
{ id: 117, name: "Family Homes Realty", category: "Real Estate", description: "Perfect homes for every family.", address: "56 Comfort Road", phone: "+91 9876543117", location: "Kanyakumari"},
{ id: 118, name: "Commercial Hub Realty", category: "Real Estate", description: "Shops and office spaces for rent.", address: "77 Market Street", phone: "+91 9876543118", location: "Thanjavur"},
{ id: 119, name: "Smart Realty Solutions", category: "Real Estate", description: "Digital property search and deals.", address: "11 Tech Park", phone: "+91 9876543119", location: "Tirunelveli"},
{ id: 120, name: "Royal Realty", category: "Real Estate", description: "Premium real estate services.", address: "99 Palace Street", phone: "+91 9876543120", location: "Vellore"},

// Mobile Shops (id: 121–130)
{ id: 121, name: "Mobile World", category: "Mobile Shops", description: "Latest smartphones and accessories.", address: "12 Gadget Street", phone: "+91 9876543121", location: "Chennai"},
{ id: 122, name: "Smartphone Hub", category: "Mobile Shops", description: "All brands of smartphones available.", address: "45 Tech Lane", phone: "+91 9876543122", location: "Coimbatore"},
{ id: 123, name: "Quick Fix Mobiles", category: "Mobile Shops", description: "Mobile repair and servicing.", address: "89 Repair Road", phone: "+91 9876543123", location: "Madurai"},
{ id: 124, name: "Gadget Galaxy", category: "Mobile Shops", description: "Smart gadgets and wearables.", address: "23 Trend Street", phone: "+91 9876543124", location: "Trichy"},
{ id: 125, name: "Phone Planet", category: "Mobile Shops", description: "Exclusive deals on new mobiles.", address: "67 Planet Avenue", phone: "+91 9876543125", location: "Salem"},
{ id: 126, name: "Digital World", category: "Mobile Shops", description: "All mobile accessories available.", address: "34 Tech Market", phone: "+91 9876543126", location: "Erode"},
{ id: 127, name: "NextGen Mobiles", category: "Mobile Shops", description: "Latest launches and pre-orders.", address: "56 Future Road", phone: "+91 9876543127", location: "Kanyakumari"},
{ id: 128, name: "Budget Mobiles", category: "Mobile Shops", description: "Affordable mobiles for all budgets.", address: "77 Saver Street", phone: "+91 9876543128", location: "Thanjavur"},
{ id: 129, name: "Elite Mobiles", category: "Mobile Shops", description: "Premium mobile brands and services.", address: "11 Premium Lane", phone: "+91 9876543129", location: "Tirunelveli"},
{ id: 130, name: "Mobile Care Center", category: "Mobile Shops", description: "Expert mobile servicing and parts.", address: "99 Service Road", phone: "+91 9876543130", location: "Vellore"},

// Legal Services (id: 131–140)
{ id: 131, name: "Justice Law Firm", category: "Legal Services", description: "Expert lawyers for all cases.", address: "12 Court Street", phone: "+91 9876543131", location: "Chennai"},
{ id: 132, name: "City Legal Advisors", category: "Legal Services", description: "Trusted legal consultation.", address: "45 Law Road", phone: "+91 9876543132", location: "Coimbatore"},
{ id: 133, name: "Elite Advocates", category: "Legal Services", description: "Experienced advocates and legal experts.", address: "89 Justice Lane", phone: "+91 9876543133", location: "Madurai"},
{ id: 134, name: "Family Law Experts", category: "Legal Services", description: "Specialized in family and divorce law.", address: "23 Family Road", phone: "+91 9876543134", location: "Trichy"},
{ id: 135, name: "Corporate Law Solutions", category: "Legal Services", description: "Corporate and business law specialists.", address: "67 Biz Avenue", phone: "+91 9876543135", location: "Salem"},
{ id: 136, name: "Criminal Defense Hub", category: "Legal Services", description: "Expert criminal lawyers.", address: "34 Justice Market", phone: "+91 9876543136", location: "Erode"},
{ id: 137, name: "Property Law Associates", category: "Legal Services", description: "Property and real estate legal services.", address: "56 Property Road", phone: "+91 9876543137", location: "Kanyakumari"},
{ id: 138, name: "Legal Aid Services", category: "Legal Services", description: "Affordable legal help for everyone.", address: "77 Support Street", phone: "+91 9876543138", location: "Thanjavur"},
{ id: 139, name: "High Court Chambers", category: "Legal Services", description: "Experienced High Court advocates.", address: "11 High Street", phone: "+91 9876543139", location: "Tirunelveli"},
{ id: 140, name: "Supreme Legal Advisors", category: "Legal Services", description: "Specialized Supreme Court cases.", address: "99 Apex Road", phone: "+91 9876543140", location: "Vellore"},

// Healthcare (id: 141–150)
{ id: 141, name: "City Health Hospital", category: "Healthcare", description: "24/7 multi-speciality healthcare services.", address: "12 Wellness Road", phone: "+91 9876543141", location: "Chennai"},
{ id: 142, name: "Healthy Life Clinic", category: "Healthcare", description: "Family health check-ups and diagnostics.", address: "45 Care Street", phone: "+91 9876543142", location: "Coimbatore"},
{ id: 143, name: "Smile Dental Care", category: "Healthcare", description: "Expert dental treatments and surgery.", address: "78 Tooth Avenue", phone: "+91 9876543143", location: "Madurai"},
{ id: 144, name: "Vision Eye Center", category: "Healthcare", description: "Specialist eye care and laser surgery.", address: "23 Bright Lane", phone: "+91 9876543144", location: "Trichy"},
{ id: 145, name: "Green Pharmacy", category: "Healthcare", description: "All medicines and wellness products.", address: "56 Health Street", phone: "+91 9876543145", location: "Salem"},
{ id: 146, name: "Heart Care Institute", category: "Healthcare", description: "Advanced cardiology services.", address: "90 Cardio Road", phone: "+91 9876543146", location: "Erode"},
{ id: 147, name: "Life Blood Bank", category: "Healthcare", description: "24/7 blood donation and supply.", address: "11 Donor Lane", phone: "+91 9876543147", location: "Kanyakumari"},
{ id: 148, name: "Wellness Labs", category: "Healthcare", description: "Diagnostic tests and medical checkups.", address: "33 Test Road", phone: "+91 9876543148", location: "Thanjavur"},
{ id: 149, name: "Chennai Children’s Hospital", category: "Healthcare", description: "Child specialty hospital.", address: "101 Kids Avenue", phone: "+91 9876543149", location: "Tirunelveli"},
{ id: 150, name: "Healthy Living Center", category: "Healthcare", description: "Preventive healthcare services.", address: "55 Life Street", phone: "+91 9876543150", location: "Vellore"},

// Automotive (id: 151–160)
{ id: 151, name: "AutoFix Garage", category: "Automotive", description: "Car and bike repair services.", address: "12 Auto Road", phone: "+91 9876543151", location: "Chennai"},
{ id: 152, name: "Speed Motors", category: "Automotive", description: "New and used car dealership.", address: "45 Market Street", phone: "+91 9876543152", location: "Coimbatore"},
{ id: 153, name: "Moto Parts Shop", category: "Automotive", description: "Genuine spare parts for all vehicles.", address: "23 Spare Lane", phone: "+91 9876543153", location: "Madurai"},
{ id: 154, name: "Express Car Wash", category: "Automotive", description: "Fast car cleaning and detailing.", address: "67 Wash Street", phone: "+91 9876543154", location: "Trichy"},
{ id: 155, name: "Tyre World", category: "Automotive", description: "All branded tyres available.", address: "89 Wheel Road", phone: "+91 9876543155", location: "Salem"},
{ id: 156, name: "Battery Hub", category: "Automotive", description: "Car and bike batteries with warranty.", address: "34 Power Street", phone: "+91 9876543156", location: "Erode"},
{ id: 157, name: "Luxury Car Rentals", category: "Automotive", description: "Premium car rentals for events.", address: "56 Rental Avenue", phone: "+91 9876543157", location: "Kanyakumari"},
{ id: 158, name: "Bike Care Center", category: "Automotive", description: "Motorbike servicing and spares.", address: "78 Rider Street", phone: "+91 9876543158", location: "Thanjavur"},
{ id: 159, name: "Auto Accessories Shop", category: "Automotive", description: "Car seat covers, mats, and more.", address: "11 Style Road", phone: "+91 9876543159", location: "Tirunelveli"},
{ id: 160, name: "Truck Service Hub", category: "Automotive", description: "Heavy vehicle service and repair.", address: "90 Transport Road", phone: "+91 9876543160", location: "Vellore"},

// Beauty & Spa (id: 161–170)
{ id: 161, name: "Glamour Beauty Salon", category: "Beauty", description: "Hair, skin, and beauty treatments.", address: "12 Style Street", phone: "+91 9876543161", location: "Chennai"},
{ id: 162, name: "Relax Spa Center", category: "Beauty", description: "Massage and relaxation therapies.", address: "45 Calm Road", phone: "+91 9876543162", location: "Coimbatore"},
{ id: 163, name: "Bridal Makeover Studio", category: "Beauty", description: "Bridal makeup and styling packages.", address: "78 Wedding Lane", phone: "+91 9876543163", location: "Madurai"},
{ id: 164, name: "Glow Skin Clinic", category: "Beauty", description: "Skin care and dermatology services.", address: "23 Radiance Road", phone: "+91 9876543164", location: "Trichy"},
{ id: 165, name: "Luxury Spa Retreat", category: "Beauty", description: "Premium spa and wellness packages.", address: "67 Resort Lane", phone: "+91 9876543165", location: "Salem"},
{ id: 166, name: "Trendy Hair Studio", category: "Beauty", description: "Modern hairstyling and coloring.", address: "34 Fashion Road", phone: "+91 9876543166", location: "Erode"},
{ id: 167, name: "Ayurveda Spa", category: "Beauty", description: "Traditional ayurvedic treatments.", address: "56 Heritage Street", phone: "+91 9876543167", location: "Kanyakumari"},
{ id: 168, name: "Nail Art Studio", category: "Beauty", description: "Creative nail extensions and art.", address: "78 Glam Lane", phone: "+91 9876543168", location: "Thanjavur"},
{ id: 169, name: "Herbal Beauty Care", category: "Beauty", description: "Herbal facials and treatments.", address: "11 Natural Road", phone: "+91 9876543169", location: "Tirunelveli"},
{ id: 170, name: "Wellness Spa", category: "Beauty", description: "Holistic spa for mind and body.", address: "99 Peace Street", phone: "+91 9876543170", location: "Vellore"},

// Home Services (id: 171–180)
{ id: 171, name: "QuickFix Plumbing", category: "Home Services", description: "Emergency plumbing and repairs.", address: "12 Water Lane", phone: "+91 9876543171", location: "Chennai"},
{ id: 172, name: "Bright Electricals", category: "Home Services", description: "Electrical wiring and repair.", address: "45 Power Street", phone: "+91 9876543172", location: "Coimbatore"},
{ id: 173, name: "Spark Cleaning Services", category: "Home Services", description: "Home deep cleaning experts.", address: "78 Clean Road", phone: "+91 9876543173", location: "Madurai"},
{ id: 174, name: "Fresh Paint Works", category: "Home Services", description: "Professional painting contractors.", address: "23 Color Lane", phone: "+91 9876543174", location: "Trichy"},
{ id: 175, name: "Safe Pest Control", category: "Home Services", description: "Eco-friendly pest control services.", address: "67 Hygiene Street", phone: "+91 9876543175", location: "Salem"},
{ id: 176, name: "Modern Interiors", category: "Home Services", description: "Interior design and renovation.", address: "34 Design Lane", phone: "+91 9876543176", location: "Erode"},
{ id: 177, name: "Secure Home Locks", category: "Home Services", description: "Locksmith and security systems.", address: "56 Safety Road", phone: "+91 9876543177", location: "Kanyakumari"},
{ id: 178, name: "Pure Water Solutions", category: "Home Services", description: "Water purifier sales and service.", address: "78 Aqua Road", phone: "+91 9876543178", location: "Thanjavur"},
{ id: 179, name: "Cool Comfort AC Services", category: "Home Services", description: "AC installation and servicing.", address: "11 Chill Lane", phone: "+91 9876543179", location: "Tirunelveli"},
{ id: 180, name: "HandyMan Services", category: "Home Services", description: "General home repair and support.", address: "99 Service Road", phone: "+91 9876543180", location: "Vellore"},

].map((biz, index) => {
  const keyword =
    categoryKeywords[biz.category] ||
    biz.category.toLowerCase().replace(/\s+/g, "+");

  // 🔥 Option 1: loremflickr
  const url = `https://loremflickr.com/400/300/${keyword}?lock=${index}`;

  return {
    ...biz,
    image: url,
  };
});