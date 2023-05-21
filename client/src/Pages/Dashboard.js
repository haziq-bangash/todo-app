import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TodoList from '../components/Todo/TodoList';
import Avatar from '../components/User/Avatar';
import { logoutUser } from '../Services/api';
import { clearUser } from '../Store/userSlice';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user); // get user email from redux store
  const url = useSelector((state) => state.user.picture); // get user picture from redux store
  const dispatch = useDispatch(); // dispatch actions using useDispatch hook
  const navigate = useNavigate(); // navigate to different routes using useNavigate hook

  useEffect(() => {
    // If there is no user data in the redux store, redirect to the login page
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Call the logoutUser function from the API module to send the logout request
      await logoutUser(); // not in use yet
      // Clear user data in the redux store
      dispatch(clearUser());
      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <div className="mt-5 py-3">
      <Avatar url={url} user={user}/> {/* pass user email and picture url as props */}
        <div className="menu mt-3" aria-labelledby="dropdownMenuButton">
          <button className="btn btn-sm btn-danger" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      <TodoList /> {/* display the TodoList component */}
    </div>
  );
};

export default Dashboard;
