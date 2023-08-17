const searchPanel = document.querySelector(".search");
const list = document.querySelector(".suggestions");
const myData = [];

fetch("https://restcountries.com/v3.1/all")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(`typeof data`, typeof data, data);
    myData.push(...data);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

console.log(`typeof myData`, typeof myData, myData);

function findMatches() {
  if (this.value === "" || this.value === " ") {
    list.textContent = "";
  } else {
    const val = this.value.trimStart();
    list.innerHTML = "";
    console.log(`This value:`, val);
    const regValue = new RegExp(`${val}`, `gi`);

    const countryMatches = myData.filter((item) =>
      regValue.test(item.name.common)
    );
    console.log({ countryMatches });

    const capitalMatches = myData.filter((item) => {
      if (item.capital) {
        const cap = item.capital[0];
        return regValue.test(cap);
      }
    });
    console.log({ capitalMatches });

    for (const item of countryMatches) {
      const li = document.createElement("li");
      li.textContent = item.name.common;
      list.appendChild(li);
    }
    for (const item of capitalMatches) {
      const li = document.createElement("li");
      li.textContent = item.capital;
      list.appendChild(li);
    }
  }
}

searchPanel.addEventListener("change", findMatches);
searchPanel.addEventListener("keyup", findMatches);
