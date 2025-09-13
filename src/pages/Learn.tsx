import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  BookOpen, 
  Video, 
  Calendar,
  Clock,
  Star,
  Bookmark,
  Play,
  FileText,
  Lightbulb,
  CloudRain,
  Thermometer
} from 'lucide-react';

const Learn = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Organic Farming',
    'Water Management', 
    'Soil Health',
    'Pest Control',
    'Crop Rotation',
    'Weather & Climate'
  ];

  const articles = [
    {
      id: 1,
      title: 'Complete Guide to Drip Irrigation Systems',
      excerpt: 'Learn how to set up and maintain efficient drip irrigation systems to save water and increase crop yield.',
      readTime: 8,
      difficulty: 'Intermediate',
      category: 'Water Management',
      image: '/articles/drip-irrigation.jpg',
      isBookmarked: false,
      rating: 4.8,
      author: 'Dr. Ramesh Patel'
    },
    {
      id: 2,
      title: 'Organic Pest Control Methods for Indian Crops',
      excerpt: 'Discover natural and effective ways to protect your crops from pests without harmful chemicals.',
      readTime: 12,
      difficulty: 'Beginner',
      category: 'Pest Control',
      image: '/articles/organic-pest-control.jpg',
      isBookmarked: true,
      rating: 4.9,
      author: 'Prof. Sunita Sharma'
    },
    {
      id: 3,
      title: 'Soil Health: Testing and Improvement Strategies',
      excerpt: 'Understand soil composition, pH levels, and nutrient management for optimal crop growth.',
      readTime: 15,
      difficulty: 'Advanced',
      category: 'Soil Health',
      image: '/articles/soil-health.jpg',
      isBookmarked: false,
      rating: 4.7,
      author: 'Dr. Krishna Reddy'
    },
    {
      id: 4,
      title: 'Crop Rotation for Small Farms',
      excerpt: 'Maximize productivity and soil health with effective crop rotation techniques suitable for small farms.',
      readTime: 10,
      difficulty: 'Intermediate',
      category: 'Crop Rotation',
      image: '/articles/crop-rotation.jpg',
      isBookmarked: false,
      rating: 4.6,
      author: 'Anita Desai'
    },
    {
      id: 5,
      title: 'Monsoon Farming: Challenges and Opportunities',
      excerpt: 'Navigate the monsoon season with expert tips on water management and crop selection.',
      readTime: 7,
      difficulty: 'Beginner',
      category: 'Weather & Climate',
      image: '/articles/monsoon-farming.jpg',
      isBookmarked: true,
      rating: 4.8,
      author: 'Dr. Vijay Kumar'
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Setting Up Drip Irrigation - Step by Step',
      duration: '15:30',
      views: '45.2K',
      category: 'Water Management',
      thumbnail: '/videos/drip-irrigation-thumb.jpg'
    },
    {
      id: 2,
      title: 'Organic Compost Making at Home',
      duration: '12:45',
      views: '32.1K',
      category: 'Organic Farming',
      thumbnail: '/videos/composting-thumb.jpg'
    },
    {
      id: 3,
      title: 'Soil pH Testing Methods',
      duration: '8:20',
      views: '28.5K',
      category: 'Soil Health',
      thumbnail: '/videos/soil-testing-thumb.jpg'
    }
  ];

  const farmingCalendar = [
    {
      month: 'January',
      activities: ['Harvest winter crops', 'Prepare land for summer crops', 'Prune fruit trees'],
      weather: 'Cool and dry'
    },
    {
      month: 'February',
      activities: ['Sow summer vegetables', 'Apply organic fertilizers', 'Irrigation system maintenance'],
      weather: 'Mild temperatures'
    },
    {
      month: 'March',
      activities: ['Plant summer crops', 'Pest monitoring begins', 'Mulching activities'],
      weather: 'Warming up'
    }
  ];

  const weatherTips = {
    temperature: 28,
    humidity: 75,
    rainfall: 'Light showers expected',
    recommendation: 'Good time for transplanting seedlings. Avoid heavy irrigation today.'
  };

  const filteredContent = (items: any[]) => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold font-heading">Learning Hub</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Expand your farming knowledge with expert articles, video tutorials, and practical guides.
        </p>
      </div>

      {/* Weather Widget */}
      <Card className="p-6 card-shadow bg-gradient-to-r from-blue-50 to-green-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-blue-500" />
            Today's Farming Weather
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-orange-500" />
            <span className="text-sm">Temperature: {weatherTips.temperature}°C</span>
          </div>
          <div className="text-sm">Humidity: {weatherTips.humidity}%</div>
          <div className="text-sm">{weatherTips.rainfall}</div>
          <div className="text-sm font-medium text-green-600">
            <Lightbulb className="h-4 w-4 inline mr-1" />
            {weatherTips.recommendation}
          </div>
        </div>
      </Card>

      {/* Search and Filters */}
      <Card className="p-6 card-shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles, videos, and guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
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
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Articles
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Quiz
          </TabsTrigger>
        </TabsList>

        {/* Articles Tab */}
        <TabsContent value="articles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent(articles).map(article => (
              <Card key={article.id} className="overflow-hidden card-shadow hover-shadow transition-smooth">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <Badge className={`text-xs ${getDifficultyColor(article.difficulty)}`}>
                      {article.difficulty}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-lg leading-tight">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime} min
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {article.rating}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Bookmark className={`h-4 w-4 ${article.isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  
                  <Button className="w-full">Read Article</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent(videos).map(video => (
              <Card key={video.id} className="overflow-hidden card-shadow hover-shadow transition-smooth">
                <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group cursor-pointer">
                  <Play className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <Badge variant="outline" className="text-xs">
                    {video.category}
                  </Badge>
                  
                  <h3 className="font-semibold text-lg leading-tight">{video.title}</h3>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{video.views} views</span>
                    <span>{video.duration}</span>
                  </div>
                  
                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Video
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Farming Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmingCalendar.map((month, index) => (
              <Card key={index} className="p-6 card-shadow">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{month.month}</h3>
                    <Badge variant="outline">{month.weather}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Key Activities:</h4>
                    <ul className="space-y-1">
                      {month.activities.map((activity, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Quiz Tab */}
        <TabsContent value="quiz" className="space-y-6">
          <Card className="p-8 text-center card-shadow">
            <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Knowledge Quiz</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Test your farming knowledge with our interactive quizzes and earn additional points.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <Button className="h-12">
                Organic Farming Quiz
              </Button>
              <Button variant="outline" className="h-12">
                Water Management Quiz
              </Button>
              <Button variant="outline" className="h-12">
                Soil Health Quiz
              </Button>
              <Button variant="outline" className="h-12">
                Pest Control Quiz
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Learn;