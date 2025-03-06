import { createSlice } from "@reduxjs/toolkit";


const initialState = {                                 // initialize the initial state with null value and if localStorage contain token value then we store that in token; let pichla bar website
  signupData: null,
  rollnumber:localStorage.getItem("rollnumber")?JSON.parse(localStorage.getItem("rollnumber")):null,
  grade:localStorage.getItem("grade") ? JSON.parse(localStorage.getItem("grade")):null,                                  // open kiye the tab darkmode kiye huye the and if we open again then it display darkmode if mode is include in token
  userId:null,
  loading: false,                                      //localStorage is similar to sessionStorage, except that while localStorage data has no expiration time, sessionStorage data gets cleared when the page session ends — that is, when the page is closed.
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) :null,
};


const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {                                                  // using reducers we can set the value of initial State;
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setRollNumber(state,value){
      state.rollnumber=value.payload;
    },
    setGrade(state,value){
      state.grade=value.payload;
    },
    setUserId(state,value){
      state.userId=value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken ,setUserId,setGrade, setRollNumber} = authSlice.actions;

export default authSlice.reducer;