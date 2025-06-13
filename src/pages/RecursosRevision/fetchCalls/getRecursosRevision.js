import { URL_API } from "../../../utils/constants";

export const getRecursosRevision = async (token, isAdmin, dispatch, setRecursosRevision) => {
    const url = isAdmin 
        ? `${URL_API}/digitalizacion/certificaciones-todas/`
        : `${URL_API}/digitalizacion/certificaciones-usuario/`;

    try {
        const respuesta = await fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const resultado = await respuesta.json();
        dispatch(setRecursosRevision(resultado.certificaciones));
    } catch (error) {
        console.log(error);
    }
};