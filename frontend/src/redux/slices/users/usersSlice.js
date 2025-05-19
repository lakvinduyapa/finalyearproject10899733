import {createAsyncThunk, createSlice, createAction, isRejectedWithValue} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//initial state
const initialState = {
    loadinng:false,
    error:null,
    users:[],
    user:{},
    profile:{},
    userAuth:{
        loading: false,
        error: null,
        userInfo:{},
    },
};

// login action
export const loginUserAction = createAsyncThunk(
    'users/login',
    async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
      try {
        const { data } = await axios.post(`${baseURL}/users/login`, {
          email,
          password,
        });
        //save user into local storage
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  

//users slice
const usersSlice = createSlice({
    name:"users",
    initialState,
    //extrareducers are used to handle async actions
    extraReducers: (builder)=>{
        //handle actions
        //login
        builder.addCase(loginUserAction.pending, (state,action) =>{
            state.userAuth.loading = true;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) =>{
            state.userAuth.userInfo = action.payload;
            state.userAuth.loading = false;
        });
        builder.addCase(loginUserAction.rejected, (state, action) =>{
            state.userAuth.error = action.payload;
            state.userAuth.loading = false;

    });
},
        
});

const usersReducer = usersSlice.reducer;
export default usersReducer;