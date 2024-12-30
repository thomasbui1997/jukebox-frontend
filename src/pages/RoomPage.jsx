import axios from "axios";
import {useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

function RoomPage() {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [songs, setSongs] = useState([]);
    const [newSong, setNewSong] = useState('');

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomResponse = await axios.get(`http://localhost:8080/api/rooms/${roomId}`);
                setRoom(roomResponse.data);

                const songsResponse = await axios.get(`http://localhos:8080/api/rooms/${roomId}/songs`);
                setSongs(songsResponse.data);
            } catch (error) {
                console.error('Error fetching room data: ', error);
            }
        };

        fetchRoom();
    }, [roomId]);

    const suggestSong = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/rooms/${roomId}/songs`, {
                title: newSong
            });
            setSongs([...songs, response.data]);
            setNewSong('');
        } catch (error) {
            console.error('Error suggesting songs:', error);
        }
    };


return (
    <div>
        <h1>Room: {room?.name}</h1>
        <div>
            <h2>Song Suggestions</h2>
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        {song.title} - {song.artist}
                    </li>
                ))}
            </ul>
        </div>
        <div>
            <input
                type="text"
                placeholder="Suggest a song"
                value={newSong}
                onChange={(e) => setNewSong(e.target.value)}
            />
            <button onClick={suggestSong}>Suggest Song</button>
        </div>
    </div>
);
}



export default RoomPage;