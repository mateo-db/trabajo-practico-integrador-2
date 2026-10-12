import { Navigate, Outlet } from "react-router";

export const PublicRoute = () => {
    const isLogged = localStorage.getItem("isLogged")

    if (isLogged === "true") { //si el usuario SI está logueado correctamente, redirigimos hacia home sin la posibilidad de que acceda a las páginas públicas que no debería poder acceder una vez que está logueado (login o registro)
        <Navigate to="/home"/>
    }

    return <Outlet /> //si el usuario no está logueado correctamente, si puede acceder al outlet que en este caso será las rutas públicas login y registro en AppRouter

}