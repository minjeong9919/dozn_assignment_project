import { useEffect, useState } from "react";
import { checkAccessToken } from "../utils/checkAccessToken";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    if (!response.ok || data.errYn === "Y") {
      setError(error);
    }

    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { fetchData, data, loading, error };
};
