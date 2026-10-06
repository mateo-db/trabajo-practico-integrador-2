//importamos herramientas para manejar estados y efectos secundarios
import { useState, useEffect } from 'react'

//creamos hook reutilizable (función flecha exportada nombradamente) para hacer fetch a nuestro backend
//tener en cuenta: el nombre de un custom hook debe comenzar estrictamente con la palabra clave de react "use", sino no funcionará
export const useFetch = (url) => { //por parametros de la función le pasamos como argumento génerico "url"
    //useState es una función que devuelve un arreglo con dos elementos: elemento de Solo Lectura, y setElementoSoloLectura (que será la unica vía posible para editar el primer elemento)
    //desestructuramos entre corchetes los elementos a usar y manejar sus estados cambiantes, en este caso data, isLoading y error
    const [data, setData] = useState(null) //el estado inicial del dato debe ser uno predeterminado/default, es decir el que tendrá antes de que ocurra cualquier acción (en este caso es "null" debido a que la primera vez que React lea la función y se dispare la petición, todavía no habrán datos para leer)
    const [isLoading, setIsLoading] = useState(true) //lo mismo para loading y error
    const [error, setError] = useState(false)

    //realizamos función asincrona que hará el fetch, fuera del useEffect
    const dataFetching = async () => {
        try {
            setIsLoading(true) //seteamos el valor de isLoading a true (está cargando/realizando la petición)
            const res = await fetch(url, {
                //le pasamos la url y un objeto de configuración con metodo y config de credenciales (bloque try/catch)
                method: 'GET',
                credentials: 'include'
            })
            //evaluamos el valor "ok" del objeto de respuesta que nos devuelve el método fetch(), si es true realizamos por camino de éxito
            if (!res.ok) { //de donde sale este objeto res? el método del navegador fetch() crea su propio objeto respuesta con atributos a los que se puede acceder como "ok", el cual tendrá un valor booleano true o false, de ahí nuestra evaluación
            //en caso de petición fallida, seteamos error con status (código http) del objeto res y statusText (descripción)
                setIsLoading(false)
                return setError(`Error: ${res.status} ${res.statusText}`)
            } else {
                const cleanRes = await res.json() //convertimos a json los datos crudos del fetch
                setData(cleanRes) //seteamos data con los datos que convertimos a json
                setIsLoading(false) //seteamos isLoading a false (terminó la petición, no hay más carga de espera)
            }
        } catch (error) {
            setIsLoading(false) //apagamos carga de espera
            return setError(error.message)
        }
    }

    //useEffect, función que manejará efectos secundarios, en este caso la operación asíncrona
    useEffect(() => {
        dataFetching() 
    }, [url]) //este array de dependencias lleva dentro el argumento genérico que baja de la función padre "url"
    //esto es así para que, cada vez que la url cambie al ser manejada por otros componentes, el "efecto" de ese cambio se refleje y vuelva a dispararse la función que realiza el fetch (pero hacia esa url)
    //el array de dependencias es un mecanismo de observación, si esta vacío se ejecuta una sola vez para no hacerlo más, pero si le colocamos algo dentro (por ej, una variable o argumento) le estamos diciendo: "prestale atención a esto, y en el momento que cambie volvé a ejecutar lo que hay dentro del useEffect"

    //retornamos un objeto con los valores de data, isLoading y error para luego ser desestructuramos en otro componente funcional que utilice este hook
    return ({data, isLoading, error})
}