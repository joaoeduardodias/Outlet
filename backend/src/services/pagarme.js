const axios = require("axios");
const api = axios.create({
  baseURL: "https://api.pagar.me/1",
});
const api_key = process.env.API_KEY;

module.exports = {
  createSplitTransaction: async (data) => {
    try {
      const response = await api.post("/transactions", {
        api_key,
        ...data,
      });
      return { error: false, data: response.data };
    } catch (error) {
      return { error: true, message: error.message };
    }
  },
};
