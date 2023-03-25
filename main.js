const map = L.map('issMap').setView([0, 0], 1);
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, {attribution})
tiles.addTo(map)
const issIcon = L.icon({
    iconUrl: './iss.png',
    iconSize: [50, 32],
    iconAnchor: [26, 16]
});

const marker = L.marker([0, 0], {icon: issIcon}).addTo(map);
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'

let fistTime = true;
async function getISS() {
    const response = await fetch(api_url)
    const data = await response.json();
    const {latitude, longitude, velocity} = data;

    if (fistTime){
        map.setView([latitude, longitude], 5)
        fistTime = false;        
    }
    marker.setLatLng([latitude, longitude])
    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('lon').textContent = longitude.toFixed(2);
    document.getElementById('velocity').textContent = velocity.toFixed(0);
}

getISS()

setInterval(getISS, 1000)