import express from 'express';
import {
  getQuestions,
  getStudents,
  getStudentAnswers,
  saveStudentAnswer
} from '../controllers/assessment.controller.js';

const router = express.Router();

// Question Routes
router.get('/questions', getQuestions);

// Student Routes
router.get('/students', getStudents);
router.get('/students/:id/answers', getStudentAnswers);
router.post('/students/:id/answers', saveStudentAnswer);

export default router;