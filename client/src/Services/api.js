import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

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

export const logoutUser = () => {};

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

export const updateTodo = async (todo, token) => {
  if (todo.completed) {
    todo.completed_time = Date.now();
  } else {
    todo.completed_time = null;
  }
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
