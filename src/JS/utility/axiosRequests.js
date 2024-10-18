import axios from "axios";
import {
  fetchingDataFailed,
  fetchingDataRequest,
  fetchingDataSuccess,
} from "../actions/actions";

let reqQueue = [];
let timeoutId = null;
let timeoutLoading = null;

// const sendQueue = (dispatch) => {
//   if (queue.length > 0) {
//     console.log("request being sent!", ...queue);
//     dispatch(fetchingDataRequest());
//     axios
//       .all(queue.map((request) => request))
//       .then((response) => {
//         queue = [];
//         console.log(response);
//         dispatch(fetchingDataSuccess());
//         timeoutId = null;
//       })
//       .catch((error) => {
//         console.error(error);
//         dispatch(fetchingDataFailed(error.data));
//       });
//   }
// };
// export const addRequest = (request, dispatch) => {
//   queue.push(request);
//   if (timeoutId === null) {
//     timeoutId = setTimeout(() => sendQueue(dispatch), 20000); // Send requests every 20 seconds
//   }
// };

export const onQueue = (func, dispatch) => {
  reqQueue.push(func);
  if (reqQueue.length === 1) {
    timeoutLoading = setTimeout(() => dispatch(fetchingDataRequest()), 7000);
    timeoutId = setTimeout(() => {
      reqQueue.forEach((f) => f());
      reqQueue.length = 0;
    }, 10000);
  }
};

export const sendQueueImmediately = (dispatch) => {
  if (reqQueue.length > 0) {
    clearTimeout(timeoutLoading);
    timeoutLoading = null;
    dispatch(fetchingDataRequest());
    reqQueue.forEach((f) => f());
    reqQueue.length = 0;
    clearTimeout(timeoutId);
    timeoutId = null;
  }
};

export const clearQueue = () => {
  reqQueue = [];
  clearTimeout(timeoutLoading);
  timeoutLoading = null;
  clearTimeout(timeoutId);
  timeoutId = null;
};
