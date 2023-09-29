export const getAllItems = () => {
    return fetch("http://localhost:8088/items?_expand=season&_expand=category")
        .then(response => response.json())
}