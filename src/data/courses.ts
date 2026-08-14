export interface Lesson {
  id: string;
  title: string;
  type: 'brief' | 'quiz' | 'lesson' | 'interactive';
  isPremium: boolean;
  isCompleted?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  icon: any; // ImageSourcePropType
  isPremium: boolean;
  lessons: Lesson[];
}

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Mind & Habits',
    description: 'Master your time and focus',
    level: 'Beginner',
    icon: require('../../assets/images/mind-habits-icon.jpg'),
    isPremium: false,
    lessons: [
      { id: 'c1-l1', title: 'Warm Up', type: 'brief', isPremium: false },
      { id: 'c1-l2', title: 'Procrastination Trap', type: 'interactive', isPremium: false },
      { id: 'c1-l3', title: 'Focus Builder', type: 'lesson', isPremium: false },
      { id: 'c1-l4', title: 'Time Matrix', type: 'quiz', isPremium: false },
      { id: 'c1-l5', title: 'Review', type: 'quiz', isPremium: false },
    ],
  },
  {
    id: 'c2',
    title: 'Emotional Balance',
    description: 'Find your inner peace',
    level: 'Intermediate',
    icon: require('../../assets/images/mr-clocktopus.jpg'),
    isPremium: true,
    lessons: [
      { id: 'c2-l1', title: 'Mindfulness Basics', type: 'lesson', isPremium: true },
      { id: 'c2-l2', title: 'Stress Management', type: 'interactive', isPremium: true },
      { id: 'c2-l3', title: 'Emotional Intelligence', type: 'quiz', isPremium: true },
    ],
  },
];
