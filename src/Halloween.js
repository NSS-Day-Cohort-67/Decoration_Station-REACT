import { useState, useEffect } from "react"

export const HalloweenItems = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("http://localhost:8088/items/?seasonId=1&_expand=category")
            .then(res => res.json())
            .then((data) => {
                setItems(data)
            })
    }, [])

    return (
        <div>
            <ul>
            {
            items.map(item => {
              return <div className="item-card" key={item.id}>
                <li>
                  <img className="item-img" src={item.imageUrl} />
                  <div className="item-name">{item.name}</div>
                  {/* <div>{item.season.name}</div> */}
                  <div>{item.category.name}</div>
                  </li>
              </div>
            })
          }
            </ul>
        </div>
    )

}