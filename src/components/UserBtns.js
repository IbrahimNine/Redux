import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../JS/actions/actions";
import { sendQueueImmediately } from "../JS/utility/axiosRequests";

function UserBtns({ toggleTokenInput }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.dataLoading);
  const Error = useSelector((state) => state.dataError);

  return (
    <div className="UserBtns">
      {!user?._id ? (
        <abbr title="Clouds connect">
          <button className="UserBtn" onClick={toggleTokenInput}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.7em"
              height="1.7em"
              viewBox="0 0 48 48"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M33.274 19.544H43.5v17.275H33.274zm8.725-8.364H9.579v25.64m-5.079 0h21.912"
              ></path>
            </svg>
          </button>
        </abbr>
      ) : (
        <>
          <abbr title={isLoading ? "Saving" : "Save"}>
            <button className="UserBtn" onClick={() => {if(!isLoading) sendQueueImmediately(dispatch)}}>
              {isLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.7em"
                  height="1.7em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={16}
                    strokeDashoffset={16}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3c4.97 0 9 4.03 9 9"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.2s"
                      values="16;0"
                    ></animate>
                    <animateTransform
                      attributeName="transform"
                      dur="1.5s"
                      repeatCount="indefinite"
                      type="rotate"
                      values="0 12 12;360 12 12"
                    ></animateTransform>
                  </path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.7em"
                  height="1.7em"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 22c-9 1-8-10 0-9C6 2 23 2 22 10c10-3 10 13 1 12m-12-4l5-4l5 4m-5-4v15"
                  ></path>
                </svg>
              )}
            </button>
          </abbr>
          <abbr title="Sign-out">
            <button
              className="UserBtn"
              onClick={() => {
                !isLoading && dispatch(userLogout());
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.7em"
                height="1.7em"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M10.24 0c3.145 0 6.057 1.395 7.988 3.744a.644.644 0 0 1-.103.92a.68.68 0 0 1-.942-.1a8.96 8.96 0 0 0-6.944-3.256c-4.915 0-8.9 3.892-8.9 8.692s3.985 8.692 8.9 8.692a8.96 8.96 0 0 0 7.016-3.343a.68.68 0 0 1 .94-.113a.644.644 0 0 1 .115.918C16.382 18.564 13.431 20 10.24 20C4.583 20 0 15.523 0 10S4.584 0 10.24 0m6.858 7.16l2.706 2.707c.262.261.267.68.012.936l-2.644 2.643a.66.66 0 0 1-.936-.01a.66.66 0 0 1-.011-.937l1.547-1.547H7.462a.66.66 0 0 1-.67-.654c0-.362.3-.655.67-.655h10.269l-1.558-1.558a.66.66 0 0 1-.011-.936a.66.66 0 0 1 .936.011"
                ></path>
              </svg>
            </button>
          </abbr>
        </>
      )}
    </div>
  );
}

export default UserBtns;
