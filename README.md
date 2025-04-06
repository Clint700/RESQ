# RESQ: Emergency Assistance App

RESQ is a mobile-first full-stack emergency application designed to help users manage critical situations quickly and efficiently. It offers features like real-time alerting, emergency contact management, first-aid chatbot guidance, and location-based emergency services — all powered by a Node.js backend and a React Native frontend.

⸻

📱 Frontend (React Native + Expo)

Features
 🔴 Trigger Emergency Alerts
Instantly notify your contacts with your current location and custom message.
 📍 Live Location Integration
Captures device GPS and sends accurate coordinates with every alert.
 📇 Emergency Contacts Management
Add, update, or delete emergency contacts to stay prepared.
 🧠 AI Chatbot Assistance
A conversational AI assistant provides real-time first-aid help (e.g., CPR, burns, strokes).
 📦 Offline-friendly UX
Clean, responsive, and iOS-optimized design using native components.

Screens
 • EmergencyScreen: Trigger alerts and view past alert history.
 • ContactScreen: Manage emergency contacts.
 • MapScreen: Map with current location.
 • ChatbotScreen: Chat with the AI-powered first-aid assistant.

⸻

🧠 Backend (Node.js + Express + PostgreSQL)

Features
 • 🧾 Authentication (JWT)
Sign up, log in securely with tokens.
 • 🚨 Alerts API
 • POST /alerts/trigger: Trigger an alert (includes location, message, status).
 • GET /alerts: Fetch all alerts by user.
 • PATCH /alerts/:id: Update alert message, location, or status.
 • DELETE /alerts/:id: Remove an alert.
 • 📞 Contacts API
 • POST /contacts: Add new contact.
 • GET /contacts: Retrieve user’s contacts.
 • PATCH /contacts/:id: Edit a contact.
 • DELETE /contacts/:id: Delete contact.
 • 🤖 Chatbot API Integration
A single endpoint that communicates with OpenAI to fetch first-aid responses.

Technologies
 • Database: PostgreSQL with Knex migrations and seeding
 • Authentication: JWT-based middleware
 • AI Integration: OpenAI Chat Completion API (GPT-3.5/4)
 • Environment Config: dotenv + .env for API keys and DB secrets

⸻

🔧 Project Setup

🖥️ Backend

cd resq_backend
npm install
cp .env.example .env

# Add OPENAI_API_KEY, DB credentials, JWT secret, etc

# Run migrations and seed data

npm run migrate
npm run seed

# Start dev server

npm run dev

📱 Frontend

cd resq_frontend
npm install
npx expo start

Make sure your .env in mobile has:

API_BASE_URL=<https://resq-yafg.onrender.com>

⸻

🔐 Environment Variables (Server)

Key Description
OPENAI_API_KEY Your OpenAI key
DATABASE_URL PostgreSQL connection string
JWT_SECRET Secret for JWT auth

⸻

✅ Testing
 • Backend uses supertest and Jest
 • Run npm test in the server directory to test endpoints like alerts and contacts.

⸻

📸 UI & Experience

Built with accessibility, iOS optimization, and emergency-first UX in mind:
 • Color-coded status indicators (e.g., resolved = green, active = red)
 • Scrollable quick replies in chatbot
 • Large call-to-action buttons
 • Shadows and elevation for better clarity on mobile

⸻

📌 Roadmap
 • Alerts + contact CRUD
 • Emergency Chatbot (OpenAI-powered)
 • Location context support
 • Token-based auth
 • Push notifications
 • Twilio integration for real SMS alerts
 • Admin dashboard for managing alerts (future)

⸻

🤝 Contributing

 1. Fork the repo
 2. Make your changes
 3. Submit a PR and we’ll review!
 4. Make sure all new endpoints have tests

⸻

👨🏾‍💻 Author

Clinton — Full-stack dev | React Native specialist | Emergency-ready dev ✊
OpenAI Developer Console | Expo

⸻

“Built to respond fast, guide smarter, and keep you safe.” 🛡️
