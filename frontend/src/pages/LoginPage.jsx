import { useState } from 'react'
import { useForm } from '../hooks/useForm'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'

export const LoginPage = () => {
    //instancia activa de useNavigate
    const navigate = useNavigate()
    //estados de carga
    const [isLoading, setIsLoading] = useState(false)
    //estados a manejar según las credenciales (si están bien o son incorrectas)
    const [areCredsBad, setAreCredsBad] = useState(false)
    //nuestro form con estado inicial
    const { formValues, handleInputChange } = useForm({
        email: "",
        password: ""
    })
    
    //handler de login
    const handleLogging = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await fetch('/api/auth/login', {
            method: 'POST',
            credentials: 'include'
        })

        if (res.ok) { //si la respuesta del servidor fue buena (las credenciales son las correctas)
            setIsLoading(false) //seteamos carga en false (la petición terminó, se leyó la respuesta)
            localStorage.setItem('isLogged', true) //seteamos en el localStorage del navegador clave isLogged con valor true
            navigate('/home') //redireccionamos a la home page
        } else {
            setIsLoading(false) //por bloque else (es decir, la respuesta volvió mal/la petición falló, de igual manera termina la petición y no se sigue cargando una espera) 
            setAreCredsBad(true) //seteamos estado de error a true pq falló la petición (las credenciales fueron incorrectas)
            setTimeout(() => {setAreCredsBad(false)}, 3000) //seteamos un timer para desactivar mensaje de error indicando cantidad en milisegundos
        }
    }

    return (
        <div>
            <form className='flex flex-col gap-4 mt-1' onSubmit={handleLogging}>
                <input 
                    type="email"
                    value={formValues.email}
                    className="border-2 p-1 rounded-xl"
                    placeholder="Correo Electrónico"
                    name="email"
                    onChange={handleInputChange}
                />
                <input 
                    type="text"
                    value={formValues.password}
                    className="border-2 p-1 rounded-xl"
                    placeholder="Contraseña"
                    name="password"
                    onChange={handleInputChange}
                />
                <button type="submit" className="text-blue-500 font-bold border bg-blue-200 mb-5 hover:bg-cyan-200 transition-colors duration-500 ease-in-out">Iniciar Sesión</button>
                {areCredsBad && <p className='text-red-400 font-extrabold'>Las credenciales son incorrectas</p>}
            </form>
            <Link to="/register" className='text-black font-semibold border bg-blue-200 hover:bg-amber-100 transition-colors duration-500 ease-in-out p-1'>No tenés cuenta? Registrate</Link>
            {isLoading && (
                <svg 
                    className="animate-spin w-6 h-6 text-green-400 mt-2"
                    viewBox="0 0 16 16" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                >
                    <g fill="#000000" fillRule="evenodd" clipRule="evenodd">
                    <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"/>
                    <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"/>
                    </g>
                </svg>
            )}
        </div>
    )

}