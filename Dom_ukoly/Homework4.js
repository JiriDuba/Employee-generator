function main(dtoIn) {
  const firstNamesMale = [
    "Jan",
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
    "Horáček",
  ];
  const lastNamesFemale = [
    "Nováková",
    "Svobodová",
    "Novotná",
    "Dvořáková",
    "Černá",
    "Procházková",
    "Kučerová",
    "Horáčková",
  ];

  if (
    typeof dtoIn?.count !== "number" ||
    dtoIn.count <= 0 ||
    typeof dtoIn?.age?.min !== "number" ||
    typeof dtoIn?.age?.max !== "number" ||
    dtoIn.age.min <= 0 ||
    dtoIn.age.max <= dtoIn.age.min
  ) {
    throw new Error("Invalid input: Vstup není platný.");
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomBirthdate(ageRange) {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - ageRange.max;
    const maxYear = currentYear - ageRange.min;
    const year = getRandomInt(minYear, maxYear);
    const month = getRandomInt(0, 11);
    const day = getRandomInt(1, new Date(year, month + 1, 0).getDate());
    return new Date(year, month, day).toISOString();
  }

  function generateEmployee() {
    const gender = Math.random() < 0.5 ? "male" : "female";
    const firstName =
      gender === "male"
        ? firstNamesMale[getRandomInt(0, firstNamesMale.length - 1)]
        : firstNamesFemale[getRandomInt(0, firstNamesFemale.length - 1)];
    const lastName =
      gender === "male"
        ? lastNamesMale[getRandomInt(0, lastNamesMale.length - 1)]
        : lastNamesFemale[getRandomInt(0, lastNamesFemale.length - 1)];
    const birthdate = getRandomBirthdate(dtoIn.age);
    const workload = [10, 20, 30, 40][getRandomInt(0, 3)];

    return {
      gender: gender,
      birthdate: birthdate,
      name: firstName,
      surname: lastName,
      workload: workload,
    };
  }

  function calculateAge(birthdate) {
    const birth = new Date(birthdate);
    const diff = Date.now() - birth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  function median(values) {
    if (values.length === 0) return 0;
    values.sort((a, b) => a - b);
    const half = Math.floor(values.length / 2);
    if (values.length % 2) return values[half];
    return (values[half - 1] + values[half]) / 2.0;
  }

  function getEmployeeStatistics(employees) {
    const totalEmployees = employees.length;
    const workloads = employees.map((e) => e.workload);
    const ages = employees.map((e) => calculateAge(e.birthdate));
    const femaleWorkloads = employees
      .filter((e) => e.gender === "female")
      .map((e) => e.workload);

    return {
      total: totalEmployees,
      workload10: workloads.filter((w) => w === 10).length,
      workload20: workloads.filter((w) => w === 20).length,
      workload30: workloads.filter((w) => w === 30).length,
      workload40: workloads.filter((w) => w === 40).length,
      averageAge: parseFloat(
        (ages.reduce((sum, age) => sum + age, 0) / totalEmployees).toFixed(1)
      ),
      minAge: Math.min(...ages),
      maxAge: Math.max(...ages),
      medianAge: median(ages),
      medianWorkload: median(workloads),
      averageWomenWorkload: femaleWorkloads.length
        ? parseFloat(
            (
              femaleWorkloads.reduce((sum, w) => sum + w, 0) /
              femaleWorkloads.length
            ).toFixed(1)
          )
        : 0,
      sortedByWorkload: employees.sort((a, b) => a.workload - b.workload),
    };
  }

  const employees = [];
  for (let i = 0; i < dtoIn.count; i++) {
    employees.push(generateEmployee());
  }

  const statistics = getEmployeeStatistics(employees);

  return statistics;
}

const dtoIn = {
  count: 50,
  age: {
    min: 19,
    max: 35,
  },
};

const dtoOut = main(dtoIn);
console.log(dtoOut);
