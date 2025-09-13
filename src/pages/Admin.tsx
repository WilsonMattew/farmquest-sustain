import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Activity,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  FileText,
  Send
} from 'lucide-react';

const Admin = () => {
  const { state } = useApp();
  const { users, quests, achievements } = state;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Admin stats
  const totalFarmers = users.length;
  const activeQuests = users.reduce((sum, user) => sum + user.activeQuests.length, 0);
  const completedQuests = users.reduce((sum, user) => sum + user.questsCompleted, 0);
  const avgSustainabilityScore = Math.round(
    users.reduce((sum, user) => sum + user.sustainabilityScore, 0) / users.length
  );

  const questCompletionRate = Math.round((completedQuests / (completedQuests + activeQuests)) * 100);

  // Top performing districts
  const districtStats = users.reduce((acc, user) => {
    acc[user.district] = (acc[user.district] || 0) + user.sustainabilityScore;
    return acc;
  }, {} as Record<string, number>);

  const topDistricts = Object.entries(districtStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([district, score]) => ({ district, avgScore: Math.round(score / users.filter(u => u.district === district).length) }));

  // Recent activity
  const recentActivity = [
    { user: 'Rajesh Kumar', action: 'Completed "Water Warrior" quest', time: '2 hours ago' },
    { user: 'Priya Sharma', action: 'Started "Organic Champion" quest', time: '4 hours ago' },
    { user: 'Mohammed Hassan', action: 'Unlocked "Soil Doctor" achievement', time: '6 hours ago' },
    { user: 'Anita Devi', action: 'Joined FarmQuest India', time: '1 day ago' },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.village.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`${action} for users:`, selectedUsers);
    setSelectedUsers([]);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage FarmQuest India platform</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Content
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 card-shadow">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">{totalFarmers}</div>
              <div className="text-sm text-muted-foreground">Total Farmers</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 card-shadow">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-success/10 rounded-lg">
              <Target className="h-6 w-6 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold">{activeQuests}</div>
              <div className="text-sm text-muted-foreground">Active Quests</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 card-shadow">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-accent/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div>
              <div className="text-2xl font-bold">{questCompletionRate}%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 card-shadow">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-info/10 rounded-lg">
              <BarChart3 className="h-6 w-6 text-info" />
            </div>
            <div>
              <div className="text-2xl font-bold">{avgSustainabilityScore}</div>
              <div className="text-sm text-muted-foreground">Avg. Score</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="quests">Quests</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Users Management */}
        <TabsContent value="users" className="space-y-6">
          <Card className="p-6 card-shadow">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search farmers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                {selectedUsers.length > 0 && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction('message')}>
                      <Send className="h-4 w-4 mr-2" />
                      Message ({selectedUsers.length})
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction('export')}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">
                      <input 
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers(filteredUsers.map(u => u.id));
                          } else {
                            setSelectedUsers([]);
                          }
                        }}
                      />
                    </th>
                    <th className="text-left py-3 px-2">Farmer</th>
                    <th className="text-left py-3 px-2">Location</th>
                    <th className="text-left py-3 px-2">Score</th>
                    <th className="text-left py-3 px-2">Quests</th>
                    <th className="text-left py-3 px-2">Level</th>
                    <th className="text-left py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                        />
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="text-sm">
                          <div>{user.village}</div>
                          <div className="text-muted-foreground">{user.district}</div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant="outline">{user.sustainabilityScore}</Badge>
                      </td>
                      <td className="py-3 px-2">{user.questsCompleted}</td>
                      <td className="py-3 px-2">
                        <Badge variant="secondary">{user.level}</Badge>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Quest Management */}
        <TabsContent value="quests" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Quest Management</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Quest
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quests.slice(0, 6).map(quest => (
              <Card key={quest.id} className="p-4 card-shadow">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="outline" className="text-xs">
                      {quest.category}
                    </Badge>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-sm">{quest.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {quest.description}
                  </p>
                  
                  <div className="flex justify-between text-xs">
                    <span>Difficulty: {quest.difficulty}</span>
                    <span>{quest.points} points</span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Active participants: {users.filter(u => u.activeQuests.includes(quest.id)).length}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Districts */}
            <Card className="p-6 card-shadow">
              <h3 className="text-lg font-semibold mb-4">Top Performing Districts</h3>
              <div className="space-y-3">
                {topDistricts.map((district, index) => (
                  <div key={district.district} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-muted-foreground">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{district.district}</div>
                        <div className="text-sm text-muted-foreground">
                          Avg. Score: {district.avgScore}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 card-shadow">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Content Management */}
        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 card-shadow text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">Articles</h3>
              <p className="text-sm text-muted-foreground mb-4">Manage educational articles</p>
              <Button variant="outline">Manage Articles</Button>
            </Card>
            
            <Card className="p-6 card-shadow text-center">
              <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">Videos</h3>
              <p className="text-sm text-muted-foreground mb-4">Manage video tutorials</p>
              <Button variant="outline">Manage Videos</Button>
            </Card>
            
            <Card className="p-6 card-shadow text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">Calendar</h3>
              <p className="text-sm text-muted-foreground mb-4">Update farming calendar</p>
              <Button variant="outline">Update Calendar</Button>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6 card-shadow">
            <h3 className="text-lg font-semibold mb-4">Send Notification</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Target Audience</label>
                <select className="w-full p-2 border rounded-md mt-1">
                  <option>All Farmers</option>
                  <option>Specific District</option>
                  <option>Active Quest Participants</option>
                  <option>Top Performers</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Message Title</label>
                <Input placeholder="Enter notification title" className="mt-1" />
              </div>
              
              <div>
                <label className="text-sm font-medium">Message Content</label>
                <textarea 
                  className="w-full p-2 border rounded-md mt-1" 
                  rows={4}
                  placeholder="Enter your message..."
                />
              </div>
              
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Send Notification
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;