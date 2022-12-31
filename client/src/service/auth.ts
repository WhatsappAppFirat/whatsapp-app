import { API } from "src/api";
import { AxiosResponse } from 'axios';

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface VerifyBody {
  code: string;
  email: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const authActions = {
  login: async <T>(creds: LoginBody): Promise<AxiosResponse<T, any>> => await API.post("login", creds),
  register: async (user: RegisterBody) => await API.post("register", user),
  verify: async (verify: VerifyBody) => await API.post("verify", verify),
};
