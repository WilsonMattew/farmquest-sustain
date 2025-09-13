import { User, Quest, Achievement, Article, QuestStep } from '@/types';

// Indian districts data
export const indianDistricts = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat',
  'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
  'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
  'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali',
  'Ernakulam', 'Thiruvananthapuram', 'Kollam', 'Kozhikode', 'Thrissur', 'Palakkad',
  'Malappuram', 'Kannur', 'Kasaragod', 'Wayanad', 'Idukki', 'Pathanamthitta',
  'Alappuzha', 'Kottayam', 'Thoothukudi', 'Salem', 'Coimbatore', 'Madurai'
];

export const indianCrops = [
  'Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Jute', 'Tea', 'Coffee', 'Coconut',
  'Spices (Cardamom)', 'Spices (Pepper)', 'Spices (Turmeric)', 'Rubber', 'Banana',
  'Mango', 'Orange', 'Apple', 'Grapes', 'Potato', 'Onion', 'Tomato',
  'Groundnut', 'Sunflower', 'Mustard', 'Sesame', 'Castor', 'Soybean',
  'Millets', 'Barley', 'Maize', 'Pulses', 'Cashew', 'Areca Nut'
];

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: 'user_1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 9876543210',
    avatar: '/avatars/rajesh.jpg',
    district: 'Ernakulam',
    village: 'Kumbanad',
    farmSize: 5.5,
    primaryCrops: ['Rice', 'Coconut', 'Spices (Pepper)'],
    experienceLevel: 'Intermediate',
    language: 'English',
    sustainabilityScore: 85,
    totalPoints: 2450,
    level: 'Eco Warrior',
    rank: 1,
    joinedDate: '2024-01-15T00:00:00Z',
    achievements: ['first_quest', 'water_saver', 'organic_pioneer'],
    questsCompleted: 12,
    activeQuests: ['quest_2', 'quest_5'],
  },
  {
    id: 'user_2',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 9876543211',
    avatar: '/avatars/priya.jpg',
    district: 'Bangalore',
    village: 'Doddaballapur',
    farmSize: 3.2,
    primaryCrops: ['Tomato', 'Onion', 'Millets'],
    experienceLevel: 'Advanced',
    language: 'English',
    sustainabilityScore: 92,
    totalPoints: 3120,
    level: 'Sustainability Champion',
    rank: 2,
    joinedDate: '2023-11-20T00:00:00Z',
    achievements: ['first_quest', 'water_saver', 'organic_pioneer', 'soil_doctor'],
    questsCompleted: 18,
    activeQuests: ['quest_7'],
  },
  {
    id: 'user_3',
    name: 'Mohammed Hassan',
    email: 'mohammed.hassan@email.com',
    phone: '+91 9876543212',
    avatar: '/avatars/mohammed.jpg',
    district: 'Hyderabad',
    village: 'Shamirpet',
    farmSize: 8.0,
    primaryCrops: ['Cotton', 'Groundnut', 'Maize'],
    experienceLevel: 'Intermediate',
    language: 'English',
    sustainabilityScore: 78,
    totalPoints: 1890,
    level: 'Green Farmer',
    rank: 3,
    joinedDate: '2024-02-10T00:00:00Z',
    achievements: ['first_quest', 'carbon_saver'],
    questsCompleted: 8,
    activeQuests: ['quest_1', 'quest_4'],
  },
  {
    id: 'user_4',
    name: 'Anita Devi',
    email: 'anita.devi@email.com',
    phone: '+91 9876543213',
    district: 'Pune',
    village: 'Baramati',
    farmSize: 2.8,
    primaryCrops: ['Grapes', 'Sugarcane'],
    experienceLevel: 'Beginner',
    language: 'Hindi',
    sustainabilityScore: 45,
    totalPoints: 980,
    level: 'Seedling Farmer',
    rank: 15,
    joinedDate: '2024-06-01T00:00:00Z',
    achievements: ['first_quest'],
    questsCompleted: 3,
    activeQuests: ['quest_3'],
  },
  {
    id: 'user_5',
    name: 'Suresh Reddy',
    email: 'suresh.reddy@email.com',
    phone: '+91 9876543214',
    district: 'Chennai',
    village: 'Kancheepuram',
    farmSize: 6.5,
    primaryCrops: ['Rice', 'Groundnut', 'Banana'],
    experienceLevel: 'Advanced',
    language: 'Tamil',
    sustainabilityScore: 88,
    totalPoints: 2780,
    level: 'Eco Warrior',
    rank: 4,
    joinedDate: '2023-12-05T00:00:00Z',
    achievements: ['first_quest', 'water_saver', 'biodiversity_booster'],
    questsCompleted: 15,
    activeQuests: ['quest_6'],
  }
];

