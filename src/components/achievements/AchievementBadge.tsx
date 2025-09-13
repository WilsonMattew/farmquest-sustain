import { Achievement } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Star, Award, Trophy, Crown } from 'lucide-react';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

const AchievementBadge = ({ 
  achievement, 
  size = 'md', 
  showDetails = true 
}: AchievementBadgeProps) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'Rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'Common': return Star;
      case 'Rare': return Award;
      case 'Epic': return Trophy;
      case 'Legendary': return Crown;
      default: return Star;
    }
  };

  const sizeClasses = {
    sm: 'w-16 h-16 text-2xl',
    md: 'w-20 h-20 text-3xl',
    lg: 'w-24 h-24 text-4xl',
  };

  const RarityIcon = getRarityIcon(achievement.rarity);

  if (size === 'sm' && !showDetails) {
    return (
      <div className="relative">
        <div 
          className={`${sizeClasses[size]} rounded-full flex items-center justify-center border-2 transition-smooth ${
            achievement.isUnlocked 
              ? 'bg-gradient-primary text-white border-primary shadow-lg' 
              : 'bg-muted text-muted-foreground border-border'
          }`}
        >
          {achievement.isUnlocked ? (
            <span className="text-xl">
              {achievement.category === 'Water Conservation' && '💧'}
              {achievement.category === 'Organic Farming' && '🌱'}
              {achievement.category === 'Soil Health' && '🌍'}
              {achievement.category === 'Milestone' && '🎯'}
              {achievement.category === 'Community' && '👥'}
              {achievement.category === 'Carbon Reduction' && '🌳'}
              {achievement.category === 'Biodiversity' && '🦋'}
            </span>
          ) : (
            <Lock className="h-5 w-5" />
          )}
        </div>
        
        {achievement.isUnlocked && achievement.rarity === 'Legendary' && (
          <div className="absolute -top-1 -right-1">
            <Crown className="h-4 w-4 text-yellow-500" />
          </div>
        )}
      </div>
    );
  }

  return (
    <Card className={`p-4 card-shadow hover-shadow transition-smooth ${
      achievement.isUnlocked ? 'border-primary/30' : 'border-border'
    }`}>
      <div className="text-center">
        {/* Achievement Icon */}
        <div className="relative mx-auto mb-3">
          <div 
            className={`${sizeClasses[size]} rounded-full flex items-center justify-center border-2 transition-smooth ${
              achievement.isUnlocked 
                ? 'bg-gradient-primary text-white border-primary shadow-lg badge-glow' 
                : 'bg-muted text-muted-foreground border-border'
            }`}
          >
            {achievement.isUnlocked ? (
              <span>
                {achievement.category === 'Water Conservation' && '💧'}
                {achievement.category === 'Organic Farming' && '🌱'}
                {achievement.category === 'Soil Health' && '🌍'}
                {achievement.category === 'Milestone' && '🎯'}
                {achievement.category === 'Community' && '👥'}
                {achievement.category === 'Carbon Reduction' && '🌳'}
                {achievement.category === 'Biodiversity' && '🦋'}
              </span>
            ) : (
              <Lock className="h-6 w-6" />
            )}
          </div>
          
          {/* Rarity indicator */}
          {achievement.isUnlocked && (
            <div className="absolute -top-1 -right-1">
              <RarityIcon className="h-5 w-5 text-accent" />
            </div>
          )}
        </div>

        {showDetails && (
          <div className="space-y-2">
            {/* Title */}
            <h3 className={`font-bold text-sm ${
              achievement.isUnlocked ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {achievement.title}
            </h3>

            {/* Description */}
            <p className={`text-xs ${
              achievement.isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/60'
            }`}>
              {achievement.description}
            </p>

            {/* Rarity Badge */}
            <Badge 
              variant="outline" 
              className={`text-xs ${getRarityColor(achievement.rarity)}`}
            >
              <RarityIcon className="h-3 w-3 mr-1" />
              {achievement.rarity}
            </Badge>

            {/* Unlock Date */}
            {achievement.isUnlocked && achievement.unlockedDate && (
              <p className="text-xs text-success">
                Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
              </p>
            )}

            {/* Requirements for locked achievements */}
            {!achievement.isUnlocked && (
              <div className="bg-muted/30 rounded-lg p-2 mt-2">
                <p className="text-xs text-muted-foreground">
                  <strong>Requirements:</strong> {achievement.requirements}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default AchievementBadge;