import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { RxDragHandleDots2 } from "react-icons/rx";

const TodoListItem = ({
  message, // The todo item object
  index, // The index of the todo item in the items array
  deleteItem, // The deleteItem function from the parent component
  onSaveChanges, // The handleSaveChanges function from the parent component
  onCheckboxChange, // The handleCheckboxChange function from the parent component
}) => {
  const [editMode, setEditMode] = useState(false); // State to hold the edit mode
  const [editedMessage, setEditedMessage] = useState(message); // State to hold the edited message
  const [showOptionsMenu, setShowOptionsMenu] = useState(false); // State to hold the options menu visibility

  const inputRef = useRef(null); // Create a reference to the input element

  useEffect(() => {
    // If the edit mode is true, focus the input element
    if (editMode) {
      inputRef.current.focus();
    }
  }, [editMode]);

  // Function to toggle the edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Function to handle input change
  const handleInputChange = (event) => {
    setEditedMessage(event.target.value);
  };

  // Function to handle checkbox change
  const handleCheckboxInputChange = (event) => {
    onCheckboxChange(index, event.target.checked);
  };

  // Function to handle save changes
  const handleSaveChanges = () => {
    onSaveChanges(index, editedMessage);
    toggleEditMode();
  };

  // Function to toggle the options menu
  const toggleOptionsMenu = () => {
    setShowOptionsMenu(!showOptionsMenu);
  };

  // Function to handle key escape to return to view mode
  const handleKeyEscape = (event) => {
    if (event.key === "Escape") {
      setEditedMessage(message);
      toggleEditMode();
    }
  };

  return (
    <div className="d-flex mx-2 border-bottom p-3 justify-content-between align-items-center">
      {/* if user wants to edit task then show edit task form */}
      {editMode ? (
        <input
          type="text"
          value={editedMessage.task}
          onChange={handleInputChange}
          onKeyDown={handleKeyEscape}
          ref={inputRef}
        />
      ) : (
        <div className="d-flex align-content-center">
          <div className="form-check">
            <input
              className="form-check-input me-2"
              type="checkbox"
              checked={message.completed}
              onChange={handleCheckboxInputChange}
              id={`checkbox-${index}`}
            />
          </div>
          <div>
            {message.task}
          </div>
        </div>
      )}

      <div>
        {editMode ? (
          <button
            className="btn btn-sm btn-success mx-2"
            onClick={handleSaveChanges}
          >
            Save
          </button>
        ) : (
          <OptionsMenu>
            <RxDragHandleDots2 className="fs-4" onClick={toggleOptionsMenu} />
            {showOptionsMenu && (
              <OptionsMenuContent>
                <button
                  className="btn btn-sm btn-light"
                  onClick={toggleEditMode}
                >
                  Edit
                </button>
                <button className="btn btn-sm btn-light" onClick={deleteItem}>
                  Delete
                </button>
              </OptionsMenuContent>
            )}
          </OptionsMenu>
        )}
      </div>
    </div>
  );
};

export default TodoListItem;

const OptionsMenu = styled.div`
  position: relative;
`;

const OptionsMenuContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1;
`;
