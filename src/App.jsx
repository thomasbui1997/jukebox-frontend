import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage'
import Navbar from "./components/Navbar";

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/room/:roomId" element={<RoomPage /> } />
            </Routes>
        </div>
    );
}

export default App;
