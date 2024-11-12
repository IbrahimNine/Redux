import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AddTask from "./components/AddTask";
import ListTask from "./components/ListTask";
import Filter from "./components/Filter";
import Logo from "./components/Logo";
import UserBtns from "./components/UserBtns";
import TokenInput from "./components/TokenInput";
import { getUserTasks } from "./JS/actions/actions";
import { clearQueue } from "./JS/utility/axiosRequests";
import { Player } from "@lottiefiles/react-lottie-player";

function App() {
  const listTaskRef = useRef(null);
  const dispatch = useDispatch();
  const [showTokenInput, setShowTokenInput] = useState(false);
  const appLoading = useSelector((state) => state.appLoading);
  const toggleTokenInput = () => {
    setShowTokenInput(!showTokenInput);
  };

  useEffect(() => {
    dispatch(getUserTasks());

    return () => clearQueue();
  }, []);

  return (
    <div className="App">
      {appLoading ? (
        <Player src="AppLoadingAnimation.json" loop={true} autoplay={true} style={{width: "50vh"}} />
      ) : (
        <>
          <UserBtns toggleTokenInput={toggleTokenInput} />
          <Logo />
          <div className="MainContainer">
            <AddTask listTaskRef={listTaskRef} />
            <Filter />
            <ListTask listTaskRef={listTaskRef} />
          </div>
          {showTokenInput && <TokenInput toggleTokenInput={toggleTokenInput} />}
        </>
      )}
    </div>
  );
}

export default App;
