type TAuthState = {
  user: IUser | null;
  token: ISigninResponse | null;
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

type TUpdateUser = {
  id: string | null;
  user: ISignupRequest;
};

type ErrorAuth = {
  status: number;
  data: {
    message: string;
    statusCode: number;
  };
};

export {
  ErrorAuth,
  TAuthState,
  IUser,
  TSigninRequest,
  ISigninResponse,
  ISignupRequest,
  TUpdateUser,
};
