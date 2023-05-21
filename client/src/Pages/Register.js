import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Avatar from "../components/User/Avatar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setUserId, setToken, setPicture } from "../Store/userSlice";
import { registerUser } from "../Services/api";

const Register = () => {
  const [email, setEmail] = useState(""); // State to hold the email address
  const [password, setPassword] = useState(""); // State to hold the password
  const [firstname, setFirstname] = useState("") // State to hold the firstname
  const [lastname, setLastname] = useState("") // State to hold the lastname
  const [pictureUrl, setPictureUrl] = useState("") // State to hold the pictureUrl
  const navigate = useNavigate(); // Navigate hook to redirect the user
  const dispatch = useDispatch(); // Dispatch hook to dispatch actions
  const user = useSelector((state) => state.user.user); // get user email from redux store to check if user already loggoed in or not
  const token = useSelector((state) => state.user.token); // get user token from redux store to check if user already loggoed in or not

  useEffect(() => {
    // If there is user data in the redux store, redirect to the dashboard
    if (user && token) {
      navigate("/");
    }
  }, [user, token]);

  // handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action

    try {
      // Call the registerUser function from the API module to send the register request
      const response = await registerUser({ first_name:firstname, last_name:lastname, email, password, pictureUrl });
      // console.log("Register response:", response);
      // Set the user in the redux store
      dispatch(setUser(response.email));
      // Set the token in the redux store
      dispatch(setToken(response.token));
      // Set the picture in the redux store
      dispatch(setPicture(response.picture));
      // Set the user id in the redux store
      dispatch(setUserId(response._id));
      navigate("/");
    } catch (error) {
      console.log("Error registering in:", error);
    }
  };

  return (
    <Wrapper className="d-flex align-items-center justify-content-center mt-5">
      <GlassMorphism className="col-10 col-md-8 col-lg-6 p-3">
        <h1 className="display-6">Create an account.</h1>
        <p className="text-sm fw-bolder">Get things done.</p>
        <form className="py-3" onSubmit={handleSubmit}>
          {/* if user put picture url then dynamically show avatar component */}
          {
            pictureUrl && (
              <Avatar url={pictureUrl} />
            )
          }
          <div className="row mb-3" >
          <div className="">
              <label htmlFor="inputPictureUrl" className="form-label">
                Picture Url
              </label>
              <input type="text" className="form-control" value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} id="inputPictureUrl" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="inputFirstname" className="form-label">
                Firstname
              </label>
              <input type="text" className="form-control" value={firstname} onChange={(e)=> setFirstname(e.target.value)} id="inputFirstname" />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputLastname" className="form-label">
                Lastname
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="form-label">
              Email
            </label>
            <div className="">
              <input
                type="email"
                className="form-control"
                id="inputEmail3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="form-label">
              Password
            </label>
            <div className="">
              <input
                type="password"
                className="form-control"
                id="inputPassword3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <p className="text-sm mt-2 mb-0" >Already have an account? <strong className="text-decoration-underline" onClick={() => navigate('/login')} >sign in</strong></p>
        </form>
      </GlassMorphism>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.div``;

const GlassMorphism = styled.div`
  background: rgba(155, 155, 155, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
`;
