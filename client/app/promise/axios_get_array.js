import axios from "axios";
import { useState, useEffect } from "react";

// get data array without parameter
export const useAxiosGetArray = (service, url, timeout) => {

    // Function State
    var [dataArray, setDataArray] = useState([])
    var [error, setError] = useState(false);
    var [loading, setLoading] = useState(true);
    var [errorMessage, setErrorMessage] = useState(null);

    // trigger after the first render / component update / component unmount
    useEffect(() => {

        // prevent update on unmounted component
        let unmounted = false;

        // creates the cancel token source
        cancelSource = axios.CancelToken.source()

        // triggers the http get request to the / url in Authentication Service to get the current logged in user information 
        service.get(url, {
            cancelToken: cancelSource.token,
            timeout: timeout
        })
            .then(response => {
                if (!unmounted) {
                    setLoading(false);
                    setDataArray(response.data);
                }
            })
            .catch(error => {
                if (!unmounted) {
                    setLoading(false);
                    if (axios.isCancel(error)) {
                        // TODO: development only
                        console.log('Request canceled', error.response.data);
                    } else {
                        setError(true);
                        setErrorMessage(e.message);
                    }
                }
            });
        return () => {
            unmounted = true;
            cancelSource.cancel();
        }
    }, [service, url, timeout]);

    return { data, loading, error, errorMessage };
};