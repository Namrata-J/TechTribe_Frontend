type experienceLevel = "0-3" | "3-5" | ">5";

type lookingFor = "Project Collaboration" | "Mentorship" | "Networking" | "Job Opportunities";

type gender = "male" | "female" | "others";

export type loggedInUser = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  location?: string;
  profession?: string;
  company?: string;
  expererienceLevel?: experienceLevel;
  skills?: string[];
  about?: string;
  lookingFor?: lookingFor;
  photoUrl?: string;
  gender?: gender;
};

export type userInitialState = {
  loggedInUser: loggedInUser | null;
  loading: boolean | false;
  error: string;
  status: number;
};
