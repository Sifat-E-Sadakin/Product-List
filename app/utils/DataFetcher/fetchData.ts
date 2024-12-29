const baseURL = "https://dummyjson.com/";

export const fetchData = async (endPoint: string) => {
  try {
    const response = await fetch(`${baseURL}${endPoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
