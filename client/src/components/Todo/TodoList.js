import React, { useState, useEffect } from "react";
import TodoListItem from "./TodoListItem";
import TodoForm from "./TodoForm";
import styled from "styled-components";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos
} from "../../Services/api";

const TodoList = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false); // Add state variable for form visibility
  const [showDeleteAll, setShowDeleteAll] = useState(false);

  useEffect(() => {
    getItems().then((data) => {
      setItems(data);
    });
  }, []);

  const getItems = async () => {
    return await getTodos();
  };

  const addItem = async (item) => {
    // Save the new item
    const todo = {
      task: item.task,
      completed: item.completed,
      created_at: Date.now(),
      completed_time: null,
    };
    try {
      const response = await createTodo(todo);
      if (response.task === item.task) {
        const newItem = item; // Newly inserted todo item
        setItems((prevItems) => [...prevItems, newItem]);
        console.log("Item added successfully");
      } else {
        console.log("Error adding item");
      }
    } catch (error) {
      console.log("Error adding item", error);
    }
  };

  const deleteItem = (index) => {
    // Delete the item from the list
    const todo = items[index];
    deleteTodo(todo._id);
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Function to handle delete all
  const handleDeleteAll = async () => {
    // Delete all items in the list
    const response = await deleteAllTodos();
    if (response.status === 200) {
      console.log("Items deleted successfully");
      setItems([]);
    } else {
      console.log("Error deleting items");
      var error = document.getElementById("error-msg");
      error.innerHTML = "Error deleting items";
    }
  };

  const handleSaveChanges = async (index, editedMessage) => {
    // Save the edited message
    const todo = items[index];
    todo.task = editedMessage;
    var response = await updateTodo(todo);
    if (response.task === todo.task) {
      console.log("Item updated successfully");
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[index].task = editedMessage;
        return updatedItems;
      });
    } else {
      console.log("Error updating item");
      var error = document.getElementById("error-msg");
      error.innerHTML = "Error updating item";
    }
    // console.log(items);
  };

  const handleCheckboxChange = async (index, checked) => {
    // Save the edited message
    const todo = items[index];
    todo.completed = checked;

    // console.log(todo);
    var response = await updateTodo(todo);
    // console.log(response)
    if (response.task === todo.task) {
      console.log("Item updated successfully");
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[index].completed = checked;
        return updatedItems;
      });
    } else {
      console.log("Error updating item");
      var error = document.getElementById("error-msg");
      error.innerHTML = "Error updating item";
    }
    // console.log(items);
  };

  const toggleForm = () => {
    setShowForm(!showForm); // Toggle form visibility
  };

  return (
    <div className="container">
      <div className="col-12 col-md-8 col-lg-6 mx-auto py-4">
        <GlassMorphism id="todo-head" className="todo-header">
          <Head className="d-flex justify-content-between align-items-center p-3">
            <div className="p fw-normal d-flex justify-content-start align-items-center">
              <p className="pe-3 mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="white"
                  className="bi bi-list"
                  viewBox="0 0 16 16"
                  onClick={() => setShowDeleteAll(!showDeleteAll)}
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                {showDeleteAll && (
                  <div className="menu" style={{'position':'absolute'}} >
                    <span className="btn btn-sm btn-danger" onClick={handleDeleteAll}>Delete All</span>
                  </div>
                )}
              </p>
              <p className="mb-0">To do today</p>
            </div>
            <div>
              <button
                className="btn btn-sm btn-transparent"
                onClick={toggleForm}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="bi bi-chevron-compact-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
                  />
                </svg>
              </button>
            </div>
          </Head>
          <ErrorMessage
            id="error-msg"
            className="text-sm text-warning"
          ></ErrorMessage>
          {showForm && <TodoForm getItem={addItem} />}{" "}
          {/* Show TodoForm when showForm is true */}
        </GlassMorphism>
        <ListItemWrapper className="my-3 text-dark">
          {items.map((item, index) => (
            <TodoListItem
              key={index}
              message={item}
              index={index}
              deleteItem={() => deleteItem(index)}
              onSaveChanges={handleSaveChanges} // Pass the handleSaveChanges function as prop
              onCheckboxChange={handleCheckboxChange} // Pass the handleCheckboxChange function as prop
            />
          ))}
        </ListItemWrapper>
      </div>
    </div>
  );
};

export default TodoList;

const GlassMorphism = styled.div`
  background: rgba(155, 155, 155, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Head = styled.header``;

const ListItemWrapper = styled.div`
  background: #fafafa;
  border-radius: 10px;
`;

const ErrorMessage = styled.div``;