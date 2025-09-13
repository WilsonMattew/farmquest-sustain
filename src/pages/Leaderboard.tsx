import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, MapPin, Users, Clock, Calendar } from 'lucide-react';
import { User } from '@/types';

const Leaderboard = () => {
  const { state } = useApp();
  const { currentUser, users } = state;
  const [timeFilter, setTimeFilter] = useState('all-time');
  const [scopeFilter, setScopeFilter] = useState('all');

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Please log in to view leaderboard</h1>
        </div>
      </div>
    );
  }

  // Filter users based on scope
  const filteredUsers = useMemo(() => {
    let filtered = [...users];
    
    if (scopeFilter === 'district') {
      filtered = filtered.filter(user => user.district === currentUser.district);
    } else if (scopeFilter === 'village') {
      filtered = filtered.filter(user => user.village === currentUser.village);
    }
    
    return filtered.sort((a, b) => b.totalPoints - a.totalPoints);
  }, [users, scopeFilter, currentUser]);

  // Get current user's rank
  const currentUserRank = filteredUsers.findIndex(user => user.id === currentUser.id) + 1;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = ['bg-yellow-500', 'bg-gray-400', 'bg-amber-600'];
      return `${colors[rank - 1]} text-white`;
    }
    return 'bg-muted text-muted-foreground';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold font-heading">Farmer Leaderboard</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See how you rank among sustainable farmers in your community and beyond.
        </p>
      </div>

      {/* My Rank Card */}
      <Card className="p-6 card-shadow border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full ${getRankBadge(currentUserRank)}`}>
              {getRankIcon(currentUserRank)}
            </div>
            <div>
              <h3 className="font-semibold">Your Current Rank</h3>
              <p className="text-sm text-muted-foreground">
                {scopeFilter === 'all' ? 'Among all farmers' : 
                 scopeFilter === 'district' ? `In ${currentUser.district}` :
                 `In ${currentUser.village}`}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">#{currentUserRank}</div>
            <div className="text-sm text-muted-foreground">{currentUser.totalPoints} points</div>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Tabs value={scopeFilter} onValueChange={setScopeFilter}>
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              All India
            </TabsTrigger>
            <TabsTrigger value="district" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              My District
            </TabsTrigger>
            <TabsTrigger value="village" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              My Village
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button
            variant={timeFilter === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeFilter('week')}
          >
            <Clock className="h-4 w-4 mr-2" />
            This Week
          </Button>
          <Button
            variant={timeFilter === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeFilter('month')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            This Month
          </Button>
          <Button
            variant={timeFilter === 'all-time' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeFilter('all-time')}
          >
            All Time
          </Button>
        </div>
      </div>

      {/* Top 3 Farmers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredUsers.slice(0, 3).map((user, index) => (
          <Card key={user.id} className={`p-6 text-center card-shadow ${
            index === 0 ? 'border-yellow-500/50 bg-yellow-50/50' :
            index === 1 ? 'border-gray-400/50 bg-gray-50/50' :
            'border-amber-600/50 bg-amber-50/50'
          }`}>
            <div className="relative mb-4">
              <Avatar className="h-20 w-20 mx-auto">
                <AvatarFallback className="text-lg font-semibold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -top-2 -right-2 p-2 rounded-full ${getRankBadge(index + 1)}`}>
                {getRankIcon(index + 1)}
              </div>
            </div>
            
            <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {user.village}, {user.district}
            </p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Points:</span>
                <span className="font-semibold">{user.totalPoints}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Quests:</span>
                <span className="font-semibold">{user.questsCompleted}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Score:</span>
                <span className="font-semibold">{user.sustainabilityScore}</span>
              </div>
            </div>

            <Badge variant="secondary" className="mt-3">
              {user.level}
            </Badge>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard */}
      <Card className="card-shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Full Rankings</h2>
        </div>
        
        <div className="divide-y">
          {filteredUsers.slice(3).map((user, index) => {
            const rank = index + 4;
            const isCurrentUser = user.id === currentUser.id;
            
            return (
              <div 
                key={user.id} 
                className={`p-4 flex items-center justify-between hover:bg-muted/50 transition-smooth ${
                  isCurrentUser ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10">
                    <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
                  </div>
                  
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.village}, {user.district}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">{user.totalPoints}</div>
                    <div className="text-muted-foreground">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{user.questsCompleted}</div>
                    <div className="text-muted-foreground">Quests</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{user.sustainabilityScore}</div>
                    <div className="text-muted-foreground">Score</div>
                  </div>
                  <Badge variant="outline">{user.level}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Challenge Friends */}
      <Card className="p-6 card-shadow text-center">
        <h3 className="text-lg font-semibold mb-2">Challenge Your Friends</h3>
        <p className="text-muted-foreground mb-4">
          Invite other farmers to join FarmQuest and compete in sustainable farming challenges.
        </p>
        <Button>
          Share FarmQuest
        </Button>
      </Card>
    </div>
  );
};

export default Leaderboard;