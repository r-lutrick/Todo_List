// Utilize React Hooks, they will always start with the word use
import React, { useState } from "react";

const TodoList = () => {
    // Getters and Setters for state
    const [text, setText] = useState("")    // input text tag
    const [items, setItems] = useState([])  // Items/Objects built from text

    // First attempt with using a prop.checked
    // Unable to make it work due to props being immutable
    // const [checked, setChecked] = useState(props.checked)

    const handleSubmit = (e) => {
        e.preventDefault(); // **prevent refresh**
        // Prevent submission with no data
        if (text.length === 0) {
            return;
        }
        // Orignally: setItems([...items], text)
        // Updated to object to include completed key for input checkbox tag
        const item = {
            textData: text,
            completed: false
        }
        // Push new item to list with previous ...unpacked items
        setItems([...items, item]);
        // Reset text to blank and call it with-in the input tag using value={text}
        setText('');
    }

    const handleDelete = (delIndex) => {
        // Filter all items execpt the one being deleted based on index
        const allItemsExcept = items.filter((item, i) => {
            return i !== delIndex;
        })
        // Then setItems with all except the one removed/omitted
        setItems(allItemsExcept)
    }

    function handleCheck(targetID) {
        // Loop over items using map
        const updateItems = items.map((item, i) => {
            // Find match
            if (targetID === i) {
                // ======== Version 1 ========
                // Mutate object value directly (not best practice)
                // item.completed = !item.completed

                // ======== Version 2 ========
                // Update object by ...unpacking and setting value
                const updatedItem = { ...item, completed: !item.completed };
                return updatedItem
            }
            // Return non updated item
            return item
        })
        // Set items to the new updated list state
        setItems(updateItems)



        // First attempt to get target item to remove, update then add back with updated state
        // obviously this is incorrect!
        // const targetItem = items.filter((item) => item.id === targetID)
        // const item = {
        //     id: targetItem.id,
        //     textData: targetItem.text,
        //     completed: !targetItem.completed
        // }
        // setItems([...items, item])
        // setChecked(!checked)
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
                // Iterate over items using .map(itterativeVariable, index)
                items.map((item, i) => (
                    // div must contain key for react to keep track of
                    // this is provided with the key using .map(iV, **INDEX**)
                    <div className="d-flex align-items-center justify-content-between my-2" key={i}>
                        <div>
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
