import {
  CHECK_AS_DONE,
  DELETE_TASK,
  EDIT_TASK,
  ADD_TASK,
  FILTER_TASKS,
  USER_LOGIN,
  FETCHING_DATA_REQUEST,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILED,
  USER_REGISTER,
  USER_LOGOUT,
  GET_USER_TASKS,
  CLEAN_ERRORS,
} from "../constants/actionsTypes";

const initialState = {
  Tasks: [],
  filterValue: "all",
  user: {},
  dataLoading: false,
  dataError: "",
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_AS_DONE:
      return {
        ...state,
        Tasks: state.Tasks.map((task) =>
          task.taskId === action.payload
            ? { ...task, isDone: !task.isDone }
            : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        Tasks: state.Tasks.filter((task) => task.taskId !== action.payload),
      };
    case EDIT_TASK:
      return {
        ...state,
        Tasks: state.Tasks.map((task) =>
          task.taskId === action.payload.taskId
            ? { ...task, description: action.payload.desc }
            : task
        ),
      };
    case ADD_TASK:
      return {
        ...state,
        Tasks: [
          ...state.Tasks,
          {
            taskId: action.payload.taskId,
            description: action.payload.desc,
            isDone: action.payload.isDone,
          },
        ],
      };
    case FILTER_TASKS:
      return {
        ...state,
        filterValue: action.payload,
      };
    case FETCHING_DATA_REQUEST:
      return {
        ...state,
        dataLoading: true,
      };
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        dataLoading: false,
        dataError: "",
      };
    case FETCHING_DATA_FAILED:
      return {
        ...state,
        dataLoading: false,
        dataError: action.payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        Tasks: action.payload.tasks,
        user: action.payload.user,
      };
    case USER_REGISTER:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        Tasks: [],
        user: {},
        dataLoading: false,
        dataError: "",
      };
    case GET_USER_TASKS:
      return {
        ...state,
        Tasks: action.payload.tasks,
        user: action.payload.user,
      };
    case CLEAN_ERRORS:
      return {
        ...state,
        dataError: "",
      };
    default:
      return state;
  }
};

export default tasksReducer;
