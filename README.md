# AI News Summary Project

This project provides an AI-powered news aggregation and summarization system for staying updated with the latest AI developments.

## Features

- 🤖 **AI News Processing**: Automatically processes and summarizes AI-related news articles
- 🗂️ **Vector Storage**: Stores article summaries in ChromaDB for semantic search
- 🌐 **Web Interface**: Clean, responsive web interface for browsing news
- 🔍 **Smart Search**: Vector-based search to find relevant articles
- 📱 **Mobile Friendly**: Responsive design that works on all devices

## Technologies Used

- **Python**: Backend processing and AI integration
- **Google Gemini**: AI model for generating summaries
- **ChromaDB**: Vector database for storing embeddings
- **SentenceTransformers**: Creating text embeddings
- **HTML/CSS/JavaScript**: Frontend web interface
- **MongoDB**: Article storage and retrieval

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment Variables**:
   Create a `.env` file with:
   ```
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

3. **Process Articles**:
   ```bash
   python ai_news.py
   ```

4. **Run Web Server**:
   Open `index.html` in your browser or serve it using a local web server.

## Project Structure

- `ai_news.py` - Main script for processing news and generating summaries
- `index.html` - Main web interface
- `script.js` - Frontend JavaScript functionality
- `style.css` - Website styling
- `output.json` - Generated news summaries
- `requirements.txt` - Python dependencies

## Usage

1. Run the AI processing script to generate summaries from your news data
2. Open the web interface to browse and search through AI news
3. Use the search functionality to find articles on specific topics
4. Subscribe to stay updated with the latest AI news

## Contributing

Feel free to contribute to this project by submitting issues or pull requests!

## License

This project is open source and available under the MIT License.
