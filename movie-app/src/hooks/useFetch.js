import { useState, useEffect } from 'react';

function useFetch(url, options = {}) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url, options);
                const data = await res.json();
                setResponse(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, JSON.stringify(options)]);

    return { response, error, isLoading };
}

export default useFetch;