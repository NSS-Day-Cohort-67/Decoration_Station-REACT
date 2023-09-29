import { useState, useEffect } from "react"
import { getSeasons, getCategories, saveNewItem} from "./services"

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
        getSeasons()
            .then((data) => {
                setSeasons(data)
            })

        getCategories()
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
            saveNewItem(userChoices)
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
                    type="text"
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
                    type="text"
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
                                    type="radio"
                                    name="season"
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