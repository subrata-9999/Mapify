
if (navigator.geolocation) { //to access the location from user..................
  navigator.geolocation.getCurrentPosition(present);
} else {
  console.log("you does not support geolocation API");
}

let map;
let mapoption;

//everything  :)  ....................................
function present(position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        mapoption = {
            center: [lat, lng],
            zoom: 9,
        };
        map = L.map("mymap", mapoption);//add leaflet map in webpage......................
        let mapview = L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        );
        mapview.addTo(map);

        let markeroption = {
            clickable: true,
            draggable: false,
        };

        //for marker............................
        L.marker([lat, lng], markeroption)
            .addTo(map)
            .bindPopup(`Your current location.<br>${lat} &nbsp&nbsp&nbsp${lng} `)
            .openPopup();
        var circle = L.circle([lat, lng], {
            color: "blue",
            fillcolor: "#f03",
            radius: 6500,
        }).addTo(map);

            
        //for the library search button...................
        var geocoder = L.Control.geocoder({
            defaultMarkGeocode: false,
        })
            .on("markgeocode", function (e) {
            var bbox = e.geocode.bbox;
            var poly = L.polygon([
                bbox.getSouthEast(),
                bbox.getNorthEast(),
                bbox.getNorthWest(),
                bbox.getSouthWest(),
            ]).addTo(map);
            map.fitBounds(poly.getBounds());
            })
            .addTo(map);

        //marker, movement, routing, and location circle .................
        function movement(hey1, hey2) {
            map.flyTo([hey1, hey2], 10, {
            duration: 1.6,
            });
            var distance = getDistance([lat, lng], [hey1, hey2]);
            
            L.marker([hey1, hey2], markeroption)
            .addTo(map)
            .bindPopup( // popup location .............
                `Your selected location.<br>${hey1} &nbsp&nbsp&nbsp${hey2} <br> Distance : ${(distance / 1000).toFixed(1)} Km`
            )
            .openPopup();

            L.Routing.control({ //routing part........................
            waypoints: [L.latLng(lat, lng), L.latLng(hey1, hey2)],
            routeWhileDragging: true,
            itineraryFormatter: "test",
            routeWhileDragging: true,
            }).addTo(map);
            var circle = L.circle([hey1, hey2], {
            color: "green",
            fillcolor: "#f03",
            radius: 6500,
            }).addTo(map);
        }

        //on click part................
        map.on("click", function (e) {
            movement(e.latlng.lat, e.latlng.lng);
        });


        //hard code location elements.............................
        document.querySelector(".location1").addEventListener("click", function () {
            let x = 27.1751;
            let y = 78.0421;
            movement(x, y);
        });
        document.querySelector(".location2").addEventListener("click", function () {
            let x = 25.321684;
            let y = 82.987289;
            movement(x, y);
        });
        document.querySelector(".location3").addEventListener("click", function () {
            let x = 31.62;
            let y = 74.8765;
            movement(x, y);
        });
        document.querySelector(".location4").addEventListener("click", function () {
            let x = 26.9108;
            let y = 70.9195;
            movement(x, y);
        });
        document.querySelector(".location5").addEventListener("click", function () {
            let x = 28.6562;
            let y = 77.241;
            movement(x, y);
        });
        document.querySelector(".location6").addEventListener("click", function () {
            let x = 18.922;
            let y = 72.8347;
            movement(x, y);
        });
        document.querySelector(".location7").addEventListener("click", function () {
            let x = 17.3604;
            let y = 78.4736;
            movement(x, y);
        });
        document.querySelector(".location8").addEventListener("click", function () {
            let x = 26.9855;
            let y = 75.8513;
            movement(x, y);
        });
        document.querySelector(".location9").addEventListener("click", function () {
            let x = 22.5448;
            let y = 88.3426;
            movement(x, y);
        });
        document.querySelector(".location10").addEventListener("click", function () {
            let x = 9.4621549;
            let y = 77.2281141;
            movement(x, y);
        });
        document.querySelector(".location11").addEventListener("click", function () {
            let x = 27.1795;
            let y = 78.0211;
            movement(x, y);
        });
        document.querySelector(".location12").addEventListener("click", function () {
            let x = 20.0258;
            let y = 75.178;
            movement(x, y);
        });
        document.querySelector(".location13").addEventListener("click", function () {
            let x = 26.298;
            let y = 73.0188;
            movement(x, y);
        });
        document.querySelector(".location14").addEventListener("click", function () {
            let x = 12.3052;
            let y = 76.6552;
            movement(x, y);
        });
        document.querySelector(".location15").addEventListener("click", function () {
            let x = 24.6959;
            let y = 84.9914;
            movement(x, y);
        });

        //to calculate the value of distance.............................
        function getDistance(origin, destination) {
            // return distance in meters
            var lon1 = toRadian(origin[1]),
            lat1 = toRadian(origin[0]),
            lon2 = toRadian(destination[1]),
            lat2 = toRadian(destination[0]);

            var deltaLat = lat2 - lat1;
            var deltaLon = lon2 - lon1;

            var a =
            Math.pow(Math.sin(deltaLat / 2), 2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
            var c = 2 * Math.asin(Math.sqrt(a));
            var EARTH_RADIUS = 6371;
            return c * EARTH_RADIUS * 1000;
        }
        function toRadian(degree) {
            return (degree * Math.PI) / 180;
        }

        //creat button  :)  ........................................
        document
            .querySelector(".modal_submit")
            .addEventListener("click", function (e) {
            
                e.preventDefault();

            const input_nam = document.querySelector(".input_name").value;
            const input_add = document.querySelector(".input_address").value;
            const input_lat = document.querySelector(".input_latitude").value;
            const input_lng = document.querySelector(".input_longitude").value;

            

            console.log(input_lat, input_lng);

            if (!(!input_lat && !input_lng)) {
                
                if((input_lat>=0 && input_lat<=90) && (input_lng>=0 && input_lng<=90)){
                   
                    movement(input_lat, input_lng);
                    
                    if (!(!input_nam && !input_add)) {
                        let ul = document.querySelector(".list_of_new_ele");
        
                        let li = document.createElement("li");
                        let div = document.createElement("div");
                        let a = document.createElement("a");
                        let p = document.createElement("p");
        
                        a.innerText = input_nam;
                        a.href = "#";
                        div.className = "div_editor";
                        p.innerText = input_add;
                        
                        document.querySelector(".list_of_new_ele").style.flexDirection="column-reverse";
                        
        
                        ul.appendChild(li);
                        li.appendChild(div);
                        div.appendChild(a);
                        div.appendChild(p);
                    }

                }
                else{

                    alert("Your selected location is invalid");

                }
                
                
            }
            else{
                if (!(!input_nam && !input_add)) {
                    let ul = document.querySelector(".list_of_new_ele");
    
                    let li = document.createElement("li");
                    let div = document.createElement("div");
                    let a = document.createElement("a");
                    let p = document.createElement("p");
    
                    a.innerText = input_nam;
                    a.href = "#";
                    div.className = "div_editor";
                    p.innerText = input_add;
                    
                    document.querySelector(".list_of_new_ele").style.flexDirection="column-reverse";
                    
    
                    ul.appendChild(li);
                    li.appendChild(div);
                    div.appendChild(a);
                    div.appendChild(p);
                }
            }


    });


    //search button..................................................
    document.querySelector(".modal_submit2").addEventListener('click', function(){

        const input_lat2 = document.querySelector(".input_latitude2").value;
        const input_lng2 = document.querySelector(".input_longitude2").value;

        if (!(!input_lat2 && !input_lng2)) {
            if((input_lat2>=0 && input_lat2<=90) && (input_lng2>=0 && input_lng2<=90)){
                movement(input_lat2, input_lng2);
            }
            else{
                alert("Your selected location is invalid");
            }
        }

    });

}
