import { useState, useEffect } from "react"

export const DecorationEditForm = ({item}) => {

    const [userChoices, updateDecoration] = useState({
        name: item.name,
        imageUrl: item.imageUrl,
        seasonId: item.seasonId,
        categoryId: item.categoryId
    })

    const [seasons, setSeasons] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch("http://localhost:8088/seasons")
            .then((res) => res.json())
            .then((data) => {
                setSeasons(data)
            })

        fetch("http://localhost:8088/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data)
            })
    }, [])

    const handleUpdate = (event) => {
        event.preventDefault()
        console.log("this is clicked")

        return fetch(`http://localhost:8088/items/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userChoices)
        })


    }


    return (
        <form>
            <h2>Edit Decoration</h2>

            <fieldset>
                <label>Name: </label>
                <input
                    required
                    type="text"
                    id="name"
                    value={userChoices.name}
                    className="form-control"
                    onChange={(event) => {
                        const copy = { ...userChoices }
                        copy.name = event.target.value
                        updateDecoration(copy)
                    }}
                />
            </fieldset>
            <fieldset>
                <label>Image: </label>
                <input
                    required
                    type="text"
                    id="imageUrl"
                    value={userChoices.imageUrl}
                    className="form-control"
                    onChange={(event) => {
                        const copy = { ...userChoices }
                        copy.imageUrl = event.target.value
                        updateDecoration(copy)
                    }}
                />
            </fieldset>



            <fieldset>
                <label>Seasons: </label>
                {
                    seasons.map((season) => {
                        return (
                            <div key={season.id}>{season.name} 
                                <input
                                    required
                                    type="radio"
                                    value={season.id}
                                    checked={userChoices.seasonId === season.id}
                                    onChange={(event) => {
                                        const copy = { ...userChoices }
                                        copy.seasonId = parseInt(event.target.value)
                                        updateDecoration(copy)
                                    }}
                                />
                            </div>
                        )
                    })
                }
            </fieldset>

            <fieldset>
                <label>Category: </label>
                {
                    categories.map((category) => {
                        return (
                            <div key={category.id}>{category.name}
                                <input
                                    required
                                    type="radio"
                                    value={category.id}
                                    checked={userChoices.categoryId === category.id}
                                    onChange={(event) => {
                                        const copy = { ...userChoices }
                                        copy.categoryId = parseInt(event.target.value)
                                        updateDecoration(copy)
                                    }}
                                />
                            </div>
                        )
                    })
                }
            </fieldset>
            <button onClick={handleUpdate}>Update</button>
        </form>
    )
}