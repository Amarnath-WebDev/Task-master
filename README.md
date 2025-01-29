# Task Master - Modern Task Management Application

## Overview
Task Master is a modern, feature-rich task management application built with React, TypeScript, and Material-UI. It helps users organize their tasks, manage time with a Pomodoro timer, and stay productive with an intuitive interface.

## Features

### 📋 Task Management
- Kanban board interface
- Drag and drop functionality
- Task categorization
- Priority levels
- Due dates
- Task descriptions
- Progress tracking

### ⏲️ Pomodoro Timer
- Customizable work/break intervals
- Audio notifications
- Visual progress tracking
- Session statistics

### 📅 Calendar Integration
- Task visualization
- Event planning
- Deadline tracking
- Monthly/weekly views

### 📊 Statistics Dashboard
- Task completion metrics
- Productivity analytics
- Progress visualization
- Time tracking statistics

### ⚙️ Settings & Customization
- Dark/Light theme
- Language preferences
- Notification settings
- Sound settings
- Profile management
- Security options

## Technology Stack

### Frontend
- React 18
- TypeScript
- Material-UI (MUI)
- Redux Toolkit
- React Router
- Lucide Icons

### State Management
- Redux for global state
- Local storage persistence
- Redux Toolkit for efficient Redux development

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository 
`
git clone https://github.com/Amarnath-WebDev/Task-master.git `


2. Install dependencies
` cd task-master `

` npm install `


3. Start the development server
`
npm run dev `


4. Build for production
`
npm run build`

## Project Structure

task-master/
├── src/
│ ├── components/
│ │ ├── Layout.tsx
│ │ ├── KanbanBoard.tsx
│ │ ├── PomodoroTimer.tsx
│ │ ├── Calendar.tsx
│ │ ├── Settings.tsx
│ │ └── StatsPanel.tsx
│ ├── store/
│ │ ├── index.ts
│ │ └── slices/
│ │ ├── tasksSlice.ts
│ │ └── themeSlice.ts
│ ├── theme/
│ │ └── index.ts
│ ├── App.tsx
│ └── main.tsx
├── public/
├── package.json
└── README.md 


## Key Features Explained

### Task Management
- Create, edit, and delete tasks
- Drag and drop between columns
- Set priority levels and due dates
- Add detailed descriptions
- Track progress

### Pomodoro Timer
- Customizable work/break intervals
- Audio notifications
- Visual progress tracking
- Session statistics

### Calendar
- Monthly and weekly views
- Task deadline visualization
- Event planning
- Integration with tasks

### Statistics
- Task completion metrics
- Productivity tracking
- Time analysis
- Progress visualization

### Settings
- Theme customization
- Language selection
- Notification preferences
- Profile management
- Security settings

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details

## Contact
Your Name - your.email@example.com
Project Link: https://github.com/yourusername/task-master

## Acknowledgments
- Material-UI for the component library
- Lucide Icons for the icon set
- React community for inspiration and support