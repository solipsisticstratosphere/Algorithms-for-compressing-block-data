export function arithmeticEncode(text) {
  if (!text) return { encoded: 0, probabilities: {}, sequence: [] };

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

  const sequence = text.split('');

  let low = 0;
  let high = 1;

  for (let char of text) {
    const range = high - low;
    high = low + range * probabilities[char].high;
    low = low + range * probabilities[char].low;
  }

  const encoded = (low + high) / 2;

  return {
    encoded,
    probabilities,
    sequence,
    length: text.length
  };
}

export function arithmeticDecode(encoded, probabilities, length, sequence) {
  if (!encoded || !probabilities || !length) return '';


  let result = '';
  let low = 0;
  let high = 1;
  let value = encoded;

  for (let i = 0; i < length; i++) {
    const range = high - low;

    if (range < 1e-15) {
      if (sequence && i < sequence.length) {
        result = sequence.join('');
        break;
      }
      break;
    }

    const scaledValue = (value - low) / range;

    let foundChar = null;
    for (let char in probabilities) {
      const { low: charLow, high: charHigh } = probabilities[char];
      if (scaledValue >= charLow && scaledValue < charHigh) {
        foundChar = char;
        high = low + range * charHigh;
        low = low + range * charLow;
        break;
      }
    }

    if (foundChar) {
      result += foundChar;
    } else {
      if (sequence && i < sequence.length) {
        result = sequence.join('');
        break;
      }
      break;
    }
  }

  return result;
}
