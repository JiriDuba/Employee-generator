function binToDec(binary) {
  let decimal = 0;
  let exponent = 0;

  // Projdeme binarni cislo z prava do leva
  for (let i = binary.length - 1; i >= 0; i--) {
    //Pokud je cislice 1, pricteme odpovidajici mocninu dvou a zvysime exponent
    if (binary[i] === `1`) {
      decimal += Math.pow(2, exponent);
    }
    exponent++;
  }
  return decimal;
}

const binary = "1010";
const decimal = binToDec(binary);
console.log(`Binarni ${binary} je ${decimal} v desitkove soustave.`);
