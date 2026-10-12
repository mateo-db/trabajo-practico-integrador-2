import { useNavigate } from 'react-router'
import { Link } from 'react-router'

export const Navbar = () => {
    const navigate = useNavigate()
    
    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })
    
            localStorage.removeItem('isLogged') //removemos del localStorage la clave isLogged con valor true
            navigate('/login')  
        } catch (error) {
            error.console("Error de red o caida del servidor", {error})
        }
    }

    return (
        <nav>
            <button 
                className='text-red-300 font-bold' 
                type='button' 
                onClick={handleLogout}
            >
                Cerrar sesión
            </button>
            <Link to='/home' className='text-black font-semibold border bg-blue-200 hover:bg-amber-100 transition-colors duration-500 ease-in-out p-1'>Home</Link>
        </nav>
    )
}