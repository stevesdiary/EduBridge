// import { IsString, IsUUID, IsOptional, IsDate } from 'class-validator';
import { Optional } from 'sequelize';

export class CreateModuleDto {
  courseId!: string;
  title!: string;
  description!: string;
  resourceUrl?: string;
  duration?: string;
  date_added?: Date;
}

export class UpdateModuleDto {
  courseId?: string;
  title?: string;
  description?: string;
  date_added?: Date;
}

export interface ModuleAttributes {
  id: string;
  title: string;
  description: string;
  courseId: string;
  dateAdded: Date;
  resourceUrl?: string;
  duration?: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface ModuleResponse extends ModuleAttributes {
  course?: {
    id: string;
    title: string;
  };
  lessons?: {
    id: string;
    title: string;
  }[];
}

export type ModuleCreationAttributes = Optional<ModuleAttributes, 'id' | 'dateAdded'>;