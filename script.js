const units = {
  length: ["meter", "kilometer", "mile", "foot"],
  mass: ["gram", "kilogram", "pound"],
  temperature: ["celsius", "fahrenheit", "kelvin"],
  force: ["newton", "kilonewton", "pound-force"],
  power: ["watt", "kilowatt", "horsepower"]
};

const conversionFunctions = {
  length: (val, from, to) => {
    const factors = { meter: 1, kilometer: 1000, mile: 1609.34, foot: 0.3048 };
    return val * factors[from] / factors[to];
  },
  mass: (val, from, to) => {
    const factors = { gram: 1, kilogram: 1000, pound: 453.592 };
    return val * factors[from] / factors[to];
  },
  temperature: (val, from, to) => {
    if (from === to) return val;
    if (from === "celsius") {
      if (to === "fahrenheit") return (val * 9/5) + 32;
      if (to === "kelvin") return val + 273.15;
    }
    if (from === "fahrenheit") {
      if (to === "celsius") return (val - 32) * 5/9;
      if (to === "kelvin") return (val - 32) * 5/9 + 273.15;
    }
    if (from === "kelvin") {
      if (to === "celsius") return val - 273.15;
      if (to === "fahrenheit") return (val - 273.15) * 9/5 + 32;
    }
  },
  force: (val, from, to) => {
    const factors = { newton: 1, kilonewton: 1000, "pound-force": 4.448 };
    return val * factors[from] / factors[to];
  },
  power: (val, from, to) => {
    const factors = { watt: 1, kilowatt: 1000, horsepower: 745.7 };
    return val * factors[from] / factors[to];
  }
};

const conversionType = document.getElementById("conversionType");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const result = document.getElementById("result");
const historyList = document.getElementById("history");

function populateUnits() {
  const type = conversionType.value;
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";
  units[type].forEach(u => {
    fromUnit.innerHTML += `<option value="${u}">${u}</option>`;
    toUnit.innerHTML += `<option value="${u}">${u}</option>`;
  });
}

function convert() {
  const type = conversionType.value;
  const val = parseFloat(document.getElementById("value").value);
  const from = fromUnit.value;
  const to = toUnit.value;

  if (isNaN(val)) {
    result.innerText = "⚠️ Please enter a valid number!";
    return;
  }

  const converted = conversionFunctions[type](val, from, to);
  const output = `${val} ${from} = ${converted.toFixed(4)} ${to}`;
  result.innerText = output;

  saveHistory(output);
}

function saveHistory(entry) {
  const li = document.createElement("li");
  li.textContent = entry;
  historyList.appendChild(li);
}

conversionType.addEventListener("change", populateUnits);
populateUnits();

