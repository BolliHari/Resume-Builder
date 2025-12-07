// import OpenAI from "openai";

// const ai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//     baseURL: process.env.OPENAI_BASE_URL,
// });

// export default ai


// ai.js (or aiFile.js)
import { GoogleGenAI } from "@google/genai";

// 1. The GoogleGenAI SDK automatically looks for the GEMINI_API_KEY 
// or GOOGLE_API_KEY environment variable.
const ai = new GoogleGenAI({apiKey: "AIzaSyCBnj6J8G0RllPSLw49qqu2QNzdCDlU1Lk"});

// If you must initialize with the specific key:
// const ai = new GoogleGenAI({ apiKey: process.env.OPENAI_API_KEY }); 
// (assuming you change the env key name later)

export default ai;