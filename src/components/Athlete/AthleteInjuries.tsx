import React, { useState } from 'react';
import { User, Star, MapPin, Award, Briefcase, Phone, Mail, Calendar, Search, Navigation } from 'lucide-react';
import FloatingChatbotButton from '../Layout/FloatingChatbotButton';

// Type definitions
interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  address: string;
  phone: string;
  email: string;
  education: string[];
  certifications: string[];
  availability: string;
  mapLocation: string;
}

const AthleteInjuries: React.FC = () => {
  // Mock doctors data with Indian names and numbers
  const mockDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Rajesh Sharma',
      specialization: 'Sports Medicine',
      experience: '15 years',
      address: '123 Sports Medicine Center, Connaught Place, New Delhi 110001',
      phone: '+91 98765 43210',
      email: 'r.sharma@sportsmedindia.com',
      education: ['MBBS, AIIMS Delhi', 'MD in Sports Medicine, PGIMER Chandigarh'],
      certifications: ['Board Certified in Sports Medicine', 'Fellow of Indian Orthopaedic Association'],
      availability: 'Mon-Wed: 9am-5pm, Thu: 10am-6pm, Fri: 9am-3pm',
      mapLocation: 'Connaught+Place+New+Delhi'
    },
    {
      id: '2',
      name: 'Dr. Priya Patel',
      specialization: 'Orthopedic Surgery',
      experience: '12 years',
      address: '456 Orthopedic Plaza, Bandra West, Mumbai 400050',
      phone: '+91 87654 32109',
      email: 'p.patel@orthoindia.com',
      education: ['MBBS, KEM Hospital Mumbai', 'MS Orthopedics, JJ Hospital Mumbai'],
      certifications: ['Board Certified in Orthopedic Surgery', 'Joint Replacement Specialist'],
      availability: 'Mon-Tue: 8am-4pm, Wed: 9am-5pm, Thu-Fri: 8am-3pm',
      mapLocation: 'Bandra+West+Mumbai'
    },
    {
      id: '3',
      name: 'Dr. Vikram Singh',
      specialization: 'Physical Therapy',
      experience: '10 years',
      address: '789 Rehabilitation Center, Koramangala, Bangalore 560034',
      phone: '+91 76543 21098',
      email: 'v.singh@ptclinicindia.com',
      education: ['BPT, NIMS University', 'MPT in Sports Rehabilitation, Manipal University'],
      certifications: ['Certified Sports Physical Therapist', 'Rehabilitation Specialist'],
      availability: 'Mon-Fri: 7am-7pm, Sat: 9am-1pm',
      mapLocation: 'Koramangala+Bangalore'
    },
    {
      id: '4',
      name: 'Dr. Ananya Reddy',
      specialization: 'Cardiology',
      experience: '18 years',
      address: '321 Heart Center, Gachibowli, Hyderabad 500032',
      phone: '+91 65432 10987',
      email: 'a.reddy@cardiologyindia.com',
      education: ['MBBS, Nizam\'s Institute of Medical Sciences', 'DM Cardiology, AIIMS Delhi'],
      certifications: ['Board Certified in Cardiology', 'Fellow of Cardiology Society of India'],
      availability: 'Mon-Thu: 8am-5pm, Fri: 8am-12pm',
      mapLocation: 'Gachibowli+Hyderabad'
    },
    {
      id: '5',
      name: 'Dr. Arjun Kumar',
      specialization: 'Neurology',
      experience: '14 years',
      address: '654 Neuro Center, Salt Lake City, Kolkata 700091',
      phone: '+91 54321 09876',
      email: 'a.kumar@neuroindia.com',
      education: ['MBBS, Calcutta Medical College', 'DM Neurology, NIMHANS Bangalore'],
      certifications: ['Board Certified in Neurology', 'Epilepsy Specialist'],
      availability: 'Mon-Wed: 9am-5pm, Thu: 10am-6pm, Fri: 9am-2pm',
      mapLocation: 'Salt+Lake+City+Kolkata'
    },
    {
      id: '6',
      name: 'Dr. Meera Desai',
      specialization: 'Chiropractic Medicine',
      experience: '8 years',
      address: '987 Wellness Center, Jubilee Hills, Hyderabad 500033',
      phone: '+91 43210 98765',
      email: 'm.desai@chirowellnessindia.com',
      education: ['BPT, SVYASA University', 'Doctor of Chiropractic, Indian Chiropractic Association'],
      certifications: ['Certified Chiropractic Physician', 'Sports Chiropractic Specialist'],
      availability: 'Mon-Fri: 8am-6pm, Sat: 10am-2pm',
      mapLocation: 'Jubilee+Hills+Hyderabad'
    }
  ];

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [specializationFilter, setSpecializationFilter] = useState<string>('all');
  const [doctors] = useState<Doctor[]>(mockDoctors);

  // Get unique specializations for filter
  const specializations = [...new Set(mockDoctors.map(doc => doc.specialization))];

  const filteredDoctors: Doctor[] = doctors.filter((doctor: Doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = specializationFilter === 'all' || doctor.specialization === specializationFilter;
    
    return matchesSearch && matchesSpecialization;
  });

  // Function to handle map navigation
  const handleMapClick = (location: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${location}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <FloatingChatbotButton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Team Directory</h1>
          <p className="text-gray-600">Find and connect with our specialized doctors</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctors or specializations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Specialization Filter */}
            <div className="md:w-48">
              <select
                value={specializationFilter}
                onChange={(e) => setSpecializationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Specializations</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              {/* Doctor Header with Image Placeholder */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <User size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{doctor.name}</h3>
                    <p className="text-blue-100">{doctor.specialization}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {/* Experience */}
                <div className="flex items-center text-gray-600 mb-4">
                  <Briefcase className="h-5 w-5 mr-3 text-blue-500" />
                  <span className="text-sm font-medium">{doctor.experience} experience</span>
                </div>

                {/* Address with Map Link */}
                

                {/* Contact Information */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm">{doctor.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm">{doctor.email}</span>
                  </div>
                </div>

                {/* Education */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-2 text-blue-500" />
                    Education
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {doctor.education.map((edu, index) => (
                      <li key={index}>• {edu}</li>
                    ))}
                  </ul>
                </div>

                {/* Certifications */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                    <Star className="h-4 w-4 mr-2 text-blue-500" />
                    Certifications
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {doctor.certifications.map((cert, index) => (
                      <li key={index}>• {cert}</li>
                    ))}
                  </ul>
                </div>

                {/* Availability */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                    Availability
                  </h4>
                  <p className="text-sm text-gray-600">{doctor.availability}</p>
                </div>

                {/* Action Buttons */}
                
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-500">No doctors match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AthleteInjuries;