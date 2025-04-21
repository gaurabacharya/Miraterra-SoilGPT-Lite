# SoilGPT Lite 🌱

A lightweight, LLM-powered agronomic assistant that helps users analyze soil data and get expert recommendations for crop suitability and soil health improvements.

## Demo
https://youtu.be/K7sMYIsLOuY

## Overview

SoilGPT Lite is a prototype that demonstrates the power of Retrieval-Augmented Generation (RAG) in agricultural applications. It allows users to upload soil data and ask natural language questions about crop suitability, soil health, and improvement strategies. The project showcases how LLM infrastructure can be integrated into agricultural workflows, providing a user-centric interface for soil analysis.

## Features

### 📊 Data Upload
- CSV file upload through Streamlit UI
- CLI version with command-line flag parsing
- Required soil parameters:
  - Nitrogen (N)
  - Phosphorus (P)
  - Potassium (K)
  - pH
  - Moisture

### 💬 Question-Answer Interface
Ask natural language questions such as:
- "Can I grow clover in this soil?"
- "What amendments should I make?"
- "Is this soil suitable for tomatoes?"

### 🔍 RAG Pipeline - what we're mimicking for prototype
- **Retriever**: FAISS vector search on embedded soil facts
- **Generator**: GPT-4-turbo via LangChain + OpenAI API
- **Knowledge Base**: Embedded soil facts (static for demo)
  - Optimal pH/NPK levels per crop
  - Crop-specific requirements
  - Soil amendment recommendations

### 💻 Multiple Interfaces
- **Web UI**: Streamlit-based interface for data upload and queries
- **CLI**: Command-line interface mimicking Slack query format
  ```bash
  $ soilgpt "Is this soil too acidic for carrots?"
  ```

### 🎫 Jira Integration
- Option to log recommendations as Jira tasks
- Task format: `LOG: [Jira] Create Task: Amend pH for tomato patch`

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/gaurabacharya/wartsila-soilgpt.git
cd soilgpt-lite
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. For CLI usage
```bash
npm run start:cli
```

## Project Structure
```
soilgpt-lite/
├── src/
│   ├── cli/           # CLI implementation
│   ├── components/    # React components
│   ├── lib/          # Core functionality
│   └── pages/        # Web interface pages
├── public/           # Static assets
└── ...
```

## Technologies Used
- React + TypeScript
- Vite
- TailwindCSS
- LangChain
- OpenAI API
- FAISS
- Streamlit

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Inspired by Miraterra's use of RAG and LLM integrations in agronomy
- Built with modern web technologies and AI/ML tools
