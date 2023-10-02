export const getAllItems = () => {
    return fetch("http://localhost:8088/items?_expand=season&_expand=category")
        .then(response => response.json())
}

export const getSeasons = () => {
    return fetch("http://localhost:8088/seasons")
        .then((res) => res.json())
}

export const getCategories = () => {
    return fetch("http://localhost:8088/categories")
        .then((res) => res.json())
}

export const deleteItem = (id) => {
    return fetch(`http://localhost:8088/items/${id}` , {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
}

export const saveNewItem = (userChoices) => {
    return fetch("http://localhost:8088/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userChoices)
            })
}

export const editItem = (id, userChoices) => {

    return fetch(`http://localhost:8088/items/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userChoices)
        })
}