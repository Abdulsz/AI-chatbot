Project live link: https://ai-chatbot-sand-alpha.vercel.app/

AI-Powered Computer Science Advisor

Overview:

This project is an AI-powered support agent designed to assist students majoring in Computer Science. It utilizes the power of OpenAI's GPT model to 
provide course recommendations, professor suggestions, and general advice for students at a fictional or specific college. The project is built using FastAPI 
for the backend and integrates with Pinecone to retrieve relevant contextual information based on user input.

Features:

Course Recommendations: Suggests classes and professors based on the user's input and current academic standing.
Context-Aware Conversations: Uses Pinecone to provide relevant information based on past interactions.
Interactive Frontend: A responsive frontend built with React and Material-UI that allows students to interact with the AI support agent.
Streamed Responses: The AI provides responses in real-time, improving user experience by streaming the output as it is generated.

Tech Stack:

Backend: FastAPI, OpenAI GPT-4, Pinecone, Uvicorn
Frontend: React, Material-UI, Next.js
Hosting: Vercel for frontend, FastAPI backend (can be hosted on Vercel or other platforms)
APIs: OpenAI, Pinecone

Issues Encountered & Resolutions:

SSL Issue: Encountered an SSL error due to an incorrect API endpoint. Resolved by verifying the endpoint and ensuring the correct API key was used.
Streaming Responses: Initial implementation did not stream responses correctly. The backend was modified to use FastAPI's StreamingResponse to stream data.
Pinecone Integration: Faced issues with integrating Pinecone for context-aware searches. Resolved by carefully constructing the embeddings and refining query logic.
