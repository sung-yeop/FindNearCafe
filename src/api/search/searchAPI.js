import searchInstance from "./searchInstance";

export const searchLocal = async (query) => {
  try {
    const response = await searchInstance.get("/v1/search/local.json", {
      params: { query, display: 15 },
    });
    return response.data;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};
