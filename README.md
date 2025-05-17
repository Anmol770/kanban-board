# Kanban Board

A simple and responsive Kanban board built with React and Grommet. Includes drag-and-drop functionality, error boundaries, and suspense for better UX.

## 🔧 Getting Started

### 💻 Local Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Anmol770/kanban-board.git
   cd kanban-board
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📌 Approach & Design Decisions

- **React + Grommet**: Used for modern UI and theming.
- **React.lazy & Suspense**: Applied to improve perceived performance during module loading.
- **`react-error-boundary`**: Handles rendering errors gracefully with fallback UI.
- **Componentized architecture**: `KanbanBoard` and supporting UI parts are broken into clean, reusable components.
- **Dummy API**: A placeholder backend is used, which does not persist state between sessions.

---

## ⚖️ Trade-offs & Future Improvements

### Trade-offs:

- Drag-and-drop is currently handled only in memory; the dummy API does not persist state.
- Error fallback simply reloads the page — could be refined to preserve more state.

### Future Enhancements:

- Connect to a real backend to persist Kanban board data.
- Enable multi-user support and real-time collaboration.
- Add custom columns and tasks.
- Implement accessibility improvements and keyboard support.

---
