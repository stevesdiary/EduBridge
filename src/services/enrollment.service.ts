import { EnrollmentResponse } from '../types/enrollment.type';
import { ApiResponse } from '../types/type';
import { CreateEnrollmentDto, UpdateEnrollmentDto } from '../dtos/enrollment.dto';
import { Course } from '../models/course.model';
import { User } from '../models/user.model';
import { Enrollment } from '../models/enrollment.model';

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

      if (checkEnrollment) {
        return {
          statusCode: 400,
          status: 'fail',
          message: 'User already enrolled in this course',
          data: null
        };
      }
      const result = await Enrollment.create({
        course_id: enrollmentData.courseId,
        user_id: enrollmentData.userId,
        status: enrollmentData.status || 'ENROLLED'
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateEnrollment(id: string, enrollmentData: UpdateEnrollmentDto) {
    try {
      // Implementation for updating enrollment
      // You'll need to add your database logic here
      return { id, ...enrollmentData };
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
            attributes: ['id', 'name', 'email']
          },
          {
            model: Course,
            attributes: ['id', 'title', 'description']
          }
        ]
      });

      
  
      return {
        statusCode: 200,
        status: 'success',
        message: 'Enrollments retrieved successfully',
        data: rows.map(enrollment => enrollment.toJSON() as EnrollmentResponse)
      };
    } catch (error) {
      throw error;
    }
  }

  async findOneEnrollment(id: string): Promise<ApiResponse<EnrollmentResponse>> {
    try {
      const enrollment = await Enrollment.findByPk(id,
      //   {
      //   include: [
      //     {
      //       model: 'course',
      //       attributes: ['id', 'title', 'description']
      //     },
      //     {
      //       model: 'user',
      //       attributes: ['id', 'name', 'email']
      //     }
      //   ]
      // }
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