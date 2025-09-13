import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Target, 
  Award, 
  Users, 
  Droplets, 
  Recycle,
  TrendingUp,
  Star,
  ArrowRight,
  CheckCircle,
  Play
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Target,
      title: 'Gamified Quests',
      description: 'Complete fun challenges to learn sustainable farming practices and earn points.',
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Unlock badges and certificates as you master different aspects of sustainable agriculture.',
    },
    {
      icon: Users,
      title: 'Community Leaderboard',
      description: 'Compete with farmers in your region and share knowledge with the community.',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your sustainability score and see the real impact of your efforts.',
    },
    {
      icon: Droplets,
      title: 'Water Conservation',
      description: 'Learn advanced irrigation techniques and water-saving methods.',
    },
    {
      icon: Recycle,
      title: 'Waste Management',
      description: 'Transform farm waste into valuable resources through composting and recycling.',
    },
  ];

  const stats = [
    { value: '50,000+', label: 'Farmers Helped' },
    { value: '2M+', label: 'Liters Water Saved' },
    { value: '95%', label: 'Success Rate' },
    { value: '500+', label: 'Sustainable Practices' },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Karnataka',
      quote: 'FarmQuest helped me reduce water usage by 40% while increasing crop yield. The gamified approach made learning enjoyable!',
      achievement: 'Water Conservation Master',
      avatar: '👨‍🌾',
    },
    {
      name: 'Priya Sharma', 
      location: 'Punjab',
      quote: 'The organic farming quests transformed my farm. I\'m now completely chemical-free and earning more than ever.',
      achievement: 'Organic Pioneer',
      avatar: '👩‍🌾',
    },
    {
      name: 'Mohammed Hassan',
      location: 'Tamil Nadu',
      quote: 'The community aspect is amazing. Learning from other farmers and sharing experiences has been invaluable.',
      achievement: 'Community Leader',
      avatar: '👨‍🌾',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-primary">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-lg">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading">FarmQuest India</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="gradient-primary text-white">
                Join Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 gradient-background">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              🚀 Revolutionizing Indian Agriculture
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-foreground">
              Transform Your Farm with
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Sustainable Gaming</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of Indian farmers on a gamified journey to sustainable agriculture. 
              Complete quests, earn rewards, and build a greener future for farming.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register">
                <Button size="lg" className="gradient-primary text-white px-8">
                  <Play className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8">
                Watch Demo
              </Button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              The Challenge Indian Farmers Face
            </h2>
            <p className="text-lg text-muted-foreground">
              Climate change, water scarcity, and declining soil health threaten the future of agriculture. 
              Traditional farming methods are no longer enough to ensure sustainable livelihoods.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '💧',
                title: 'Water Scarcity',
                description: 'Unpredictable rainfall and depleting groundwater levels affect 60% of Indian farms.',
              },
              {
                icon: '🌱',
                title: 'Soil Degradation',
                description: 'Overuse of chemicals has degraded 30% of arable land, reducing productivity.',
              },
              {
                icon: '📚',
                title: 'Knowledge Gap',
                description: 'Lack of access to modern sustainable farming techniques limits farmer success.',
              },
            ].map((problem, index) => (
              <Card key={index} className="p-6 text-center card-shadow">
                <div className="text-4xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Showcase */}
      <section className="py-20 px-4 bg-surface">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              The FarmQuest Solution
            </h2>
            <p className="text-lg text-muted-foreground">
              A gamified platform that makes learning sustainable farming practices engaging, 
              rewarding, and community-driven.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 card-shadow hover-shadow transition-smooth">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg mr-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Real Farmers, Real Results
            </h2>
            <p className="text-lg text-muted-foreground">
              See how FarmQuest has transformed farming practices across India
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 card-shadow">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                
                <blockquote className="text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <Badge className="bg-success/10 text-success border-success/20">
                  <Star className="h-3 w-3 mr-1" />
                  {testimonial.achievement}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-surface">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Everything You Need to Succeed
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Expert-Designed Quests',
                  features: ['Water conservation techniques', 'Organic farming methods', 'Soil health improvement', 'Pest management'],
                },
                {
                  title: 'Community Support',
                  features: ['Connect with local farmers', 'Share best practices', 'Get expert advice', 'Regional leaderboards'],
                },
                {
                  title: 'Progress Tracking',
                  features: ['Sustainability score monitoring', 'Achievement collection', 'Impact measurement', 'Detailed analytics'],
                },
                {
                  title: 'Educational Resources',
                  features: ['Video tutorials', 'Seasonal farming calendar', 'Weather-based tips', 'Government scheme info'],
                },
              ].map((section, index) => (
                <Card key={index} className="p-6 card-shadow">
                  <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-primary text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of farmers already on their sustainable agriculture journey. 
              Start with simple quests and grow into a sustainability champion.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="px-8">
                  Start Free Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-primary">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-primary mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-lg">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <span className="font-heading">FarmQuest India</span>
              </Link>
              <p className="text-muted-foreground text-sm">
                Empowering Indian farmers with sustainable agriculture through gamification.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/quests" className="hover:text-foreground">Quests</Link></li>
                <li><Link to="/leaderboard" className="hover:text-foreground">Leaderboard</Link></li>
                <li><Link to="/learn" className="hover:text-foreground">Learning</Link></li>
                <li><Link to="/community" className="hover:text-foreground">Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground">Guidelines</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">WhatsApp Community</a></li>
                <li><a href="#" className="hover:text-foreground">Telegram Channel</a></li>
                <li><a href="#" className="hover:text-foreground">YouTube</a></li>
                <li><a href="#" className="hover:text-foreground">Facebook</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 FarmQuest India. All rights reserved. Supported by Ministry of Agriculture & Farmers Welfare.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;