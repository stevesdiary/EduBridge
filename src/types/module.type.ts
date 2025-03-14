import { Optional } from 'sequelize';

export interface ModuleAttributes {
  id: string;
  title: string;
  description: string;
  date_added: Date;
  courseId: string;
}

export interface ModuleCreationDto {
  title: string;
  description: string;
  courseId: string;
  date_added?: Date;  // Optional since we can set default
}

export type ModuleCreationAttributes = Optional<ModuleAttributes, 'id' | 'date_added'>;