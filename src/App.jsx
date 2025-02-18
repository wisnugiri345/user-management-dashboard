import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<UserForm />} />
        <Route path="/edit/:id" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
