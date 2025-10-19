import React from 'react';
import { CheckCircle } from 'lucide-react';

const DecodedResults = ({ decodedHuffman, decodedArithmetic, inputText }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
        <CheckCircle className="text-green-500" />
        Перевірка декомпресії
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Декодований (Хаффман):</h3>
          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
            {decodedHuffman}
          </div>
          <div className="mt-2 flex items-center gap-2">
            {decodedHuffman === inputText ? (
              <span className="text-green-600 font-semibold flex items-center gap-1">
                <CheckCircle size={20} /> Співпадає з оригіналом!
              </span>
            ) : (
              <span className="text-red-600 font-semibold">❌ Не співпадає!</span>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Декодований (Арифметичне):</h3>
          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
            {decodedArithmetic}
          </div>
          <div className="mt-2 flex items-center gap-2">
            {decodedArithmetic === inputText ? (
              <span className="text-green-600 font-semibold flex items-center gap-1">
                <CheckCircle size={20} /> Співпадає з оригіналом!
              </span>
            ) : (
              <span className="text-red-600 font-semibold">❌ Не співпадає!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecodedResults;
