export interface CreateCourseDto {
  title: string;
  description?: string;
  price?: number;
  status?: 'draft' | 'published' | 'archived';
  thumbnailUrl?: string;
  instructorId?: string;
}

export interface UpdateCourseDto {
  title?: string;
  description?: string;
  duration?: string;
  status?: 'draft' | 'published' | 'archived';
  thumbnailUrl?: string;
  instructorId?: string;
}
