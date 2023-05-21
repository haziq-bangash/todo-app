import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserId, setToken, setPicture } from "../Store/userSlice";
import { loginUser } from "../Services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

    useEffect(() => {
    if (user && token) {
      navigate("/");
    }
    }, [user, token]);

    // console.log(user)
    // console.log(token)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the loginUser function from the API module to send the login request
      const response = await loginUser({ email, password });
      // Redirect the user to the dashboard or another page
      console.log("Login response:", response);
      // Set the user in the redux store
      dispatch(setUser(response.email));
      // Set the token in the redux store
      dispatch(setToken(response.token));
      // Set the picture in the redux store
      dispatch(setPicture(response.picture));
      // Set the user id in the redux store
      dispatch(setUserId(response._id));
      // Redirect to the '/' path
      navigate("/");
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };

  return (
    <Wrapper className="d-flex align-items-center justify-content-center mt-5">
      <GlassMorphism className="col-10 col-md-8 col-lg-6 p-3">
        <h1 className="display-6">Sign In</h1>
        <p className="text-sm fw-bolder" >Get things done.</p>
        <form className="py-3" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
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
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
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
            Sign in
          </button>
          <p className="text-sm mt-2 mb-0" >Dont have an account? <strong className="text-decoration-underline" onClick={() => navigate('/register')} >create an account</strong></p>
        </form>
      </GlassMorphism>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div``;

const GlassMorphism = styled.div`
  background: rgba(155, 155, 155, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
`;
