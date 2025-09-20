// AI Analytics Engine for Athlete Performance
import { Athlete, TrainingPlan, Tournament } from '../types';

export interface TrainingSession {
  id: string;
  athleteId: string;
  date: Date;
  duration: number; // minutes
  exercises: Exercise[];
  heartRate?: {
    avg: number;
    max: number;
    zones: {
      zone1: number; // recovery
      zone2: number; // aerobic base
      zone3: number; // aerobic threshold
      zone4: number; // anaerobic threshold
      zone5: number; // neuromuscular power
    };
  };
  performance: {
    speed?: number;
    accuracy?: number;
    power?: number;
    endurance?: number;
    technique?: number;
  };
  fatigue: number; // 1-10 scale
  notes?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  distance?: number;
  time?: number;
  performanceScore: number; // 1-100
}

export interface AIInsight {
  type: 'improvement' | 'warning' | 'recommendation' | 'prediction';
  category: 'technique' | 'fitness' | 'recovery' | 'nutrition' | 'mental' | 'strategy';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  recommendation: string;
  confidence: number; // 0-1
  dataPoints: string[];
  actionItems: string[];
}

export interface PerformanceTrend {
  metric: string;
  trend: 'improving' | 'declining' | 'stable' | 'fluctuating';
  changeRate: number; // percentage change per week
  predictedValue: number;
  confidence: number;
  timeframe: number; // weeks
}

export interface InjuryRisk {
  overall: number; // 0-100
  factors: {
    workloadSpike: number;
    recoveryDeficit: number;
    techniqueIssues: number;
    fatigue: number;
  };
  recommendations: string[];
}

export interface CompetitionReadiness {
  overall: number; // 0-100
  factors: {
    fitness: number;
    technique: number;
    mental: number;
    recovery: number;
    consistency: number;
  };
  recommendations: string[];
  optimalCompetitionDate?: Date;
}

export class AIAnalyticsEngine {
  
