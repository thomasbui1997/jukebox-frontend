import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function HomePage() {
    const [roomName, setRoomName] = useState('');
    const navigate = useNavigate()

    const createRoom = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/rooms', { name: roomName});
            navigate(`/room/${response.data.id}`);
            } catch (error) {
                console.error('Error creating room: ', error)
            }
        };

    return (
        <div>
            <h1>Welcome to the Listening Party</h1>
            <input
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />
            <button onClick={createRoom}>Create Room</button>
        </div>
    )
}

export default HomePage;