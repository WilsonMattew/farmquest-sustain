import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import QuestCard from '@/components/quests/QuestCard';
import { Search, Filter, Play, CheckCircle, Clock } from 'lucide-react';
import { Quest } from '@/types';

const Quests = () => {
  const { state, startQuest, completeQuest } = useApp();
  const { currentUser, quests } = state;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Please log in to view quests</h1>
        </div>
      </div>
    );
  }

  // Filter quests based on user's active quests
  const activeQuests = useMemo(() => 
    quests.filter(quest => currentUser.activeQuests.includes(quest.id))
  , [quests, currentUser.activeQuests]);

  const completedQuests = useMemo(() =>
    quests.filter(quest => quest.isCompleted)
  , [quests]);

  const availableQuests = useMemo(() =>
    quests.filter(quest => 
      !currentUser.activeQuests.includes(quest.id) && !quest.isCompleted
    )
  , [quests, currentUser.activeQuests]);

  // Filter by search and category
  const filteredQuests = (questList: Quest[]) => {
    return questList.filter(quest => {
      const matchesSearch = quest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           quest.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || quest.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const categories = ['All', 'Water Conservation', 'Organic Farming', 'Soil Health', 'Crop Rotation', 'Waste Management', 'Biodiversity', 'Carbon Reduction'];

  const handleStartQuest = (questId: string) => {
    startQuest(questId);
  };

  const handleCompleteQuest = (questId: string) => {
    completeQuest(questId);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold font-heading">My Farming Quests</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complete sustainable farming challenges to earn points, unlock achievements, and improve your sustainability score.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 card-shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer transition-smooth"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Quest Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Active ({activeQuests.length})
          </TabsTrigger>
          <TabsTrigger value="available" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Available ({availableQuests.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Completed ({completedQuests.length})
          </TabsTrigger>
        </TabsList>

        {/* Active Quests */}
        <TabsContent value="active" className="space-y-6">
          {filteredQuests(activeQuests).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuests(activeQuests).map(quest => (
                <div key={quest.id} className="space-y-4">
                  <QuestCard quest={quest} />
                  <Card className="p-4 border-primary/20">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{quest.progress || 0}%</span>
                      </div>
                      <Progress value={quest.progress || 0} className="h-2" />
                      <Button 
                        onClick={() => handleCompleteQuest(quest.id)}
                        className="w-full mt-3"
                        disabled={quest.progress !== 100}
                      >
                        Mark Complete
                      </Button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Active Quests</h3>
              <p className="text-muted-foreground mb-4">Start a new quest to begin your sustainable farming journey!</p>
              <Button onClick={() => document.getElementById('available-tab')?.click()}>
                Browse Available Quests
              </Button>
            </Card>
          )}
        </TabsContent>

        {/* Available Quests */}
        <TabsContent value="available" className="space-y-6">
          {filteredQuests(availableQuests).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuests(availableQuests).map(quest => (
                <div key={quest.id} className="space-y-4">
                  <QuestCard quest={quest} />
                  <Button 
                    onClick={() => handleStartQuest(quest.id)}
                    className="w-full"
                  >
                    Start Quest
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Available Quests</h3>
              <p className="text-muted-foreground">All quests have been started or completed!</p>
            </Card>
          )}
        </TabsContent>

        {/* Completed Quests */}
        <TabsContent value="completed" className="space-y-6">
          {filteredQuests(completedQuests).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuests(completedQuests).map(quest => (
                <div key={quest.id} className="space-y-4">
                  <QuestCard quest={quest} />
                  <Card className="p-4 border-success/20 bg-success/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                      <Badge variant="secondary">+{quest.points} points</Badge>
                    </div>
                    {quest.completedDate && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Completed on {new Date(quest.completedDate).toLocaleDateString()}
                      </p>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Completed Quests</h3>
              <p className="text-muted-foreground">Complete your first quest to see it here!</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Quests;