import OpenAI from 'openai';
import { openAi_key } from './constants';

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: openAi_key,
    dangerouslyAllowBrowser: true
});

export default openai