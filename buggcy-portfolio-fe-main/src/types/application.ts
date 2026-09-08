export interface EducationEntry {
  id: string;
  degree: string;
  institute: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
}

export interface ExperienceEntry {
  id: string;
  companyName: string;
  jobTitle: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  currentPosition: boolean;
  responsibilities: string;
}

export interface TechnicalSkills {
  programmingLanguages: string[];
  frameworks: string[];
  databases: string[];
  cloudPlatforms: string[];
  toolsAndTechnologies: string[];
}

export interface ProfessionalLinks {
  linkedin: string;
  github: string;
  portfolio: string;
  otherLink: string;
}

export interface AdditionalQuestions {
  currentSalary: string;
  expectedSalary: string;
  noticePeriod: string;
  willingToRelocate: string;
  workAuthorizationStatus: string;
}

export interface JobApplicationFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;

  // Address Information
  country: string;
  state: string;
  city: string;
  postalCode: string;
  address: string;

  // Education
  education: EducationEntry[];

  // Experience
  experience: ExperienceEntry[];

  // Skills
  skills: TechnicalSkills;

  // Professional Links
  links: ProfessionalLinks;

  // Resume
  resume: File | null;

  // Cover Letter
  coverLetter: string;

  // Additional Questions
  additionalQuestions: AdditionalQuestions;

  // Declaration
  declaration: boolean;
}

export interface ApplicationSubmission {
  referenceNumber: string;
  applicantName: string;
  applicantEmail: string;
  appliedPosition: string;
  submittedAt: string;
}

export interface ApplicationErrors {
  [key: string]: string;
}

export const createEmptyEducation = (): EducationEntry => ({
  id: crypto.randomUUID(),
  degree: "",
  institute: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  grade: "",
});

export const createEmptyExperience = (): ExperienceEntry => ({
  id: crypto.randomUUID(),
  companyName: "",
  jobTitle: "",
  employmentType: "",
  startDate: "",
  endDate: "",
  currentPosition: false,
  responsibilities: "",
});

export const createInitialApplicationData = (): JobApplicationFormData => ({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",

  country: "",
  state: "",
  city: "",
  postalCode: "",
  address: "",

  education: [createEmptyEducation()],

  experience: [createEmptyExperience()],

  skills: {
    programmingLanguages: [],
    frameworks: [],
    databases: [],
    cloudPlatforms: [],
    toolsAndTechnologies: [],
  },

  links: {
    linkedin: "",
    github: "",
    portfolio: "",
    otherLink: "",
  },

  resume: null,

  coverLetter: "",

  additionalQuestions: {
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
    willingToRelocate: "",
    workAuthorizationStatus: "",
  },

  declaration: false,
});
