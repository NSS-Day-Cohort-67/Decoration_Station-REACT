import { useState, useEffect } from 'react';
import './App.css';
import { getAllItems, deleteItem, getCategories, getSeasons } from './services';
import { NewDecorationForm } from './newDecorationForm';
import { DecorationEditForm } from './decorationEdit';

export const App = () => {

  const [items, setItems] = useState([])
  const [seasons, setSeasons] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getAllItems().then(items => setItems(items))
    getSeasons().then(seasons => setSeasons(seasons))
    getCategories().then(categories => setCategories(categories))
  }, [])
  
  const handleDelete = (event, id) => {
    event.preventDefault()
    deleteItem(id)
  }

  return (
    <div className="App">
      <NewDecorationForm seasons={seasons} categories={categories}/>
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
                  <DecorationEditForm item={item} seasons={seasons} categories={categories}/>
                </li>
              </div>
            })
          }
        </ul>
      </section>
      
    </div>
  );
}