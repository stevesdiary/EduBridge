import { Optional } from 'sequelize';

export interface ModuleAttributes {
  title: string;
  description: string;
  courseId: string;
  resourceUrl?: string;
  dateAdded?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ModuleCreationDto {
  title: string;
  description: string;
  course_id: string;
  date_added?: Date; 
  resource_url?: string;
}

export type ModuleCreationAttributes = Optional<ModuleAttributes, 'resourceUrl'>;