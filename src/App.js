import { useState, useEffect } from 'react';
import './App.css';
import { getAllItems } from './services';
import { NewDecorationForm } from './newDecorationForm';
import { DecorationEditForm } from './decorationEdit';

export const App = () => {

  const [items, setItems] = useState([])

  useEffect(() => {
    getAllItems().then(items => setItems(items))
  }, [])

  const handleDelete = (event, id) => {
    event.preventDefault()
    console.log("this was clicked")

    return fetch(`http://localhost:8088/items/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
  }

  return (
    <div className="App">
      <NewDecorationForm />
      <section className="items-container">
        <ul>
          {
            items.map(item => {
              return <div className="item-card" key={item.id}>
                <li>
                  <img className="item-img" src={item.imageUrl} />
                  <div className="item-name">{item.name}</div>
                  <div>{item.season.name}</div>
                  <div>{item.category.name}</div>
                  <button onClick={(event) => {
                    handleDelete(event, item.id)
                  }}>Delete</button>
                  <DecorationEditForm item={item}/>
                </li>
              </div>
            })
          }
        </ul>
      </section>
      
    </div>
  );
}