import { useState, useEffect, useMemo } from 'react';
import { 
  AIAnalyticsEngine, 
  TrainingSession, 
  AIInsight, 
  PerformanceTrend, 
  InjuryRisk, 
  CompetitionReadiness 
} from '../utils/aiAnalytics';
import { Athlete } from '../types';

interface UseAIAnalyticsProps {
  athlete: Athlete;
  trainingSessions: TrainingSession[];
  refreshInterval?: number; // milliseconds
}

interface AIAnalyticsData {
  insights: AIInsight[];
  trends: PerformanceTrend[];
  injuryRisk: InjuryRisk;
  competitionReadiness: CompetitionReadiness;
  loading: boolean;
  lastUpdated: Date | null;
  error: string | null;
}

export const useAIAnalytics = ({ 
  athlete, 
  trainingSessions, 
  refreshInterval = 300000 // 5 minutes
}: UseAIAnalyticsProps): AIAnalyticsData => {
  
  const [data, setData] = useState<Omit<AIAnalyticsData, 'loading' | 'lastUpdated' | 'error'>>({
    insights: [],
    trends: [],
    injuryRisk: {
      overall: 0,
      factors: {
        workloadSpike: 0,
        recoveryDeficit: 0,
        techniqueIssues: 0,
        fatigue: 0
      },
      recommendations: []
    },
    competitionReadiness: {
      overall: 0,
      factors: {
        fitness: 0,
        technique: 0,
        mental: 0,
        recovery: 0,
        consistency: 0
      },
      recommendations: []
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Memoize expensive calculations
  const analyticsData = useMemo(() => {
    if (!athlete || trainingSessions.length === 0) {
      return null;
    }

    try {
      // Run AI analytics
      const trends = AIAnalyticsEngine.analyzePerformanceTrends(trainingSessions);
      const injuryRisk = AIAnalyticsEngine.assessInjuryRisk(athlete, trainingSessions);
      const competitionReadiness = AIAnalyticsEngine.evaluateCompetitionReadiness(athlete, trainingSessions);
      const insights = AIAnalyticsEngine.generateInsights(
        athlete, 
        trainingSessions, 
        trends, 
        injuryRisk, 
        competitionReadiness
      );

      return {
        trends,
        injuryRisk,
        competitionReadiness,
        insights
      };
    } catch (err) {
      console.error('AI Analytics calculation error:', err);
      return null;
    }
  }, [athlete, trainingSessions]);

  // Update data when analytics change
  useEffect(() => {
    if (analyticsData) {
      setLoading(true);
      setError(null);
      
      // Simulate async processing (in real implementation, this might be an API call)
      const timer = setTimeout(() => {
        setData(analyticsData);
        setLastUpdated(new Date());
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [analyticsData]);

  // Periodic refresh
  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(() => {
        // Force recalculation by updating a dependency
        setLastUpdated(new Date());
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  return {
    ...data,
    loading,
    lastUpdated,
    error
  };
};

// Hook for real-time performance monitoring
export const useRealTimePerformance = (athleteId: string) => {
  const [currentSession, setCurrentSession] = useState<Partial<TrainingSession> | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startSession = (sessionData: Partial<TrainingSession>) => {
    setCurrentSession({
      ...sessionData,
      athleteId,
      date: new Date(),
      exercises: [],
      fatigue: 5 // default
    });
    setIsRecording(true);
  };

  const endSession = () => {
    setIsRecording(false);
    const session = currentSession;
    setCurrentSession(null);
    return session;
  };

  const addExercise = (exercise: Omit<TrainingSession['exercises'][0], 'id'>) => {
    if (currentSession) {
      setCurrentSession(prev => ({
        ...prev!,
        exercises: [
          ...prev!.exercises!,
          {
            ...exercise,
            id: Date.now().toString()
          }
        ]
      }));
    }
  };

  const updatePerformance = (performance: Partial<TrainingSession['performance']>) => {
    if (currentSession) {
      setCurrentSession(prev => ({
        ...prev!,
        performance: {
          ...prev!.performance,
          ...performance
        }
      }));
    }
  };

  return {
    currentSession,
    isRecording,
    startSession,
    endSession,
    addExercise,
    updatePerformance
  };
};