window.addEventListener('deviceorientation', handleOrientation, true);

const socket = new WebSocket('ws://192.168.10.16:8000');

socket.onopen = function(event) {
    console.log("WebSocket is open now.");
    document.getElementById('status').innerText = "WebSocket connection established.";
};

socket.onclose = function(event) {
    console.log("WebSocket is closed now.");
    document.getElementById('status').innerText = "WebSocket connection closed.";
};

socket.onerror = function(error) {
    console.error("WebSocket error observed:", error);
    document.getElementById('status').innerText = `WebSocket error: ${error.message}`;
};

function handleOrientation(event) {
    const roll = event.beta ? event.beta.toFixed(2) : 0;  // Rotation around X-axis
    const pitch = event.gamma ? event.gamma.toFixed(2) : 0; // Rotation around Y-axis
    const yaw = event.alpha ? event.alpha.toFixed(2) : 0;  // Rotation around Z-axis

    console.log(`Roll: ${roll}, Pitch: ${pitch}, Yaw: ${yaw}`); // コンソールに出力

    document.getElementById('samurai_x').innerText = `Roll: ${roll}`;
    document.getElementById('samurai_y').innerText = `Pitch: ${pitch}`;
    document.getElementById('samurai_z').innerText = `Yaw: ${yaw}`;

    const data = {
        roll: roll,
        pitch: pitch,
        yaw: yaw
    };

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data));
        document.getElementById('status').innerText = "Data sent successfully.";
    } else {
        document.getElementById('status').innerText = "WebSocket not open.";
    }
}
