import { Chapter } from '../types/lesson';
import { lessonsData } from './lessons';

export const chapterData: Chapter = {
  id: 'solutions-chapter',
  name: 'Solutions',
  chapterNumber: 1,
  subject: 'Chemistry',
  class: 'Class 12 CBSE',
  description: 'Master binary liquid solutions, concentration units, solubility, Henry\'s law, Raoult\'s law, ideal vs non-ideal solutions, azeotropes, the four colligative properties, abnormal molar masses, and the van\'t Hoff factor.',
  estimatedTime: 210, // ~3.5 hours
  lessons: lessonsData
};
