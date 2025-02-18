import { GoogleGenerativeAI } from "@google/generative-ai";
import { openAi_key } from "./constants";


const genAI = new GoogleGenerativeAI(openAi_key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default model