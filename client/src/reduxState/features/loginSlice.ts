import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios/axiosMain";
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
  error?: Error;
}

interface InitState {
  loading: boolean;
  error: null | Error;
  id: string | null;
  token: string | null;
  success: boolean;
  isAuth: boolean;
}

const initialState: InitState = {
  loading: false,
  error: null,
  id: null,
  token: null,
  success: false,
  isAuth: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
      state.id = null;
      state.token = null;
      state.success = false;
      state.isAuth = false;
    },
    loginSuccess: (state, action: PayloadAction<Action>) => {
      state.loading = false;
      state.error = null;
      state.id = action.payload.id as string;
      state.token = action.payload.token as string;
      state.success = true;
      state.isAuth = true;
    },
    loginFail: (state, action: PayloadAction<Action>) => {
      state.loading = false;
      state.error = action.payload.error as Error;
      state.id = null;
      state.token = null;
      state.success = false;
      state.isAuth = false;
    },
    logout: (state) => {
      localStorage.clear();
      state.loading = false;
      state.error = null;
      state.id = null;
      state.token = null;
      state.success = false;
      state.isAuth = false;
    },
  },
});

export const { login, loginSuccess, loginFail, logout } = loginSlice.actions;

export const loginUser = (data: LoginData): AppThunk => (dispatch) => {
  dispatch(login());
  axios
    .post("/login", data)
    .then((res) => {
      const ob = { id: res.data._id, token: res.data.token };
      dispatch(loginSuccess(ob));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.id);
    })
    .catch((error) => {
      dispatch(loginFail(error));
    });
};

export const authUser = (): AppThunk => (dispatch) => {
  const token = localStorage.getItem("token");
  axios
    .get("/users/me", { headers: { "x-auth-token": `${token}` } })
    .then((res) => {
      const data = { id: res.data._id, token: token };
      dispatch(loginSuccess(data));
    })
    .catch((error) => {
      dispatch(logout());
    });
};

export const selectLoading = (state: RootState) => state.login.loading;
export const selectError = (state: RootState) => state.login.error;
export const selectSuccess = (state: RootState) => state.login.success;
export const selectId = (state: RootState) => state.login.id;
export const selectToken = (state: RootState) => state.login.token;
export const selectIsAuth = (state: RootState) => state.login.isAuth;

export default loginSlice.reducer;
