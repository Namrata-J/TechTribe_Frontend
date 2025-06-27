type experienceLevel = "0-3" | "3-5" | ">5";

type lookingFor = "Project Collaboration" | "Mentorship" | "Networking" | "Job Opportunities";

type gender = "male" | "female" | "others";

export type loggedInUser = {
  _id?: string;
  firstName: string;
  lastName?: string;
  email?: string;
  password?: string;
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

export type request = {
  _id: string,
  toUserId: string,
  fromUserId: loggedInUser
}

export type userInitialState = {
  loggedInUser: loggedInUser | null;
  loading: boolean | false;
  error: string;
  status?: number;
  feed: loggedInUser[];
  feedLoading: boolean | false;
  feedError: string;
  feedStatus?: number;
  connections: loggedInUser[],
  connectionsLoading: boolean | false,
  connectionsError: string,
  connectionsStatus?: number,
  requests: request[],
  requestsLoading: boolean | false,
  requestsError: string,
  requestsStatus?: number,
};

export type UserErrorPayload = {
  error?: string,
  status?: number
}