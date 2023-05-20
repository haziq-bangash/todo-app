import axios from 'axios';

export const getTodos = async () => {
    // axios to get all todos
    try {
        const { data } = await axios.get('http://localhost:8080/api/todos');
        return data;
    } catch (error) {
        throw error;
    }
};

export const createTodo = async (todo) => {
    // axios to create a todo
    try {
        const { data } = await axios.post('http://localhost:8080/api/todos', todo);
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateTodo = async (todo) => {
    // axios to update a todo
    if (todo.completed) {
        todo.completed_time = Date.now();
    } else {
        todo.completed_time = null;
    }
    try {
        const { data } = await axios.put(`http://localhost:8080/api/todos/${todo._id}`, todo);
        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteTodo = async (id) => {
    // axios to delete a todo
    try {
        const { data } = await axios.delete(`http://localhost:8080/api/todos/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
}

export const deleteAllTodos = async () => {
    // axios to delete all todos
    try {
        const { data } = await axios.delete('http://localhost:8080/api/todos/delete/all');
        return data;
    } catch (error) {
        throw error;
    }
}