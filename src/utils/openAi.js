import OpenAI from 'openai';
import { openAi_key } from './constants';

const openAi = new OpenAI({
    apiKey: openAi_key,
    dangerouslyAllowBrowser: true// This is the default and can be omitted
});

export default openAi