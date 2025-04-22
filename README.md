# 🎯 Customer Query Management (CQM) System

A modern, efficient customer query management system built with the MERN stack, designed to streamline customer support operations for small businesses and startups.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-v5+-green.svg)
![Express.js](https://img.shields.io/badge/Express.js-v4.19-blue.svg)
![React](https://img.shields.io/badge/React-v18+-blue.svg)

## 📋 Overview

CQM is a web-based solution that enables businesses to efficiently manage, track, and resolve customer queries through a centralized dashboard. It provides a simple interface for customers to submit queries and a comprehensive admin panel for support staff to manage these queries.

## ✨ Features

- 📝 User-friendly query submission form
- 🎛️ Admin dashboard for query management
- 🔄 Real-time query status updates (Pending/In Progress/Resolved)
- 🔍 Query filtering and search capabilities
- 💾 Persistent storage with MongoDB
- 🔌 RESTful API architecture

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/abuvakar/cqm.git
cd cqm
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd backapp
npm install

# Install frontend dependencies
cd ../frontapp
npm install
```

3. Configure environment variables
```bash
# In the backapp directory, create a .env file
cp .env.example .env

# Edit .env with your MongoDB URI and other configurations
MONGODB_URI=your_mongodb_uri
PORT=8000
```

4. Start the application
```bash
# Start backend server (from backapp directory)
npm start

# Start frontend development server (from frontapp directory)
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## 📋 System Requirements

### Backend Requirements
- Node.js v18 or higher
- MongoDB v5 or higher
- npm or yarn package manager
- Python 3.8+ (for some dependencies)

### Frontend Requirements
- Node.js v18 or higher
- npm v8 or higher
- Modern web browser (Chrome, Firefox, Safari, or Edge)

## 🛠️ Detailed Setup Guide

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backapp
```

2. Install Python dependencies (if not already installed):
```bash
pip install -r requirements.txt
```

3. Install Node.js dependencies:
```bash
npm install
```

4. Create and configure your `.env` file:
```bash
# Create .env file
cp .env.example .env

# Add the following configurations to .env
MONGODB_URI=mongodb://localhost:27017/cqm
PORT=8000
NODE_ENV=development
```

5. Start the backend server:
```bash
npm start
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## 📱 Usage Guide

### For Customers
1. Access the customer portal at `http://localhost:3000`
2. Click on "Submit New Query" button
3. Fill in the required information:
   - Full Name
   - Email Address
   - Query Subject
   - Query Description
4. Submit the form
5. Note down the Query ID for future reference
6. Track query status using the Query ID

### For Administrators
1. Access the admin dashboard at `http://localhost:3000/admin`
2. View all customer queries in the dashboard
3. Click on individual queries to:
   - View complete query details
   - Update query status
   - Add internal notes
   - Assign to team members
4. Use filters to sort queries by:
   - Status (Pending/In Progress/Resolved)
   - Date
   - Priority

### Common Operations
- **View Query Status**: Enter Query ID on the homepage
- **Update Query**: Use the admin dashboard
- **Export Data**: Use the "Export to CSV" feature in admin dashboard
- **Generate Reports**: Available in the admin dashboard under "Reports"

## 🔧 Troubleshooting

### Common Issues and Solutions

1. **MongoDB Connection Error**
```bash
# Check if MongoDB is running
mongosh

# Verify MongoDB URI in .env file
cat .env
```

2. **Node.js Dependencies Issues**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

3. **Port Already in Use**
```bash
# Kill process using port 3000 (Frontend)
npx kill-port 3000

# Kill process using port 8000 (Backend)
npx kill-port 8000
```

## 🔌 API Endpoints

### Query Management
```
GET    /api/queries         # List all queries
POST   /api/queries         # Create new query
GET    /api/queries/:id     # Get specific query
PUT    /api/queries/:id     # Update query status
DELETE /api/queries/:id     # Delete query
```

### Sample Query Object
```json
{
  "id": "12345",
  "customerName": "John Doe",
  "email": "john@example.com",
  "subject": "Product Inquiry",
  "description": "Need information about product X",
  "status": "pending",
  "createdAt": "2025-04-22T10:30:00Z"
}
```

## 🛣️ Roadmap

- [ ] User authentication and authorization
- [ ] Email notifications for status updates
- [ ] Analytics dashboard
- [ ] Mobile responsive design
- [ ] Query prioritization
- [ ] Automated ticket routing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contact

Project Link: [https://github.com/abuvakar](https://github.com/abuvakar)

## 🙏 Acknowledgments

- MongoDB for the database solution
- Express.js for the backend framework
- React for the frontend library
- Node.js for the runtime environment
