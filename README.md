# My First Full-Stack LangChain Chatbot 🤖

Welcome to my first full-stack chatbot project! This was a learning journey to understand how a powerful Python "brain" (built with LangChain and Google's Gemini) can be connected to a modern, interactive web "face" (built with React).

This project is a simple but complete demonstration of a client-server architecture for AI applications.

##  The Final Product

Here is a look at the finished chat application in action.

<img width="300" height="600" alt="image" src="https://github.com/user-attachments/assets/6414f1e9-0b9a-4651-8dd7-f2beb854c8c3" /> 
<img width="300" height="800" alt="image" src="https://github.com/user-attachments/assets/a0ddfce3-e7cb-4892-b3be-e46d1ce80725" />



##  How It Works: A Teacher's Explanation

Think of this application like a restaurant.

1.  **The Frontend (The Dining Area 🍽️):**
    This is the React application that the user sees in their browser. It's built to be interactive and user-friendly. When a user types a message, the Frontend's job is to send that "order" to the kitchen.

2.  **The Backend (The Kitchen 🧑‍🍳):**
    This is the Python Flask server. It can't be seen by the user. Its only job is to wait for "orders" from the Frontend. When an order arrives, it passes it to our master chef.

3.  **The Brain (The Master Chef 🧠):**
    This is our LangChain and Google Gemini model. It takes the user's question, thinks about the conversation history, and prepares a smart "dish" (the reply).

4.  **The API (The Waiter 🏃):**
    This is the connection between the Frontend and Backend (`http://localhost:5000/chat`). The `axios` library in our Frontend acts as the waiter, carrying messages back and forth.

**The Flow:**
`User` -> `React Frontend` -> `Flask Backend` -> `LangChain` -> `Gemini LLM` -> `Flask Backend` -> `React Frontend` -> `User`

## 💻 Tech Stack

**Backend :**
* **Python 3.9+**
* **Flask:** A micro web framework to create our server.
* **LangChain:** The core framework to structure and chain our AI logic.
* **Google Generative AI:** To connect with the powerful Gemini LLM.
* **CORS:** To allow the Frontend and Backend to communicate securely.
* **Dotenv:** To manage our secret API keys.

**Frontend :**
* **React:** A JavaScript library for building the user interface.
* **Axios:** Our "waiter" for making API requests to the backend.
* **CSS:** For styling and making the interface look good.

## Getting Started

To run this project on your own machine, follow these steps.

### 📂 Folder Structure
```
.
├── backend/            # The "Kitchen" - All our Python server code
│   ├── .env            # Secret API keys
│   └── app.py          # The main Flask server file
│
└── frontend/           # The "Dining Area" - All our React UI code
    ├── public/
    └── src/
        ├── App.css     # Styles for our app
        └── App.js      # The main React component
```

### Prerequisites

* Python 3.9 or higher
* Node.js and npm
* A Google AI Studio API Key

### 1. Backend Setup 

First, let's get our server running.

```bash
# 1. Navigate into the backend directory
cd backend

# 2. (If you followed the tutorial) Activate the conda environment
conda activate chatbot-env

# 3. Create a .env file in the 'backend' folder and add your API key:
# GOOGLE_API_KEY="YOUR_API_KEY_HERE"

# 4. Install the required Python packages
pip install -r requirements.txt 
# (Note: If you don't have a requirements.txt, install them manually:
# pip install Flask flask-cors langchain langchain-google-genai python-dotenv)

# 5. Run the Flask server (keep this terminal open)
python app.py
```
###2. Frontend Setup
Now, open a new, separate terminal to start the React app.
```
# 1. Navigate into the frontend directory from the project root
cd frontend

# 2. Install the required npm packages
npm install

# 3. Start the React application (this will open in your browser)
npm start
```
