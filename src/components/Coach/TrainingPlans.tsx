import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Users, Calendar, Clock, Target } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { findCoachForUser } from '../../utils/userMatching';

const TrainingPlans: React.FC = () => {
  const { user } = useAuth();
  const { coaches, athletes } = useData();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlan, setNewPlan] = useState({
    title: '',
    description: '',
    sport: '',
    level: 'beginner' as 'beginner' | 'intermediate' | 'pro',
    duration: 4,
    exercises: [
      { id: '1', name: '', description: '', sets: 3, reps: 10, duration: 0, restTime: 60, completed: false }
    ]
  });

  const coach = findCoachForUser(coaches, user);
  const myAthletes = Array.isArray(athletes) ? athletes.filter(a => a.coachId === coach?.id) : [];
  // console.log('Coach ID:', coach?.id, 'Athletes with coachId:', athletes.map(a => ({ name: a.name, coachId: a.coachId })));
  const [trainingPlans, setTrainingPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPlan, setEditPlan] = useState<any>(null);

  // Fetch training plans from backend
  React.useEffect(() => {
    const fetchPlans = async () => {
      const res = await fetch('/api/trainingPlan');
      if (res.ok) {
        const data = await res.json();
        setTrainingPlans(data.plans || []);
      }
    };
    fetchPlans();
  }, [showCreateForm]);

  // Early return if no coach found
  if (!coach) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-500">Loading coach data...</p>
          </div>
        </div>
      </div>
    );
  }

  const myTrainingPlans = trainingPlans.filter(tp => coach && tp.coachId === coach.id);
  const allPlans = myTrainingPlans;

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coach || !(coach as any)._id) {
      alert('No coach found. Please check your account or data.');
      return;
    }

    const planData = {
      // No athlete assignment - available to all athletes
      coach: (coach as any)._id,
      title: newPlan.title,
      description: newPlan.description,
      sport: newPlan.sport,
      level: newPlan.level,
      exercises: newPlan.exercises,
      duration: newPlan.duration,
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    console.log('planData being sent:', planData);

    const res = await fetch('/api/trainingPlan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(planData)
    });

    if (res.ok) {
      setShowCreateForm(false);
      setNewPlan({
        title: '',
        description: '',
        sport: '',
        level: 'beginner' as 'beginner' | 'intermediate' | 'pro',
        duration: 4,
        exercises: [
          { id: '1', name: '', description: '', sets: 3, reps: 10, duration: 0, restTime: 60, completed: false }
        ]
      });
      // Refetch plans
      const data = await res.json();
      setTrainingPlans(prev => [...prev, data.plan]);
    } else {
      // Handle error
      alert('Failed to create training plan');
    }
  };

  const addExercise = () => {
    setNewPlan({
      ...newPlan,
      exercises: [
        ...newPlan.exercises,
        { 
          id: (newPlan.exercises.length + 1).toString(), 
          name: '', 
          description: '', 
          sets: 3, 
          reps: 10, 
          duration: 0, 
          restTime: 60, 
          completed: false 
        }
      ]
    });
  };

  const removeExercise = (index: number) => {
    setNewPlan({
      ...newPlan,
      exercises: newPlan.exercises.filter((_, i) => i !== index)
    });
  };

  const updateExercise = (index: number, field: string, value: any) => {
    const updatedExercises = newPlan.exercises.map((exercise, i) => 
      i === index ? { ...exercise, [field]: value } : exercise
    );
    setNewPlan({ ...newPlan, exercises: updatedExercises });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAthleteEnrolled = (_planId: string) => {
    return 'Available to all athletes'; // Since plans are not assigned to specific athletes
  };

  const handleViewPlan = (plan: any) => {
    setSelectedPlan(plan);
    setShowViewModal(true);
  };

  const handleEditPlan = (plan: any) => {
    setEditPlan({
      ...plan,
      exercises: plan.exercises || []
    });
    setShowEditModal(true);
  };

  const handleDeletePlan = async (planId: string) => {
    if (!confirm('Are you sure you want to delete this training plan? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/trainingPlan`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: planId })
      });

      if (res.ok) {
        setTrainingPlans(prev => prev.filter(plan => plan._id !== planId));
        alert('Training plan deleted successfully');
      } else {
        const errorData = await res.json();
        alert(`Failed to delete training plan: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
      alert('Error deleting training plan');
    }
  };

  const handleUpdatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPlan || !editPlan._id) {
      alert('No plan selected for editing');
      return;
    }

    try {
      const res = await fetch(`/api/trainingPlan`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: editPlan._id,
          title: editPlan.title,
          description: editPlan.description,
          sport: editPlan.sport,
          level: editPlan.level,
          exercises: editPlan.exercises,
          duration: editPlan.duration,
        })
      });

      if (res.ok) {
        const updatedPlan = await res.json();
        setTrainingPlans(prev => prev.map(plan => 
          plan._id === editPlan._id ? updatedPlan.plan || updatedPlan : plan
        ));
        setShowEditModal(false);
        setEditPlan(null);
        alert('Training plan updated successfully');
      } else {
        const errorData = await res.json();
        alert(`Failed to update training plan: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating plan:', error);
      alert('Error updating training plan');
    }
  };

  const addExerciseToEdit = () => {
    setEditPlan({
      ...editPlan,
      exercises: [
        ...editPlan.exercises,
        { 
          id: (editPlan.exercises.length + 1).toString(), 
          name: '', 
          description: '', 
          sets: 3, 
          reps: 10, 
          duration: 0, 
          restTime: 60, 
          completed: false 
        }
      ]
    });
  };

  const removeExerciseFromEdit = (index: number) => {
    setEditPlan({
      ...editPlan,
      exercises: editPlan.exercises.filter((_: any, i: number) => i !== index)
    });
  };

  const updateExerciseInEdit = (index: number, field: string, value: any) => {
    const updatedExercises = editPlan.exercises.map((exercise: any, i: number) => 
      i === index ? { ...exercise, [field]: value } : exercise
    );
    setEditPlan({ ...editPlan, exercises: updatedExercises });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Training Plans</h1>
              <p className="text-gray-600">Create and manage training programs for your athletes</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Plan
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Plans</p>
                <p className="text-2xl font-bold text-blue-600">{allPlans.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Plans</p>
                <p className="text-2xl font-bold text-green-600">
                  {allPlans.filter(p => p.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-purple-600">
                  {allPlans.filter(p => p.status === 'completed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Athletes Enrolled</p>
                <p className="text-2xl font-bold text-yellow-600">{myAthletes.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Training Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                    {plan.status}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">{getAthleteEnrolled(plan.id)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{plan.duration} weeks duration</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                      <Target className="h-4 w-4 mr-2" />
                      <span className="text-sm">{Array.isArray(plan.exercises) ? plan.exercises.length : 0} exercises</span>
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
                      {Array.isArray(plan.exercises) && plan.exercises.slice(0, 3).map((exercise: any, index: number) => (
                        <div key={exercise.id} className="text-sm text-gray-600 flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          {exercise.name || `Exercise ${index + 1}`}
                        </div>
                      ))}
                      {Array.isArray(plan.exercises) && plan.exercises.length > 3 && (
                        <div className="text-xs text-gray-500">+{plan.exercises.length - 3} more exercises</div>
                      )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewPlan(plan)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleEditPlan(plan)}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <button 
                    onClick={() => handleDeletePlan(plan._id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {allPlans.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No training plans yet</h3>
            <p className="text-gray-500 mb-4">Create your first training plan to get started.</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Training Plan
            </button>
          </div>
        )}

        {/* Create Plan Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Training Plan</h2>
                
                <form onSubmit={handleCreatePlan} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Plan Title</label>
                      <input
                        type="text"
                        value={newPlan.title}
                        onChange={(e) => setNewPlan({...newPlan, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration (weeks)</label>
                      <input
                        type="number"
                        value={newPlan.duration}
                        onChange={(e) => setNewPlan({...newPlan, duration: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                      <select
                        value={newPlan.sport}
                        onChange={(e) => setNewPlan({...newPlan, sport: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select Sport</option>
                        <option value="Football">Football</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Tennis">Tennis</option>
                        <option value="Swimming">Swimming</option>
                        <option value="Athletics">Athletics</option>
                        <option value="Cricket">Cricket</option>
                        <option value="Badminton">Badminton</option>
                        <option value="Volleyball">Volleyball</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                      <select
                        value={newPlan.level}
                        onChange={(e) => setNewPlan({...newPlan, level: e.target.value as 'beginner' | 'intermediate' | 'pro'})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="pro">Pro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newPlan.description}
                      onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      required
                    />
                  </div>

                  {/* Exercises */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">Exercises</label>
                      <button
                        type="button"
                        onClick={addExercise}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        Add Exercise
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {newPlan.exercises.map((exercise, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900">Exercise {index + 1}</h4>
                            {newPlan.exercises.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeExercise(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Exercise Name</label>
                              <input
                                type="text"
                                value={exercise.name}
                                onChange={(e) => updateExercise(index, 'name', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Sets</label>
                              <input
                                type="number"
                                value={exercise.sets}
                                onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value))}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                min="1"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Reps</label>
                              <input
                                type="number"
                                value={exercise.reps}
                                onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value))}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                min="0"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Duration (min)</label>
                              <input
                                type="number"
                                value={exercise.duration}
                                onChange={(e) => updateExercise(index, 'duration', parseInt(e.target.value))}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                min="0"
                              />
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                            <textarea
                              value={exercise.description}
                              onChange={(e) => updateExercise(index, 'description', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              rows={2}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Create Plan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* View Plan Modal */}
        {showViewModal && selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPlan.title}</h2>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Sport</h3>
                      <p className="text-gray-900">{selectedPlan.sport}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Level</h3>
                      <p className="text-gray-900 capitalize">{selectedPlan.level}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Duration</h3>
                      <p className="text-gray-900">{selectedPlan.duration} weeks</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Status</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPlan.status)}`}>
                        {selectedPlan.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                    <p className="text-gray-900">{selectedPlan.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Exercises ({selectedPlan.exercises?.length || 0})</h3>
                    <div className="space-y-4">
                      {selectedPlan.exercises?.map((exercise: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{exercise.name || `Exercise ${index + 1}`}</h4>
                            <div className="text-sm text-gray-500">
                              {exercise.sets} sets × {exercise.reps} reps
                              {exercise.duration > 0 && ` • ${exercise.duration} min`}
                            </div>
                          </div>
                          {exercise.description && (
                            <p className="text-sm text-gray-600">{exercise.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Plan Modal */}
        {showEditModal && editPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Training Plan</h2>
                
                <form onSubmit={handleUpdatePlan} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Plan Title</label>
                      <input
                        type="text"
                        value={editPlan.title}
                        onChange={(e) => setEditPlan({...editPlan, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration (weeks)</label>
                      <input
                        type="number"
                        value={editPlan.duration}
                        onChange={(e) => setEditPlan({...editPlan, duration: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                      <select
                        value={editPlan.sport}
                        onChange={(e) => setEditPlan({...editPlan, sport: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select Sport</option>
                        <option value="Football">Football</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Tennis">Tennis</option>
                        <option value="Swimming">Swimming</option>
                        <option value="Athletics">Athletics</option>
                        <option value="Cricket">Cricket</option>
                        <option value="Badminton">Badminton</option>
                        <option value="Volleyball">Volleyball</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                      <select
                        value={editPlan.level}
                        onChange={(e) => setEditPlan({...editPlan, level: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="pro">Pro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={editPlan.description}
                      onChange={(e) => setEditPlan({...editPlan, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      required
                    />
                  </div>

                  {/* Exercises */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">Exercises</label>
                      <button
                        type="button"
                        onClick={addExerciseToEdit}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        Add Exercise
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {editPlan.exercises.map((exercise: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900">Exercise {index + 1}</h4>
                            {editPlan.exercises.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeExerciseFromEdit(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Exercise Name</label>
                              <input
                                type="text"
                                value={exercise.name}
                                onChange={(e) => updateExerciseInEdit(index, 'name', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Sets</label>
                              <input
                                type="number"
                                value={exercise.sets}
                                onChange={(e) => updateExerciseInEdit(index, 'sets', parseInt(e.target.value))}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                min="1"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Reps</label>
                              <input
                                type="number"
                                value={exercise.reps}
                                onChange={(e) => updateExerciseInEdit(index, 'reps', parseInt(e.target.value))}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                min="0"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Duration (min)</label>
                              <input
                                type="number"
                                value={exercise.duration}
                                onChange={(e) => updateExerciseInEdit(index, 'duration', parseInt(e.target.value))}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                min="0"
                              />
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                            <textarea
                              value={exercise.description}
                              onChange={(e) => updateExerciseInEdit(index, 'description', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              rows={2}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false);
                        setEditPlan(null);
                      }}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Update Plan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingPlans;