import axios from "axios";
import { useState, useEffect } from "react";

// get array of data with parameter
export const useAxiosGetArrayParams = (service, url, config) => {

    // Function State
    var [dataArray, setDataArray] = useState(null)
    var [status, setStatus] = useState(null)
    var [error, setError] = useState(false);
    var [errorMessage, setErrorMessage] = useState(null);

    // trigger after the first render / component update / component unmount
    useEffect(() => {

        // prevent update on unmounted component
        let unmounted = false;

        // creates the cancel token source
        var cancelSource = axios.CancelToken.source()

        // triggers the http get request to the / url in Authentication Service to get the current logged in user information 
        service.get(url, config)
            .then(response => {
                if (!unmounted) {
                    setDataArray(response.data);
                    setStatus(response.status)
                }
            })
            .catch(error => {
                if (!unmounted) {
                    if (typeof (error.response) !== 'undefined') {
                        if (!axios.isCancel(error)) {
                            setError(true);
                            setErrorMessage(error.response.data);
                            setStatus(error.response.status)
                        }
                    }
                }
            });
        return () => {
            unmounted = true;
            cancelSource.cancel();
        }
    }, [service, url, config]);

    return { dataArray, error, errorMessage, status };
};