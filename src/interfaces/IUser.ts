type AuthState = {
  user: User | null;
  token: string | null;
};

interface User {
  id: string;
  name: string;
  login: string;
}

interface SigninResponse {
  token: string;
}

type SigninRequest = Omit<SignupRequest, 'name'>;

interface SignupRequest {
  name: string;
  login: string;
  password: string;
}

export { AuthState, User, SigninRequest, SigninResponse, SignupRequest };
