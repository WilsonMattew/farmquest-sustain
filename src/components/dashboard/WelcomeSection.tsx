import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Thermometer, Droplets, Sun, Cloud } from 'lucide-react';

const WelcomeSection = () => {
  const { state } = useApp();
  const { currentUser } = state;

  // Mock weather data - in real app would come from weather API
  const weatherData = {
    location: currentUser?.district || 'Unknown',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    rainfall: 5,
    uvIndex: 7,
    recommendation: 'Good day for field work. Consider watering if soil is dry.',
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Seedling Farmer': return 'bg-green-100 text-green-800 border-green-200';
      case 'Green Farmer': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Eco Warrior': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Sustainability Champion': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="gradient-background rounded-xl p-6 text-center">
        <h1 className="text-3xl font-bold font-heading text-foreground mb-2">
          {getGreeting()}, {currentUser.name}! 🌱
        </h1>
        <p className="text-muted-foreground mb-4">
          Welcome back to your sustainable farming journey
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Badge 
            variant="secondary" 
            className={`px-4 py-1 text-sm font-medium border ${getLevelColor(currentUser.level)}`}
          >
            {currentUser.level}
          </Badge>
          <Badge variant="outline" className="px-4 py-1">
            Rank #{currentUser.rank}
          </Badge>
        </div>
      </div>

      {/* Weather Card */}
      <Card className="p-6 card-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold font-heading flex items-center">
            <Sun className="h-5 w-5 mr-2 text-yellow-500" />
            Today's Weather - {weatherData.location}
          </h3>
          <div className="text-2xl font-bold text-primary">
            {weatherData.temperature}°C
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Cloud className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{weatherData.condition}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span className="text-sm">{weatherData.humidity}% Humidity</span>
          </div>
          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4 text-red-500" />
            <span className="text-sm">UV Index: {weatherData.uvIndex}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-blue-600" />
            <span className="text-sm">{weatherData.rainfall}mm Rain</span>
          </div>
        </div>

        <div className="bg-info/10 border border-info/20 rounded-lg p-3">
          <p className="text-sm text-info-foreground font-medium">
            💡 Farm Tip: {weatherData.recommendation}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default WelcomeSection;