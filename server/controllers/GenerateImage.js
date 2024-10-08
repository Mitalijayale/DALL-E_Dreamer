import * as dotenv from 'dotenv';
import axios from 'axios';
import { createError } from '../error.js';

dotenv.config();

// Setup Getimg.ai API key
const apiKey = process.env.GETIMG_API_KEY;

// Controller to generate an image from text
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;  // Text prompt for image generation

    // Define the request payload
    const requestPayload = {
      prompt: prompt,  // Text prompt for generating the image
    };

    // Make the API request to Getimg.ai
    const response = await axios.post(
      "https://api.getimg.ai/v1/essential-v2/text-to-image",  // Endpoint for text-to-image
      requestPayload,
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    // Log the entire response for debugging
    console.log("API Response:", response.data);

    // Check if response data and data array exist
    if (response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
      const generatedImage = response.data.data[0].b64_json;  // Adjust according to the actual response format
      const base64Image = `data:image/png;base64,${generatedImage}`;
      res.status(200).json({ photo: base64Image });
    } else {
      // Handle case where response data is not in the expected format
      res.status(500).json({ error: "Unexpected response format from API" });
    }
  } catch (error) {
    console.error("Error generating image:", error.response ? error.response.data : error.message);
    next(
      createError(
        error.response?.status || 500,
        error.response?.data?.error?.message || error.message
      )
    );
  }
};
