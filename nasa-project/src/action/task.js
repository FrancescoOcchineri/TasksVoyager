import axios from "axios";
import { urlRover, token } from "../api/api";

export const getTasks = () => {
    return async (dispatch) => {
        try {
            console.log("Eseguendo la richiesta API...");
            const response = await axios.get(urlRover + token);
            dispatch({ type: 'GET_TASKS', payload: response.data });
        } catch (error) {
            console.error('Errore nella richiesta API:', error);
        }
    };
};
