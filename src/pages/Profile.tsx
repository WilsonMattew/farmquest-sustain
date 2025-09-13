import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import AchievementBadge from '@/components/achievements/AchievementBadge';
import { 
  User, 
  Edit, 
  MapPin, 
  Crop,
  Calendar,
  Award,
  TrendingUp,
  Download,
  Settings,
  Bell,
  Globe,
  Shield
} from 'lucide-react';

const Profile = () => {
  const { state } = useApp();
  const { currentUser, achievements } = state;
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(currentUser || {
    farmSize: 0,
    experienceLevel: 'Beginner',
    primaryCrops: [],
    village: '',
    district: ''
  });

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Please log in to view your profile</h1>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const userAchievements = achievements.filter(achievement => 
    currentUser.achievements.includes(achievement.id)
  );

  const monthlyProgress = [
    { month: 'Jul', score: 45 },
    { month: 'Aug', score: 62 },
    { month: 'Sep', score: currentUser.sustainabilityScore },
  ];

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile
    console.log('Saving profile:', editForm);
    setIsEditing(false);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'bg-gray-100 text-gray-800';
      case 'Rare':
        return 'bg-blue-100 text-blue-800';
      case 'Epic':
        return 'bg-purple-100 text-purple-800';
      case 'Legendary':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Profile Header */}
      <Card className="p-8 card-shadow">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl font-bold">
                {getInitials(currentUser.name)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-full">
              <User className="h-4 w-4" />
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold font-heading">{currentUser.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {currentUser.village}, {currentUser.district}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {new Date(currentUser.joinedDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {currentUser.level}
              </Badge>
              <div className="text-sm text-muted-foreground">
                Rank #{currentUser.rank} • {currentUser.totalPoints} points
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="farm-details">Farm Details</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 card-shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentUser.sustainabilityScore}</div>
                  <div className="text-sm text-muted-foreground">Sustainability Score</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 card-shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-success/10 rounded-lg">
                  <Award className="h-6 w-6 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentUser.questsCompleted}</div>
                  <div className="text-sm text-muted-foreground">Quests Completed</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 card-shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <User className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentUser.achievements.length}</div>
                  <div className="text-sm text-muted-foreground">Achievements</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 card-shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-info/10 rounded-lg">
                  <Crop className="h-6 w-6 text-info" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentUser.farmSize}</div>
                  <div className="text-sm text-muted-foreground">Acres</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Progress Chart */}
          <Card className="p-6 card-shadow">
            <h3 className="text-lg font-semibold mb-4">Monthly Progress</h3>
            <div className="grid grid-cols-3 gap-4">
              {monthlyProgress.map((data, index) => (
                <div key={data.month} className="text-center">
                  <div className="relative mb-2">
                    <div className="w-16 h-16 mx-auto rounded-full border-4 border-primary/20 flex items-center justify-center">
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          index === monthlyProgress.length - 1 ? 'bg-primary' : 'bg-primary/60'
                        }`}
                      >
                        {data.score}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{data.month}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Achievements */}
          <Card className="p-6 card-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Achievements</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {userAchievements.slice(0, 4).map(achievement => (
                <AchievementBadge 
                  key={achievement.id} 
                  achievement={achievement} 
                  size="sm"
                  showDetails={false}
                />
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Your Achievements</h3>
              <p className="text-sm text-muted-foreground">
                {userAchievements.length} of {achievements.length} achievements unlocked
              </p>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Certificate
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userAchievements.map(achievement => (
              <Card key={achievement.id} className="p-4 card-shadow text-center space-y-3">
                <AchievementBadge achievement={achievement} size="lg" showDetails={false} />
                <div>
                  <h4 className="font-semibold text-sm">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {achievement.description}
                  </p>
                  <Badge className={`text-xs mt-2 ${getRarityColor(achievement.rarity)}`}>
                    {achievement.rarity}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          {userAchievements.length === 0 && (
            <Card className="p-12 text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Achievements Yet</h3>
              <p className="text-muted-foreground">
                Complete quests to unlock your first achievement!
              </p>
            </Card>
          )}
        </TabsContent>

        {/* Farm Details Tab */}
        <TabsContent value="farm-details" className="space-y-6">
          <Card className="p-6 card-shadow">
            <h3 className="text-lg font-semibold mb-4">Farm Information</h3>
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmSize">Farm Size (acres)</Label>
                  <Input
                    id="farmSize"
                    type="number"
                    value={editForm.farmSize}
                    onChange={(e) => setEditForm({...editForm, farmSize: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <select
                    id="experienceLevel"
                    className="w-full p-2 border rounded-md"
                    value={editForm.experienceLevel}
                    onChange={(e) => setEditForm({...editForm, experienceLevel: e.target.value})}
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Button onClick={handleSaveProfile} className="mr-2">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Farm Size</h4>
                  <p className="text-muted-foreground">{currentUser.farmSize} acres</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Experience Level</h4>
                  <Badge variant="outline">{currentUser.experienceLevel}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Primary Crops</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.primaryCrops.map(crop => (
                      <Badge key={crop} variant="secondary">{crop}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Location</h4>
                  <p className="text-muted-foreground">
                    {currentUser.village}, {currentUser.district}
                  </p>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6 card-shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Quest Reminders</h4>
                  <p className="text-sm text-muted-foreground">Get notified about quest deadlines</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Achievement Alerts</h4>
                  <p className="text-sm text-muted-foreground">Notifications when you unlock achievements</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 card-shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Language & Region
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="language">Preferred Language</Label>
                <select id="language" className="w-full p-2 border rounded-md mt-1">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Malayalam</option>
                  <option>Tamil</option>
                  <option>Telugu</option>
                </select>
              </div>
            </div>
          </Card>

          <Card className="p-6 card-shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Profile Visibility</h4>
                  <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                </div>
                <Button variant="outline" size="sm">Public</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Data Export</h4>
                  <p className="text-sm text-muted-foreground">Download your data</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;