  /**
   * Analyze athlete performance trends using time series analysis
   */
  static analyzePerformanceTrends(
    sessions: TrainingSession[], 
    timeframe: number = 12 // weeks
  ): PerformanceTrend[] {
    const trends: PerformanceTrend[] = [];
    const metrics = ['speed', 'accuracy', 'power', 'endurance', 'technique'];
    
    metrics.forEach(metric => {
      const values = sessions
        .filter(s => s.performance[metric as keyof typeof s.performance])
        .map(s => ({
          value: s.performance[metric as keyof typeof s.performance]!,
          date: s.date
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime());

      if (values.length < 3) {
        trends.push({
          metric,
          trend: 'stable',
          changeRate: 0,
          predictedValue: values[values.length - 1]?.value || 0,
          confidence: 0.3,
          timeframe
        });
        return;
      }

      // Simple linear regression for trend analysis
      const regression = this.calculateLinearRegression(values);
      const trend = this.determineTrend(regression.slope, regression.correlation);
      
      trends.push({
        metric,
        trend,
        changeRate: regression.slope * 7, // weekly change
        predictedValue: this.predictFutureValue(values, timeframe),
        confidence: Math.abs(regression.correlation),
        timeframe
      });
    });

    return trends;
  }

  /**
   * Assess injury risk based on multiple factors
   */
  static assessInjuryRisk(
    athlete: Athlete,
    sessions: TrainingSession[],
    timeframe: number = 4 // weeks
  ): InjuryRisk {
    const recentSessions = this.getRecentSessions(sessions, timeframe);
    
    // Calculate workload metrics
    const workloadSpike = this.calculateWorkloadSpike(recentSessions);
    const recoveryDeficit = this.calculateRecoveryDeficit(recentSessions);
    const techniqueIssues = this.analyzeTechniqueConsistency(recentSessions);
    const fatigue = this.calculateAverageFatigue(recentSessions);
    
    // Consider athlete-specific factors
    const age = athlete.age || 25;
    const isDisabled = athlete.isDisabled || false;
    
    // Risk calculation with weighted factors
    const factors = {
      workloadSpike: Math.min(workloadSpike * 100, 100),
      recoveryDeficit: Math.min(recoveryDeficit * 100, 100),
      techniqueIssues: Math.min(techniqueIssues * 100, 100),
      fatigue: Math.min(fatigue * 10, 100)
    };

    // Weighted risk calculation (adjusted weights without previousInjuries)
    let overallRisk = (
      factors.workloadSpike * 0.3 +
      factors.recoveryDeficit * 0.25 +
      factors.techniqueIssues * 0.25 +
      factors.fatigue * 0.2
    );

    // Adjust for age and disability
    if (age > 30) overallRisk *= 1.1;
    if (age > 40) overallRisk *= 1.2;
    if (isDisabled) overallRisk *= 1.15; // Slightly higher risk, but not significantly

    const recommendations = this.generateInjuryPreventionRecommendations(factors, athlete);

    return {
      overall: Math.min(overallRisk, 100),
      factors,
      recommendations
    };
  }

  /**
   * Evaluate competition readiness
   */
  static evaluateCompetitionReadiness(
    athlete: Athlete,
    sessions: TrainingSession[],
    upcomingCompetition?: Date
  ): CompetitionReadiness {
    const recentSessions = this.getRecentSessions(sessions, 8); // 8 weeks
    
    const fitness = this.calculateFitnessLevel(recentSessions);
    const technique = this.calculateTechniqueConsistency(recentSessions);
    const mental = this.calculateMentalReadiness(recentSessions);
    const recovery = this.calculateRecoveryState(recentSessions);
    const consistency = this.calculateTrainingConsistency(recentSessions);
    
    const factors = {
      fitness: fitness * 100,
      technique: technique * 100,
      mental: mental * 100,
      recovery: recovery * 100,
      consistency: consistency * 100
    };

    const overall = (
      factors.fitness * 0.3 +
      factors.technique * 0.25 +
      factors.mental * 0.2 +
      factors.recovery * 0.15 +
      factors.consistency * 0.1
    );

    const recommendations = this.generateCompetitionRecommendations(factors, athlete);
    const optimalDate = this.calculateOptimalCompetitionDate(sessions);

    return {
      overall,
      factors,
      recommendations,
      optimalCompetitionDate: optimalDate
    };
  }

  /**
   * Generate AI-powered insights and recommendations
   */
  static generateInsights(
    athlete: Athlete,
    sessions: TrainingSession[],
    trends: PerformanceTrend[],
    injuryRisk: InjuryRisk,
    competitionReadiness: CompetitionReadiness
  ): AIInsight[] {
    const insights: AIInsight[] = [];

    // Performance insights
    trends.forEach(trend => {
      if (trend.trend === 'declining' && trend.confidence > 0.7) {
        insights.push({
          type: 'warning',
          category: 'fitness',
          priority: trend.changeRate < -10 ? 'high' : 'medium',
          title: `Declining ${trend.metric} Performance`,
          description: `${trend.metric} has decreased by ${Math.abs(trend.changeRate).toFixed(1)}% per week over the last ${trend.timeframe} weeks.`,
          recommendation: this.getPerformanceRecommendation(trend.metric, 'declining'),
          confidence: trend.confidence,
          dataPoints: [`${trend.metric} trend`, 'training sessions', 'performance metrics'],
          actionItems: this.getActionItems(trend.metric, 'declining')
        });
      }
      
      if (trend.trend === 'improving' && trend.confidence > 0.8) {
        insights.push({
          type: 'improvement',
          category: 'fitness',
          priority: 'medium',
          title: `Improving ${trend.metric} Performance`,
          description: `Excellent progress! ${trend.metric} has improved by ${trend.changeRate.toFixed(1)}% per week.`,
          recommendation: `Continue current training approach for ${trend.metric}. Consider gradually increasing intensity.`,
          confidence: trend.confidence,
          dataPoints: [`${trend.metric} trend`, 'training consistency'],
          actionItems: [`Maintain current ${trend.metric} training protocol`, 'Consider progressive overload']
        });
      }
    });

    // Injury risk insights
    if (injuryRisk.overall > 70) {
      insights.push({
        type: 'warning',
        category: 'recovery',
        priority: 'critical',
        title: 'High Injury Risk Detected',
        description: `Current injury risk is ${injuryRisk.overall.toFixed(0)}%. Immediate action required.`,
        recommendation: 'Reduce training intensity and focus on recovery protocols.',
        confidence: 0.85,
        dataPoints: ['workload analysis', 'recovery metrics', 'fatigue levels'],
        actionItems: injuryRisk.recommendations
      });
    }

    // Competition readiness insights
    if (competitionReadiness.overall < 60) {
      insights.push({
        type: 'recommendation',
        category: 'strategy',
        priority: 'medium',
        title: 'Competition Readiness Below Optimal',
        description: `Current readiness is ${competitionReadiness.overall.toFixed(0)}%. Focus areas identified.`,
        recommendation: 'Target specific weaknesses in training preparation.',
        confidence: 0.8,
        dataPoints: ['fitness metrics', 'technique analysis', 'mental preparation'],
        actionItems: competitionReadiness.recommendations
      });
    }

    // Para-athlete specific insights
    if (athlete.isDisabled) {
      insights.push(...this.generateParaAthleteInsights(athlete, sessions));
    }

    return insights.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // Helper methods
  private static calculateLinearRegression(values: { value: number; date: Date }[]) {
    const n = values.length;
    const sumX = values.reduce((sum, _, i) => sum + i, 0);
    const sumY = values.reduce((sum, v) => sum + v.value, 0);
    const sumXY = values.reduce((sum, v, i) => sum + i * v.value, 0);
    const sumXX = values.reduce((sum, _, i) => sum + i * i, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Calculate correlation coefficient
    const meanX = sumX / n;
    const meanY = sumY / n;
    const numerator = values.reduce((sum, v, i) => sum + (i - meanX) * (v.value - meanY), 0);
    const denomX = Math.sqrt(values.reduce((sum, _, i) => sum + Math.pow(i - meanX, 2), 0));
    const denomY = Math.sqrt(values.reduce((sum, v) => sum + Math.pow(v.value - meanY, 2), 0));
    const correlation = numerator / (denomX * denomY);
    
    return { slope, intercept, correlation };
  }

  private static determineTrend(slope: number, correlation: number): PerformanceTrend['trend'] {
    if (Math.abs(correlation) < 0.3) return 'fluctuating';
    if (Math.abs(slope) < 0.01) return 'stable';
    return slope > 0 ? 'improving' : 'declining';
  }

  private static getRecentSessions(sessions: TrainingSession[], weeks: number): TrainingSession[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - weeks * 7);
    return sessions.filter(s => s.date >= cutoffDate);
  }

  private static calculateWorkloadSpike(sessions: TrainingSession[]): number {
    if (sessions.length < 4) return 0;
    
    const weeklyLoads = this.calculateWeeklyLoads(sessions);
    if (weeklyLoads.length < 2) return 0;
    
    const currentWeek = weeklyLoads[weeklyLoads.length - 1];
    const previousWeeks = weeklyLoads.slice(-4, -1);
    const avgPrevious = previousWeeks.reduce((sum, load) => sum + load, 0) / previousWeeks.length;
    
    return Math.max(0, (currentWeek - avgPrevious) / avgPrevious);
  }

  private static calculateWeeklyLoads(sessions: TrainingSession[]): number[] {
    const weeks = new Map<string, number>();
    
    sessions.forEach(session => {
      const weekKey = this.getWeekKey(session.date);
      const load = session.duration * (session.exercises.reduce((sum, ex) => sum + ex.performanceScore, 0) / session.exercises.length) / 100;
      weeks.set(weekKey, (weeks.get(weekKey) || 0) + load);
    });
    
    return Array.from(weeks.values());
  }

  private static getWeekKey(date: Date): string {
    const year = date.getFullYear();
    const week = Math.ceil(((date.getTime() - new Date(year, 0, 1).getTime()) / 86400000 + 1) / 7);
    return `${year}-W${week}`;
  }

  private static calculateRecoveryDeficit(sessions: TrainingSession[]): number {
    if (sessions.length === 0) return 0;
    
    const avgFatigue = sessions.reduce((sum, s) => sum + s.fatigue, 0) / sessions.length;
    return Math.max(0, (avgFatigue - 5) / 5); // Normalize to 0-1 scale
  }

  private static analyzeTechniqueConsistency(sessions: TrainingSession[]): number {
    if (sessions.length === 0) return 0;
    
    const techniqueScores = sessions
      .filter(s => s.performance.technique)
      .map(s => s.performance.technique!);
    
    if (techniqueScores.length === 0) return 0;
    
    const mean = techniqueScores.reduce((sum, score) => sum + score, 0) / techniqueScores.length;
    const variance = techniqueScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / techniqueScores.length;
    const standardDeviation = Math.sqrt(variance);
    
    return standardDeviation / mean; // Coefficient of variation
  }

  private static calculateAverageFatigue(sessions: TrainingSession[]): number {
    if (sessions.length === 0) return 0;
    return sessions.reduce((sum, s) => sum + s.fatigue, 0) / sessions.length;
  }

  private static generateInjuryPreventionRecommendations(factors: InjuryRisk['factors'], athlete: Athlete): string[] {
    const recommendations: string[] = [];
    
    if (factors.workloadSpike > 50) {
      recommendations.push('Reduce training volume by 20-30% for the next week');
      recommendations.push('Implement gradual load progression (10% rule)');
    }
    
    if (factors.recoveryDeficit > 60) {
      recommendations.push('Prioritize sleep (8+ hours nightly)');
      recommendations.push('Add extra rest day between intense sessions');
      recommendations.push('Consider massage or active recovery sessions');
    }
    
    if (factors.techniqueIssues > 40) {
      recommendations.push('Schedule technical coaching session');
      recommendations.push('Reduce intensity and focus on form');
    }
    
    if (factors.fatigue > 70) {
      recommendations.push('Take 2-3 days complete rest');
      recommendations.push('Assess nutrition and hydration status');
    }
    
    if (athlete.isDisabled) {
      recommendations.push('Ensure adaptive equipment is properly fitted');
      recommendations.push('Monitor for disability-specific overuse patterns');
    }
    
    return recommendations;
  }

  private static generateCompetitionRecommendations(factors: CompetitionReadiness['factors'], athlete: Athlete): string[] {
    const recommendations: string[] = [];
    
    const weakestAreas = Object.entries(factors)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 2);
    
    weakestAreas.forEach(([area, score]) => {
      if (score < 70) {
        switch (area) {
          case 'fitness':
            recommendations.push('Increase aerobic base training');
            recommendations.push('Add sport-specific conditioning');
            break;
          case 'technique':
            recommendations.push('Schedule additional technical sessions');
            recommendations.push('Video analysis of movement patterns');
            break;
          case 'mental':
            recommendations.push('Practice competition simulation');
            recommendations.push('Work with sports psychologist');
            break;
          case 'recovery':
            recommendations.push('Optimize sleep and nutrition');
            recommendations.push('Implement recovery protocols');
            break;
          case 'consistency':
            recommendations.push('Maintain regular training schedule');
            recommendations.push('Avoid training gaps');
            break;
        }
      }
    });
    
    return recommendations;
  }

  private static calculateOptimalCompetitionDate(sessions: TrainingSession[]): Date | undefined {
    if (sessions.length < 10) return undefined;
    
    // Find peak performance periods based on training cycles
    const performanceData = sessions.map(s => ({
      date: s.date,
      score: Object.values(s.performance).reduce((sum, val) => sum + (val || 0), 0) / 5
    }));
    
    // Predict optimal performance window (simplified)
    const avgCycleLength = 28; // days
    const lastPeak = this.findLastPeak(performanceData);
    
    if (lastPeak) {
      const nextOptimal = new Date(lastPeak.getTime() + avgCycleLength * 24 * 60 * 60 * 1000);
      return nextOptimal;
    }
    
    return undefined;
  }

  private static findLastPeak(data: { date: Date; score: number }[]): Date | null {
    if (data.length < 3) return null;
    
    for (let i = data.length - 2; i > 0; i--) {
      if (data[i].score > data[i - 1].score && data[i].score > data[i + 1].score) {
        return data[i].date;
      }
    }
    
    return null;
  }

  private static predictFutureValue(values: { value: number; date: Date }[], weeksAhead: number): number {
    const regression = this.calculateLinearRegression(values);
    const futureX = values.length + weeksAhead;
    return regression.slope * futureX + regression.intercept;
  }

  private static calculateFitnessLevel(sessions: TrainingSession[]): number {
    if (sessions.length === 0) return 0;
    
    const fitnessMetrics = ['speed', 'power', 'endurance'];
    const scores = sessions.flatMap(s => 
      fitnessMetrics.map(metric => s.performance[metric as keyof typeof s.performance] || 0)
    );
    
    return scores.reduce((sum, score) => sum + score, 0) / scores.length / 100;
  }

  private static calculateTechniqueConsistency(sessions: TrainingSession[]): number {
    const techniqueScores = sessions
      .map(s => s.performance.technique || 0)
      .filter(score => score > 0);
    
    if (techniqueScores.length === 0) return 0;
    
    const avg = techniqueScores.reduce((sum, score) => sum + score, 0) / techniqueScores.length;
    return avg / 100;
  }

  private static calculateMentalReadiness(sessions: TrainingSession[]): number {
    // Simplified mental readiness based on consistency and progression
    const recentScores = sessions.slice(-10).map(s => 
      Object.values(s.performance).reduce((sum, val) => sum + (val || 0), 0) / 5
    );
    
    if (recentScores.length === 0) return 0;
    
    const trend = recentScores.length > 1 ? 
      (recentScores[recentScores.length - 1] - recentScores[0]) / recentScores.length : 0;
    
    const consistency = 1 - (this.calculateStandardDeviation(recentScores) / this.calculateMean(recentScores));
    
    return Math.max(0, Math.min(1, (consistency + trend / 100) / 2));
  }

  private static calculateRecoveryState(sessions: TrainingSession[]): number {
    if (sessions.length === 0) return 1;
    
    const recentFatigue = sessions.slice(-7).map(s => s.fatigue);
    const avgFatigue = recentFatigue.reduce((sum, f) => sum + f, 0) / recentFatigue.length;
    
    return Math.max(0, (10 - avgFatigue) / 10);
  }

  private static calculateTrainingConsistency(sessions: TrainingSession[]): number {
    if (sessions.length === 0) return 0;
    
    const weeks = 8;
    const expectedSessions = weeks * 4; // 4 sessions per week
    const actualSessions = sessions.length;
    
    return Math.min(1, actualSessions / expectedSessions);
  }

  private static generateParaAthleteInsights(athlete: Athlete, sessions: TrainingSession[]): AIInsight[] {
    const insights: AIInsight[] = [];
    
    // Equipment optimization insight
    if (athlete.accommodationsNeeded && athlete.accommodationsNeeded.length > 0) {
      insights.push({
        type: 'recommendation',
        category: 'strategy',
        priority: 'medium',
        title: 'Equipment Optimization Opportunity',
        description: 'Regular equipment assessment can improve performance and prevent injury.',
        recommendation: 'Schedule monthly equipment fitting and optimization sessions.',
        confidence: 0.8,
        dataPoints: ['accommodation needs', 'training consistency'],
        actionItems: [
          'Check equipment fit and function',
          'Explore latest adaptive technology',
          'Ensure backup equipment availability'
        ]
      });
    }
    
    // Classification-specific training
    if (athlete.disabilityType) {
      insights.push({
        type: 'recommendation',
        category: 'technique',
        priority: 'medium',
        title: 'Disability-Specific Training Optimization',
        description: `Training can be optimized for ${athlete.disabilityType} athletes.`,
        recommendation: 'Incorporate classification-specific training protocols.',
        confidence: 0.75,
        dataPoints: ['disability type', 'performance metrics'],
        actionItems: [
          'Research best practices for classification',
          'Connect with specialized coaches',
          'Attend para-sport specific workshops'
        ]
      });
    }
    
    return insights;
  }

  private static getPerformanceRecommendation(metric: string, trend: string): string {
    const recommendations = {
      speed: {
        declining: 'Focus on explosive power training and sprint intervals. Check for fatigue or overtraining.',
        improving: 'Continue current speed training protocol with progressive overload.'
      },
      accuracy: {
        declining: 'Reduce intensity and focus on technique refinement. Consider shorter, more focused sessions.',
        improving: 'Maintain current technical training while gradually increasing complexity.'
      },
      power: {
        declining: 'Incorporate strength training and plyometrics. Ensure adequate recovery between sessions.',
        improving: 'Progress to higher intensity power exercises while maintaining current volume.'
      },
      endurance: {
        declining: 'Increase aerobic base training volume. Check nutrition and hydration strategies.',
        improving: 'Add lactate threshold training to current endurance protocol.'
      },
      technique: {
        declining: 'Reduce training volume and focus on fundamentals. Consider video analysis.',
        improving: 'Gradually increase complexity while maintaining technical consistency.'
      }
    };
    
    return recommendations[metric as keyof typeof recommendations]?.[trend as 'declining' | 'improving'] || 
           'Consult with coaching staff for personalized recommendations.';
  }

  private static getActionItems(metric: string, trend: string): string[] {
    const actionItems = {
      speed: {
        declining: ['Reduce training volume by 20%', 'Add 2 extra rest days', 'Schedule biomechanical analysis'],
        improving: ['Maintain current protocol', 'Consider progressive overload', 'Document successful strategies']
      },
      accuracy: {
        declining: ['Focus on basic drills', 'Reduce session intensity', 'Increase rest between repetitions'],
        improving: ['Gradually increase difficulty', 'Maintain current approach', 'Track consistency metrics']
      }
      // Add more as needed
    };
    
    return actionItems[metric as keyof typeof actionItems]?.[trend as 'declining' | 'improving'] || 
           ['Monitor closely', 'Adjust training as needed'];
  }

  private static calculateStandardDeviation(values: number[]): number {
    const mean = this.calculateMean(values);
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }

  private static calculateMean(values: number[]): number {
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }
}

// Utility functions for real-time data processing
export class RealTimeAnalytics {
  static processHeartRateData(heartRateStream: number[]): TrainingSession['heartRate'] {
    if (heartRateStream.length === 0) return undefined;
    
    const avg = heartRateStream.reduce((sum, hr) => sum + hr, 0) / heartRateStream.length;
    const max = Math.max(...heartRateStream);
    
    // Calculate heart rate zones (simplified)
    const zones = {
      zone1: heartRateStream.filter(hr => hr < avg * 0.6).length / heartRateStream.length,
      zone2: heartRateStream.filter(hr => hr >= avg * 0.6 && hr < avg * 0.7).length / heartRateStream.length,
      zone3: heartRateStream.filter(hr => hr >= avg * 0.7 && hr < avg * 0.8).length / heartRateStream.length,
      zone4: heartRateStream.filter(hr => hr >= avg * 0.8 && hr < avg * 0.9).length / heartRateStream.length,
      zone5: heartRateStream.filter(hr => hr >= avg * 0.9).length / heartRateStream.length
    };
    
    return { avg: Math.round(avg), max, zones };
  }
  
  static calculatePerformanceScore(exercise: Omit<Exercise, 'performanceScore'>): number {
    // Simplified performance scoring algorithm
    let score = 50; // baseline
    
    // Adjust based on completion
    if (exercise.sets && exercise.reps) {
      score += Math.min(exercise.sets * exercise.reps / 10, 30);
    }
    
    // Adjust based on intensity
    if (exercise.weight) {
      score += Math.min(exercise.weight / 10, 20);
    }
    
    return Math.min(Math.max(score, 0), 100);
  }
}