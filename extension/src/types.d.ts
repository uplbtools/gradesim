export type WrappedData = {
  bestSemeseter: SemesterStats | null,
  distinctGrades: Set<string>;
  fails: number;
  gradeDistribution: Object;
  gwa: number;
  highestGradeCourse: GradeCourseHighlight | null,
  lowestGradecourse: GradeCourseHighlight | null,
  mostRetakedCourse: GradeCourseHighlight | null,
  needsWorkSemester: SemesterStats | null
  retakes: Object,
  specialGrades: string[],
  semesterGWAs: {
    // key is a long string, not term id
    [key:string]: {
      gwa: number,
      units: number
    }
  },
  totalUnits: number;
  totalCourses: number,
}

export type SemesterStats = {
  name: string,
  gwa: number,
  units: number
}

export type GradeCourseHighlight = {
  code: string,
  title: string,
  grade: number
}

export type CourseData = {
  id: unknown,
  courseCode: string,
  courseTitle: string,
  units: number,
  grade: unknown,
  section: string,
  termId: unknown,
  term: string,
  semester: string,
  academicYear: string,
  status: string
}
