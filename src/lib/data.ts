export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageId: string;
  questions: Question[];
};

export type UserQuizHistory = {
  quizId: string;
  quizTitle: string;
  score: number;
  date: string;
  category: string;
};

export const quizzes: Quiz[] = [
  {
    id: 'geography-1',
    title: 'World Capitals',
    description: 'Test your knowledge of world capitals.',
    category: 'Geography',
    imageId: 'geography',
    questions: [
      {
        question: 'What is the capital of Canada?',
        options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'],
        correctAnswer: 'Ottawa',
      },
      {
        question: 'What is the capital of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
        correctAnswer: 'Canberra',
      },
      {
        question: 'What is the capital of Japan?',
        options: ['Kyoto', 'Osaka', 'Hiroshima', 'Tokyo'],
        correctAnswer: 'Tokyo',
      },
      {
        question: 'What is the capital of Brazil?',
        options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'],
        correctAnswer: 'Brasília',
      },
      {
        question: 'What is the capital of Nigeria?',
        options: ['Lagos', 'Abuja', 'Kano', 'Ibadan'],
        correctAnswer: 'Abuja',
      },
      {
        question: 'What is the capital of South Korea?',
        options: ['Busan', 'Incheon', 'Seoul', 'Daegu'],
        correctAnswer: 'Seoul',
      },
      {
        question: 'What is the capital of Argentina?',
        options: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza'],
        correctAnswer: 'Buenos Aires',
      },
      {
        question: 'What is the capital of Egypt?',
        options: ['Alexandria', 'Giza', 'Cairo', 'Luxor'],
        correctAnswer: 'Cairo',
      },
      {
        question: 'What is the capital of New Zealand?',
        options: ['Auckland', 'Christchurch', 'Wellington', 'Hamilton'],
        correctAnswer: 'Wellington',
      },
      {
        question: 'What is the capital of Spain?',
        options: ['Barcelona', 'Seville', 'Madrid', 'Valencia'],
        correctAnswer: 'Madrid',
      },
    ],
  },
  {
    id: 'history-1',
    title: 'Ancient Civilizations',
    description: 'Explore the wonders of the ancient world.',
    category: 'History',
    imageId: 'history',
    questions: [
      {
        question: 'Which civilization built the pyramids?',
        options: ['Romans', 'Greeks', 'Egyptians', 'Mayans'],
        correctAnswer: 'Egyptians',
      },
      {
        question: 'Where did the Olympic Games originate?',
        options: ['Ancient Rome', 'Ancient Greece', 'Ancient Egypt', 'Persia'],
        correctAnswer: 'Ancient Greece',
      },
      {
        question: 'The Great Wall of China was primarily built to protect against whom?',
        options: ['The Mongols', 'The Japanese', 'The Russians', 'The Koreans'],
        correctAnswer: 'The Mongols',
      },
      {
        question: 'What was the primary language of the Roman Empire?',
        options: ['Greek', 'Italian', 'Latin', 'Romanian'],
        correctAnswer: 'Latin',
      },
      {
        question: 'Which ancient wonder was located in Alexandria, Egypt?',
        options: ['Hanging Gardens of Babylon', 'Lighthouse of Alexandria', 'Temple of Artemis', 'Colossus of Rhodes'],
        correctAnswer: 'Lighthouse of Alexandria',
      },
      {
        question: 'Who was the first emperor of Rome?',
        options: ['Julius Caesar', 'Augustus', 'Nero', 'Constantine'],
        correctAnswer: 'Augustus',
      },
      {
        question: 'Which civilization developed the concept of zero?',
        options: ['Ancient India', 'Ancient China', 'Ancient Greece', 'Mesopotamia'],
        correctAnswer: 'Ancient India',
      },
      {
        question: 'What is the name of the ancient writing system used in Mesopotamia?',
        options: ['Hieroglyphics', 'Cuneiform', 'Alphabet', 'Sanskrit'],
        correctAnswer: 'Cuneiform',
      },
      {
        question: 'The city of Pompeii was destroyed by the eruption of which volcano?',
        options: ['Mount Etna', 'Mount Fuji', 'Mount Vesuvius', 'Mount St. Helens'],
        correctAnswer: 'Mount Vesuvius',
      },
      {
        question: 'Which empire was ruled by Alexander the Great?',
        options: ['Roman Empire', 'Persian Empire', 'Macedonian Empire', 'Ottoman Empire'],
        correctAnswer: 'Macedonian Empire',
      },
    ],
  },
  {
    id: 'gk-1',
    title: 'General Knowledge Challenge',
    description: 'A mix of questions from various fields.',
    category: 'General Knowledge',
    imageId: 'general_knowledge',
    questions: [
      {
        question: 'What is the largest planet in our solar system?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 'Jupiter',
      },
      {
        question: 'How many continents are there?',
        options: ['5', '6', '7', '8'],
        correctAnswer: '7',
      },
      {
        question: 'Who wrote "Romeo and Juliet"?',
        options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
        correctAnswer: 'William Shakespeare',
      },
      {
        question: 'What is the chemical symbol for gold?',
        options: ['Ag', 'Go', 'Au', 'Gd'],
        correctAnswer: 'Au',
      },
      {
        question: 'Which is the longest river in the world?',
        options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
        correctAnswer: 'Nile',
      },
      {
        question: 'In which year did the Titanic sink?',
        options: ['1905', '1912', '1918', '1923'],
        correctAnswer: '1912',
      },
      {
        question: 'What is the hardest natural substance on Earth?',
        options: ['Gold', 'Iron', 'Diamond', 'Quartz'],
        correctAnswer: 'Diamond',
      },
      {
        question: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
        correctAnswer: 'Leonardo da Vinci',
      },
      {
        question: 'Which country is known as the Land of the Rising Sun?',
        options: ['China', 'South Korea', 'Japan', 'Thailand'],
        correctAnswer: 'Japan',
      },
      {
        question: 'What is the currency of the United Kingdom?',
        options: ['Euro', 'Dollar', 'Pound Sterling', 'Yen'],
        correctAnswer: 'Pound Sterling',
      },
    ],
  },
  {
    id: 'english-1',
    title: 'Vocabulary & Grammar',
    description: 'Sharpen your English language skills.',
    category: 'English',
    imageId: 'english',
    questions: [
      {
        question: 'Which word is a synonym for "happy"?',
        options: ['Sad', 'Joyful', 'Angry', 'Tired'],
        correctAnswer: 'Joyful',
      },
      {
        question: 'Choose the correct sentence: "They ____ going to the park."',
        options: ['is', 'are', 'am', 'be'],
        correctAnswer: 'are',
      },
      {
        question: 'What is the opposite of "brave"?',
        options: ['Heroic', 'Cowardly', 'Strong', 'Bold'],
        correctAnswer: 'Cowardly',
      },
      {
        question: 'Which of the following is a pronoun?',
        options: ['Run', 'Big', 'She', 'Quickly'],
        correctAnswer: 'She',
      },
      {
        question: 'A person who writes books is called an ____.',
        options: ['artist', 'author', 'actor', 'athlete'],
        correctAnswer: 'author',
      },
      {
        question: 'What is the past tense of "go"?',
        options: ['Goed', 'Gone', 'Went', 'Going'],
        correctAnswer: 'Went',
      },
      {
        question: 'Identify the adjective in the sentence: "The red car is fast."',
        options: ['car', 'fast', 'red', 'is'],
        correctAnswer: 'red',
      },
      {
        question: '"To be on cloud nine" means to be extremely ____.',
        options: ['Sad', 'Happy', 'Confused', 'Angry'],
        correctAnswer: 'Happy',
      },
      {
        question: 'Which sentence is grammatically correct?',
        options: ['Me and my friend went to the store.', 'My friend and I went to the store.', 'I and my friend went to the store.', 'The store was went to by me and my friend.'],
        correctAnswer: 'My friend and I went to the store.',
      },
      {
        question: 'An antonym for "ancient" is ____.',
        options: ['Old', 'Modern', 'Historic', 'Aged'],
        correctAnswer: 'Modern',
      },
    ],
  },
];

export const userQuizHistory: UserQuizHistory[] = [
  {
    quizId: 'geography-1',
    quizTitle: 'World Capitals',
    score: 80,
    date: '2024-05-20',
    category: 'Geography',
  },
  {
    quizId: 'history-1',
    quizTitle: 'Ancient Civilizations',
    score: 90,
    date: '2024-05-18',
    category: 'History',
  },
  {
    quizId: 'gk-1',
    quizTitle: 'General Knowledge Challenge',
    score: 70,
    date: '2024-05-15',
    category: 'General Knowledge',
  },
];
