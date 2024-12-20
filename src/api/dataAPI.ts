const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const dataListAPI = async () => {
  const url = `${BASE_URL}/admin/api/user/api/list`;
  const token = localStorage.getItem("accesstoken");

  if (!token) {
    return;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.log(data);

  return await data;
};
