import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios/axiosMain";
import { AppThunk, RootState } from "./store";

interface LoginData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface Action {
  type?: string;
  id?: string;
  token?: string | null;
  error?: any;
  data?: Date;
}

interface InitState {
  loading: boolean;
  error: any;
  token: string | null | undefined;
  success: boolean;
  isAuth: boolean;
  userInformation: any;
}

const initialState: InitState = {
  loading: false,
  error: null,
  token: null,
  success: false,
  isAuth: false,
  userInformation: {}
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
      state.success = false;
      state.isAuth = false;
      state.userInformation = null;
      state.token = null;
    },
    loginSuccess: (state, action: PayloadAction<Action>) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload.token;
      state.userInformation = action.payload.data;
      state.success = true;
      state.isAuth = true;
    },
    loginFail: (state, action: PayloadAction<Action>) => {
      state.loading = false;
      state.error = action.payload as any;
      state.success = false;
      state.isAuth = false;
      state.userInformation = null;
      state.token = null;
    },
    logout: (state) => {
      localStorage.clear();
      state.loading = false;
      state.error = null;
      state.success = false;
      state.isAuth = false;
      state.userInformation = null;
      state.token = null;
    },
  },
});

export const { login, loginSuccess, loginFail, logout } = loginSlice.actions;

export const loginUser = (data: LoginData): AppThunk => async (dispatch) => {
  dispatch(login());
  await axios
    .post("/login", data)
    .then((res) => {
      const data = {
        data: res.data,
        token: res.data.token
      }
      dispatch(loginSuccess(data));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.id);
    })
    .catch((error) => {
      dispatch(loginFail(error));
    });
};

export const authUser = (): AppThunk => async (dispatch) => {
  const token = localStorage.getItem("token");
  await axios
    .get("/users/me", { headers: { "x-auth-token": `${token}` } })
    .then((res) => {
      const data = {
        data: res.data,
        token: token
      }
      dispatch(loginSuccess(data));
    })
    .catch((error) => {
      dispatch(logout());
    });
};

export const selectLoading = (state: RootState) => state.login.loading;
export const selectError = (state: RootState) => state.login.error;
export const selectSuccess = (state: RootState) => state.login.success;
export const selectToken = (state: RootState) => state.login.token;
export const selectTeamInformation = (state:RootState)=>state.login.userInformation;
export const selectIsAuth = (state: RootState) => state.login.isAuth;

export default loginSlice.reducer;
