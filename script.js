const conversionType = document.getElementById("conversionType");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const inputValue = document.getElementById("inputValue");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");
const historyList = document.getElementById("historyList");

const units = {
  length: ["meters", "kilometers", "miles", "feet"],
  mass: ["grams", "kilograms", "pounds", "ounces"],
  temperature: ["celsius", "fahrenheit", "kelvin"],
  power: ["watt", "kilowatt", "horsepower"],
  volume: ["liters", "milliliters", "cubic_meters", "gallons"],
  force: ["newton", "kilonewton", "pound_force"]
};

function populateUnits(type) {
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";
  units[type].forEach(unit => {
    fromUnit.add(new Option(unit, unit));
    toUnit.add(new Option(unit, unit));
  });
}

conversionType.addEventListener("change", () => {
  populateUnits(conversionType.value);
});

populateUnits("length"); // default

function convert(value, from, to, type) {
  if (type === "length") {
    const factors = { meters: 1, kilometers: 1000, miles: 1609.34, feet: 0.3048 };
    return value * (factors[from] / factors[to]);
  }
  if (type === "mass") {
    const factors = { grams: 1, kilograms: 1000, pounds: 453.592, ounces: 28.3495 };
    return value * (factors[from] / factors[to]);
  }
  if (type === "temperature") {
    if (from === to) return value;
    if (from === "celsius") {
      if (to === "fahrenheit") return (value * 9/5) + 32;
      if (to === "kelvin") return value + 273.15;
    }
    if (from === "fahrenheit") {
      if (to === "celsius") return (value - 32) * 5/9;
      if (to === "kelvin") return (value - 32) * 5/9 + 273.15;
    }
    if (from === "kelvin") {
      if (to === "celsius") return value - 273.15;
      if (to === "fahrenheit") return (value - 273.15) * 9/5 + 32;
    }
  }
  if (type === "power") {
    const factors = { watt: 1, kilowatt: 1000, horsepower: 745.7 };
    return value * (factors[from] / factors[to]);
  }
  if (type === "volume") {
    const factors = { liters: 1, milliliters: 0.001, cubic_meters: 1000, gallons: 3.785 };
    return value * (factors[from] / factors[to]);
  }
  if (type === "force") {
    const factors = { newton: 1, kilonewton: 1000, pound_force: 4.448 };
    return value * (factors[from] / factors[to]);
  }
  return null;
}

convertBtn.addEventListener("click", () => {
  const val = parseFloat(inputValue.value);
  if (isNaN(val)) {
    result.textContent = "⚠️ Please enter a valid number.";
    return;
  }

  const type = conversionType.value;
  const from = fromUnit.value;
  const to = toUnit.value;
  const res = convert(val, from, to, type);

  if (res === null) {
    result.textContent = "⚠️ Conversion not supported.";
    return;
  }

  const output = `${val} ${from} = ${res.toFixed(2)} ${to}`;
  result.textContent = output;

  const li = document.createElement("li");
  li.textContent = output;
  historyList.appendChild(li);
});