// Mock Quests Data
export const mockQuests: Quest[] = [
  {
    id: 'quest_1',
    title: 'Water Warrior: Drip Irrigation Setup',
    description: 'Install a drip irrigation system to reduce water consumption by 30% while maintaining crop yield.',
    category: 'Water Conservation',
    difficulty: 'Medium',
    points: 250,
    estimatedTime: '14 days',
    icon: 'Droplets',
    image: '/quests/drip-irrigation.jpg',
    steps: [
      {
        id: 'step_1_1',
        title: 'Plan Your Irrigation Layout',
        description: 'Measure your field and design the drip irrigation layout. Consider crop spacing and water source location.',
        isCompleted: false,
      },
      {
        id: 'step_1_2',
        title: 'Purchase Materials',
        description: 'Buy drip irrigation pipes, emitters, filters, and pressure regulators based on your layout plan.',
        isCompleted: false,
      },
      {
        id: 'step_1_3',
        title: 'Install Main Pipeline',
        description: 'Lay the main pipeline from water source to the field. Ensure proper slope for water flow.',
        isCompleted: false,
        verificationRequired: true,
      },
      {
        id: 'step_1_4',
        title: 'Install Drip Lines',
        description: 'Connect drip lines to the main pipeline. Place emitters at appropriate distances near plant roots.',
        isCompleted: false,
        verificationRequired: true,
      },
      {
        id: 'step_1_5',
        title: 'Test and Monitor',
        description: 'Run the system for a week and monitor water usage. Adjust flow rates if needed.',
        isCompleted: false,
        verificationRequired: true,
      },
    ],
    requirements: [
      'Farm area of at least 0.5 acres',
      'Access to reliable water source',
      'Basic tools for installation',
    ],
    tips: [
      'Start with a small area to test the system',
      'Check for leaks regularly during the first week',
      'Install a timer to automate irrigation',
      'Clean filters monthly to maintain efficiency',
    ],
  },
  {
    id: 'quest_2',
    title: 'Organic Champion: Pesticide-Free Month',
    description: 'Eliminate chemical pesticides for 30 days using only organic and biological pest control methods.',
    category: 'Organic Farming',
    difficulty: 'Hard',
    points: 300,
    estimatedTime: '30 days',
    icon: 'Bug',
    image: '/quests/organic-farming.jpg',
    steps: [
      {
        id: 'step_2_1',
        title: 'Identify Current Pest Issues',
        description: 'Survey your crops and identify the types of pests currently affecting your plants.',
        isCompleted: false,
      },
      {
        id: 'step_2_2',
        title: 'Prepare Organic Solutions',
        description: 'Create neem oil spray, prepare beneficial insect habitats, and make organic repellents.',
        isCompleted: false,
      },
      {
        id: 'step_2_3',
        title: 'Implement Biological Controls',
        description: 'Introduce beneficial insects like ladybugs and set up pheromone traps for pest monitoring.',
        isCompleted: false,
        verificationRequired: true,
      },
      {
        id: 'step_2_4',
        title: 'Apply Organic Treatments',
        description: 'Use neem oil, soap sprays, and other organic methods. Document their effectiveness.',
        isCompleted: false,
      },
      {
        id: 'step_2_5',
        title: 'Monitor and Document Results',
        description: 'Track pest levels, crop health, and yield changes throughout the month.',
        isCompleted: false,
        verificationRequired: true,
      },
    ],
    requirements: [
      'Commitment to avoid all chemical pesticides',
      'Access to organic pest control materials',
      'Daily monitoring capability',
    ],
    tips: [
      'Keep detailed records of pest levels before starting',
      'Combine multiple organic methods for best results',
      'Be patient - organic methods may take longer to show results',
      'Connect with other organic farmers for advice',
    ],
  },
  {
    id: 'quest_3',
    title: 'Soil Doctor: pH Balance Master',
    description: 'Test your soil pH and adjust it to optimal levels for your crops using natural amendments.',
    category: 'Soil Health',
    difficulty: 'Easy',
    points: 150,
    estimatedTime: '10 days',
    icon: 'TestTube',
    image: '/quests/soil-testing.jpg',
    steps: [
      {
        id: 'step_3_1',
        title: 'Collect Soil Samples',
        description: 'Collect soil samples from different areas of your field at 6-inch depth.',
        isCompleted: false,
      },
      {
        id: 'step_3_2',
        title: 'Test Soil pH',
        description: 'Use pH testing kit or digital meter to test soil pH levels across your samples.',
        isCompleted: false,
        verificationRequired: true,
      },
      {
        id: 'step_3_3',
        title: 'Research Optimal pH',
        description: 'Determine the ideal pH range for your specific crops and compare with test results.',
        isCompleted: false,
      },
      {
        id: 'step_3_4',
        title: 'Apply Natural Amendments',
        description: 'Add lime for acidic soil or organic matter/sulfur for alkaline soil as needed.',
        isCompleted: false,
        verificationRequired: true,
      },
      {
        id: 'step_3_5',
        title: 'Retest After Treatment',
        description: 'Wait a week and retest soil pH to verify improvements.',
        isCompleted: false,
        verificationRequired: true,
      },
    ],
    requirements: [
      'Soil pH testing kit or access to testing facility',
      'Natural soil amendments (lime, compost, sulfur)',
    ],
    tips: [
      'Test soil when it\'s not too wet or too dry',
      'Take samples from multiple locations for accuracy',
      'Retest soil every 6 months to monitor changes',
      'Different crops may need different pH levels',
    ],
  },
  {
    id: 'quest_4',
    title: 'Compost Creator: Waste to Gold',
    description: 'Create 100kg of high-quality organic compost from farm waste and kitchen scraps.',
    category: 'Waste Management',
    difficulty: 'Medium',
    points: 200,
    estimatedTime: '21 days',
    icon: 'Recycle',
    image: '/quests/composting.jpg',
    steps: [
      {
        id: 'step_4_1',
        title: 'Set Up Compost Area',
        description: 'Choose a shaded area and set up compost bins or designate a composting space.',
        isCompleted: false,
      },
      {
        id: 'step_4_2',
        title: 'Collect Organic Materials',
        description: 'Gather green materials (kitchen scraps, fresh grass) and brown materials (dry leaves, straw).',
        isCompleted: false,
      },
      {
        id: 'step_4_3',
        title: 'Build Compost Pile',
        description: 'Layer green and brown materials in 3:1 ratio. Add water to maintain moisture.',
        isCompleted: false,
        verificationRequired: true,
      },
      {
        id: 'step_4_4',
        title: 'Maintain and Turn',
        description: 'Turn the compost pile every 3-4 days and monitor temperature. Add water if needed.',
        isCompleted: false,
      },
      {
        id: 'step_4_5',
        title: 'Harvest Finished Compost',
        description: 'After 3 weeks, harvest the dark, crumbly compost and weigh it.',
        isCompleted: false,
        verificationRequired: true,
      },
    ],
    requirements: [
      'Space for composting (3x3 feet minimum)',
      'Access to organic waste materials',
      'Tools for turning compost',
    ],
    tips: [
      'Maintain compost temperature between 130-160°F',
      'Keep compost as moist as a wrung-out sponge',
      'Chop materials into small pieces for faster decomposition',
      'Avoid meat, dairy, and oily foods in compost',
    ],
  },
  {
    id: 'quest_5',
    title: 'Biodiversity Booster: Native Species Garden',
    description: 'Plant 10 different native plant species around your farm to promote biodiversity.',
    category: 'Biodiversity',
    difficulty: 'Medium',
    points: 220,
    estimatedTime: '15 days',
    icon: 'Flower',
    image: '/quests/native-plants.jpg',
    steps: [
      {
        id: 'step_5_1',
        title: 'Research Native Species',
        description: 'Identify 10 native plant species suitable for your region and climate.',
        isCompleted: false,
      },
      {
        id: 'step_5_2',
        title: 'Plan Garden Layout',
        description: 'Design where to plant each species considering their space and light requirements.',
        isCompleted: false,
      },
      {
        id: 'step_5_3',
        title: 'Prepare Planting Areas',
        description: 'Clear and prepare soil in designated areas. Add compost if needed.',
        isCompleted: false,
      },
      {
        id: 'step_5_4',
        title: 'Plant Native Species',
        description: 'Plant all 10 native species according to your layout plan.',
        isCompleted: false,
        verificationRequired: true,
      },
      {
        id: 'step_5_5',
        title: 'Monitor and Maintain',
        description: 'Water regularly and monitor plant establishment for 2 weeks.',
        isCompleted: false,
      },
    ],
    requirements: [
      'Space for planting around farm boundaries',
      'Native plant seeds or seedlings',
      'Basic gardening tools',
    ],
    tips: [
      'Choose plants that flower at different times for year-round benefits',
      'Include plants that attract beneficial insects',
      'Native plants typically require less water and maintenance',
      'Create corridors connecting different planted areas',
    ],
  },
  {
    id: 'quest_6',
    title: 'Carbon Saver: Fuel Reduction Challenge',
    description: 'Reduce machinery fuel consumption by 20% through efficient farming practices.',
    category: 'Carbon Reduction',
    difficulty: 'Hard',
    points: 280,
    estimatedTime: '30 days',
    icon: 'Fuel',
    image: '/quests/fuel-efficiency.jpg',
    steps: [
      {
        id: 'step_6_1',
        title: 'Baseline Fuel Tracking',
        description: 'Record current fuel consumption for all farm machinery for one week.',
        isCompleted: false,
      },
      {
        id: 'step_6_2',
        title: 'Optimize Field Operations',
        description: 'Plan combined operations and efficient field patterns to reduce trips.',
        isCompleted: false,
      },
      {
        id: 'step_6_3',
        title: 'Maintain Equipment',
        description: 'Service all machinery - change oils, clean air filters, check tire pressure.',
        isCompleted: false,
        verificationRequired: true,
      },
      {
        id: 'step_6_4',
        title: 'Implement Efficiency Measures',
        description: 'Use proper gear settings, maintain consistent speeds, avoid excessive idling.',
        isCompleted: false,
      },
      {
        id: 'step_6_5',
        title: 'Track and Verify Savings',
        description: 'Monitor fuel consumption for 3 weeks and calculate percentage reduction.',
        isCompleted: false,
        verificationRequired: true,
      },
    ],
    requirements: [
      'Farm machinery (tractor, cultivator, etc.)',
      'Fuel consumption tracking system',
      'Basic maintenance tools',
    ],
    tips: [
      'Keep detailed fuel logs for accurate comparison',
      'Combine multiple operations in single trips',
      'Avoid working in muddy conditions when possible',
      'Consider precision agriculture techniques',
    ],
  },
  {
    id: 'quest_7',
    title: 'Crop Rotation Master: 3-Season Plan',
    description: 'Implement a sustainable 3-crop rotation system to improve soil health and reduce pests.',
    category: 'Crop Rotation',
    difficulty: 'Hard',
    points: 350,
    estimatedTime: '90 days',
    icon: 'RotateCcw',
    image: '/quests/crop-rotation.jpg',
    steps: [
      {
        id: 'step_7_1',
        title: 'Design Rotation Plan',
        description: 'Plan a 3-season rotation with legumes, grains, and commercial crops.',
        isCompleted: false,
      },
      {
        id: 'step_7_2',
        title: 'Prepare First Plot',
        description: 'Prepare soil and plant the first crop in your rotation sequence.',
        isCompleted: false,
        verificationRequired: true,
      },
      {
        id: 'step_7_3',
        title: 'Monitor Soil Health',
        description: 'Test soil nutrients and health indicators after each crop cycle.',
        isCompleted: false,
        verificationRequired: true,
      },
      {
        id: 'step_7_4',
        title: 'Transition to Second Crop',
        description: 'Harvest first crop and immediately plant the second crop in rotation.',
        isCompleted: false,
        verificationRequired: true,
      },
      {
        id: 'step_7_5',
        title: 'Complete Full Rotation',
        description: 'Complete all three crops in the rotation cycle and document results.',
        isCompleted: false,
        verificationRequired: true,
      },
    ],
    requirements: [
      'At least 1 acre of farmland',
      'Seeds for 3 different crop types',
      'Soil testing capability',
    ],
    tips: [
      'Include nitrogen-fixing legumes in your rotation',
      'Choose crops with different root depths',
      'Consider market demand for each crop',
      'Keep detailed records of yields and soil changes',
    ],
  },
];

