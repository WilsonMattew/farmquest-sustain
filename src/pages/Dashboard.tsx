import { useApp } from '@/context/AppContext';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import StatsCards from '@/components/dashboard/StatsCards';
import QuestCard from '@/components/quests/QuestCard';
import AchievementBadge from '@/components/achievements/AchievementBadge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { state } = useApp();
  const { currentUser, quests, achievements } = state;

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Please log in to access your dashboard</h1>
          <Link to="/login">
            <Button className="mt-4">Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get active quests for the user
  const activeQuests = quests.filter(quest => 
    currentUser.activeQuests.includes(quest.id)
  ).slice(0, 3);

  // Get available quests (not started and not completed)
  const availableQuests = quests.filter(quest => 
    !currentUser.activeQuests.includes(quest.id) && !quest.isCompleted
  ).slice(0, 3);

  // Get recent achievements
  const unlockedAchievements = achievements.filter(achievement => 
    currentUser.achievements.includes(achievement.id)
  ).slice(0, 4);

  // Mock monthly progress data
  const monthlyData = [
    { month: 'Jul', score: 45 },
    { month: 'Aug', score: 62 },
    { month: 'Sep', score: currentUser.sustainabilityScore },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Section */}
      <WelcomeSection />

      {/* Stats Cards */}
      <StatsCards />

      {/* Today's Focus */}
      <Card className="p-6 card-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-heading flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Today's Focus
          </h2>
        </div>
        
        {activeQuests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {activeQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} variant="compact" />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No active quests. Start a new challenge!</p>
            <Link to="/quests">
              <Button>
                Explore Quests
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}

        {activeQuests.length > 0 && (
          <div className="text-center">
            <Link to="/quests">
              <Button variant="outline">
                View All My Quests
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Quests */}
        <Card className="p-6 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-heading">🎯 Recommended Quests</h2>
            <Link to="/quests">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {availableQuests.length > 0 ? (
              availableQuests.map(quest => (
                <QuestCard key={quest.id} quest={quest} variant="compact" />
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Great! You've started all available quests.
              </p>
            )}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-heading">🏆 Recent Achievements</h2>
            <Link to="/profile#achievements">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          {unlockedAchievements.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {unlockedAchievements.map(achievement => (
                <AchievementBadge 
                  key={achievement.id} 
                  achievement={achievement} 
                  size="sm"
                  showDetails={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-2">No achievements yet</p>
              <p className="text-sm text-muted-foreground">
                Complete quests to unlock your first achievement!
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Progress Chart */}
      <Card className="p-6 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-heading flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Monthly Progress
          </h2>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {monthlyData.map((data, index) => (
            <div key={data.month} className="text-center">
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full border-4 border-primary/20 flex items-center justify-center">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === monthlyData.length - 1 ? 'bg-primary' : 'bg-primary/60'
                    }`}
                  >
                    {data.score}
                  </div>
                </div>
                {index === monthlyData.length - 1 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              <p className="text-sm font-medium">{data.month}</p>
              <p className="text-xs text-muted-foreground">
                {index > 0 && data.score > monthlyData[index - 1].score && '+'}
                {index > 0 && data.score - monthlyData[index - 1].score}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Your sustainability score improved by{' '}
            <span className="font-semibold text-success">
              +{currentUser.sustainabilityScore - monthlyData[0].score} points
            </span>{' '}
            this quarter! 🎉
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;