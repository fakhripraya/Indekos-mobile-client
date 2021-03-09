import axios from "axios";
import { useState, useEffect } from "react";

// get data without parameter
export const useAxiosGet = (service, url, timeout) => {

    // Function State
    var [data, setData] = useState(null)
    var [status, setStatus] = useState(null)
    var [error, setError] = useState(false);
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
                    setData(response.data);
                    setStatus(response.status)
                }
            })
            .catch(error => {
                if (!unmounted) {
                    if (axios.isCancel(error)) {
                        // TODO: development only
                        console.log('Request canceled', error);
                    } else {
                        setError(true);
                        setErrorMessage(error.response.data);
                        setStatus(error.response.status)
                    }
                }
            });
        return () => {
            unmounted = true;
            cancelSource.cancel();
        }
    }, [service, url, timeout]);

    return { data, error, errorMessage, status };
};