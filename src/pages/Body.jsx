import { Outlet } from "react-router-dom"
import Navbar from "../component/Navbar"

const Body = () => {
    return <div>
        <Navbar />
        <Outlet />
    </div>
}

export default Body