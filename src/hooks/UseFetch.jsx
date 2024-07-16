import { useState, useEffect } from "react";

function UseFetch(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const req = await fetch(url);
        if (!req.ok) {
          throw new Error("Xatolik!!");
        }
        const res = await req.json();
        setData(res.products);
        setIsPending(false);
      } catch (err) {
        setError(err.message);
        setIsPending(false);
      }
    };
    fetchData()
  }, [url]);
  return {data,isPending,error};
}

export default UseFetch;
