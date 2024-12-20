import { useEffect, useState } from "react";
import { checkAccessToken } from "../utils/checkAccessToken";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    const apiUrl = `${BASE_URL}${url}`;
    const token = localStorage.getItem("accesstoken");

    checkAccessToken();

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.errYn === "Y" || !response.ok) {
      setError(true);
    }

    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(error);

  return { fetchData, data, loading, error };
};
