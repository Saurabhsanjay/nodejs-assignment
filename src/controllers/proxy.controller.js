const { redisClient } = require("../db/connection");
const weatherService = require("../services/proxy.service");

// for  get weather data from Redis cache or API
async function getWeather(req, res) {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({ error: "Location is required" });
    }
    redisClient.get(location, async (error, cachedData) => {
      if (error) {
        console.error("Redis error:", error);
      }

      if (cachedData) {
        const weatherData = JSON.parse(cachedData);
        res.status(200).json(weatherData);
      } else {
        const weatherData = await weatherService.getWeatherData(
          location,
          process.env.WEATHER_API_KEY
        );

        redisClient.setex(location, 60, JSON.stringify(weatherData));

        res.status(200).json(weatherData);
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve weather data" });
  }
}

module.exports = {
  getWeather,
};
