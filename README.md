# TaskMaster 📝

A minimal yet powerful task manager app built with React and TypeScript. TaskMaster helps you create, track, organize, and complete daily tasks efficiently with an intuitive, distraction-free interface.

![TaskMaster Preview](https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop&crop=center)

## ✨ Features

### Core Features
- ✅ **Task Creation** - Add tasks with title, description, due date/time, priority, and categories
- 📋 **Task Management** - View, edit, delete, and toggle task completion
- 🏷️ **Categories & Tags** - Organize tasks with default and custom categories (Work, Personal, Study)
- 🔍 **Search & Filter** - Find tasks by title, filter by category, priority, and completion status
- 🎯 **Priority Levels** - Set task priorities (Low, Medium, High) with visual indicators
- 📅 **Due Dates** - Schedule tasks with dates and times, see overdue indicators
- 🔔 **Reminders** - Set reminder times for important tasks
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 💾 **Local Storage** - All data persists locally, works offline

### User Experience
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast Performance** - <200ms response times with smooth animations
- ♿ **Accessibility** - Full keyboard navigation and screen reader support
- 🎨 **Modern UI** - Clean, minimalist design with smooth transitions

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskmaster
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 Usage Guide

### Creating Tasks
1. Click the task input field or the "+" button
2. Enter a task title (required)
3. Optionally add description, due date, priority, category, and reminders
4. Click "Add Task" to save

### Managing Tasks
- **Complete Task**: Click the checkbox next to any task
- **Edit Task**: Click the edit (pencil) icon on any task
- **Delete Task**: Click the delete (trash) icon and confirm
- **Filter Tasks**: Use the filter button to show specific categories, priorities, or completion status
- **Search Tasks**: Type in the search bar to find tasks by title or description

### Organizing Tasks
- **Categories**: Tasks are automatically organized by Work, Personal, Study, or custom categories
- **Priorities**: Visual indicators show High (red), Medium (yellow), Low (gray) priority tasks
- **Due Dates**: Tasks show "Today", "Tomorrow", or specific dates with overdue warnings

## 🛠️ Technical Details

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **State Management**: React Context + useReducer
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Feather Icons (via react-icons)
- **Date Handling**: date-fns library
- **Storage**: localStorage for data persistence
- **Build Tool**: Create React App

### Project Structure
```
src/
├── components/           # React components
│   ├── Header/          # App header with logo and theme toggle
│   ├── TaskForm/        # Task creation and editing form
│   ├── TaskList/        # Task list container
│   ├── TaskItem/        # Individual task component
│   ├── FilterBar/       # Search and filter controls
│   └── TaskStats/       # Task statistics dashboard
├── context/             # React Context for state management
├── types/               # TypeScript type definitions
└── App.tsx             # Main application component
```

### Key Features Implementation

**State Management**: Uses React Context with useReducer for predictable state updates and easy testing.

**Data Persistence**: Automatically saves all tasks and settings to localStorage with proper serialization of dates.

**Responsive Design**: Mobile-first approach with CSS Grid and Flexbox, breakpoints at 768px and 480px.

**Accessibility**: 
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility

**Performance**:
- Optimized re-renders with proper React hooks usage
- Efficient filtering and sorting algorithms
- CSS animations with `transform` and `opacity` for smooth performance
- Lazy loading of components where beneficial

## 🎨 Design System

### Color Palette
- **Primary**: #6366f1 (Indigo)
- **Success**: #10b981 (Emerald)
- **Warning**: #f59e0b (Amber)
- **Danger**: #ef4444 (Red)
- **Background**: #ffffff / #0f172a (Light/Dark)

### Typography
- **Font**: System fonts (SF Pro, Segoe UI, Roboto)
- **Sizes**: 0.75rem - 1.75rem with consistent line heights
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Layout
- **Max Width**: 800px for optimal reading
- **Spacing**: 8px base unit (0.5rem increments)
- **Border Radius**: 6px (small), 8px (medium), 12px (large)

## 🚀 Available Scripts

In the project directory, you can run:

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (irreversible)

## 📦 Build and Deployment

### Production Build
```bash
npm run build
```

The build folder contains optimized static files ready for deployment to any static hosting service.

### Deployment Options
- **Netlify**: Drag and drop the build folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **Firebase Hosting**: Use Firebase CLI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern productivity apps
- Icons by [Feather Icons](https://feathericons.com/)
- Color palette from [Tailwind CSS](https://tailwindcss.com/)

## 📧 Support

For support, feature requests, or bug reports, please open an issue on GitHub.

---

**TaskMaster** - Built with ❤️ for productivity enthusiasts
