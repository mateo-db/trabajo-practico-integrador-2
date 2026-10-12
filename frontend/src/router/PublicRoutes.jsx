import { Navigate, Outlet } from "react-router";

export const PublicRoute = () => {
    const isLogged = localStorage.getItem("isLogged")
    if (isLogged) { //si el valor de isLogged NO es distinto de true (es decir, si el usuario SI está logueado correctamente), redirigimos hacia home sin la posibilidad de que acceda a las páginas públicas
        return <Navigate to="/home"/>
    }

    return <Outlet /> //si el valor de isLogged es distinto de true, el usuario no está logueado y puede acceder al outlet que en este caso será las rutas públicas login y registro en AppRouter

}