// Mock Achievements Data
export const mockAchievements: Achievement[] = [
  {
    id: 'first_quest',
    title: 'First Steps',
    description: 'Complete your first sustainability quest',
    icon: 'Award',
    category: 'Milestone',
    isUnlocked: true,
    requirements: 'Complete any quest',
    rarity: 'Common',
    unlockedDate: '2024-01-20T00:00:00Z',
  },
  {
    id: 'water_saver',
    title: 'Water Guardian',
    description: 'Save 1000L of water through efficient irrigation',
    icon: 'Droplets',
    category: 'Water Conservation',
    isUnlocked: true,
    requirements: 'Complete 3 water conservation quests',
    rarity: 'Rare',
    unlockedDate: '2024-02-15T00:00:00Z',
  },
  {
    id: 'organic_pioneer',
    title: 'Organic Pioneer',
    description: 'Go chemical-free for 30 consecutive days',
    icon: 'Leaf',
    category: 'Organic Farming',
    isUnlocked: false,
    requirements: 'Complete organic farming quest without using chemicals',
    rarity: 'Epic',
  },
  {
    id: 'soil_doctor',
    title: 'Soil Doctor',
    description: 'Master soil health management',
    icon: 'TestTube',
    category: 'Soil Health',
    isUnlocked: false,
    requirements: 'Complete 5 soil health related quests',
    rarity: 'Rare',
  },
  {
    id: 'carbon_saver',
    title: 'Carbon Hero',
    description: 'Reduce farm carbon footprint by 25%',
    icon: 'TreePine',
    category: 'Carbon Reduction',
    isUnlocked: false,
    requirements: 'Complete carbon reduction quest successfully',
    rarity: 'Epic',
  },
  {
    id: 'biodiversity_booster',
    title: 'Biodiversity Champion',
    description: 'Create habitats for 20+ species',
    icon: 'Flower2',
    category: 'Biodiversity',
    isUnlocked: false,
    requirements: 'Complete 3 biodiversity enhancement quests',
    rarity: 'Legendary',
  },
  {
    id: 'community_leader',
    title: 'Community Leader',
    description: 'Help 10 farmers start their sustainability journey',
    icon: 'Users',
    category: 'Community',
    isUnlocked: false,
    requirements: 'Refer 10 farmers who complete their first quest',
    rarity: 'Legendary',
  },
  {
    id: 'quest_master',
    title: 'Quest Master',
    description: 'Complete 25 sustainability quests',
    icon: 'Target',
    category: 'Milestone',
    isUnlocked: false,
    requirements: 'Complete 25 quests across all categories',
    rarity: 'Epic',
  },
];

