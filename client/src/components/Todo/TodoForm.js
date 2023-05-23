import React, { useRef } from 'react';

const TodoForm = ({ getItem }) => {
  const itemRef = useRef(null); // create a reference to the input element

  // Function to handle form submit
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action
    // check if the input element is empty
    if( itemRef.current.value === '' ){
      itemRef.current.focus();
    } else {
      const item = {
        task: itemRef.current.value,
        completed: false
      }
      getItem(item); // Call the getItem function from the parent component and pass the item object as child to parent communication
      itemRef.current.value = '';
    }
  };

  function onKeyEnter(e){
    if(e.keyCode === 13){
      console.log("enter key pressed")
      handleSubmit(e);
    }
  }

  return (
    <form className="mb-3 px-3 text-start d-flex justify-content-between align-items-center" onSubmit={handleSubmit}>
      <input
        type="text"
        name="Item"
        className="form-control me-2"
        id="item"
        placeholder="Be Amazing!"
        ref={itemRef} // Bind the input element to the reference
        onKeyDown={onKeyEnter}
      />
      <button type="submit" className="btn btn-sm btn-primary my-2">Add</button>
    </form>
  );
};

export default TodoForm;
