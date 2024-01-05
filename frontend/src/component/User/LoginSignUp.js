import "./LoginSignUp.css";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";

function LoginSignUp() {
  const location = useLocation();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const switcherTab = useRef(null);
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const fileBtn = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/profilePic.png");

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = {
      name,
      email,password,avatar
    }; // *******************************************************



    
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader(); //**************************************************************************************** */
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
          console.log(e.target.files[0]);
          console.log(reader.result);
        }
      };
      try {
        reader.readAsDataURL(e.target.files[0]);
      } catch (error) {
        console.log("Error Occurs");
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const openImageSelector = () => {
    fileBtn.current.click();
  };

  // Method 1- To get search querries
  // const searchParams = new URLSearchParams(location.search);
  // const redirectK = searchParams.get('redirect');
  // console.log(redirectK)

  //  Method 2 to get search queries
  // let [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("redirect"))

  const redirect = location.search
    ? `/${location.search.split("=")[1]}`
    : "/account";
  useEffect(() => {
    if (error) {
      alert.error(error.response.data.error);
      console.log(error.response.data.error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="LoginSignUpContainer mt-12  ">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              {/* Login form */}
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <div className="mr-4 text-xl absolute  translate-x-1">
                    <ion-icon name="mail-outline"></ion-icon>
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <div className="mr-2 text-xl absolute translate-x-1">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    minLength={8}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to={"/password/forgot"}>Forget Pssword ? </Link>
                <input type="submit" value={"login"} className="loginBtn" />
              </form>

              {/*  Registration Form */}
              <form
                className="signUpForm space-y-3"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div
                  onClick={openImageSelector}
                  className="profilePicDic cursor-pointer flex-col flex justify-center items-center"
                >
                  <img
                    className="profilePic"
                    src={avatarPreview}
                    alt="Avatar Preview"
                  />
                  <h2 className="font-[300] text-gray-500">
                    Upload Profile Pic
                  </h2>
                </div>
                <div className="signUpName">
                  <div className="absolute translate-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.3em"
                      viewBox="0 0 448 512"
                    >
                      <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                    </svg>
                  </div>{" "}
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <div className="absolute text-xl translate-x-2">
                    {" "}
                    <ion-icon name="mail-outline"></ion-icon>
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <div className="absolute text-xl translate-x-2">
                    {" "}
                    <ion-icon name="lock-closed-outline"></ion-icon>
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    minLength={8}
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <input
                    className="hidden"
                    ref={fileBtn}
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LoginSignUp;
