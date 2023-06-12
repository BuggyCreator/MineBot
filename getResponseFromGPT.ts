import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const API_URL = process.env.API_URL ? process.env.API_URL : '';
const MODEL_NAME = process.env.MODEL_NAME;
const API_KEY = process.env.API_KEY;

export const getResponseFromGPT = async (role, prompt, TEMPERATURE, MAX_TOKENS) => {
  const requestBody = {
    messages: [{ role: role, content: prompt }],
    model: MODEL_NAME,
    temperature: TEMPERATURE,
    max_tokens: MAX_TOKENS,
  };
  try {
    const response = await axios.post(API_URL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + API_KEY,
      },
    });
    const reply = response.data.choices[0].message.content;
    return reply;
  } catch (error) {
    console.error(error);
  }
};
