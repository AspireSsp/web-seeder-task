import './App.css';
import Home from './Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/Login'
import SignUp from './component/Register'
import Navbar from './component/Navbar';
function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
