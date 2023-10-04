import { Link } from "react-router-dom"

export const NavBar = () => {
    return (
        <>
            <Link to="new">Add New Decoration</Link>
            <Link to="halloween">Halloween</Link>
            <Link to="christmas">Christmas</Link>
            <Link to="thanksgiving">Thanksgiving</Link>
        </>
    )
}