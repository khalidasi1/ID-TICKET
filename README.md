# Saudi Football Ticket Booking System 🎫⚽ (نظام حجز تذاكر مباريات)

A modern, full-stack mobile application for booking football match tickets in Saudi Arabia. Built with **React Native (Expo)** and **FastAPI**, featuring a premium Dark Theme UI, seat selection, and secure booking logic.

## ✨ Features (المميزات)

- **📱 User Interface**:
  - Premium **Dark Mode** design.
  - Interactive **Explore Page** with grid view.
  - **Match Cards** with live date badges.
  - **Horizontal Navigation** for easy filtering.

- **🎟️ Booking System**:
  - **Seat Selection**: Choose from Gold, Silver, and Bronze categories.
  - **Accordion Dropdowns**: Expand categories to see available seats.
  - **Dynamic Pricing**: Price updates based on seat category.
  - **Cart Management**: Add tickets to cart, view total.
  - **Smart Validation**: 🛡️ Prevents purchasing the same ticket twice (checks both purchased tickets and active cart items).

- **👤 User Profile**:
  - View purchased tickets history.
  - Track sales (if acting as a seller).
  - Wallet balance.

## 🛠️ Tech Stack (التقنيات المستخدمة)

### Frontend 📱
- **React Native** (Expo SDK 52)
- **TypeScript**
- **Expo Router** (File-based routing)
- **React Native Safe Area Context**
- **Vector Icons** (Ionicons, Feather)

### Backend 🔙
- **Python**
- **FastAPI**
- **Uvicorn** (ASGI Server)

## 🚀 Getting Started (طريقة التشغيل)

### Prerequisites
- Node.js & npm
- Python 3.x
- Expo Go app (on your phone) or Android/iOS Simulator

### 1. Backend Setup 🔧

Navigate to the backend directory:
```bash
cd backend
```

Create a virtual environment (optional but recommended):
```bash
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

Install dependencies (if `requirements.txt` exists, otherwise install FastAPI):
```bash
pip install fastapi uvicorn
```

Run the server:
```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
> The backend will start on `http://localhost:8000`.

### 2. Frontend Setup 📱

Open a new terminal and navigate to the frontend directory:
```bash
cd fotball_ticket_react_native
```

Install dependencies:
```bash
npm install
```

Start the Expo server:
```bash
npx expo start
```
- Press `w` to run in the **Web Browser**.
- Press `a` to run on **Android Simulator**.
- Scan the QR code with **Expo Go** on your physical device.

## 📸 Screenshots

| Explore Page | Seat Selection |
|---|---|
| Dark theme, grid view, smooth cards. | Accordion categories, seat picker. |

## 🏗️ Project Structure

```
root/
├── backend/                 # FastAPI Backend
│   └── main.py
├── fotball_ticket_react_native/  # Expo Frontend
│   ├── app/                 # Screens & Routing
│   │   ├── (tabs)/          # Main tabs (Home, Cart, Profile)
│   │   ├── book.tsx         # Booking Screen
│   │   └── explore.tsx      # Show All Tickets
│   ├── components/          # Reusable UI (Ticket, Match, Banner)
│   ├── contexts/            # Cart & App State
│   └── assets/              # Images & Fonts
└── README.md                # Project Documentation
```

## 📝 Validations

- **Duplicate Purchase**: The app checks if you already own a ticket or if it's currently in your cart before allowing a new purchase.
- **Seat Availability**: Visual indicators for selected seats.

---
Developed with ❤️ for the Saudi Football Community.
