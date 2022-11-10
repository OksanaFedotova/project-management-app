type TAuthState = {
  user: IUser | null;
  token: ISigninResponse | null;
  isSignInPage: boolean | null;
};

interface IUser {
  id: string;
  name: string;
  login: string;
}

interface ISigninResponse {
  token: string;
}

type TSigninRequest = Omit<ISignupRequest, 'name'>;

interface ISignupRequest {
  name?: string;
  login: string;
  password: string;
}

export { TAuthState, IUser, TSigninRequest, ISigninResponse, ISignupRequest };
