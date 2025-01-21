// Initialisation de la carte
let map = L.map("map").setView([0, 0], 3);

// ajout carte
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// icône iss
const issIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1945/1945842.png",
  iconSize: [50, 30],
  iconAnchor: [25, 15],
});

// Création du marqueur de l'ISS
let issMarker = L.marker([0, 0], { icon: issIcon }).addTo(map);

// Fonction pour mettre à jour la position de l'ISS
async function updateISSPosition() {
  try {
    const response = await fetch("http://api.open-notify.org/iss-now.json");
    const data = await response.json();

    const lat = parseFloat(data.iss_position.latitude);
    const lon = parseFloat(data.iss_position.longitude);

    // Mise à jour de la position du marqueur
    issMarker.setLatLng([lat, lon]);

    // Centrage de la carte sur la nouvelle position
    map.setView([lat, lon]);

    // Ajout de la latitude et de la longitude
    document.getElementById("coordinates").innerHTML = `Latitude: ${lat.toFixed(4)}° | Longitude: ${lon.toFixed(4)}°`;

  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}

// Mise à jour position
updateISSPosition();

// Mise à jour toutes les 5 secondes
setInterval(updateISSPosition, 5000);
