import { useState } from 'react';
import { Quest } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Target, 
  Play, 
  CheckCircle, 
  Pause,
  Camera,
  Star,
  Calendar
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface QuestCardProps {
  quest: Quest;
  variant?: 'default' | 'compact' | 'active';
}

const QuestCard = ({ quest, variant = 'default' }: QuestCardProps) => {
  const { startQuest, completeQuest, state } = useApp();
  const [isUploading, setIsUploading] = useState(false);
  const { currentUser } = state;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Water Conservation': 'bg-blue-100 text-blue-800',
      'Organic Farming': 'bg-green-100 text-green-800',
      'Soil Health': 'bg-amber-100 text-amber-800',
      'Crop Rotation': 'bg-purple-100 text-purple-800',
      'Waste Management': 'bg-teal-100 text-teal-800',
      'Biodiversity': 'bg-pink-100 text-pink-800',
      'Carbon Reduction': 'bg-gray-100 text-gray-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleStartQuest = () => {
    startQuest(quest.id);
  };

  const handleCompleteQuest = () => {
    setIsUploading(true);
    // Simulate photo upload
    setTimeout(() => {
      completeQuest(quest.id, ['photo1.jpg', 'photo2.jpg']);
      setIsUploading(false);
    }, 2000);
  };

  const isActive = currentUser?.activeQuests.includes(quest.id);
  const isCompleted = quest.isCompleted;
  const canStart = !isActive && !isCompleted;

  if (variant === 'compact') {
    return (
      <Card className="p-4 card-shadow hover-shadow transition-smooth">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">{quest.title}</h4>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Target className="h-3 w-3" />
              <span>{quest.points} points</span>
              <Clock className="h-3 w-3 ml-2" />
              <span>{quest.estimatedTime}</span>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`text-xs ${getDifficultyColor(quest.difficulty)}`}
          >
            {quest.difficulty}
          </Badge>
        </div>
        
        {isActive && quest.progress !== undefined && (
          <div className="mt-3">
            <Progress value={quest.progress} className="h-1" />
            <p className="text-xs text-muted-foreground mt-1">
              {quest.progress}% complete
            </p>
          </div>
        )}
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden card-shadow hover-shadow transition-smooth">
      {/* Quest Image/Icon Header */}
      <div className="relative h-48 bg-gradient-primary flex items-center justify-center">
        <div className="text-white text-4xl">
          {quest.category === 'Water Conservation' && '💧'}
          {quest.category === 'Organic Farming' && '🌱'}
          {quest.category === 'Soil Health' && '🌍'}
          {quest.category === 'Crop Rotation' && '🔄'}
          {quest.category === 'Waste Management' && '♻️'}
          {quest.category === 'Biodiversity' && '🦋'}
          {quest.category === 'Carbon Reduction' && '🌳'}
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          {isCompleted && (
            <Badge className="bg-success text-success-foreground">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
          {isActive && (
            <Badge className="bg-info text-info-foreground">
              <Play className="h-3 w-3 mr-1" />
              Active
            </Badge>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Quest Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg font-heading line-clamp-2">
              {quest.title}
            </h3>
            <div className="flex items-center space-x-1 text-accent">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-semibold">{quest.points}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {quest.description}
          </p>

          {/* Quest Meta */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge 
              variant="outline" 
              className={`text-xs ${getCategoryColor(quest.category)}`}
            >
              {quest.category}
            </Badge>
            <Badge 
              variant="outline" 
              className={`text-xs ${getDifficultyColor(quest.difficulty)}`}
            >
              {quest.difficulty}
            </Badge>
          </div>

          {/* Quest Details */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {quest.estimatedTime}
            </div>
            <div className="flex items-center">
              <Target className="h-4 w-4 mr-1" />
              {quest.steps.length} steps
            </div>
            {quest.startDate && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Started {new Date(quest.startDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar for Active Quests */}
        {isActive && quest.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{quest.progress}%</span>
            </div>
            <Progress value={quest.progress} className="h-2" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {canStart && (
            <Button 
              onClick={handleStartQuest}
              className="flex-1 gradient-primary text-white hover:opacity-90"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Quest
            </Button>
          )}
          
          {isActive && quest.progress === 100 && (
            <Button 
              onClick={handleCompleteQuest}
              disabled={isUploading}
              className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4 mr-2" />
                  Complete Quest
                </>
              )}
            </Button>
          )}
          
          {isActive && quest.progress !== 100 && (
            <Button variant="outline" className="flex-1">
              <Pause className="h-4 w-4 mr-2" />
              View Progress
            </Button>
          )}
          
          {isCompleted && (
            <Button variant="outline" className="flex-1" disabled>
              <CheckCircle className="h-4 w-4 mr-2" />
              Completed on {quest.completedDate && new Date(quest.completedDate).toLocaleDateString()}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default QuestCard;