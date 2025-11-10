# SBUHacks-2025
SBU Hacks Project includes use of NeuralSeek
An AI-powered React application that processes sales call transcripts and automatically generates structured analysis and personalized follow-up emails.

# Sales Follow-Up Platform

An AI-powered React application that processes sales call transcripts and automatically generates structured analysis and personalized follow-up emails.

## Features

- 📤 **Drag-and-Drop File Upload** - Easy transcript upload with `.txt` file support
- 🤖 **AI-Powered Analysis** - Extracts summaries, key points, and action items from transcripts
- 📧 **Email Generation** - Automatically creates professional follow-up emails
- 📊 **JSON Export** - Download structured call data as JSON
- 📋 **Copy to Clipboard** - Quick copy of analysis and email content
- ✨ **Beautiful UI** - Modern gradient design with smooth animations
- 🚀 **Mock Service** - Test the app without API credentials
- 🔌 **Real API Integration** - Ready to connect to NeuralSeek API

## Tech Stack

- **Frontend Framework**: React 19.0.0
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: Lucide React icons
- **File Upload**: React Dropzone
- **HTTP Client**: Axios
- **Build Tool**: React Scripts 5.0.1
- **CSS Processing**: PostCSS with Autoprefixer

## Project Structure

```
src/
├── App.js                          # Main application component
├── App.css                         # Application styling and animations
├── index.js                        # React DOM entry point
├── index.css                       # Global Tailwind directives
├── components/
│   ├── FileUpload.jsx             # Drag-and-drop file upload
│   ├── ProcessingStatus.jsx       # Loading animation component
│   ├── JSONViewer.jsx             # Formatted JSON display
│   ├── EmailPreview.jsx           # Email preview component
│   └── ResultsDisplay.jsx         # Results display with export options
└── services/
    ├── mockService.js             # Mock API for testing
    └── neuralseekService.js       # Real NeuralSeek API integration

public/
├── index.html                     # HTML template

Configuration Files:
├── package.json                   # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
└── .env                          # Environment variables (not committed)
```

## Installation

### Prerequisites
- Node.js 16+ and npm installed

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/TeooL/sales-followup-platform.git
   cd sales-followup-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (optional, for real API)
   ```bash
   cp .env.example .env
   # Edit .env with your NeuralSeek API credentials
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

## Usage

### Basic Workflow

1. **Upload Transcript**
   - Drag and drop a `.txt` file containing a sales call transcript
   - Or click to browse and select a file

2. **Process**
   - Click "Process Transcript" button
   - Wait for AI analysis to complete (mock service takes ~3.5 seconds)

3. **View Results**
   - **Call Analysis (JSON)**: Structured data with summary, key points, action items, and next steps
   - **Follow-up Email**: Professional email ready to send

4. **Export**
   - **Copy JSON**: Copy the structured data to clipboard
   - **Download**: Save JSON file to your computer
   - **Copy Email**: Copy the email body to clipboard
   - **Process Another**: Start over with a new transcript

### Example Transcript Format

```
Sales Call Transcript - November 8, 2025

Sales Rep: Good morning, thanks for taking the time to speak with me today.

Client: Of course. We've been interested in your solution.

Sales Rep: Great! I wanted to discuss our Q4 pricing and see if we can get you set up with a demo.

Client: That would be helpful. We need to finalize our budget by end of month...

[Rest of transcript]
```

## Configuration

### Environment Variables

Create a `.env` file in the project root (not committed to git):

```env
REACT_APP_NEURALSEEK_API_URL=https://api.neuralseek.com/v1
REACT_APP_NEURALSEEK_API_KEY=your_api_key_here
```

**Note**: The app uses the **mock service by default**. To switch to the real NeuralSeek API:

1. Add your credentials to `.env`
2. In `src/App.js`, change line 7:
   ```javascript
   // FROM:
   import * as transcriptService from './services/mockService';
   
   // TO:
   import * as transcriptService from './services/neuralseekService';
   ```

### API Response Format

Both services return data in this format:

```json
{
  "json_data": {
    "call_id": "call_1731081234567",
    "timestamp": "2025-11-08T21:00:34.567Z",
    "recipients": ["team@company.com"],
    "summary": "Brief overview of the call",
    "key_points": ["Point 1", "Point 2"],
    "action_items": ["Action 1", "Action 2"],
    "next_steps": ["Step 1", "Step 2"],
    "confidence": 0.92
  },
  "email_draft": {
    "subject": "Follow-up: [Subject Line]",
    "body": "Professional email content..."
  }
}
```

## Available Scripts

```bash
# Start development server
npm start

# Create production build
npm run build

# Run tests
npm test

# Eject configuration (one-way operation)
npm run eject
```

## Component Documentation

### FileUpload.jsx
Handles file drag-and-drop and upload. Accepts `.txt` files and reads content as text.

**Props:**
- `onFileUpload(content)` - Callback with file content

### ProcessingStatus.jsx
Shows loading animation during transcript processing with step indicators.

### JSONViewer.jsx
Displays formatted JSON data with scrollable container.

**Props:**
- `data` - Object to display as JSON

### EmailPreview.jsx
Shows email subject and body in a formatted preview.

**Props:**
- `email` - Object with `subject` and `body` properties

### ResultsDisplay.jsx
Main results view with copy/download functionality and action buttons.

**Props:**
- `results` - Object with `json_data` and `email_draft`
- `onReset()` - Callback to process another transcript

## Styling

The app uses Tailwind CSS v3 with custom CSS animations:

- `fadeInDown` - Header animation
- `slideUp` - Card animation
- `spin` - Loader animation
- `pulse` - Active state animation

Gradient Colors:
- Primary: `#667eea` to `#764ba2` (purple to violet)
- Error: `#f093fb` to `#f5576c` (pink to red)

## Troubleshooting

### npm start fails with "package.json not found"
Make sure you're in the project root directory and run `npm install` first.

### Tailwind CSS not loading
- Clear browser cache (Ctrl+Shift+Delete)
- Rebuild: `npm start`

### File upload not working
- Ensure file is `.txt` format
- Check browser console for errors (F12)
- Try a different file

### API errors
- Verify `.env` credentials are correct
- Check API endpoint URL
- Ensure API key has proper permissions

## Development

### Project Initialization
This project was bootstrapped with Create React App and uses:
- React 19 with Hooks
- Functional components
- Service layer pattern for API calls

### Adding Features
1. Create component in `src/components/`
2. Import and use in `App.js`
3. Add styling to `App.css` or use Tailwind classes

### Testing with Mock Service
The mock service simulates API delays (2-3.5 seconds) to test loading states and UI flow without API keys.

## Performance

- **First Load**: ~3-5 seconds (webpack compilation)
- **Processing**: 2-3.5 seconds with mock service
- **Bundle Size**: ~200KB gzipped (production build)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review component props and usage
3. Check browser console for error messages
4. Verify `.env` configuration if using real API

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Roadmap

- [ ] Support for other file formats (PDF, DOCX)
- [ ] Multiple language support
- [ ] Advanced filtering and search
- [ ] Email template customization
- [ ] CRM integration (Salesforce, HubSpot)
- [ ] Analytics dashboard
- [ ] User authentication
- [ ] Batch transcript processing
- [ ] Automatic recording and uploading transcripts

## Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- File handling with [React Dropzone](https://react-dropzone.js.org/)
