import axios from "axios";
import { useState, useEffect } from "react";

// get array of data without parameter
export const useAxiosGetArray = (service, url, timeout) => {

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
        service.get(url, {
            cancelToken: cancelSource.token,
            timeout: timeout
        })
            .then(response => {
                if (!unmounted) {
                    setDataArray(response.data);
                    setStatus(response.status)
                }
            })
            .catch(error => {
                if (!unmounted) {
                    console.log("error: " + error)
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

    return { dataArray, error, errorMessage, status };
};

// get array of data with parameter
export const useAxiosGetArrayParams = (service, url, timeout, config) => {

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
                    //TODO:error can have response or just a simple string,make it dynamic plz
                    console.log("error: " + error)
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

    return { dataArray, error, errorMessage, status };
};