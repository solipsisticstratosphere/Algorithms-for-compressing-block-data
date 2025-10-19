import React from 'react';
import { BarChart3 } from 'lucide-react';

const ArithmeticResults = ({ result, inputText }) => {
  if (!result) return null;

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
        <BarChart3 className="text-purple-500" />
        Арифметичне стиснення
      </h2>

      <div className="space-y-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Таблиця ймовірностей:</h3>
          <div className="max-h-40 overflow-y-auto font-mono text-xs bg-white p-3 rounded border">
            {Object.entries(result.probabilities).map(([char, data]) => (
              <div key={char} className="py-1">
                <span className="font-bold">'{char}':</span>
                <span className="text-purple-600 ml-2">
                  [{data.low.toFixed(4)}, {data.high.toFixed(4)})
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Статистика:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Оригінальний розмір:</span>
              <span className="font-bold">{result.originalBits} біт</span>
            </div>
            <div className="flex justify-between">
              <span>Стиснений розмір:</span>
              <span className="font-bold">{result.compressedBits} біт</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-green-600">
              <span>Коефіцієнт стиснення:</span>
              <span>{result.ratio}%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Кодоване число:</h3>
          <div className="font-mono text-xs bg-white p-3 rounded border break-all">
            {result.encoded.toFixed(20)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArithmeticResults;
