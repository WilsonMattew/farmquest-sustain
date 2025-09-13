import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, Quest, Achievement, Article, Notification } from '@/types';
import { mockUsers, mockQuests, mockAchievements, mockArticles } from '@/data/mockData';

interface AppState {
  currentUser: User | null;
  users: User[];
  quests: Quest[];
  achievements: Achievement[];
  articles: Article[];
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_USER'; payload: User | null }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'START_QUEST'; payload: { questId: string; userId: string } }
  | { type: 'COMPLETE_QUEST'; payload: { questId: string; userId: string; photos?: string[] } }
  | { type: 'UPDATE_QUEST_PROGRESS'; payload: { questId: string; userId: string; progress: number } }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: { achievementId: string; userId: string } }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'BOOKMARK_ARTICLE'; payload: { articleId: string; userId: string } };

const initialState: AppState = {
  currentUser: null,
  users: mockUsers,
  quests: mockQuests,
  achievements: mockAchievements,
  articles: mockArticles,
  notifications: [],
  isLoading: false,
  error: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    
    case 'UPDATE_USER':
      const updatedUsers = state.users.map(user =>
        user.id === action.payload.id ? action.payload : user
      );
      return {
        ...state,
        users: updatedUsers,
        currentUser: state.currentUser?.id === action.payload.id ? action.payload : state.currentUser,
      };
    
    case 'START_QUEST':
      const { questId, userId } = action.payload;
      const updatedQuestsStart = state.quests.map(quest =>
        quest.id === questId ? { ...quest, isActive: true, startDate: new Date().toISOString() } : quest
      );
      const userToUpdateStart = state.users.find(user => user.id === userId);
      if (userToUpdateStart) {
        const updatedUserStart = {
          ...userToUpdateStart,
          activeQuests: [...userToUpdateStart.activeQuests, questId],
        };
        return {
          ...state,
          quests: updatedQuestsStart,
          users: state.users.map(user => user.id === userId ? updatedUserStart : user),
          currentUser: state.currentUser?.id === userId ? updatedUserStart : state.currentUser,
        };
      }
      return { ...state, quests: updatedQuestsStart };
    
    case 'COMPLETE_QUEST':
      const { questId: completedQuestId, userId: completedUserId, photos } = action.payload;
      const questToComplete = state.quests.find(q => q.id === completedQuestId);
      const userToComplete = state.users.find(user => user.id === completedUserId);
      
      if (questToComplete && userToComplete) {
        const updatedQuestsComplete = state.quests.map(quest =>
          quest.id === completedQuestId
            ? {
                ...quest,
                isCompleted: true,
                isActive: false,
                completedDate: new Date().toISOString(),
                photos: photos || [],
                progress: 100,
              }
            : quest
        );
        
        const updatedUserComplete = {
          ...userToComplete,
          totalPoints: userToComplete.totalPoints + questToComplete.points,
          questsCompleted: userToComplete.questsCompleted + 1,
          activeQuests: userToComplete.activeQuests.filter(id => id !== completedQuestId),
          sustainabilityScore: Math.min(100, userToComplete.sustainabilityScore + Math.floor(questToComplete.points / 10)),
        };
        
        return {
          ...state,
          quests: updatedQuestsComplete,
          users: state.users.map(user => user.id === completedUserId ? updatedUserComplete : user),
          currentUser: state.currentUser?.id === completedUserId ? updatedUserComplete : state.currentUser,
        };
      }
      return state;
    
    case 'UPDATE_QUEST_PROGRESS':
      const { questId: progressQuestId, userId: progressUserId, progress } = action.payload;
      const updatedQuestsProgress = state.quests.map(quest =>
        quest.id === progressQuestId ? { ...quest, progress } : quest
      );
      return { ...state, quests: updatedQuestsProgress };
    
    case 'UNLOCK_ACHIEVEMENT':
      const { achievementId, userId: achievementUserId } = action.payload;
      const updatedAchievements = state.achievements.map(achievement =>
        achievement.id === achievementId
          ? { ...achievement, isUnlocked: true, unlockedDate: new Date().toISOString() }
          : achievement
      );
      const userToUpdateAchievement = state.users.find(user => user.id === achievementUserId);
      if (userToUpdateAchievement) {
        const updatedUserAchievement = {
          ...userToUpdateAchievement,
          achievements: [...userToUpdateAchievement.achievements, achievementId],
        };
        return {
          ...state,
          achievements: updatedAchievements,
          users: state.users.map(user => user.id === achievementUserId ? updatedUserAchievement : user),
          currentUser: state.currentUser?.id === achievementUserId ? updatedUserAchievement : state.currentUser,
        };
      }
      return { ...state, achievements: updatedAchievements };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload ? { ...notification, isRead: true } : notification
        ),
      };
    
    case 'BOOKMARK_ARTICLE':
      const { articleId, userId: bookmarkUserId } = action.payload;
      const updatedArticles = state.articles.map(article =>
        article.id === articleId ? { ...article, isBookmarked: !article.isBookmarked } : article
      );
      return { ...state, articles: updatedArticles };
    
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<boolean>;
  startQuest: (questId: string) => void;
  completeQuest: (questId: string, photos?: string[]) => void;
  updateQuestProgress: (questId: string, progress: number) => void;
  unlockAchievement: (achievementId: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationRead: (notificationId: string) => void;
  bookmarkArticle: (articleId: string) => void;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('farmquest_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'SET_CURRENT_USER', payload: user });
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }
  }, []);

  // Save current user to localStorage
  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem('farmquest_user', JSON.stringify(state.currentUser));
    } else {
      localStorage.removeItem('farmquest_user');
    }
  }, [state.currentUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = state.users.find(u => u.email === email);
      if (user) {
        dispatch({ type: 'SET_CURRENT_USER', payload: user });
        addNotification({
          title: 'Welcome back!',
          message: `Welcome back, ${user.name}! Ready to continue your sustainable farming journey?`,
          type: 'success',
          isRead: false,
        });
        return true;
      }
      return false;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    dispatch({ type: 'SET_CURRENT_USER', payload: null });
    localStorage.removeItem('farmquest_user');
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        district: userData.district || '',
        village: userData.village || '',
        farmSize: userData.farmSize || 0,
        primaryCrops: userData.primaryCrops || [],
        experienceLevel: userData.experienceLevel || 'Beginner',
        language: userData.language || 'English',
        sustainabilityScore: 0,
        totalPoints: 0,
        level: 'Seedling Farmer',
        rank: state.users.length + 1,
        joinedDate: new Date().toISOString(),
        achievements: [],
        questsCompleted: 0,
        activeQuests: [],
      };

      const updatedUsers = [...state.users, newUser];
      dispatch({ type: 'SET_CURRENT_USER', payload: newUser });
      
      addNotification({
        title: 'Welcome to FarmQuest India!',
        message: `Welcome ${newUser.name}! Start your sustainable farming journey today.`,
        type: 'success',
        isRead: false,
      });
      
      return true;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Registration failed' });
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const startQuest = (questId: string) => {
    if (state.currentUser) {
      dispatch({ type: 'START_QUEST', payload: { questId, userId: state.currentUser.id } });
      addNotification({
        title: 'Quest Started!',
        message: 'You have started a new quest. Good luck on your sustainable farming journey!',
        type: 'success',
        isRead: false,
      });
    }
  };

  const completeQuest = (questId: string, photos?: string[]) => {
    if (state.currentUser) {
      dispatch({ type: 'COMPLETE_QUEST', payload: { questId, userId: state.currentUser.id, photos } });
      const quest = state.quests.find(q => q.id === questId);
      if (quest) {
        addNotification({
          title: 'Quest Completed!',
          message: `Congratulations! You earned ${quest.points} points for completing "${quest.title}".`,
          type: 'success',
          isRead: false,
        });
      }
    }
  };

  const updateQuestProgress = (questId: string, progress: number) => {
    if (state.currentUser) {
      dispatch({ type: 'UPDATE_QUEST_PROGRESS', payload: { questId, userId: state.currentUser.id, progress } });
    }
  };

  const unlockAchievement = (achievementId: string) => {
    if (state.currentUser) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: { achievementId, userId: state.currentUser.id } });
      const achievement = state.achievements.find(a => a.id === achievementId);
      if (achievement) {
        addNotification({
          title: 'Achievement Unlocked!',
          message: `Congratulations! You unlocked "${achievement.title}" achievement!`,
          type: 'success',
          isRead: false,
        });
      }
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
  };

  const markNotificationRead = (notificationId: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notificationId });
  };

  const bookmarkArticle = (articleId: string) => {
    if (state.currentUser) {
      dispatch({ type: 'BOOKMARK_ARTICLE', payload: { articleId, userId: state.currentUser.id } });
    }
  };

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      login,
      logout,
      register,
      startQuest,
      completeQuest,
      updateQuestProgress,
      unlockAchievement,
      addNotification,
      markNotificationRead,
      bookmarkArticle,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};