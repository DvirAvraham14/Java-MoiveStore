import { useState, useEffect } from 'react';

/*
    useFetch custom hook is used to fetch data from the server.
    urlInit: the initial url to fetch data from.
    options: the options to be passed to the fetch function.
    response: the response from the server.
    error: the error from the server.
    isLoading: a boolean to indicate if the data is being fetched or not.
    setUrl: a function to set the url to fetch data from.
 */
function useFetch(urlInit, options = { method: 'GET' }) {
    const [url, setUrl] = useState(urlInit); // State to store the url to fetch data from
    const [response, setResponse] = useState(null); // State to store the response from the server
    const [error, setError] = useState(null); // State to store the error from the server
    const [isLoading, setLoading] = useState(false); // State to store the loading state

    // Fetch the data from the server when the url changes
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if(!url) return;
                const res = await fetch(url, options)
                const data = await res.json();
                setResponse(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);
    return { response, error, isLoading ,setUrl};
}

export default useFetch;