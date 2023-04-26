"use strict";

const app = {
	map: null, // gebruik dit om de map gemakkelijk aan te spreken doorheen de applicatie
	init() {
		// initialise de kaart
		this.map = L.map("map").setView([50.846705, 4.352543], 15);
		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(this.map);
		// voeg een tile layer toe, met URL https://a.tile.openstreetmap.org/{z}/{x}/{y}.png
		// vergeet openstreetmap attributie niet
		let marker = L.marker([50.846705, 4.352543]).addTo(this.map);
		// gebruik de functie "loadMarkers" om de markers toe te voegen
		this.loadMarkers();
	},
	loadMarkers() {
		fetch(
			"https://opendata.brussels.be/api/records/1.0/search/?dataset=toiletten&q=&rows=100&geofilter.distance=50.846475%2C+4.352793%2C+5000"
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

				for (let i = 0; i < data.records.length; i++) {
					const lat = data.records[i].fields.wgs84_lat;
					const lon = data.records[i].fields.wgs84_long;

					this.addMarker(lat, lon);
				}
			});
		// fetch de data van opendata.brussels.be
		// als er coordinaten beschikbaar zijn, kan je de addMarker functie gebruiken om een marker toe te voegen op de kaart
	},
	addMarker(lat, lon) {
		// voeg een marker toe op lat, lon
		let marker = L.marker([lat, lon]).addTo(this.map);

		marker.addEventListener("click", function () {
			this.marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
		});
	},
};

app.init();
