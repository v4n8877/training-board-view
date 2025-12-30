# Training Calendar Project

A React-based training board application designed to help users manage workout routines using a drag-and-drop interface.

---

## 🚀 How to Run the Project

Follow these steps to get the project up and running on your local machine:

### Clone the repository:

```bash
git clone https://github.com/v4n8877/training-board-view.git
```

Install dependencies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open the app

Access the application at http://localhost:5173

## 📦 What's Included in This Submission

### Completed Features

- **Training Board View:** A high-level view of the training schedule organized by columns.
- **Daily Columns:** Individual columns representing training days (`TrainingDayColumn`).
- **Exercise Cards:** Detailed cards for specific exercises (`ExerciseCard`, `WorkoutCard`) with sorting capabilities.
- **Drag and Drop (DnD) Integration:** Functional drag-and-drop system to reorder or move exercises between days (`TrainingBoardDndProvider`).
- **State Management:** Centralized data flow using React Context API (`TrainingProvider`).
- **Data Persistence/Mocking:** Handling data through local JSON and service mutations.
- **Responsive UI:** Styled with Tailwind CSS for a modern and clean look.

---

### Project Architecture

I followed a **Feature-based folder structure** to ensure scalability:

- `common/`: Reusable UI components and utilities.
- `features/`: Domain-specific logic (Card, Column, TrainingCalendar).
- `services/`: Logic for data fetching and mutations.
- `context/`: Global state management for the training board.

---

### Assumptions Made

- **Mock Data:** The application currently uses `boards.json` as a primary data source for initial state.
- **Local Execution:** It is assumed that the reviewer has Node.js installed (v18 or higher recommended).
- **Browser Support:** Optimized for modern evergreen browsers (Chrome, Edge, Firefox, Safari).

---

## 💡 Key Notes & Approach

- **TypeScript for Type Safety:** I heavily utilized TypeScript interfaces (located in `types/`) to define Board, Card, and Exercise shapes, reducing runtime errors.
- **Context API vs Redux:** For this scope, I chose React Context to avoid unnecessary boilerplate while still maintaining a clean separation between UI and state.
- **DnD Implementation:** The logic is abstracted into a specific provider (`TrainingBoardDndProvider`) to keep the main view components lean and focused on rendering.
- **Scalability:** By splitting components into `features/`, adding new modules (like "User Profile" or "Analytics") in the future would be straightforward without cluttering the existing code.

---

## 🛠 Tech Stack

- **Vite:** Build tool for fast development.
- **React:** UI Library.
- **TypeScript:** Static typing.
- **Tailwind CSS:** Styling.
- **dnd-kit (Assumed):** For drag-and-drop functionality.
