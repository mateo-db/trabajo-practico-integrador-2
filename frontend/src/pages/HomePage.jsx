import { useFetch } from "../hooks/useFetch"
//importamos hook

export const HomePage = () => {
    //desestructuramos estados desde nuestro fetch indicandole el endpoint en nuestro backend
    const {data, isLoading, error} = useFetch('/api/articles')

    //evaluamos, si isLoading está en true retornamos mensaje de carga
    if (isLoading == true) {
        return <p>Cargando...</p>
    }

    //si error está en true, retornamos mensaje de error y el error en sí guardado dentro del estado error
    if (error == true) {
        return (
            //fragments
            <>
                <p>Lo sentimos, ocurrió un error al cargar la página</p>
                <p>{error}</p>
            </>
        )
    }

    //si el arreglo que devuelve nuestro fetch en "data" viene vacío (no hay árticulos publicados todavía), retornamos mensaje descriptivo
    //para analizar si el arreglo está vacío, usamos la propiedad nativa .length que devuelve cantidad númerica de elementos dentro del arreglo, si esa cantidad es igual a cero sabremos que nuestro array esta vacío
    if (data.length === 0) {
        return <p>"No hay árticulos publicados"</p>
    }

    //en caso de que no hayan problemas y se encuentren árticulos, retornamos jsx con elemento contenedor div que tendrá titulo de la homepage y renderizado dinámico de lista con articulos e info
    //aplicamos metodo map (que mira a cada elemento del arreglo y devuelve un arreglo nuevo) a nuestra variable/estado con la data de los árticulos, como parametro del map pasamos una función callback
    //a su vez esta función callback tendrá como parametros nombre de variable génerica article (que representará a cada elemento del arreglo, que serán objetos) y por cada elemento articulo accederemos a sus propiedades dinámicamente mediante puntos, ya que cada árticulo es un objeto
    //en la etiqueta li ponemos SI o SI atributo clave key que tendrá como valor el id de cada árticulo, esto es necesario para que React identifique cada lista correctamente
    return (
    <div>
            <h1>Home</h1>
            <ul>
                {data.map((article) => (
                    <li key={article.id}>
                        <h3>Título del Árticulo: {article.title}</h3>
                        <p>Resumen: {article.excerpt}</p>
                        <p>Autor: {article.author}</p>
                    </li>
                ))}
            </ul>
    </div>
    )
}
