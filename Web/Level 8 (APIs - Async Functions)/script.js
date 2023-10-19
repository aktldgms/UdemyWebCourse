const send = document.querySelector("#send");
const loc = document.querySelector("#location");
const countryInput = document.querySelector("#floatingInputValue");
const spinner = document.querySelector(".spinner-border");
let html;

async function displayCountry (country) {
    spinner.classList.remove("d-none");
    try {
        const response_country = await fetch('https://restcountries.com/v3.1/name/' + country);
        const data_country = await response_country.json();
        if(!response_country.ok)
            throw new Error("ülke bulunamadı");
        getCountry(data_country[0]);
        spinner.classList.add("d-none");

        const countries = data_country[0].borders;
        if(!countries)
            throw new Error("sınır ülke bulunamadı");
        const response_countries = await fetch('https://restcountries.com/v3.1/alpha?codes=' + countries.toString());
        const data_countries = await response_countries.json();
        for(i in data_countries)
        {
            getNeighbour(data_countries[i]);
        }
        document.querySelector(".neigbour-countries-title").innerHTML = "<h4>Neighbour Countries</h4>";
    }
    catch(err) {
        getErrors(err);
        spinner.classList.add("d-none");
    }
}

const getCountry = (data) => {
    document.querySelector(".searched-country").innerHTML = "";
    document.querySelector(".neigbour-countries").innerHTML = "";
    html = "";
    html = `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <div class="img-wrapper">
                        <img src="${data.flags.png}" class="rounded-start">
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h3 class="card-title text-center">${data.name.common}</h3>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-2">
                                    Population:
                                </div>
                                <div class="col-10">
                                    ${(data.population / 1000000).toFixed(1)} Million
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-2">
                                    Capital:
                                </div>
                                <div class="col-10">
                                    ${data.capital[0]}
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-2">
                                    Language:
                                </div>
                                <div class="col-10">
                                    ${Object.values(data.languages)}
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-2">
                                    Currencies:
                                </div>
                                <div class="col-10">
                                    ${Object.values(data.currencies)[0].name} (${Object.values(data.currencies)[0].symbol})
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-2">
                                    Region:
                                </div>
                                <div class="col-10">
                                    ${data.region}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
    `;
    document.querySelector(".searched-country").innerHTML = html;
    document.querySelector(".searched-country-title").innerHTML = "<h4>Searched Country</h4>";
}

const getNeighbour = (data) => {
    html = "";
    html = `
        <div onclick="link(this)" class="card p-0 card2 mb-3 mx-1">
            <div class="img-wrapper2">
                <img src="${data.flags.png}" class="rounded-start">
            </div>
            <div class="card-body">
                <h3 class="card-title text-center">${data.name.common}</h3>
            </div>
        </div>
    `;
    
    document.querySelector(".neigbour-countries").innerHTML += html;
}

const getErrors = (err) => {
    const html = `
        <div class="alert alert-danger">
            ${err.message}
        </div>
    `;
    document.querySelector(".errors").innerHTML = html;
    setTimeout(() => {
        document.querySelector(".errors").innerHTML = "";
    }, 3000);
}

const link = (card) => {
    const name = card.children[1].children[0].innerText;
    countryInput.value = name;
    send.click();
}

send.addEventListener("click", () => {
    const country = countryInput.value;
    displayCountry(country);
    html = "";
});

loc.addEventListener("click", () => {
    if(navigator.geolocation)
    {
        spinner.classList.remove("d-none");
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
})

async function onSuccess(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    const api_key = "2db9502e0c5b46b68c384497d55a55b8";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    const ulke = data.results[0].components.country;
    displayCountry(ulke);
    spinner.classList.add("d-none");
}

function onError(err) {
    console.log(err);
    spinner.classList.add("d-none");
}