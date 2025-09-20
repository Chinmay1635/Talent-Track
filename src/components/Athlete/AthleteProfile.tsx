import React, { useState } from 'react';
import { MapPin, Trophy, Star, Calendar, User, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { findAthleteForUser } from '../../utils/userMatching';
import FloatingChatbotButton from '../Layout/FloatingChatbotButton';

const AthleteProfile: React.FC = () => {
  const { user } = useAuth();
  const { athletes, coaches, academies, tournaments } = useData();
  
  // All hooks must be at the top, before any conditional logic
  // Edit modal state
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({
    name: '',
    age: '',
    sport: '',
    region: '',
    level: '',
    bio: '',
    contactEmail: '',
    // Disability fields
    isDisabled: false,
    disabilityType: '',
    disabilityDescription: '',
    accommodationsNeeded: '',
    medicalCertification: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const athlete = findAthleteForUser(athletes, user);
  
  // Show create profile form if no athlete is found
  const [showCreateProfile, setShowCreateProfile] = useState(!athlete);

  // Function to initialize form with current athlete data or empty for new profile
  const initializeForm = () => {
    if (athlete) {
      // Existing athlete - populate with current data
      setForm({
        name: athlete?.name || '',
        age: athlete?.age?.toString() || '',
        sport: athlete?.sport || '',
        region: athlete?.region || '',
        level: athlete?.level || '',
        bio: athlete?.bio || '',
        contactEmail: (athlete && 'contactEmail' in athlete ? (athlete as any).contactEmail : '') || '',
        // Disability fields
        isDisabled: athlete?.isDisabled || false,
        disabilityType: athlete?.disabilityType || '',
        disabilityDescription: athlete?.disabilityDescription || '',
        accommodationsNeeded: athlete?.accommodationsNeeded?.join(', ') || '',
        medicalCertification: athlete?.medicalCertification || '',
      });
    } else {
      // New profile - use user data as starting point
      setForm({
        name: user?.name || '',
        age: '',
        sport: '',
        region: '',
        level: 'Beginner',
        bio: '',
        contactEmail: user?.email || '',
        // Disability fields
        isDisabled: false,
        disabilityType: '',
        disabilityDescription: '',
        accommodationsNeeded: '',
        medicalCertification: '',
      });
    }
  };

  // Function to open edit modal with current data or create modal with empty data
  const handleEditClick = () => {
    initializeForm();
    setShowEdit(true);
    setError(''); // Clear any previous errors
  };

  // Function to open create profile modal
  const handleCreateClick = () => {
    initializeForm();
    setShowCreateProfile(true);
    setShowEdit(true);
    setError(''); // Clear any previous errors
  };
  
  // If no athlete found, show create profile option instead of error message
  if (!athlete && !showCreateProfile) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Talent Track!</h1>
            <p className="text-gray-600 mb-6">
              Let&apos;s create your athlete profile to get started.
            </p>
            <button
              onClick={handleCreateClick}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create My Profile
            </button>
            <p className="text-sm text-gray-500 mt-4">
              User ID: {user?._id} | Email: {user?.email}
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  const coach = athlete ? coaches.find(c => c.id === athlete.coachId) : null;
  const academy = athlete ? academies.find(a => a.id === athlete.academyId) : null;
  const athleteTournaments = athlete ? tournaments.filter(t => t.sport === athlete.sport) : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validate disability fields if isDisabled is true
    if (form.isDisabled && !form.disabilityType) {
      setError('Please select a disability type when marking as disabled');
      setLoading(false);
      return;
    }
    
    try {
      const payload = { 
        ...form, 
        age: Number(form.age),
        accommodationsNeeded: form.accommodationsNeeded ? form.accommodationsNeeded.split(',').map(item => item.trim()).filter(item => item.length > 0) : [],
        // Ensure disability fields are included
        isDisabled: form.isDisabled,
        disabilityType: form.isDisabled ? form.disabilityType : '',
        disabilityDescription: form.isDisabled ? form.disabilityDescription : '',
        medicalCertification: form.isDisabled ? form.medicalCertification : '',
        // Add user ID for new profile creation
        userId: user?._id
      };
      
      // Determine if we're creating or updating
      const isCreating = !athlete;
      const url = isCreating ? '/api/athlete' : `/api/athlete/${athlete.id || athlete._id}`;
      const method = isCreating ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });     
      
      if (res.ok) {
        const result = await res.json();
        console.log('Success response:', result);
        setShowEdit(false);
        setShowCreateProfile(false);
        window.location.reload();
      } else {
        const errorData = await res.json();
        console.error('Update/Create failed:', errorData);
        setError(`Failed to ${isCreating ? 'create' : 'update'} profile: ${errorData.details || errorData.error}`);
      }
    } catch (error) {
      console.error('Frontend error:', error);
      setError(`Failed to ${!athlete ? 'create' : 'update'} profile`);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Pro': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <FloatingChatbotButton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Only show profile content if athlete exists */}
        {athlete && (
          <>
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{athlete.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Trophy className="h-4 w-4" />
                  <span>{athlete.sport}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{athlete.region}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{athlete.age} years old</span>
                </div>
              </div>
              <div className="mt-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(athlete.level)}`}>
                  <Star className="h-4 w-4 mr-1" />
                  {athlete.level}
                </span>
                {athlete.isDisabled && (
                  <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    ♿ Para-Athlete
                  </span>
                )}
              </div>
            </div>
            <div className="ml-auto">
              <button
                className="btn btn-outline-primary"
                onClick={handleEditClick}
              >Edit Profile</button>
            </div>
          </div>
          {athlete.bio && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-700">{athlete.bio}</p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Badges */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                Badges & Achievements
              </h2>
              
              {athlete?.badges && athlete.badges.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {athlete.badges.map((badge) => (
                    <div key={badge.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl">{badge.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{badge.name}</h3>
                        <p className="text-sm text-gray-600">{badge.description}</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getBadgeColor(badge.rarity)}`}>
                          {badge.rarity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No badges earned yet. Keep training to unlock achievements!</p>
                </div>
              )}
            </div>

            {/* Tournament History */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-blue-500" />
                Tournament History
              </h2>
              
              <div className="space-y-4">
                {athleteTournaments.slice(0, 3).map((tournament) => (
                  <div key={tournament.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">{tournament.name}</h3>
                      <p className="text-sm text-gray-600">{tournament.location}</p>
                      <p className="text-xs text-gray-500">{new Date(tournament.startDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        tournament.status === 'completed' ? 'bg-green-100 text-green-800' :
                        tournament.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tournament.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Academy & Coach Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Training Details</h2>
              
              {academy && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Academy</h3>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900">{academy.name}</p>
                    <p className="text-sm text-blue-700">{academy.location}</p>
                  </div>
                </div>
              )}

              {coach && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Coach</h3>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-900">{coach.name}</p>
                    <p className="text-sm text-green-700">{coach.specialization}</p>
                    <p className="text-xs text-green-600">{coach.experience} years experience</p>
                  </div>
                </div>
              )}

              {!academy && !coach && (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm">No academy or coach assigned yet.</p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Badges Earned</span>
                  <span className="font-semibold text-gray-900">{athlete?.badges?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Level</span>
                  <span className="font-semibold text-gray-900">{athlete.level}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sport</span>
                  <span className="font-semibold text-gray-900">{athlete.sport}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Region</span>
                  <span className="font-semibold text-gray-900">{athlete.region}</span>
                </div>
                {athlete.isDisabled && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Para-Athlete</span>
                    <span className="font-semibold text-blue-600">Yes</span>
                  </div>
                )}
              </div>
            </div>

            {/* Accessibility Information */}
            {athlete.isDisabled && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">♿</span>
                  Accessibility Information
                </h2>
                
                <div className="space-y-3">
                  {athlete.disabilityType && (
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Disability Type</h3>
                      <p className="text-gray-600 text-sm">{athlete.disabilityType}</p>
                    </div>
                  )}
                  
                  {athlete.disabilityDescription && (
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Description</h3>
                      <p className="text-gray-600 text-sm">{athlete.disabilityDescription}</p>
                    </div>
                  )}
                  
                  {athlete.accommodationsNeeded && athlete.accommodationsNeeded.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Accommodations Needed</h3>
                      <ul className="text-gray-600 text-sm space-y-1">
                        {athlete.accommodationsNeeded.map((accommodation, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            {accommodation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {athlete.medicalCertification && (
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Medical Certification</h3>
                      <p className="text-gray-600 text-sm font-mono">{athlete.medicalCertification}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* End of athlete conditional */}
        </>
        )}

     {/* Edit Modal */}
{showEdit && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] flex flex-col relative">
      {/* Fixed Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          {athlete ? 'Edit Athlete Profile' : 'Create Athlete Profile'}
        </h2>
        <button
          className="text-gray-400 hover:text-gray-700 text-2xl"
          onClick={() => {
            setShowEdit(false);
            setShowCreateProfile(false);
          }}
        >
          &times;
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Form */}
        <form id="edit-athlete-form" onSubmit={handleEditSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            name="age"
            placeholder="Enter age"
            value={form.age}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Sport */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sport
          </label>
          <input
            name="sport"
            placeholder="Enter sport"
            value={form.sport}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Region */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Region
          </label>
          <input
            name="region"
            placeholder="Enter region"
            value={form.region}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Level
          </label>
          <input
            name="level"
            placeholder="Beginner / Intermediate / Pro"
            value={form.level}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            placeholder="Write a short bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Email
          </label>
          <input
            type="email"
            name="contactEmail"
            placeholder="Enter email address"
            value={form.contactEmail}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Disability Information Section */}
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Accessibility Information</h3>
          
          {/* Is Disabled Checkbox */}
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isDisabled"
                checked={form.isDisabled}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                I am an athlete with a disability (Para-Athlete)
              </span>
            </label>
          </div>

          {/* Conditional Disability Fields */}
          {form.isDisabled && (
            <div className="space-y-4 ml-6 border-l-2 border-blue-200 pl-4">
              {/* Disability Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Disability Type
                </label>
                <select
                  name="disabilityType"
                  value={form.disabilityType}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required={form.isDisabled}
                >
                  <option value="">Select disability type</option>
                  <option value="Physical Disability">Physical Disability</option>
                  <option value="Visual Impairment">Visual Impairment</option>
                  <option value="Hearing Impairment">Hearing Impairment</option>
                  <option value="Intellectual Disability">Intellectual Disability</option>
                  <option value="Mental Health Condition">Mental Health Condition</option>
                  <option value="Neurological Condition">Neurological Condition</option>
                  <option value="Chronic Illness">Chronic Illness</option>
                  <option value="Multiple Disabilities">Multiple Disabilities</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Disability Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Disability Description
                </label>
                <textarea
                  name="disabilityDescription"
                  placeholder="Describe your disability and how it affects your athletic performance"
                  value={form.disabilityDescription}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={3}
                />
              </div>

              {/* Accommodations Needed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Accommodations Needed
                </label>
                <input
                  name="accommodationsNeeded"
                  placeholder="List accommodations needed (comma-separated)"
                  value={form.accommodationsNeeded}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: Sign language interpreter, Wheelchair accessible facilities, Audio descriptions
                </p>
              </div>

              {/* Medical Certification */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medical Certification/Reference Number
                </label>
                <input
                  name="medicalCertification"
                  placeholder="Medical certificate number or reference"
                  value={form.medicalCertification}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Official medical certification or classification number if available
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
        </form>
      </div>

      {/* Fixed Footer with Submit Button */}
      <div className="border-t border-gray-200 p-6">
        <div className="flex justify-end">
          <button
            type="submit"
            form="edit-athlete-form"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Saving..." : (athlete ? "Save Changes" : "Create Profile")}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default AthleteProfile;