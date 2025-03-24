import { EnrollmentResponse } from '../types/enrollment.type';
import { ApiResponse } from '../types/type';
import { CreateEnrollmentDto, UpdateEnrollmentDto } from '../dtos/enrollment.dto';
import { Course } from '../models/course.model';
import { User } from '../models/user.model';
import { Enrollment } from '../models/enrollment.model';
import sendEmail from './email.service';

class EnrollmentService {
  deleteEnrollment: any;
  async createEnrollment(enrollmentData: CreateEnrollmentDto) {
    try {
      const checkEnrollment = await Enrollment.findOne({
        where: {
          course_id: enrollmentData.courseId,
          user_id: enrollmentData.userId
        }
      });

      if (checkEnrollment !== null) {
        return {
          statusCode: 400,
          status: 'fail',
          message: 'User already enrolled in this course',
          data: null
        };
      }
      const getCourse =  await Course.findOne({
        where: { id: enrollmentData.courseId }, 
        attributes: ['title']
      })
      console.log(getCourse?.title);
      const result = await Enrollment.create({
        courseId: enrollmentData.courseId,
        userId: enrollmentData.userId,
        status: enrollmentData.status || 'ENROLLED',
        enrollmentDate: new Date()
      });
      if (result) {
        await sendEmail({
          to: enrollmentData.userEmail,
          subject: 'Successful Course Enrollment',
          text: `We are happy to inform you that you have successfully enrolled in ${getCourse?.title} course. 
            We are your success partners and we'll cheer you to success. Happy Learning!`
        });
      }
      
      return {
        statusCode: 201,
        status: 'success',
        message: `You have  successfully enrolled for ${getCourse?.title} course`,
        data: result.toJSON() as EnrollmentResponse
      };
    } catch (error) {
      throw error;
    }
  }

  async updateEnrollment(id: string, enrollmentData: UpdateEnrollmentDto) {
    try {
      const updateEnrolment = await Enrollment.update(enrollmentData, {
        where: { id }
      });
      if(updateEnrolment[0] === 0 || !updateEnrolment) {
        return {
          statusCode: 404,
          status: 'fail',
          message: 'Enrollment not found',
          data: null
        };
      }
      return { statusCode: 200, 
        status: 'success', 
        message: 'Enrollment updated successfully', 
        data: updateEnrolment 
      };
    } catch (error) {
      throw error;
    }
  }

  async findAllEnrollments(
    page: number, 
    limit: number, 
    status?: string
  ): Promise<ApiResponse<EnrollmentResponse[]>> {
    try {
      const offset = (page - 1) * limit;
      const { rows, count } = await Enrollment.findAndCountAll({
        where: status ? { status } : {},
        limit,
        offset,
        include: [
          {
            model: User,
            attributes: ['id', 'first_name', 'last_name', 'email']
          },
          {
            model: Course,
            attributes: ['id', 'title', 'description', 'category']
          }
        ]
      });

      
  
      return {
        statusCode: 200,
        status: 'success',
        message: 'Enrollments retrieved successfully',
        data: rows.map(enrollment => enrollment.toJSON() as EnrollmentResponse),
      };
    } catch (error) {
      throw error;
    }
  }

  async findOneEnrollment(id: string): Promise<ApiResponse<EnrollmentResponse>> {
    try {
      const enrollment = await Enrollment.findByPk(id,
        {
        include: [
          {
            model: User,
            attributes: ['id', 'first_name', 'last_name', 'email']
          },
          {
            model: Course,
            attributes: ['id', 'title', 'description', 'category']
          }
        ]
      }
      );

      if (!enrollment) {
        return {
          statusCode: 404,
          status: 'error',
          message: 'Enrollment not found',
          data: null
        };
      }

      return {
        statusCode: 200,
        status: 'success',
        message: 'Enrollment retrieved successfully',
        data: enrollment.toJSON() as EnrollmentResponse
      };
    } catch (error) {
      throw error;
    }
  }
}

export const enrollmentService = new EnrollmentService();