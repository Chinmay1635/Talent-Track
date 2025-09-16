import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Users, Calendar, Clock, Target } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const TrainingPlans: React.FC = () => {
  const { user } = useAuth();
  const { coaches, athletes, trainingPlans, addTrainingPlan } = useData();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [newPlan, setNewPlan] = useState({
    title: '',
    description: '',
    duration: 4,
    exercises: [
      { id: '1', name: '', description: '', sets: 3, reps: 10, duration: 0, restTime: 60, completed: false }
    ]
  });

  const coach = coaches.find(c => c.userId === user?.id) || coaches[0];
  const myAthletes = athletes.filter(a => a.coachId === coach?.id);
  const myTrainingPlans = trainingPlans.filter(tp => tp.coachId === coach?.id);

  // Add some dummy training plans
  const dummyPlans = [
    {
      id: 'dummy-plan-1',
      athleteId: 'dummy-1',
      coachId: coach?.id || '',
      title: 'Advanced Boxing Techniques',
      description: 'Focus on advanced combinations and defensive techniques',
      exercises: [
        { id: '1', name: 'Combination Drills', description: 'Practice 1-2-3 combinations', sets: 5, reps: 20, duration: 0, restTime: 90, completed: false },
        { id: '2', name: 'Defensive Footwork', description: 'Slip and counter movements', sets: 4, reps: 15, duration: 0, restTime: 60, completed: false },
        { id: '3', name: 'Heavy Bag Power', description: 'Power punching on heavy bag', sets: 6, reps: 0, duration: 3, restTime: 120, completed: false }
      ],
      duration: 6,
      createdAt: '2025-01-05',
      status: 'active' as const
    },
    {
      id: 'dummy-plan-2',
      athleteId: 'dummy-2',
      coachId: coach?.id || '',
      title: 'Strength & Conditioning',
      description: 'Build core strength and cardiovascular endurance',
      exercises: [
        { id: '1', name: 'Circuit Training', description: 'Full body circuit workout', sets: 3, reps: 0, duration: 15, restTime: 180, completed: false },
        { id: '2', name: 'Core Strengthening', description: 'Planks, crunches, and rotations', sets: 4, reps: 25, duration: 0, restTime: 45, completed: false },
        { id: '3', name: 'Cardio Boxing', description: 'High-intensity boxing cardio', sets: 3, reps: 0, duration: 10, restTime: 120, completed: false }
      ],
      duration: 8,
      createdAt: '2025-01-03',
      status: 'active' as const
    },
    {
      id: 'dummy-plan-3',
      athleteId: 'dummy-3',
      coachId: coach?.id || '',
      title: 'Competition Preparation',
      description: 'Intensive training for upcoming tournament',
      exercises: [
        { id: '1', name: 'Sparring Sessions', description: 'Controlled sparring practice', sets: 3, reps: 0, duration: 5, restTime: 300, completed: false },
        { id: '2', name: 'Speed Training', description: 'Speed bag and reaction drills', sets: 5, reps: 30, duration: 0, restTime: 60, completed: false },
        { id: '3', name: 'Mental Preparation', description: 'Visualization and focus exercises', sets: 1, reps: 0, duration: 20, restTime: 0, completed: false }
      ],
      duration: 4,
      createdAt: '2025-01-01',
      status: 'completed' as const
    }
  ];

  const allPlans = [...myTrainingPlans, ...dummyPlans];

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    addTrainingPlan({
      athleteId: selectedPlan,
      coachId: coach?.id || '',
      title: newPlan.title,
      description: newPlan.description,
      exercises: newPlan.exercises,
      duration: newPlan.duration,
      createdAt: new Date().toISOString(),
      status: 'active'
    });

    setNewPlan({
      title: '',
      description: '',
      duration: 4,
      exercises: [
        { id: '1', name: '', description: '', sets: 3, reps: 10, duration: 0, restTime: 60, completed: false }
      ]
    });
    setSelectedPlan('');
    setShowCreateForm(false);
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

  const getAthleteEnrolled = (planId: string) => {
    const plan = allPlans.find(p => p.id === planId);
    return myAthletes.find(a => a.id === plan?.athleteId)?.name || 'Unknown Athlete';
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
                    <span className="text-sm">{plan.exercises.length} exercises</span>
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
                    {plan.exercises.slice(0, 3).map((exercise, index) => (
                      <div key={exercise.id} className="text-sm text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        {exercise.name || `Exercise ${index + 1}`}
                      </div>
                    ))}
                    {plan.exercises.length > 3 && (
                      <div className="text-xs text-gray-500">+{plan.exercises.length - 3} more exercises</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                  <button className="text-red-600 hover:text-red-700 p-1">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Athlete</label>
                    <select
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select an athlete</option>
                      {myAthletes.map(athlete => (
                        <option key={athlete.id} value={athlete.id}>{athlete.name}</option>
                      ))}
                    </select>
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
      </div>
    </div>
  );
};

export default TrainingPlans;