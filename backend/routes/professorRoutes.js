import express from 'express';
import { 
  createCourse, 
  getTARequests, 
  updateTARequestStatus, 
  getTAScheduleRoster, 
  getCoursesByProfessor, 
  addStudentToCourse ,
  getProfessorByUid,
} from '../controllers/professorController.js';

const router = express.Router();

router.post('/create-course', createCourse);
router.get('/ta-requests', getTARequests);
router.patch('/ta-request/:id', updateTARequestStatus);
router.get('/ta-schedule', getTAScheduleRoster);
router.get('/courses', getCoursesByProfessor);        // ✅ fetch professor's courses
router.post('/add-student', addStudentToCourse); 
router.get('/get-professor', getProfessorByUid);     // ✅ add student to course

export default router;
