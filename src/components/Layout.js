import { Outlet } from "react-router-dom"
import NavbarCard from "./NavbarCard"

const Layout = () => {
    return (
        <>
            <NavbarCard/>
            <Outlet/>
        </>
    )
}

export default Layout