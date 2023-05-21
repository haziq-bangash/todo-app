import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { RxDragHandleDots2 } from "react-icons/rx";

const TodoListItem = ({
  message,
  index,
  deleteItem,
  onSaveChanges,
  onCheckboxChange,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (editMode) {
      inputRef.current.focus();
    }
  }, [editMode]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (event) => {
    setEditedMessage(event.target.value);
  };

  const handleCheckboxInputChange = (event) => {
    onCheckboxChange(index, event.target.checked);
  };

  const handleSaveChanges = () => {
    onSaveChanges(index, editedMessage);
    toggleEditMode();
  };

  const toggleOptionsMenu = () => {
    setShowOptionsMenu(!showOptionsMenu);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setEditedMessage(message);
      toggleEditMode();
    }
  };

  return (
    <div className="d-flex mx-2 border-bottom p-3 justify-content-between align-items-center">
      {editMode ? (
        <input
          type="text"
          value={editedMessage.task}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
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
