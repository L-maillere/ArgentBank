import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { changeUsername } from "./changeusername";

const initialState = {
    isLoggedIn: false,
    token: null,
    userInfo: null,
    error: null,
    changeUsernameStatus: null,
};

export const login = createAsyncThunk(
    'authentification/login',
    async ({ email, password }, { dispatch, getState, rejectWithValue}) => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.status === 200) {
                return data.body
            } else {
                return rejectWithValue(data.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    'authentification/fetchUserProfile',
    async (_, { dispatch, getState, rejectWithValue }) => {
        const token = getState().authentification.token;

        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.status === 401) {
                dispatch(logout());
                return rejectWithValue("Session expired. Please login again.");
            }
            else if (response.status === 200) {
                return data.body;
            } 
            else {
                return rejectWithValue(data.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginFromLocalStorage = () => (dispatch) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        dispatch({ type: 'authentification/setTokenFromLocalStorage', payload: token });
        dispatch(fetchUserProfile());
    }
};

const authentificationSlice = createSlice({
    name: "authentification",
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
            state.error = null;
            localStorage.removeItem('authToken');
        },
        setTokenFromLocalStorage: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.error = null;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(changeUsername.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.changeUsernameStatus = 'success';
                state.error = null;
            })
            .addCase(changeUsername.rejected, (state, action) => {
                state.changeUsernameStatus = 'failed';
                state.error = action.payload;
            });
    }
});

export default authentificationSlice.reducer;
export const { logout } = authentificationSlice.actions;