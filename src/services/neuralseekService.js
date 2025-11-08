import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_NEURALSEEK_API_URL || 'https://api.neuralseek.com/v1';
const API_KEY = process.env.REACT_APP_NEURALSEEK_API_KEY;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

const cleanJSON = (str) => {
  return str.replace(/```json\n?|\n?```/g, '').trim();
};

export async function extractCallData(transcript) {
  try {
    const prompt = `Extract the following information from this call transcript and return as JSON:
    1. summary: A brief summary of the call (2-3 sentences)
    2. key_points: Array of key discussion points
    3. action_items: Array of action items discussed
    4. next_steps: Array of next steps agreed upon

    Transcript: ${transcript}

    Return only valid JSON.`;

    const response = await axiosInstance.post('/ask', {
      question: prompt,
      temperature: 0.3
    });

    const jsonStr = cleanJSON(response.data.answer);
    const data = JSON.parse(jsonStr);

    return {
      success: true,
      data: {
        ...data,
        confidence: 0.85
      }
    };
  } catch (error) {
    throw new Error(`Failed to extract call data: ${error.message}`);
  }
}

export async function generateEmail(callData, recipientName = 'Contact') {
  try {
    const prompt = `Generate a professional follow-up email based on this call data:
    Summary: ${callData.summary}
    Key Points: ${callData.key_points.join(', ')}
    Action Items: ${callData.action_items.join(', ')}

    Create an email with:
    1. subject: A professional subject line
    2. body: A personalized, professional email body

    Return as JSON with "subject" and "body" fields.`;

    const response = await axiosInstance.post('/ask', {
      question: prompt,
      temperature: 0.7
    });

    const jsonStr = cleanJSON(response.data.answer);
    const emailData = JSON.parse(jsonStr);

    return {
      success: true,
      email: emailData
    };
  } catch (error) {
    throw new Error(`Failed to generate email: ${error.message}`);
  }
}

export async function processTranscript(transcript, options = {}) {
  try {
    const callExtraction = await extractCallData(transcript);
    const emailGeneration = await generateEmail(callExtraction.data, options.recipientName);

    return {
      json_data: {
        call_id: `call_${Date.now()}`,
        timestamp: new Date().toISOString(),
        recipients: options.recipients || ['team@company.com'],
        ...callExtraction.data
      },
      email_draft: emailGeneration.email
    };
  } catch (error) {
    throw error;
  }
}
