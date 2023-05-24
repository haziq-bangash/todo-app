import axios from "axios";

const API_BASE_URL = 'https://todo-app-server-eosin.vercel.app/api';
// const API_BASE_URL = "http://localhost:8080/api";
// api request to register a new user
export const registerUser = async (userData) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/users/register`,
      userData
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// api request to login a user
export const loginUser = async (userData) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/users/login`, userData);
    // setAuthToken(data.token); // Set the authentication token in the default headers
    return data;
    // console.log(data)
  } catch (error) {
    throw error;
  }
};

// thought of using it but not using it
export const logoutUser = () => {};

// api request to get all todos of a user
export const getTodos = async (token, userId) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/todos`, {
      headers: {
        "x-access-token": token,
      },
      params: {
        userId: userId,
      },
    });
    // console.log(data)
    return data;
  } catch (error) {
    throw error;
  }
};

// api request to create a new todo
export const createTodo = async (todo, token, userId) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/todos`, todo, {
      headers: {
        "x-access-token": token,
      },
      params: {
        userId: userId,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// api request to update a todo
export const updateTodo = async (todo, token) => {
  if (todo.completed) {
    todo.completed_time = Date.now();
  } else {
    todo.completed_time = null;
  }
  // console.log(todo._id)
  try {
    const { data } = await axios.put(
      `${API_BASE_URL}/todos/${todo._id}`,
      todo,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// api request to delete a todo by id
export const deleteTodo = async (id, token) => {
  try {
    const { data } = await axios.delete(`${API_BASE_URL}/todos/${id}`, {
      headers: {
        "x-access-token": token,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// api request to delete all todos of a user
export const deleteAllTodos = async (token, userId) => {
  try {
    const { data } = await axios.delete(
      `${API_BASE_URL}/todos/delete/all`,
      {
        headers: {
          "x-access-token": token,
        },
        params: {
          userId: userId,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};
