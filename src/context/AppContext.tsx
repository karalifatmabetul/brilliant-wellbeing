import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AppState {
  xp: number;
  streak: number;
  completedLessons: string[];
  currentCourseId: string | null;
  currentLessonIndex: number;
}

type Action =
  | { type: 'ADD_XP'; payload: number }
  | { type: 'COMPLETE_LESSON'; payload: string }
  | { type: 'SET_CURRENT_COURSE'; payload: { courseId: string; lessonIndex: number } }
  | { type: 'RESET_PROGRESS' }
  | { type: 'LOAD_STATE'; payload: AppState };

const initialState: AppState = {
  xp: 0,
  streak: 0,
  completedLessons: [],
  currentCourseId: null,
  currentLessonIndex: 0,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_XP':
      return { ...state, xp: state.xp + action.payload };
    case 'COMPLETE_LESSON':
      if (state.completedLessons.includes(action.payload)) return state;
      return { ...state, completedLessons: [...state.completedLessons, action.payload] };
    case 'SET_CURRENT_COURSE':
      return {
        ...state,
        currentCourseId: action.payload.courseId,
        currentLessonIndex: action.payload.lessonIndex,
      };
    case 'RESET_PROGRESS':
      return initialState;
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  setCurrentCourse: (courseId: string, lessonIndex: number) => void;
  resetProgress: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = '@app_state';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedState) {
          dispatch({ type: 'LOAD_STATE', payload: JSON.parse(savedState) });
        }
      } catch (error) {
        console.error('Failed to load state from AsyncStorage', error);
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save state to AsyncStorage', error);
      }
    };
    saveState();
  }, [state]);

  const addXp = (amount: number) => dispatch({ type: 'ADD_XP', payload: amount });
  const completeLesson = (lessonId: string) => dispatch({ type: 'COMPLETE_LESSON', payload: lessonId });
  const setCurrentCourse = (courseId: string, lessonIndex: number) =>
    dispatch({ type: 'SET_CURRENT_COURSE', payload: { courseId, lessonIndex } });
  const resetProgress = () => dispatch({ type: 'RESET_PROGRESS' });

  return (
    <AppContext.Provider value={{ state, addXp, completeLesson, setCurrentCourse, resetProgress }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
