function main(dtoIn) {
  const firstNamesMale = [
    "Jan00",
    "Petr",
    "Lukáš",
    "Martin",
    "Tomáš",
    "David",
    "Michal",
  ];
  const firstNamesFemale = [
    "Marie",
    "Anna",
    "Eva",
    "Tereza",
    "Petra",
    "Jana",
    "Hana",
  ];
  const lastNamesMale = [
    "Novák",
    "Svoboda",
    "Novotný",
    "Dvořák",
    "Černý",
    "Procházka",
    "Kučera",
    "Horáček", // Mužská příjmení
  ];
  const lastNamesFemale = [
    "Nováková",
    "Svobodová",
    "Novotná",
    "Dvořáková",
    "Černá",
    "Procházková",
    "Kučerová",
    "Horáčková", // Ženská příjmení
  ];

  // Funkce pro generování náhodného čísla včetně min a max
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Funkce pro generování náhodného data narození v zadaném věkovém pásmu
  function getRandomBirthdate(ageRange) {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - ageRange.max;
    const maxYear = currentYear - ageRange.min;

    const year = getRandomInt(minYear, maxYear);
    const month = getRandomInt(0, 11); // Měsíce: 0-11
    const day = getRandomInt(1, 28); // Zjednodušení: 28 dní na všechny měsíce
    const hour = getRandomInt(0, 23);

    // Nastavíme minuty, sekundy a milisekundy na nulu
    const date = new Date(year, month, day, hour, 0, 0, 0);
    return date.toISOString(); // Plný ISO formát
  }

  // Funkce pro generování jednoho zaměstnance
  function generateEmployee() {
    const gender = Math.random() < 0.5 ? "male" : "female";
    const firstName =
      gender === "male"
        ? firstNamesMale[getRandomInt(0, firstNamesMale.length - 1)]
        : firstNamesFemale[getRandomInt(0, firstNamesFemale.length - 1)];

    // Příjmení podle pohlaví
    const lastName =
      gender === "male"
        ? lastNamesMale[getRandomInt(0, lastNamesMale.length - 1)]
        : lastNamesFemale[getRandomInt(0, lastNamesFemale.length - 1)];

    const birthdate = getRandomBirthdate(dtoIn.ageRange);
    const workload = [10, 20, 30, 40][getRandomInt(0, 3)];

    return {
      name: firstName,
      surname: lastName,
      gender: gender,
      birthdate: birthdate,
      workload: workload,
    };
  }

  // Generování seznamu zaměstnanců
  const employees = [];
  for (let i = 0; i < dtoIn.employeeCount; i++) {
    employees.push(generateEmployee());
  }

  // Výstupní data
  return { employees };
}

// Příklad vstupních dat
const dtoIn = {
  employeeCount: 5,
  ageRange: { min: 25, max: 50 }, // Věkové pásmo 25 až 50 let
};

// Výstup
const dtoOut = main(dtoIn);
console.log(dtoOut);
