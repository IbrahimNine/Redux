import {
  CHECK_AS_DONE,
  DELETE_TASK,
  EDIT_TASK,
  ADD_TASK,
  FILTER_TASKS,
  USER_LOGIN,
  USER_REGISTER,
  USER_LOGOUT,
  GET_USER_TASKS,
  FETCHING_DATA_REQUEST,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILED,
  CLEAN_ERRORS,
  END_APP_LOADING,
} from "../constants/actionsTypes";
import axios from "axios";
import { onQueue } from "../utility/axiosRequests";
const baseURL = process.env.REACT_APP_BASE_URL;

//______________________________________________________________________________________

//______________________________________________________________________________________

export const fetchingDataRequest = () => {
  return {
    type: FETCHING_DATA_REQUEST,
  };
};
export const fetchingDataSuccess = () => {
  return { type: FETCHING_DATA_SUCCESS };
};
export const fetchingDataFailed = (payload) => {
  return { type: FETCHING_DATA_FAILED, payload };
};

//______________________________________________________________________________________

export const checkAsDone = ({ taskId, description, isDone }, isLogged) => {
  return async (dispatch) => {
    dispatch({ type: CHECK_AS_DONE, payload: taskId });
    if (isLogged) {
      const checkAsDoneFunc = async () => {
        try {
          const response = await axios.post(
            `${baseURL}/api/user/edit_task`,
            { taskId, description, isDone: !isDone },
            { withCredentials: true }
          );
          if (response.data.status === "success") {
            dispatch(fetchingDataSuccess());
          } else if (response.data.status === "fail") {
            dispatch(fetchingDataFailed(response.data.data));
          }
        } catch (error) {
          console.log(error);
          dispatch(fetchingDataFailed(error.data));
        }
      };
      onQueue(() => checkAsDoneFunc(), dispatch);
    }
  };
};
export const deleteTask = (payload, isLogged) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_TASK, payload });
    if (isLogged) {
      const deleteTaskFunc = async () => {
        try {
          const response = await axios.delete(
            `${baseURL}/api/user/delete_task/${payload}`,
            { withCredentials: true }
          );
          if (response.data.status === "success") {
            dispatch(fetchingDataSuccess());
          } else if (response.data.status === "fail") {
            dispatch(fetchingDataFailed(response.data.data));
          }
        } catch (error) {
          console.log(error);
          dispatch(fetchingDataFailed(error.data));
        }
      };
      onQueue(() => deleteTaskFunc(), dispatch);
    }
  };
};
export const editTask = ({ taskId, desc, isDone }, isLogged) => {
  return async (dispatch) => {
    dispatch({
      type: EDIT_TASK,
      payload: {
        taskId,
        desc,
      },
    });
    if (isLogged) {
      const editTaskFunc = async () => {
        try {
          const response = await axios.post(
            `${baseURL}/api/user/edit_task`,
            { taskId, description: desc, isDone },
            { withCredentials: true }
          );
          if (response.data.status === "success") {
            dispatch(fetchingDataSuccess());
          } else if (response.data.status === "fail") {
            dispatch(fetchingDataFailed(response.data.data));
          }
        } catch (error) {
          console.log(error);
          dispatch(fetchingDataFailed(error.data));
        }
      };
      onQueue(() => editTaskFunc(), dispatch);
    }
  };
};

export const addTask = (payload, isLogged) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_TASK,
      payload,
    });
    if (isLogged) {
      const addTaskFunc = async () => {
        try {
          const response = await axios.post(
            `${baseURL}/api/user/new_task`,
            {
              taskId: payload.taskId,
              description: payload.desc,
              isdone: payload.isDone,
            },
            { withCredentials: true }
          );

          if (response.data.status === "success") {
            dispatch(fetchingDataSuccess());
          } else if (response.data.status === "fail") {
            dispatch(fetchingDataFailed(response.data.data));
          }
        } catch {
          (error) => console.log(error);
          dispatch(fetchingDataFailed(error.data));
        }
      };
      onQueue(() => addTaskFunc(), dispatch);
    }
  };
};
export const filterTasks = (payload) => {
  return {
    type: FILTER_TASKS,
    payload,
  };
};

//_________________________________________________________________________________

export const userLogin = (key, toggleTokenInput) => {
  return async (dispatch) => {
    dispatch(fetchingDataRequest());
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/login`,
        { key },
        { withCredentials: true }
      );

      if (response?.data?.status == "success") {
        dispatch(fetchingDataSuccess());
        dispatch({ type: USER_LOGIN, payload: response.data.data });
        toggleTokenInput();
      } else if (response?.data?.status == "fail") {
        dispatch(fetchingDataFailed(response.data.data));
      }
    } catch (error) {
      console.log(error);
      dispatch(
        fetchingDataFailed("Server Error, Please refresh and try again")
      );
    }
  };
};

//_________________________________________________________________________________

export const userRegister = () => {
  return async (dispatch) => {
    dispatch(fetchingDataRequest());
    try {
      const response = await axios.post(`${baseURL}/api/auth/register`, {
        withCredentials: true,
      });
      if (response?.data?.status == "success") {
        dispatch(fetchingDataSuccess());
        dispatch({ type: USER_REGISTER, payload: response.data.data });
      } else if (response?.data?.status == "fail") {
        dispatch(fetchingDataFailed(response.data.data));
      }
    } catch (error) {
      console.log(error);
      dispatch(
        fetchingDataFailed("Server Error, Please refresh and try again")
      );
    }
  };
};

//_________________________________________________________________________________

export const userLogout = () => {
  return async (dispatch) => {
    dispatch(fetchingDataRequest());
    try {
      const response = await axios.delete(`${baseURL}/api/auth/logout`, {
        withCredentials: true,
      });
      if (response) {
        dispatch(fetchingDataSuccess());
        dispatch({ type: USER_LOGOUT });
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchingDataFailed(error.data));
    }
  };
};

//_________________________________________________________________________________

export const getUserTasks = () => {
  return async (dispatch) => {
    dispatch(fetchingDataRequest());
    try {
      const response = await axios.get(`${baseURL}/api/user/tasks`, {
        withCredentials: true,
      });
      if (response) {
        dispatch(fetchingDataSuccess());
        dispatch({ type: GET_USER_TASKS, payload: response.data.data });
      }
    } catch (error) {
      dispatch(fetchingDataFailed(error.data));
      dispatch({ type: END_APP_LOADING });
    }
  };
};

export const cleanErrors = () => {
  return {
    type: CLEAN_ERRORS,
  };
};
