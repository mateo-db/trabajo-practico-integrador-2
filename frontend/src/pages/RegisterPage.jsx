import { useForm } from "../hooks/useForm"
import { useNavigate } from "react-router"
import { useState } from "react"
import { Link } from "react-router"


export const RegisterPage = () => {
    //declaramos al principio de nuestro functional component la instancia activa del metodo useNavigate()
    const navigate = useNavigate()
    const {formValues, handleInputChange, handleReset} = useForm({ //hay que mandarle un molde vacío para que nuestro hook sepa los estados de que campos manejar, si no le mandamos nada el hook no podrá manejar estados de nada, formValues tendrá como valor inicial undefined y tendremos errores
        username: "",
        email: "",
        password: "",
        role: "",
        first_name: "",
        last_name: "",
        biography: "",
        avatar_url: "",
        birth_date: "",
    })
    //estos estados contendrán los errores que se informen desde el backend a través de la respuesta que nos devuelva, si es que hubiere errores en la respuesta
    const [errorsBackend, setErrorsBackend] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false) //para controlar estados de carga del formulario una vez que se manda (podría llamarse loading o isLoading pero evitamos utilizar los mismos nombres de estados que en los hooks)


    //handler intermedio para capturar el envío de datos (cuando se hace click en botón submit)
    //esta función handler SI es asíncrona a diferencia del useEffect, ya que no la maneja React, sino que el usuario la ejecuta al hacer click en botón submit
    const handleSubmit = async (e) => {
        //prevenimos comportamiento default de formularios
        e.preventDefault()
        setIsSubmitting(true) //seteamos estado de carga del envío del form a true
        await fetch('/api/auth/register', {
            method: 'POST',
            credentials: 'include'
        })
        //obtenemos respuesta del servidor y chequeamos si "ok" vale true, en ese caso de éxito procedemos a limpiar el formulario y redireccionar a la pagina de login (con useNavigate)
        if (res.ok) {
            setIsSubmitting(false) //seteamos a false estado de isSubmitting (terminó de enviar los datos, bien o mal)
            //limpiamos con nuestro handler del hook useForm
            handleReset()
            //redireccionamos al login con useNavigate de react-router
            navigate('/login')
        } else { //si res vino con errores ("ok" de res vale false)
            setIsSubmitting(false) //seteamos a false estado de isSubmitting (terminó de enviar los datos bien, o mal)
            const errorsRes = await res.json() //guardamos errores que trajo el backend, convertidos a json y esperados con await por el hecho de que es asíncrono el proceso
            setErrorsBackend(errorsRes) //seteamos el estado de errorsBackend con la respuesta convertida a json del backend (que contendrá los errores)


        }
    }


    //recordemos que dentro del return es cuando el page va a devolver lo que se dibujará en el navegador
    return (
    //div contenedor central para agrupar varios elementos y que nuestro JSX sea válido
    //nota: las className dentro de las etiquetas funcionan como CSS clásico con Tailwind, teniendo en cuenta flex/grid para moldear nuestro formulario
    <div>
        <h1>Registro</h1>
        {errorsBackend && errorsBackend.map((err, index) => (
            <p className="text-red-700 font-bold" key={index}>{err}</p>
        ))}
        <form className="flex flex-col gap-4 mt-1" onSubmit={handleSubmit}>
            <input
                type="text"
                className="border-2 p-1 rounded-xl"
                placeholder="Nombre de Usuario"
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
            />
            <input
                type="email"
                className="border-2 p-1 rounded-xl"
                placeholder="Correo electrónico"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
            />
            <input
                type="text"
                className="border-2 p-1 rounded-xl"
                placeholder="Contraseña"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
            />
            <select name="role" value={formValues.role} onChange={handleInputChange}>
                <option value="">Rol</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <input
                type="text"
                className="border-2 p-1 rounded-xl"
                placeholder="Nombre"
                name="first_name"
                value={formValues.first_name}
                onChange={handleInputChange}
            />
            <input
                type="text"
                className="border-2 p-1 rounded-xl"
                placeholder="Apellido"
                name="last_name"
                value={formValues.last_name}
                onChange={handleInputChange}
            />
            <input
                type="text"
                className="border-2 p-1 rounded-xl"
                placeholder="Biografía"
                name="biography"
                value={formValues.biography}
                onChange={handleInputChange}
            />
            <input
                type="text"
                className="border-2 p-1 rounded-xl"
                placeholder="Avatar (URL)"
                name="avatar_url"
                value={formValues.avatar_url}
                onChange={handleInputChange}
            />
            <input 
                type="date"
                className="border-2 p-1 rounded-xl"
                min="1950-01-01" 
                max="2013-12-31" 
                name="birth_date" 
                value={formValues.birth_date} 
                onChange={handleInputChange}
            />
            <button 
                className="text-blue-500 font-bold border bg-blue-200 mb-5 hover:bg-cyan-200 transition-colors duration-500 ease-in-out" 
                type="submit" 
                disabled={isSubmitting}
            >
                {isSubmitting ? "Registrando..." : "Registrarse"}
            </button>
        </form>
        <Link to="/login" className="text-black font-semibold border bg-blue-200 hover:bg-amber-100 transition-colors duration-500 ease-in-out p-1">Tenés cuenta? Inicia sesión</Link>
        {isSubmitting && (
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



