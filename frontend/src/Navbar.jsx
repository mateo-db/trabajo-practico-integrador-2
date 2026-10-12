import { useNavigate } from 'react-router'
import { Link } from 'react-router'

export const Navbar = () => {
    const navigate = useNavigate()
    
    const handleLogout = async () => {
        await fetch('/apí/auth/logout', {
            method: 'POST',
            credentials: 'include'
        })

        localStorage.removeItem('isLogged') //removemos del localStorage la clave isLogged con valor true
        navigate('/login')
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
            <Link to='/home'>Home</Link>
        </nav>
    )
}