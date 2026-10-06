import { useState, useEffect } from "react";

export const useForm = (form) => { // recibe los valores iniciales del form (cual sea su estructura, si register o login)
//tener en cuenta que el argumento de los parametros de useForm es uno genérico, es solo para describir lo que se recibe
    const [formValues, setFormValues] = useState(form) //desestructuramos elementos del arreglo que nos da useState, y el valor inicial o default que tendrá el estado de formValues será lo que recibamos por parametros de la función padre

    const handleInputChange = (e) => { //handler que recibirá el event object del navegador
        //se setean los valores del form pasandole al setter una función callback, que tomará como argumento el estado "actual" en el que quedó formValues dentro de la memoria de React, es a ese estado del form al que le haremos una copia con el spread operator para conservar los campos anteriores (los que no se modificaron) y actualizar SOLO el campo que cambió
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [e.target.name]: e.target.value
        }))
    }

    //handler para resetear el form a su forma inicial
    const handleReset = () => {
        setFormValues(form)
    }

    //retornamos el estado del form, el handler para manejar los estados y el handler para resetear el form a su valor inicial, mandamos todo como un objeto para luego ser desestructurado en el componente que lo use
    return {
        formValues,
        handleInputChange,
        handleReset
    }
}