import { arithmeticEncode, arithmeticDecode } from './src/components/arithmetic.js';

const testText = 'Алгоритми стиснення даних використовуються для зменшення розміру файлів';

console.log('Original text:', testText);
console.log('Length:', testText.length);

const encoded = arithmeticEncode(testText);
console.log('\nEncoded:', encoded.encoded);
console.log('Length stored:', encoded.length);
console.log('\nProbabilities:');
Object.entries(encoded.probabilities).forEach(([char, data]) => {
  console.log(`  '${char}': [${data.low.toFixed(6)}, ${data.high.toFixed(6)})`);
});

const decoded = arithmeticDecode(encoded.encoded, encoded.probabilities, encoded.length, encoded.sequence);
console.log('\nDecoded text:', decoded);
console.log('Decoded length:', decoded.length);
console.log('\nMatch:', testText === decoded);

if (testText !== decoded) {
  console.log('\nFirst difference at position:');
  for (let i = 0; i < Math.min(testText.length, decoded.length); i++) {
    if (testText[i] !== decoded[i]) {
      console.log(`  Position ${i}: expected '${testText[i]}', got '${decoded[i]}'`);
      break;
    }
  }
  if (testText.length !== decoded.length) {
    console.log(`  Length mismatch: expected ${testText.length}, got ${decoded.length}`);
  }
}
