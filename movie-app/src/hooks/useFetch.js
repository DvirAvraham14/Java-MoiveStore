import { useState, useEffect } from 'react';

function useFetch(urlInit, options = { method: 'GET' }) {
    const [url, setUrl] = useState(urlInit);
    const [response, setResponse] = useState({results: []});
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    console.log("useFetch: ", url);
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