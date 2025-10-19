import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { huffmanEncode, huffmanDecode } from './components/huffman';
import { arithmeticEncode, arithmeticDecode } from './components/arithmetic';
import HuffmanResults from './components/HuffmanResults';
import ArithmeticResults from './components/ArithmeticResults';
import DecodedResults from './components/DecodedResults';

function CompressionApp() {
  const [inputText, setInputText] = useState('Алгоритми стиснення даних використовуються для зменшення розміру файлів');
  const [huffmanResult, setHuffmanResult] = useState(null);
  const [arithmeticResult, setArithmeticResult] = useState(null);
  const [decodedHuffman, setDecodedHuffman] = useState('');
  const [decodedArithmetic, setDecodedArithmetic] = useState('');

  const handleCompress = () => {
    // Huffman compression
    const hResult = huffmanEncode(inputText);
    const originalBits = inputText.length * 16; // UTF-16
    const compressedBits = hResult.encoded.length;
    const huffmanRatio = ((1 - compressedBits / originalBits) * 100).toFixed(2);

    setHuffmanResult({
      ...hResult,
      originalBits,
      compressedBits,
      ratio: huffmanRatio
    });

    // Arithmetic compression
    const aResult = arithmeticEncode(inputText);
    const arithmeticBits = 64; // Double precision float
    const arithmeticRatio = ((1 - arithmeticBits / originalBits) * 100).toFixed(2);

    setArithmeticResult({
      ...aResult,
      originalBits,
      compressedBits: arithmeticBits,
      ratio: arithmeticRatio
    });

    // Decode
    setDecodedHuffman(huffmanDecode(hResult.encoded, hResult.tree));
    setDecodedArithmetic(arithmeticDecode(aResult.encoded, aResult.probabilities, aResult.length));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2 flex items-center gap-3">
            <Zap className="text-yellow-500" />
            Алгоритми стиснення даних
          </h1>
          <p className="text-gray-600 mb-6">Порівняння алгоритму Хаффмана та арифметичного стиснення</p>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Вхідний текст для стиснення:
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-4 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:outline-none font-mono text-sm"
              rows="4"
              placeholder="Введіть текст для стиснення..."
            />
            <div className="mt-2 text-sm text-gray-600">
              Довжина: {inputText.length} символів | Розмір: {inputText.length * 2} байт (UTF-16)
            </div>
          </div>

          <button
            onClick={handleCompress}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 text-lg shadow-lg"
          >
            <Zap size={24} />
            Виконати стиснення
          </button>
        </div>

        {huffmanResult && arithmeticResult && (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <HuffmanResults result={huffmanResult} inputText={inputText} />
              <ArithmeticResults result={arithmeticResult} inputText={inputText} />
            </div>

            <DecodedResults
              decodedHuffman={decodedHuffman}
              decodedArithmetic={decodedArithmetic}
              inputText={inputText}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default CompressionApp;
