export async function extractCallData(transcript) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          summary: 'Discussed Q4 sales strategy and client expansion plans. Reviewed pipeline opportunities and agreed on follow-up actions.',
          key_points: [
            'Q4 sales target: $2.5M',
            'Three new prospects identified',
            'Need to expedite proposal for Enterprise client',
            'Team to conduct training on new product features'
          ],
          action_items: [
            'Send proposal to prospect by Friday',
            'Schedule training session for next week',
            'Update CRM with new leads',
            'Prepare quarterly report'
          ],
          next_steps: [
            'Follow-up call with prospect next Tuesday',
            'Review feedback by end of week',
            'Team meeting to align on strategy'
          ],
          confidence: 0.92
        }
      });
    }, 2000);
  });
}

export async function generateEmail(callData, recipientName = 'Contact') {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        email: {
          subject: `Follow-up: Q4 Sales Strategy Discussion - Next Steps`,
          body: `Hi ${recipientName},

Thank you for the productive discussion today. I wanted to follow up on the key points we covered:

Key Takeaways:
- Q4 sales target: $2.5M
- Three new prospects identified in the pipeline
- Enterprise client proposal needs expedited review
- Product training session required for the team

As discussed, here are the action items and timeline:

1. Send proposal to prospect by Friday
2. Schedule training session for next week
3. Update CRM with new leads by EOD tomorrow
4. Prepare quarterly report for review

Next Steps:
- Follow-up call with prospect scheduled for Tuesday
- We'll review feedback by end of this week
- Full team alignment meeting on strategy coming up

Please let me know if you have any questions or would like to discuss any of these points further. I look forward to our continued collaboration.

Best regards,
Sales Team`
        }
      });
    }, 1500);
  });
}

export async function processTranscript(transcript, options = {}) {
  const callData = await extractCallData(transcript);
  const emailData = await generateEmail(callData.data, options.recipientName || 'Contact');

  return {
    json_data: {
      call_id: `call_${Date.now()}`,
      timestamp: new Date().toISOString(),
      recipients: options.recipients || ['team@company.com'],
      ...callData.data
    },
    email_draft: emailData.email
  };
}
