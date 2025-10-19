// Arithmetic Coding Implementation
export function arithmeticEncode(text) {
  if (!text) return { encoded: 0, probabilities: {} };

  const freqMap = {};
  for (let char of text) {
    freqMap[char] = (freqMap[char] || 0) + 1;
  }

  const chars = Object.keys(freqMap).sort();
  const probabilities = {};
  let cumulative = 0;

  for (let char of chars) {
    const prob = freqMap[char] / text.length;
    probabilities[char] = {
      low: cumulative,
      high: cumulative + prob,
      prob: prob
    };
    cumulative += prob;
  }

  let low = 0;
  let high = 1;

  for (let char of text) {
    const range = high - low;
    high = low + range * probabilities[char].high;
    low = low + range * probabilities[char].low;
  }

  const encoded = (low + high) / 2;

  return { encoded, probabilities, length: text.length };
}

export function arithmeticDecode(encoded, probabilities, length) {
  if (!encoded || !probabilities || !length) return '';

  let result = '';
  let value = encoded;

  for (let i = 0; i < length; i++) {
    for (let char in probabilities) {
      const { low, high } = probabilities[char];
      if (value >= low && value < high) {
        result += char;
        const range = high - low;
        value = (value - low) / range;
        break;
      }
    }
  }

  return result;
}
