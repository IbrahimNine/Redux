import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanErrors, userLogin, userRegister } from "../JS/actions/actions";

function TokenInput({ toggleTokenInput }) {
  const dispatch = useDispatch();
  const [successRegister, setSuccessRegister] = useState(false);
  const userSecretKey = useSelector((state) => state.user.userKey);
  const isLoading = useSelector((state) => state.dataLoading);
  const Error = useSelector((state) => state.dataError);

  const handleCloseBtn = () => {
    if (!isLoading) {
      toggleTokenInput();
      dispatch(cleanErrors());
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!isLoading) {
      const userKey = document.getElementById("TokenInputText").value;
      dispatch(userLogin(userKey, toggleTokenInput));
    }
  };

  const handleRegister = () => {
    if (!successRegister) {
      dispatch(userRegister());
      setSuccessRegister(true);
    }
  };

  useEffect(() => {
    if (userSecretKey) {
      document.getElementById("TokenInputText").value = userSecretKey;
      document.getElementById("UserNote").textContent =
        "Please copy and paste the following key elsewhere before connecting for later restorations";
    }
    if (Error) {
      document.getElementById("UserNote").textContent = Error;
    }
  }, [userSecretKey, Error]);

  return (
    <div className="TokenInputContainer">
      <abbr title="Close" id="TokenInputCloseBtn" onClick={handleCloseBtn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 32 32"
          color="white"
        >
          <path
            fill="currentColor"
            d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12"
          ></path>
          <path
            fill="currentColor"
            d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
          ></path>
        </svg>
      </abbr>
      <form className="TokenInput" onSubmit={handleLogin}>
        <fieldset>
          <legend>Remember me:</legend>
          <p id="UserNote"></p>
          {isLoading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              color="rgba(46, 129, 223, 0.664)"
              className="UserAuthSpin"
            >
              <circle cx="18" cy="12" r="0" fill="currentColor">
                <animate
                  attributeName="r"
                  begin=".67"
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle cx="12" cy="12" r="0" fill="currentColor">
                <animate
                  attributeName="r"
                  begin=".33"
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle cx="6" cy="12" r="0" fill="currentColor">
                <animate
                  attributeName="r"
                  begin="0"
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
            </svg>
          )}

          <input
            type="text"
            name=""
            id="TokenInputText"
            placeholder="Secret key..."
            readOnly={userSecretKey && true}
            autoFocus
            required
          />
          <div className="TokenInputBtns">
            <button
              type="button"
              onClick={handleRegister}
              className={successRegister || isLoading ? "blockedBtn" : ""}
            >
              {successRegister && userSecretKey
                ? "Successful register"
                : "I'm new here"}
            </button>
            <button type="submit" className={isLoading ? "blockedBtn" : ""}>
              Connect
              {/* {successRegister ? "Connected" : "Connect"} */}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default TokenInput;
