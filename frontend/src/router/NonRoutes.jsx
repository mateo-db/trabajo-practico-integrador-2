import { useNavigate } from "react-router"
import { useEffect } from 'react'

export const NonRoute = () => { //componente evaluador que redirige a la página que corresponda según el estado de
// sesión cuando se acceda a una URL inexistente.
    const navigate = useNavigate() //usamos la instancia activa del hook useNavigate ya que necesitamos usarlo dentro de un evento, afuera del return
    useEffect(() => {
        const timer = setTimeout(() => {
            const isLogged = localStorage.getItem('isLogged')
            if (!isLogged) {
                navigate('/login') // si el usuario no está logueado, no puede acceder a ruta privada home y es redirigido al login
            } else { 
                //si el usuario si está logueado, es redirigido a home sin posibilidad de acceder a rutas públicas como login y registro
                navigate('/home')
            }
        }, 10000);
        return () => {
            clearTimeout(timer) //limpiamos timer para que no hayan fugas de memoria y los temporizadores se pisen
        }
    }, []) //array de dependencias vacío, para que el efecto (en este caso el timer) se ejecuta una única vez cuando el componente se monte


    return (
        <div className="bg-red-400 flex flex-col items-center justify-center p-2 gap-8 min-h-screen">
            <h2 className="text-black font-bold">Lo sentimos, esa página no se encontró</h2>
            <h3 className="text-black font-semibold font-stretch-50%">Será redirigido a una ruta correspondiente en 10 segundos...</h3>
            <svg fill="#000000" className="w-50 h-50" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 60 60" xmlSpace="preserve">
            <g>
                <path d="M9,39h6v8c0,0.552,0.448,1,1,1s1-0.448,1-1v-8h3c0.552,0,1-0.448,1-1s-0.448-1-1-1h-3v-2c0-0.552-0.448-1-1-1s-1,0.448-1,1
                    v2h-5V27c0-0.552-0.448-1-1-1s-1,0.448-1,1v11C8,38.552,8.448,39,9,39z"/>
                <path d="M40,39h6v8c0,0.552,0.448,1,1,1s1-0.448,1-1v-8h3c0.552,0,1-0.448,1-1s-0.448-1-1-1h-3v-2c0-0.552-0.448-1-1-1
                    s-1,0.448-1,1v2h-5V27c0-0.552-0.448-1-1-1s-1,0.448-1,1v11C39,38.552,39.448,39,40,39z"/>
                <path d="M29.5,48c3.584,0,6.5-2.916,6.5-6.5v-9c0-3.584-2.916-6.5-6.5-6.5S23,28.916,23,32.5v9C23,45.084,25.916,48,29.5,48z
                    M25,32.5c0-2.481,2.019-4.5,4.5-4.5s4.5,2.019,4.5,4.5v9c0,2.481-2.019,4.5-4.5,4.5S25,43.981,25,41.5V32.5z"/>
                <path d="M0,0v14v46h60V14V0H0z M2,2h56v10H2V2z M58,58H2V14h56V58z"/>
                <polygon points="54.293,3.293 52,5.586 49.707,3.293 48.293,4.707 50.586,7 48.293,9.293 49.707,10.707 52,8.414 54.293,10.707 
                    55.707,9.293 53.414,7 55.707,4.707 	"/>
                <path d="M3,11h39V3H3V11z M5,5h35v4H5V5z"/>
            </g>
            </svg>
        </div>
        
    )
    //esto será para una ruta que no estará envuelta ni por PublicRoute ni PrivateRoute, sino una propia ruta a la altura de la raiz global Routes que tenga como path="*" (para atrapar a cualquier URL inexistente que no coincide con ninguno real) y que retornará este componente
}