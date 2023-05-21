import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TodoList from '../components/Todo/TodoList';
import Avatar from '../components/User/Avatar';
import { logoutUser } from '../Services/api';
import { clearUser } from '../Store/userSlice';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const url = useSelector((state) => state.user.picture);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      // Call the logoutUser function from the API module to send the logout request
      await logoutUser();
      // Clear user data in the redux store
      dispatch(clearUser(null));
      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <div className="mt-5 py-3">
      <Avatar url={url} user={user}/>
        <div className="menu mt-3" aria-labelledby="dropdownMenuButton">
          <button className="btn btn-sm btn-danger" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      <TodoList />
    </div>
  );
};

export default Dashboard;
