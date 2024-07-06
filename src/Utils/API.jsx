const baseurl = "https://api.pexels.com/v1/";

const FetchDatabyQuery = async (query) => {
  try {
    const headers = {
      Authorization: import.meta.env.VITE_APIKEY,
    };

    if (query) {
      const response = await fetch(
        `${baseurl}search?query=${query}&per_page=40`,
        { headers }
      );

      if (!response.ok) {
        throw new Error("Data can't be fetched error...");
      }

      const data = await response.json();
      return data;
    } else {
      const response = await fetch(`${baseurl}curated`, { headers });

      if (!response.ok) {
        throw new Error("Data can't be fetched error...");
      }

      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error in FetchDatabyQuery:", error);
    throw error;
  }
};

export default FetchDatabyQuery;
