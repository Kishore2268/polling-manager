# Polling Manager

A modern, real-time polling application that allows users to cast votes and visualize voting trends through interactive charts and tables.

## 🌟 Features

- **Vote Casting**: Users can submit their votes with name and date
- **Real-time Updates**: Automatic refresh of data when new votes are cast
- **Interactive Charts**:
  - Line chart showing voting trends over time
  - Bar chart displaying overall vote distribution
- **Responsive Design**: Beautiful UI that works on all devices
- **Data Validation**: Server-side validation for vote submissions
- **Error Handling**: Graceful error handling and user feedback

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS for styling
- Chart.js for data visualization
- Axios for API requests

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL database
- Express Validator for input validation

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database
- Git

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/polling-manager.git
cd polling-manager
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add the following variables:
```
DATABASE_URL="postgresql://username:password@localhost:5432/polling_db"
PORT=4000
```

4. Set up the database:
```bash
cd backend
npx prisma migrate dev
```

5. Start the development servers:
```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## 📝 API Endpoints

- `POST /vote` - Submit a new vote
- `GET /data` - Get all votes
- `GET /counts` - Get vote counts for line chart
- `GET /results` - Get overall vote results for bar chart

## 🎨 UI Features

- Gradient backgrounds and hover effects
- Loading spinners for better UX
- Responsive tables and charts
- Error and success notifications
- Modern card-based layout

## 🔒 Data Validation

The application includes validation for:
- Name (2-50 characters, letters and spaces only)
- Voting choice (boolean)
- Date (must be valid and not in the future)

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
