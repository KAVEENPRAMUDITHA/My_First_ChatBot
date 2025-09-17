#libraries and imports
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# LLM Initialize 
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.7)


prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an intelligent chatbot. Answer the user's question based on the conversation history."),
    MessagesPlaceholder(variable_name="history"), 
    ("human", "{question}")                      
])


parser = StrOutputParser()
chain = prompt | llm | parser


@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_question = data.get("message")
        history_from_frontend = data.get("history", [])

        chat_history = []
        for msg in history_from_frontend:
            if msg.get("sender") == "user":
                chat_history.append(HumanMessage(content=msg.get("text")))
            else:
                chat_history.append(AIMessage(content=msg.get("text")))

       
        response = chain.invoke({
            "history": chat_history,
            "question": user_question
        })

        return jsonify({"reply": response})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Server Error"}), 500


if __name__ == '__main__':
    app.run(port=5000, debug=True)