// Mock Articles Data
export const mockArticles: Article[] = [
  {
    id: 'article_1',
    title: 'Sustainable Water Management in Indian Agriculture',
    excerpt: 'Learn effective techniques to conserve water while maintaining crop productivity in Indian farming conditions.',
    content: `Water scarcity is becoming a critical challenge for Indian farmers. With changing rainfall patterns and increasing temperatures, it's essential to adopt sustainable water management practices.

## Key Water Conservation Techniques

### 1. Drip Irrigation Systems
Drip irrigation can reduce water usage by 30-50% compared to traditional flood irrigation. The system delivers water directly to plant roots, minimizing evaporation and runoff.

**Benefits:**
- Precise water delivery
- Reduced water waste
- Better crop yields
- Lower labor costs

### 2. Rainwater Harvesting
Collecting and storing rainwater during monsoon seasons can provide water during dry periods.

**Implementation Steps:**
1. Install catchment systems on rooftops and fields
2. Create storage tanks or ponds
3. Use stored water for irrigation during dry spells

### 3. Mulching
Applying organic mulch around plants helps retain soil moisture and reduce evaporation.

**Mulching Materials:**
- Straw and hay
- Dried leaves
- Grass clippings
- Coconut coir

## Monitoring and Measurement

Regular monitoring of soil moisture levels helps optimize irrigation timing and quantity. Simple tools like soil moisture meters can guide irrigation decisions.

## Government Support

Various government schemes provide subsidies for water conservation equipment. Contact your local agriculture office for information about available programs.`,
    category: 'Water Conservation',
    author: 'Dr. Suresh Patel',
    publishedDate: '2024-08-15T00:00:00Z',
    readTime: 8,
    difficulty: 'Intermediate',
    image: '/articles/water-management.jpg',
    tags: ['water conservation', 'irrigation', 'sustainability'],
    likes: 234,
    isBookmarked: false,
  },
  {
    id: 'article_2',
    title: 'Organic Pest Control: Natural Solutions for Healthy Crops',
    excerpt: 'Discover effective organic methods to control pests without harmful chemicals, protecting both crops and environment.',
    content: `Chemical pesticides have long-term negative effects on soil health, beneficial insects, and human health. Organic pest control offers sustainable alternatives that work with nature rather than against it.

## Understanding Integrated Pest Management (IPM)

IPM combines multiple strategies to control pests while minimizing environmental impact:

### 1. Prevention
- Crop rotation
- Proper sanitation
- Resistant varieties
- Healthy soil management

### 2. Biological Control
**Beneficial Insects:**
- Ladybugs for aphid control
- Praying mantis for general pest control
- Parasitic wasps for caterpillars

**Microbial Controls:**
- Bacillus thuringiensis (Bt) for caterpillars
- Neem-based products
- Beneficial nematodes

### 3. Physical Controls
- Row covers and nets
- Sticky traps
- Hand picking for small infestations
- Companion planting

## DIY Organic Sprays

### Neem Oil Spray
**Ingredients:**
- 2 tablespoons neem oil
- 1 tablespoon mild liquid soap
- 1 gallon water

**Application:** Spray in evening to avoid leaf burn

### Soap Spray for Soft-bodied Insects
**Ingredients:**
- 1-2 tablespoons mild dish soap
- 1 quart water

**Use:** Effective against aphids, mites, and whiteflies

## Monitoring and Early Detection

Regular field scouting helps identify pest problems before they become severe. Check plants weekly for signs of damage or pest presence.

## Building Beneficial Habitats

Create diverse habitats around your farm to attract beneficial insects:
- Plant flowering plants nearby
- Maintain hedge rows
- Provide water sources
- Avoid broad-spectrum pesticides`,
    category: 'Organic Farming',
    author: 'Dr. Priya Krishnan',
    publishedDate: '2024-08-10T00:00:00Z',
    readTime: 12,
    difficulty: 'Intermediate',
    image: '/articles/organic-pest-control.jpg',
    tags: ['organic farming', 'pest control', 'beneficial insects'],
    likes: 189,
    isBookmarked: true,
  },
  {
    id: 'article_3',
    title: 'Soil Health: The Foundation of Sustainable Farming',
    excerpt: 'Understanding and improving soil health is crucial for long-term agricultural sustainability and productivity.',
    content: `Healthy soil is the foundation of productive agriculture. It supports plant growth, retains water and nutrients, and hosts beneficial microorganisms essential for crop health.

## Key Indicators of Soil Health

### Physical Properties
- **Soil structure:** Well-aggregated soil with good porosity
- **Water infiltration:** Ability to absorb and retain water
- **Compaction levels:** Minimal hard layers that restrict root growth

### Chemical Properties
- **pH levels:** Optimal range for nutrient availability
- **Organic matter content:** 3-5% is ideal for most crops
- **Nutrient balance:** Adequate levels of N, P, K, and micronutrients

### Biological Properties
- **Microbial activity:** Diverse soil organisms
- **Earthworm presence:** Indicator of soil ecosystem health
- **Root health:** Strong, extensive root systems

## Improving Soil Health

### 1. Organic Matter Addition
**Sources:**
- Compost
- Well-aged manure
- Cover crops
- Crop residues

**Benefits:**
- Improves soil structure
- Increases water retention
- Provides slow-release nutrients
- Feeds soil microorganisms

### 2. Cover Cropping
Plant cover crops during fallow periods to:
- Prevent soil erosion
- Add organic matter
- Fix nitrogen (legumes)
- Break pest cycles

**Popular Cover Crops:**
- Berseem clover
- Mustard
- Oats
- Cowpea

### 3. Minimize Tillage
Excessive tillage can:
- Destroy soil structure
- Reduce organic matter
- Increase erosion risk
- Disturb beneficial organisms

**Alternative Practices:**
- No-till farming
- Strip tillage
- Mulching

## Soil Testing and Monitoring

Regular soil testing helps track improvements and guide management decisions:

**Test Frequency:** Every 2-3 years
**Parameters to Test:**
- pH and buffer pH
- Organic matter content
- Available nutrients
- Micronutrient levels

## Composting for Soil Health

Making your own compost provides high-quality organic matter:

**Composting Recipe:**
- 3 parts brown materials (carbon)
- 1 part green materials (nitrogen)
- Adequate moisture
- Regular turning

**Timeline:** 3-6 months for finished compost`,
    category: 'Soil Health',
    author: 'Dr. Ramesh Gupta',
    publishedDate: '2024-08-05T00:00:00Z',
    readTime: 10,
    difficulty: 'Beginner',
    image: '/articles/soil-health.jpg',
    tags: ['soil health', 'composting', 'organic matter'],
    likes: 156,
    isBookmarked: false,
  },
  {
    id: 'article_4',
    title: 'Climate-Smart Crop Selection for Indian Regions',
    excerpt: 'Choose the right crops for changing climate conditions to ensure resilient and profitable farming.',
    content: `Climate change is affecting agricultural patterns across India. Selecting climate-smart crops can help farmers adapt to changing conditions while maintaining productivity and profitability.

## Understanding Climate Zones

India has diverse climate zones, each requiring specific crop selection strategies:

### 1. Arid and Semi-Arid Regions
**Challenges:**
- Low rainfall
- High temperatures
- Water scarcity

**Suitable Crops:**
- Drought-tolerant millets (pearl millet, finger millet)
- Sorghum
- Chickpea
- Sesame

### 2. Coastal Regions
**Challenges:**
- High humidity
- Cyclones
- Salt-affected soils

**Suitable Crops:**
- Coconut
- Rice (salt-tolerant varieties)
- Cashew
- Vegetables (okra, eggplant)

### 3. Hill Regions
**Challenges:**
- Short growing seasons
- Temperature fluctuations
- Slopes and erosion

**Suitable Crops:**
- Temperate fruits (apple, cherry)
- Potato
- Peas
- Medicinal plants

## Drought-Resistant Varieties

Modern breeding programs have developed crop varieties that can withstand water stress:

### Rice Varieties
- **Sahbhagi Dhan:** Tolerates drought and submergence
- **DRR Dhan 42:** Short duration, drought tolerant
- **Vandana:** Suitable for rainfed conditions

### Wheat Varieties
- **HD 2967:** Heat tolerant
- **DBW 88:** Drought and heat stress tolerant
- **WH 147:** Short duration variety

## Heat-Tolerant Crops

With rising temperatures, heat-tolerant varieties become crucial:

### Vegetables
- **Tomato:** Arka Rakshak, Arka Samrat
- **Chili:** Arka Lohit, Arka Suphal
- **Okra:** Arka Anamika, Arka Abhay

### Pulses
- **Cowpea:** Heat tolerant, quick maturing
- **Mung bean:** Short duration summer crop
- **Black gram:** Suitable for kharif season

## Water-Efficient Crops

Crops that provide good returns with limited water:

### Millets
- Require 50% less water than rice
- Highly nutritious
- Climate resilient
- Growing market demand

### Oilseeds
- **Sunflower:** Moderate water requirement
- **Safflower:** Drought tolerant
- **Mustard:** Cool season crop

## Crop Diversification Benefits

Diversifying crops provides multiple benefits:
- Risk reduction
- Soil health improvement
- Pest management
- Market stability
- Nutritional security

## Planning Crop Calendar

Create a climate-smart crop calendar considering:
- Local rainfall patterns
- Temperature variations
- Market demand
- Water availability
- Soil conditions

## Government Support

Various schemes support climate-smart agriculture:
- National Mission for Sustainable Agriculture
- Pradhan Mantri Krishi Sinchayee Yojana
- Climate Resilient Agriculture
- Seed subsidies for improved varieties`,
    category: 'Climate Smart Agriculture',
    author: 'Dr. Kavitha Reddy',
    publishedDate: '2024-07-30T00:00:00Z',
    readTime: 15,
    difficulty: 'Advanced',
    image: '/articles/climate-smart-crops.jpg',
    tags: ['climate change', 'crop selection', 'drought resistance'],
    likes: 298,
    isBookmarked: false,
  },
];