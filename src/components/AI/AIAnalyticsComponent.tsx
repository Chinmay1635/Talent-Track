import React, { useState } from 'react';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target, 
  Activity,
  BarChart3,
  Lightbulb,
  Shield,
  Trophy,
  Heart,
  Zap,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Info,
  Calendar
} from 'lucide-react';
import { useAIAnalytics } from '../../hooks/useAIAnalytics';
import { Athlete } from '../../types';
import { TrainingSession, AIInsight, PerformanceTrend } from '../../utils/aiAnalytics';

interface AIAnalyticsComponentProps {
  athlete: Athlete;
  trainingSessions: TrainingSession[];
  className?: string;
}

const AIAnalyticsComponent: React.FC<AIAnalyticsComponentProps> = ({
  athlete,
  trainingSessions,
  className = ''
}) => {
  const { insights, trends, injuryRisk, competitionReadiness, loading, lastUpdated } = useAIAnalytics({
    athlete,
    trainingSessions
  });

  const [activeTab, setActiveTab] = useState<'insights' | 'trends' | 'risk' | 'readiness'>('insights');

  const getPriorityIcon = (priority: AIInsight['priority']) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'medium': return <Info className="h-4 w-4 text-yellow-500" />;
      case 'low': return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTypeIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'improvement': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'recommendation': return <Lightbulb className="h-4 w-4 text-blue-500" />;
      case 'prediction': return <Eye className="h-4 w-4 text-purple-500" />;
    }
  };

  const getTrendIcon = (trend: PerformanceTrend['trend']) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable': return <Activity className="h-4 w-4 text-blue-500" />;
      case 'fluctuating': return <BarChart3 className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk < 30) return 'text-green-600 bg-green-100';
    if (risk < 60) return 'text-yellow-600 bg-yellow-100';
    if (risk < 80) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getReadinessColor = (readiness: number) => {
    if (readiness >= 80) return 'text-green-600 bg-green-100';
    if (readiness >= 60) return 'text-yellow-600 bg-yellow-100';
    if (readiness >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Analyzing performance data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Performance Analytics</h2>
              <p className="text-gray-600">{athlete.name}</p>
            </div>
          </div>
          {lastUpdated && (
            <div className="text-sm text-gray-500 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Updated {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mt-4 bg-gray-100 rounded-lg p-1">
          {[
            { key: 'insights', label: 'AI Insights', icon: Brain },
            { key: 'trends', label: 'Trends', icon: TrendingUp },
            { key: 'risk', label: 'Injury Risk', icon: Shield },
            { key: 'readiness', label: 'Competition', icon: Trophy }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'insights' && (
          <div className="space-y-4">
            {insights.length === 0 ? (
              <div className="text-center py-8">
                <Brain className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Collecting data for AI analysis...</p>
                <p className="text-sm text-gray-400 mt-2">
                  More insights will appear as training data accumulates
                </p>
              </div>
            ) : (
              insights.map((insight, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(insight.type)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {getPriorityIcon(insight.priority)}
                          <span className="text-sm text-gray-500 capitalize">
                            {insight.priority} Priority • {insight.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {Math.round(insight.confidence * 100)}% confidence
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{insight.description}</p>
                  
                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <h4 className="font-medium text-blue-900 mb-1">Recommendation:</h4>
                    <p className="text-blue-800 text-sm">{insight.recommendation}</p>
                  </div>
                  
                  {insight.actionItems.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Action Items:</h4>
                      <ul className="space-y-1">
                        {insight.actionItems.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-4">
            {trends.map((trend, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getTrendIcon(trend.trend)}
                    <div>
                      <h3 className="font-semibold text-gray-900 capitalize">{trend.metric}</h3>
                      <span className="text-sm text-gray-500 capitalize">{trend.trend}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {trend.changeRate > 0 ? '+' : ''}{trend.changeRate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-500">per week</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="text-sm text-gray-600">Confidence</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${trend.confidence * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {Math.round(trend.confidence * 100)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Predicted Value</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {trend.predictedValue.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">
                      in {trend.timeframe} weeks
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="space-y-6">
            {/* Overall Risk */}
            <div className="text-center">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${getRiskColor(injuryRisk.overall)}`}>
                <Shield className="h-5 w-5 mr-2" />
                {Math.round(injuryRisk.overall)}% Risk Level
              </div>
              <p className="text-gray-600 mt-2">Overall injury risk assessment</p>
            </div>

            {/* Risk Factors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(injuryRisk.factors).map(([factor, value]) => (
                <div key={factor} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {factor.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className={`text-sm font-semibold ${getRiskColor(value)}`}>
                      {Math.round(value)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        value < 30 ? 'bg-green-500' :
                        value < 60 ? 'bg-yellow-500' :
                        value < 80 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(value, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            {injuryRisk.recommendations.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Prevention Recommendations
                </h3>
                <ul className="space-y-2">
                  {injuryRisk.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-yellow-800">
                      <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'readiness' && (
          <div className="space-y-6">
            {/* Overall Readiness */}
            <div className="text-center">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${getReadinessColor(competitionReadiness.overall)}`}>
                <Trophy className="h-5 w-5 mr-2" />
                {Math.round(competitionReadiness.overall)}% Ready
              </div>
              <p className="text-gray-600 mt-2">Competition readiness score</p>
            </div>

            {/* Readiness Factors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(competitionReadiness.factors).map(([factor, value]) => {
                const icons = {
                  fitness: Heart,
                  technique: Target,
                  mental: Brain,
                  recovery: Shield,
                  consistency: Activity
                };
                const Icon = icons[factor as keyof typeof icons] || Activity;
                
                return (
                  <div key={factor} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900 capitalize">
                          {factor}
                        </span>
                      </div>
                      <span className={`text-sm font-semibold ${getReadinessColor(value)}`}>
                        {Math.round(value)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          value >= 80 ? 'bg-green-500' :
                          value >= 60 ? 'bg-yellow-500' :
                          value >= 40 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(value, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Optimal Competition Date */}
            {competitionReadiness.optimalCompetitionDate && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Optimal Competition Window
                </h3>
                <p className="text-blue-800">
                  Based on current training cycles, optimal performance is predicted around{' '}
                  <span className="font-semibold">
                    {competitionReadiness.optimalCompetitionDate.toLocaleDateString()}
                  </span>
                </p>
              </div>
            )}

            {/* Recommendations */}
            {competitionReadiness.recommendations.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Preparation Recommendations
                </h3>
                <ul className="space-y-2">
                  {competitionReadiness.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-green-800">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalyticsComponent;