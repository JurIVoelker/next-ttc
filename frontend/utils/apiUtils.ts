import axios from "axios";

export const apiRequest = async (path: string) => {
  try {
    const res = await axios.get(process.env.TT_API_URL + path, {
      headers: {
        Authorization: process.env.TT_API_KEY,
      },
    });
    console.log({ data: res.data });
    return res.data;
  } catch (error) {
    console.error("Error fetching data from the API:", error.status);
    return null;
  }
};
