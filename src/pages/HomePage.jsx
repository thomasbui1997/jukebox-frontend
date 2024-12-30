import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function HomePage() {
    const [roomName, setRoomName] = useState("");
    const [invitationCode, setInvitationCode] = useState("")
    const [joinCode, setJoinCode] = useState("")
    const navigate = useNavigate()

    const createRoom = async () => {
        console.log("Creating room with: ", roomName, invitationCode);
        try {
            const response = await axios.post("http://localhost:8080/api/rooms", {
                name: roomName,
                invitationCode: invitationCode
            });
            console.log("Room created:", response.data);
            navigate(`/room/${response.data.id}`);
            } catch (error) {
                console.error('Error creating room: ', error)
            }
        };

    const joinRoom = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/rooms/find?code=${joinCode}`
            );
            navigate(`/room/${response.data.id}`);
        } catch (error) {
            console.error("Error joining room: ", error);
            alert("Room not found. Please check the invitation code.");
        }
    }

    return (
        <div className="container text-center mt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h1 className="mb-4">Welcome to the Juke Box!</h1>

                    {/* Create new room */}
                    <div className="card p-4 mb-4 shadow">
                        <h2 className="mb-3">Create a Room</h2>
                        <input
                            type="text"
                            placeholder="Room Name"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            className="form-control mb-3"
                        />
                        <input
                            type="text"
                            placeholder="Invitation Code"
                            value={invitationCode}
                            onChange={(e) => setInvitationCode(e.target.value)}
                            className="form-control mb-3"
                        />
                        <button
                            onClick={createRoom}
                            className="btn btn-primary w-100 mb-3"
                        >
                            Create Room
                        </button>
                    </div>

                    {/* Join existing room */}
                    <div className="card p-4 shadow">
                        <h2 className="mb-3">Join a Room</h2>
                        <input
                            type="text"
                            placeholder="Enter invitation code"
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value)}
                            className="form-control mb-3"
                        />
                        <button
                            onClick={joinRoom}
                            className="btn btn-success w-100"
                        >
                            Join Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;