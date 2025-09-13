import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, Trophy, Award, TrendingUp } from 'lucide-react';

const StatsCards = () => {
  const { state } = useApp();
  const { currentUser } = state;

  if (!currentUser) return null;

  const stats = [
    {
      title: 'Sustainability Score',
      value: currentUser.sustainabilityScore,
      max: 100,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Your overall sustainability rating',
      showProgress: true,
    },
    {
      title: 'Total Points',
      value: currentUser.totalPoints,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Points earned from quests',
      showProgress: false,
    },
    {
      title: 'Quests Completed',
      value: currentUser.questsCompleted,
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Successfully completed challenges',
      showProgress: false,
    },
    {
      title: 'Achievements',
      value: currentUser.achievements.length,
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Badges and milestones earned',
      showProgress: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 card-shadow hover-shadow transition-smooth">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold font-heading">
                {stat.value}
                {stat.showProgress && <span className="text-sm text-muted-foreground">/{stat.max}</span>}
              </div>
            </div>
          </div>
          
          <h3 className="font-semibold text-sm mb-1">{stat.title}</h3>
          <p className="text-xs text-muted-foreground mb-3">{stat.description}</p>
          
          {stat.showProgress && (
            <Progress 
              value={stat.value} 
              max={stat.max} 
              className="h-2"
            />
          )}
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;