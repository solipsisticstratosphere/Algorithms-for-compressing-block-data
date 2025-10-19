// Huffman Coding Implementation
export class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

export function buildHuffmanTree(text) {
  const freqMap = {};
  for (let char of text) {
    freqMap[char] = (freqMap[char] || 0) + 1;
  }

  let heap = Object.entries(freqMap).map(([char, freq]) => new HuffmanNode(char, freq));

  while (heap.length > 1) {
    heap.sort((a, b) => a.freq - b.freq);
    const left = heap.shift();
    const right = heap.shift();
    const parent = new HuffmanNode(null, left.freq + right.freq, left, right);
    heap.push(parent);
  }

  return heap[0];
}

export function generateHuffmanCodes(node, code = '', codes = {}) {
  if (!node) return codes;

  if (node.char !== null) {
    codes[node.char] = code || '0';
    return codes;
  }

  generateHuffmanCodes(node.left, code + '0', codes);
  generateHuffmanCodes(node.right, code + '1', codes);

  return codes;
}

export function huffmanEncode(text) {
  if (!text) return { encoded: '', codes: {}, tree: null };

  const tree = buildHuffmanTree(text);
  const codes = generateHuffmanCodes(tree);
  const encoded = text.split('').map(char => codes[char]).join('');

  return { encoded, codes, tree };
}

export function huffmanDecode(encoded, tree) {
  if (!encoded || !tree) return '';

  let result = '';
  let current = tree;

  for (let bit of encoded) {
    current = bit === '0' ? current.left : current.right;

    if (current.char !== null) {
      result += current.char;
      current = tree;
    }
  }

  return result;
}
