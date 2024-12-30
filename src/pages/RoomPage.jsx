import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RoomPage() {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [songs, setSongs] = useState([]);
    const [newSong, setNewSong] = useState("");

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const roomResponse = await axios.get(
                    `http://localhost:8080/api/rooms/${roomId}`
                );
                setRoom(roomResponse.data);

                const songsResponse = await axios.get(
                    `http://localhost:8080/api/rooms/${roomId}/songs`
                );
                setSongs(songsResponse.data);
            } catch (error) {
                console.error("Error fetching room data:", error);
            }
        };

        fetchRoomData();
    }, [roomId]);

    const suggestSong = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/rooms/${roomId}/songs`,
                { title: newSong }
            );
            setSongs([...songs, response.data]);
            setNewSong("");
        } catch (error) {
            console.error("Error suggesting song:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Room: {room?.name}</h1>
            <div className="card p-4 mb-4">
                <h2>Songs</h2>
                <ul className="list-group">
                    {songs.map((song) => (
                        <li key={song.id} className="list-group-item d-flex justify-content-between">
                            {song.title}
                            <button className="btn btn-sm btn-success">Vote</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="card p-4">
                <h2>Add a Song</h2>
                <input
                    type="text"
                    placeholder="Song Title"
                    value={newSong}
                    onChange={(e) => setNewSong(e.target.value)}
                    className="form-control mb-3"
                />
                <button onClick={suggestSong} className="btn btn-primary w-100">
                    Suggest
                </button>
            </div>
        </div>
    );
}

export default RoomPage;
