const searchButton = document.getElementById("search-btn");
const inputField = document.getElementById("input-field");
const outputArea = document.getElementById("output-area");

// -- Event Listeners -- //
document.addEventListener('DOMContentLoaded', function () {
  defaultInputField();
  showCountries();
});

outputArea.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-country-btn')) {
    e.target.parentNode.parentNode.remove();
  }
});

searchButton.addEventListener('click', function () {
  launchResearch(inputField.value);
});

inputField.addEventListener('keydown', function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    launchResearch(inputField.value);
  }
});

// -- Input Field Gestion -- //
inputField.addEventListener('focusin', function (e) {
  if (e.target.value === "Enter a country name") {
    e.target.value = "";
  }
});
inputField.addEventListener('focusout', function (e) {
  if (e.target.value === "") {
    e.target.value = "Enter a country name";
  }
});

function defaultInputField() {
  inputField.value = "Enter a country name";
}

function clearInputField() {
  inputField.value = "";
}

// -- Output Area gestion -- //

// -- Research methods -- //
function launchResearch(countryName) {
  inputField.value = "";
  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((response) => response.text())
    .then((responseStr) => displayInOutputArea(responseStr))
    .catch((error) => alert("Invalid name : " + error));
}

function displayInOutputArea(res) {
  const strJson = JSON.parse(res);
  const accessibleJson = strJson[0];

  let country = new Country(accessibleJson.name.common);
  country.setOffName(accessibleJson.name.official);
  country.setFlag(accessibleJson.flags.png);
  country.setCapital(accessibleJson.capital);
  country.setContinent(accessibleJson.continents);
  country.setRegion(accessibleJson.region);
  country.setSubregion(accessibleJson.subregion);
  let currencies = accessibleJson.currencies;
  Object.keys(currencies).forEach((currencyCode) => {
    let currencyName = "";
    let currencySymb = "";
    currencyName += currencies[currencyCode].name + " ";
    currencySymb += currencies[currencyCode].symbol + " ";

    country.setCurrencyName(currencyName);
    country.setCurrencySymb(currencySymb);
  });
  let languages = accessibleJson.languages;
  Object.keys(languages).forEach((languageName) => {
    let languagesNames = "";
    languagesNames += languages[languageName] + " ";

    country.setLang(languagesNames);
  });
  country.setPop(accessibleJson.population);
  country.setUnMember(accessibleJson.unMember);
  country.setTimezone(accessibleJson.timezones);
  country.setCoatOfArms(accessibleJson.coatOfArms.png);

  country.showCountry(outputArea);
}

class Country {
  constructor(name) {
    this.name = name;
  }
  setOffName(offName) {
    this.offName = offName;
  }
  setFlag(flagImg) {
    this.flagImg = flagImg;
  }
  setCapital(capital) {
    this.capital = capital;
  }
  setContinent(continent) {
    this.continent = continent;
  }
  setRegion(region) {
    this.region = region;
  }
  setSubregion(subregion) {
    this.subregion = subregion;
  }
  setCurrencyName(currencyName) {
    this.currencyName = currencyName;
  }
  setCurrencySymb(currencySymb) {
    this.currencySymb = currencySymb;
  }
  setLang(languages) {
    this.languages = languages;
  }
  setPop(population) {
    this.population = population;

  }
  setUnMember(unMember) {
    this.unMember = unMember;
  }
  setTimezone(timezone) {
    this.timezone = timezone;
  }
  setCoatOfArms(coatOfArms) {
    this.coatOfArms = coatOfArms;
  }

  showCountry(outputArea) {
    outputArea.innerHTML += `<div id="${this.name} class="country">
    <div class="country-title-wrapper">
      <h2>${this.name} (${this.offName})</h2>
      <img src="${this.flagImg}" alt="Flag of ${this.name}" class="flag">
      <img src="${this.coatOfArms}" alt="Coat of arms of ${this.name}" class="coat-of-arms">
      <button class="delete-country-btn" aria-label"Delete the selected country">X</button>
    </div>
    <div class="country-infos-wrapper">
      <p>Capital : ${this.capital}</p>
      <p>Continent : ${this.continent}</p>
      <p>Region : ${this.region}</p>
      <p>Subregion : ${this.subregion}</p>
      <p>Currency : ${this.currencyName} | ${this.currencySymb}</p>
      <p>Languages : ${this.languages}</p>
      <p>Population : ${this.population}</p>
      <p>UN Member ? : ${this.unMember}</p>
      <p>Timezone : ${this.timezone}</p>
    </div>
  </div>`
  }

}