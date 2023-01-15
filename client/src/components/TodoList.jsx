import React, { useState } from "react";

const TodoList = (props) => {
    // Getters and Setters for state
    const [text, setText] = useState("")    // input text tag
    const [items, setItems] = useState([])  // Items/Objects built from text

    // First attempt with using a prop.checked
    // This is incorrect due to props being immutable
    // const [checked, setChecked] = useState(props.checked)

    const handleSubmit = (e) => {
        e.preventDefault(); // **prevent refresh**
        // Prevent submission with no data
        if (text.length === 0) {
            return;
        }
        // Orignally setItems([...items], text)
        // Updated to include completed for input checkbox tag
        const item = {
            textData: text,
            completed: false
        }
        // Push new item to list with previous ...unpacked items
        setItems([...items, item]);
        // reset text to blank here and call it with in the input tag with value={text}
        setText('');
    }

    const handleDelete = (delIndex) => {
        // Filter all items execpt the one being deleted based on index
        const allItemsExcept = items.filter((item, i) => {
            return i !== delIndex;
        })
        // Then setItems with all except the one "removed"
        setItems(allItemsExcept)
    }

    function handleCheck(targetID) {
        const updateItems = items.map((item, i) => {
            if (targetID === i) {
                // Mutate object value directly (not best practice)
                // item.completed = !item.completed

                // Update object by ...unpacking and setting value
                const updatedItem = { ...item, completed: !item.completed };
                return updatedItem
            }
            return item
        })
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
            <h1>Black Belts!</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="form-control my-2"
                    type="text"
                    onChange={(e) => setText(e.target.value)}
                    // value: default to text. on submit reset value to ''
                    value={text} />
                <button className="btn btn-primary d-flex align-items-start" type="submit">Add</button>
            </form>
            {
                // Iterate over items using .map(array, index)
                items.map((item, i) => (
                    // div must contain key for react to keep track of
                    // this is provided with the .map(array, **INDEX**)
                    <div className="d-flex align-items-center justify-content-between my-2" key={i}>
                        <div>
                            {/* input: checked requires onChange in order to update the mapped item directly */}
                            <input checked={item.completed} type="checkbox" className="mx-2" onChange={(e) => handleCheck(i)} />
                            {/* label: turnary opperator for objs attribute rendering ?true or :false */}
                            <label className={item.completed ? "text-decoration-line-through" : ""}>{item.textData}</label>
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
