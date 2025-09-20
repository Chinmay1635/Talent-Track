import React, { useState, useEffect } from 'react';
import { Clock, Users, Search, Calendar, User, X, Target, CheckCircle } from 'lucide-react';
import FloatingChatbotButton from '../Layout/FloatingChatbotButton';

const AthleteTraining: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [trainingPlans, setTrainingPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch training plans from backend
  useEffect(() => {
    const fetchTrainingPlans = async () => {
      try {
        const res = await fetch('/api/trainingPlan');
        if (res.ok) {
          const data = await res.json();
          setTrainingPlans(data.plans || []);
        }
      } catch (error) {
        console.error('Failed to fetch training plans:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainingPlans();
  }, []);

  const filteredPlans = trainingPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = sportFilter === 'all' || plan.sport === sportFilter;
    const matchesLevel = levelFilter === 'all' || plan.level === levelFilter;
    
    return matchesSearch && matchesSport && matchesLevel;
  });

  // Define available sports and levels
  const availableSports = ['Football', 'Basketball', 'Tennis', 'Swimming', 'Athletics', 'Cricket', 'Badminton', 'Volleyball'];
  const availableLevels = ['beginner', 'intermediate', 'pro'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (plan: any) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };

  const toggleExerciseCompletion = async (planId: string, exerciseId: string, currentStatus: boolean) => {
    try {
      // Find the training plan
      const planIndex = trainingPlans.findIndex(plan => plan._id === planId);
      if (planIndex === -1) return;

      const updatedPlan = { ...trainingPlans[planIndex] };
      const exerciseIndex = updatedPlan.exercises.findIndex((ex: any) => ex.id === exerciseId);
      if (exerciseIndex === -1) return;

      // Toggle the completion status
      updatedPlan.exercises[exerciseIndex].completed = !currentStatus;

      // Update the API
      const response = await fetch(`/api/training-plan/${planId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlan),
      });

      if (response.ok) {
        // Update local state
        const newTrainingPlans = [...trainingPlans];
        newTrainingPlans[planIndex] = updatedPlan;
        setTrainingPlans(newTrainingPlans);

        // Update selected plan if it's the one being modified
        if (selectedPlan && selectedPlan._id === planId) {
          setSelectedPlan(updatedPlan);
        }
      } else {
        console.error('Failed to update exercise completion');
      }
    } catch (error) {
      console.error('Error toggling exercise completion:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Training Plans</h1>
          <p className="text-gray-600">View and follow training plans created by your coaches</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search training plans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="md:w-48">
                          <select 
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
            >
              <option value="all">All Sports</option>
              {availableSports.map(sport => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>
            </div>

            {/* Level Filter */}
            <div className="md:w-48">
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Levels</option>
                {availableLevels.map(level => (
                  <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Training Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <div key={plan._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status || 'active')}`}>
                    {plan.status || 'active'}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-sm">Coach Created</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{plan.duration || 4} weeks duration</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">{plan.exercises?.length || 0} exercises</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Created {new Date(plan.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Exercise Preview */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Exercises:</h4>
                  <div className="space-y-1">
                    {plan.exercises?.slice(0, 3).map((exercise: any, index: number) => (
                      <div key={exercise.id || index} className="text-sm text-gray-600 flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <div className={`w-2 h-2 rounded-full mr-2 ${exercise.completed ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                          <span className={exercise.completed ? 'line-through text-green-600' : ''}>
                            {exercise.name || `Exercise ${index + 1}`}
                          </span>
                        </div>
                        {exercise.completed && (
                          <CheckCircle className="h-3 w-3 text-green-500 fill-current" />
                        )}
                      </div>
                    ))}
                    {plan.exercises?.length > 3 && (
                      <div className="text-xs text-gray-500">+{plan.exercises.length - 3} more exercises</div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    {plan.exercises && plan.exercises.length > 0 && (
                      <span>
                        {plan.exercises.filter((ex: any) => ex.completed).length}/{plan.exercises.length} completed
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => handleViewDetails(plan)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPlans.length === 0 && !loading && (
          <div className="text-center py-12">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No training plans found</h3>
            <p className="text-gray-500">No training plans are available yet. Check back later for new plans from your coaches.</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-2">Loading training plans...</p>
          </div>
        )}

        {/* Global Floating Chatbot Button */}
        <FloatingChatbotButton />

        {/* Training Plan Details Modal */}
        {showModal && selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPlan.title}</h2>
                    <p className="text-gray-600">{selectedPlan.description}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Plan Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Duration</p>
                        <p className="text-sm text-gray-600">{selectedPlan.duration || 4} weeks</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Target className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Total Exercises</p>
                        <p className="text-sm text-gray-600">{selectedPlan.exercises?.length || 0} exercises</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Created</p>
                        <p className="text-sm text-gray-600">{new Date(selectedPlan.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Status</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPlan.status || 'active')}`}>
                          {selectedPlan.status || 'active'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                {selectedPlan.exercises && selectedPlan.exercises.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900">Progress</h3>
                      <span className="text-sm text-gray-600">
                        {selectedPlan.exercises.filter((ex: any) => ex.completed).length} / {selectedPlan.exercises.length} exercises completed
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                        style={{
                          width: `${(selectedPlan.exercises.filter((ex: any) => ex.completed).length / selectedPlan.exercises.length) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Exercises List */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Exercises</h3>
                  <div className="space-y-4">
                    {selectedPlan.exercises?.map((exercise: any, index: number) => (
                      <div key={exercise.id || index} className={`border rounded-lg p-4 transition-all ${exercise.completed ? 'bg-green-50 border-green-200' : 'border-gray-200'}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className={`font-medium mb-1 ${exercise.completed ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                              {exercise.name || `Exercise ${index + 1}`}
                            </h4>
                            <p className={`text-sm ${exercise.completed ? 'text-green-600' : 'text-gray-600'}`}>{exercise.description}</p>
                          </div>
                          <button
                            onClick={() => toggleExerciseCompletion(selectedPlan._id, exercise.id, exercise.completed)}
                            className={`p-1 rounded-full transition-colors ${exercise.completed ? 'text-green-600 hover:text-green-700 bg-green-100' : 'text-gray-300 hover:text-green-500 hover:bg-green-50'}`}
                            title={exercise.completed ? 'Mark as incomplete' : 'Mark as completed'}
                          >
                            <CheckCircle className={`h-6 w-6 ${exercise.completed ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Sets:</span>
                            <span className="ml-1 text-gray-600">{exercise.sets || 0}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Reps:</span>
                            <span className="ml-1 text-gray-600">{exercise.reps || 0}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Duration:</span>
                            <span className="ml-1 text-gray-600">{exercise.duration || 0} min</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Rest:</span>
                            <span className="ml-1 text-gray-600">{exercise.restTime || 0}s</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {(!selectedPlan.exercises || selectedPlan.exercises.length === 0) && (
                      <div className="text-center py-8">
                        <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No exercises added to this plan yet.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
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

export default AthleteTraining;