import { useState, useEffect } from "react"

export const NewDecorationForm = () => {

    const [userChoices, setUserChoices] = useState({
        name: '',
        imageUrl: '',
        seasonId: 0,
        categoryId: 0
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

    const handleDecorationSave = (event) => {
        event.preventDefault()

        if (
            userChoices.name &&
            userChoices.imageUrl &&
            userChoices.categoryId &&
            userChoices.seasonId
        ) {

            fetch("http://localhost:8088/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userChoices)
            })

        } else {
            window.alert("please finish filling out this form")
        }
    }


    return (
        <form>
            <h2>Add a New Decoration</h2>

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
                        setUserChoices(copy)
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
                        setUserChoices(copy)
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
                                        setUserChoices(copy)
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
                                        setUserChoices(copy)
                                    }}
                                />
                            </div>
                        )
                    })
                }
            </fieldset>
            <button onClick={handleDecorationSave}>Submit</button>
        </form>
    )
}