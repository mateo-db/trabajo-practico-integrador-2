import { Navigate, Outlet } from "react-router" //importamos herramientas de react router
//usamos navigate en lugar de instancia activa de useNavigate ya que
//useNavigate es un hook que se usa después de que le usuario haga algo durante un evento o lógica, navigate es solo un componente que redirige automaticamente bajo ciertas condiciones actuales (rutas a las que el usuario no debería poder acceder en ese momento, URL inexistente, etc)

export const ProtectedRoute = () => {
    const isLogged = localStorage.getItem('isLogged') //obtenemos valor de key en el localStorage
    
    if (!isLogged) { //si ese valor de isLogged NO es igual a true, se lo redirige hacia otro lugar
        return <Navigate to="/login"/>
    } 

    return <Outlet /> //si el valor de isLogged es true (lo que significa que está logueado), se lo deja pasar al outlet
    //el outlet o salida en este caso siendo la ruta que está protegida en AppRouter (home)
}