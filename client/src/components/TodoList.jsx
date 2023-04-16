// Utilize React Hooks, they will always start with the word use
import React, { useState } from "react";
import Form from 'react-bootstrap/Form'

const TodoList = () => {
    // Getters and Setters for state
    const [text, setText] = useState("")    // Input text tag
    const [items, setItems] = useState([])  // List of Objects

    const handleSubmit = (e) => {
        e.preventDefault(); // **prevent refresh**
        // Prevent submission with no data
        if (text.length === 0) {
            return;
        }
        // item must include completed attribute in order for updatedItems to work
        const item = {
            textData: text,
            completed: false
        }
        // Push new item to list with previous ...unpacked items
        setItems([...items, item]);
        // Reset text to blank and call it with-in the input tag using value={text}
        setText('');
    }

    const handleDelete = (deleteItem) => {
        // Filter all items execpt the one being deleted based on index
        const allItemsExcept = items.filter((item, i) => {
            return i !== deleteItem;
        })
        // Then setItems with all except the one removed/omitted
        setItems(allItemsExcept)
    }

    function handleCheck(checkItem) {
        // use .map to loop over items in list to return an updated list
        const updatedItems = items.map((item, i) => {
            // Find match
            if (checkItem === i) {
                // Update object by ...unpacking and witching completed value
                const updatedItem = { ...item, completed: !item.completed };
                return updatedItem
            }
            // Return non updated item
            return item
        })
        // Set items to the new updated list state
        setItems(updatedItems)
    }

    return (
        <div className="container w-50 m-auto ">
            <h1>Todo List!</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="form-control my-2"
                    type="text"
                    onChange={(e) => setText(e.target.value)}
                    // value: default to text state; onSubmit reset value to ''
                    value={text} />
                <button className="btn btn-primary d-flex align-items-start" type="submit">Add</button>
            </form>
            {
                // Iterate over items using .map(iterativeVariable, index)
                items.map((item, i) => (
                    // div must contain key for react to keep track of
                    // this is provided with the key using .map(iV, **INDEX**)
                    <div className="d-flex align-items-end justify-content-between my-2" key={i}>
                        <div className="d-flex">
                            {/* input: checked set to item.completed state's value.
                                checked also requires onChange in order to update the item state directly
                                passing in the index value */}
                            <input id={i} checked={item.completed} type="checkbox" className="mx-2" onChange={(e) => handleCheck(i)} />
                            {/* label: turnary opperator (condition ? true : false) for conditional rendering based on state */}
                            <label htmlFor={i} className={item.completed ? "text-decoration-line-through" : ""}>{item.textData}</label>
                        </div>
                        {/* button: onClick used for removal passing in index value */}
                        <button className="btn btn-outline-danger mx-2 m" onClick={() => { handleDelete(i) }}>Delete</button>
                    </div >
                ))
            }
        </div>
    );
}

export default TodoList;
