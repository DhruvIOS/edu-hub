import Course from '../models/Course.js';
import TARequest from '../models/TARequest.js';
import mongoose from 'mongoose'


// Function to create a course
export const createCourse = async (req, res) => {
    try {
        const { name, professorId } = req.body;

        // No need to convert to ObjectId — it's a string now
        const newCourse = new Course({
            name,
            professor: professorId,
        });
        await newCourse.save();

        res.status(201).json({ message: 'Course created successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create course' });
    }
};

export const getCoursesByProfessor = async (req, res) => {
    const { professorId } = req.query;
    try {
        if (!professorId) return res.status(400).json({ message: "Missing professorId" });

        const courses = await Course.find({ professor: professorId });
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch courses" });
    }
};


export const addStudentToCourse = async (req, res) => {
    const { courseId, studentEmail } = req.body;
    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        // Avoid duplicates
        if (course.students.includes(studentEmail)) {
            return res.status(400).json({ message: "Student already added to this course" });
        }

        course.students.push(studentEmail);
        await course.save();

        res.status(200).json({ message: "Student added successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to add student" });
    }
};
export const getTARequests = async (req, res) => {
    try {
        const requests = await TARequest.find({ status: 'pending' }).populate('course');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTARequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const request = await TARequest.findById(id);
        request.status = status;
        await request.save();

        if (status === 'approved') {
            const course = await Course.findById(request.course);
            course.TAs.push(request._id);
            await course.save();
        }

        res.json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add this function to get professor by UID
export const getProfessorByUid = async (req, res) => {
    const { uid } = req.query;  // Get the `uid` from the query string

    try {
        const professor = await Professor.findOne({ uid });  // Search for the professor by their UID
        if (!professor) {
            return res.status(404).json({ message: "Professor not found" });
        }

        res.status(200).json(professor);  // Return the professor object as a response
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch professor" });
    }
};

export const getTAScheduleRoster = async (req, res) => {
    try {
        const roster = await TARequest.find({ status: 'approved' }).populate('course');
        res.json(roster);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
