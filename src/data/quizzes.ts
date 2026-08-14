export type QuestionType = 'choice' | 'matrix' | 'ordering';

export interface QuizOption {
  id: string;
  title: string;
  description?: string;
  image?: any;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  courseId: string;
  lessonId: string;
  question: string;
  subtitle?: string;
  type: QuestionType;
  options: QuizOption[];
}

export const quizzes: QuizQuestion[] = [
  {
    id: 'q1',
    courseId: 'c1',
    lessonId: 'c1-l4',
    question: 'Which task will help Mr. Clocktopus the most?',
    subtitle: 'Choose wisely',
    type: 'choice',
    options: [
      {
        id: 'opt1',
        title: 'INTO THE REELS HOLE',
        description: 'Only take 5 minutes.',
        image: require('../../assets/images/reels-hole.jpg'),
        isCorrect: false,
        explanation: 'Social media can be a huge time sink.',
      },
      {
        id: 'opt2',
        title: 'HOMEWORK DEADLINE',
        description: "He promised he'd send it today.",
        image: require('../../assets/images/homework-deadline.jpg'),
        isCorrect: true,
        explanation: 'Prioritizing important deadlines reduces stress.',
      },
    ],
  },
  {
    id: 'q2',
    courseId: 'c1',
    lessonId: 'c1-l4',
    question: 'Categorize these tasks based on the Eisenhower Matrix.',
    type: 'matrix',
    options: [
      {
        id: 'opt3',
        title: 'Urgent & Important',
        isCorrect: true,
        explanation: 'Do these immediately.',
      },
      {
        id: 'opt4',
        title: 'Not Urgent & Not Important',
        isCorrect: false,
        explanation: 'Eliminate these tasks.',
      },
    ],
  },
  {
    id: 'q3',
    courseId: 'c1',
    lessonId: 'c1-l5',
    question: 'Order the steps to build a focus habit.',
    type: 'ordering',
    options: [
      {
        id: 'opt5',
        title: 'Set a clear goal',
        isCorrect: true,
        explanation: 'First step.',
      },
      {
        id: 'opt6',
        title: 'Remove distractions',
        isCorrect: true,
        explanation: 'Second step.',
      },
    ],
  },
];
