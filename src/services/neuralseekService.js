import axios from 'axios';
import { ChevronDownCircle } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_NEURALSEEK_API_URL || 'https://api.neuralseek.com/v1';
const API_KEY = process.env.REACT_APP_NEURALSEEK_API_KEY;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'apikey': API_KEY,
  },
  timeout: 30000
});

// Separate instance for multipart uploads
const uploadInstance = axios.create({
  baseURL: "https://stagingconsoleapi.neuralseek.com/stony14",
  headers: {
    'apikey': API_KEY,
    // Don't set Content-Type here, let axios set it automatically for multipart
  },
  timeout: 60000 // Longer timeout for file uploads
});

// Log API configuration for debugging
console.log('NeuralSeek API Base URL:', API_BASE_URL);
console.log('API Key configured:', !!API_KEY);

const cleanJSON = (str) => {
  return (str || '').replace(/```json\n?|\n?```/g, '').trim();
};

const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) return [value.trim()];
  if (value && typeof value === 'object') return Object.values(value);
  return [];
};

const formatListItem = (item) => {
  if (item === null || item === undefined) return null;
  if (typeof item === 'string') return item.trim();
  if (typeof item === 'number' || typeof item === 'boolean') return String(item);
  if (typeof item === 'object') {
    return (
      item.point ||
      item.action ||
      item.step ||
      item.description ||
      item.text ||
      item.value ||
      Object.values(item).join(': ')
    );
  }
  return null;
};

const normalizeList = (list) =>
  toArray(list)
    .map(formatListItem)
    .filter((item) => !!item);

const parseCallDataPayload = (payload) => {
  if (!payload) return {};
  if (typeof payload === 'string') {
    try {
      return JSON.parse(cleanJSON(payload));
    } catch (error) {
      console.warn('Failed to parse call data payload:', error);
      return {};
    }
  }
  return payload;
};

const normalizeCallData = (data = {}) => {
  const normalized = { ...data };

  normalized.summary = data.summary || data.summaryText || '';
  normalized.key_points = normalizeList(data.key_points ?? data.keyPoints);
  normalized.action_items = normalizeList(data.action_items ?? data.actionItems);
  normalized.next_steps = normalizeList(data.next_steps ?? data.nextSteps);

  return normalized;
};

const extractFollowUpEmail = (data = {}) => {
  const email = data.followUpEmail || data.follow_up_email || data.followupEmail;
  if (email && (email.subject || email.body)) {
    return {
      subject: email.subject || 'Follow-up from our discussion',
      body: email.body || ''
    };
  }
  return null;
};

export async function extractCallData(transcript, fileName) {
  try {
    const prompt = `Extract the following information from this call transcript and return as JSON:
    1. summary: A brief summary of the call (2-3 sentences)
    2. key_points: Array of key discussion points
    3. action_items: Array of action items discussed
    4. next_steps: Array of next steps agreed upon

    Transcript: ${transcript}

    Return only valid JSON.`;

    const response = await axiosInstance.post('', {
      question: prompt,
      ntl: prompt,
      api_key: API_KEY,
      agent: 'Main',
      params: [
        {
          "name": "conversationFile",
          "value": fileName
        }
      ]
    });

    const parsedData = parseCallDataPayload(response.data.answer);

    console.log(parsedData);

    return {
      success: true,
      data: {
        ...normalizeCallData(parsedData),
        confidence: parsedData.confidence ?? 0.85
      },
      rawData: parsedData
    };
  } catch (error) {
    console.error('Extract call data error:', error.response?.data || error.message);
    throw new Error(`Failed to extract call data: ${error.message}`);
  }
}

export async function generateEmail(callData, recipientName = 'Contact') {
  try {
    const normalizedCallData = normalizeCallData(callData);

    const prompt = `Generate a professional follow-up email based on this call data:
    Summary: ${normalizedCallData.summary}
    Key Points: ${normalizedCallData.key_points.join(', ')}
    Action Items: ${normalizedCallData.action_items.join(', ')}

    Create an email with:
    1. subject: A professional subject line
    2. body: A personalized, professional email body

    Return as JSON with "subject" and "body" fields.`;

    const response = await axiosInstance.post('', {
      question: prompt,
      ntl: prompt,
      api_key: API_KEY,
      agent: 'Main'
    });

    const jsonStr = cleanJSON(response.data.answer);
    const emailData = JSON.parse(jsonStr);

    return {
      success: true,
      email: emailData
    };
  } catch (error) {
    console.error('Generate email error:', error.response?.data || error.message);
    throw new Error(`Failed to generate email: ${error.message}`);
  }
}

export async function uploadTranscriptFile(file) {
  try {
    console.log('Uploading file:', file.name);

    // Create FormData for multipart/form-data
    const formData = new FormData();
    formData.append('file', file);


    const response = await uploadInstance.post('/exploreUpload', formData, {
      headers: {
        // Don't set Content-Type, let axios handle it automatically
        // It will set Content-Type: multipart/form-data with proper boundary
      }
    });

    console.log('Upload response:', response.data);

    return {
      success: true,
      data: response.data,
      fileId: response.data.fileId || response.data.id
    };
  } catch (error) {
    console.error('File upload error:', error.response?.data || error.message);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}

export async function processTranscript(transcript, fileName, options = {}) {
  try {
    const callExtraction = await extractCallData(transcript, fileName);
    const normalizedCallData = callExtraction.data;
    const rawCallData = callExtraction.rawData || {};

    let emailDraft = extractFollowUpEmail(rawCallData);
    if (!emailDraft) {
      const emailGeneration = await generateEmail(normalizedCallData, options.recipientName);
      emailDraft = emailGeneration.email;
    }

    return {
      json_data: {
        call_id: `call_${Date.now()}`,
        timestamp: new Date().toISOString(),
        recipients: options.recipients || ['team@company.com'],
        ...normalizedCallData
      },
      email_draft: emailDraft
    };
  } catch (error) {
    throw error;
  }
}
