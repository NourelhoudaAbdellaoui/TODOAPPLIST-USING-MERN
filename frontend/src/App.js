import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

//Add API base
const API_BASE = "http://localhost:4001/todo";

function App() {
  //Add useState, we ll store items in the array
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  //Add useEffect, GetTodos() will run every time the component renders
  useEffect(() => {
    GetTodos();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Add GetTodos() function, fetches data from our API, converts to JSON
  // and then saves the data in the 'items' state
  // If there's an error, it will be logged to the console
  const GetTodos = () => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.log(err));
  };
  const addItem = async () => {
    const data = await fetch(API_BASE + "/new", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: input,
        completed: false,
      }),
    }).then((res) => res.json());
    console.log(data);
    await GetTodos();
    setInput("");
  };
  return (
    // The input field's value is now taken from the input state.
    //It will update dynamically as the user types.
    // Add the onChange method, so that handleChange function will be executed
    // every time something has been changed in the input field.

    <div className="container">
      <div className="heading">
        <h1>TO-DO-APP</h1>
      </div>

      <div className="form">
        <input type="text" value={input} onChange={handleChange}></input>

        <button onClick={() => addItem()}>
          <span>ADD</span>
        </button>
      </div>

      <div className="todolist">
        {items.map((item) => {
          const { _id, name } = item;
          return <TodoItem name={name} id={_id} setItems={setItems} />;
        })}
      </div>
    </div>
  );
}

export default App;
