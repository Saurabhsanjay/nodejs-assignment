

const axios = require("axios");




async function getWeatherData(location, apiKey) {
  try {
    const response = await axios.get(
      `${process.env.WEATHER_API_BASE_URL}/v1/current.json`,
      {
        params: {
          q: location,
          key: apiKey,
          aqi: "no",
        },
      }
    );

    // Return the weather data
    return response.data;
  } catch (error) {
    console.error("Error accessing external weather API:", error);
    throw new Error("Failed to retrieve weather data");
  }
}

module.exports = {
  getWeatherData,
};
