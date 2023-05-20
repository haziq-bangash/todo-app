import React, { useRef } from 'react';

const TodoForm = ({ getItem }) => {
  const itemRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if( itemRef.current.value === '' ){
      itemRef.current.focus();
    } else {
      const item = {
        task: itemRef.current.value,
        completed: false
      }
      getItem(item);
      itemRef.current.value = '';
    }
  };

  return (
    <form className="mb-3 px-3 text-start d-flex justify-content-between align-items-center" onSubmit={handleSubmit}>
      <input
        type="text"
        name="Item"
        className="form-control me-2"
        id="item"
        placeholder="Be Amazing!"
        ref={itemRef}
      />
      <button type="submit" className="btn btn-sm btn-primary my-2">Add</button>
    </form>
  );
};

export default TodoForm;
