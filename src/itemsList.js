import { useEffect, useState } from "react"
import { deleteItem, getAllItems } from "./services"
import { useNavigate } from "react-router-dom"

export const ItemsList = () => {

    const [items, setItems] = useState([])


    useEffect(() => {
      getAllItems().then(items => setItems(items))
    }, [])

    const handleDelete = (event, id) => {
        event.preventDefault()
        deleteItem(id)
      }

    const navigate = useNavigate()

    return (
            <div className="App">
      {/* <NewDecorationForm /> */}
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
                  <button onClick={() => {
                    navigate(`/items/${item.id}`)
                  }}>Edit</button>
                </li>
              </div>
            })
          }
        </ul>
      </section>
      
    </div>
    )
}