# Kanban Board

A simple and responsive Kanban board built with React and Grommet. Includes drag-and-drop functionality, error boundaries, and suspense for a better user experience.

## Live Demo

https://anmol770.github.io/kanban-board/

---

## Getting Started

### Local Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Anmol770/kanban-board.git
   cd kanban-board
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Approach & Design Decisions

- **Vite** is used for fast bundling and development.
- **React + Grommet** provides a clean and accessible UI.
- **React.lazy and Suspense** are used for code-splitting and improved performance.
- **`react-error-boundary`** ensures graceful error handling with fallback UI.
- Components are modular and reusable to support scalability and maintenance.

---

## Trade-offs & Future Improvements

### Trade-offs

- The Kanban board state is maintained only in memory and resets on reload.
- The error fallback reloads the page instead of preserving component state.

### Future Enhancements

- Integrate a backend service to persist data.
- Add real-time multi-user collaboration.
- Support custom columns, task editing, and sorting.
- Improve accessibility with better keyboard support and ARIA attributes.
- Add automated testing for component-level reliability.
