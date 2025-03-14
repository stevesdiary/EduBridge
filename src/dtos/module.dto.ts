// import { IsString, IsUUID, IsOptional, IsDate } from 'class-validator';

export class CreateModuleDto {
  id?: string;
  course_id!: string;
  title?: string;
  description!: string;

  date_added?: Date;
}

export class UpdateModuleDto {
  course_id?: string;
  title?: string;
  description?: string;
  date_added?: Date;
}
