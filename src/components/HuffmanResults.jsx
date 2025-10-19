import React from 'react';
import { FileText } from 'lucide-react';

const HuffmanResults = ({ result, inputText }) => {
  if (!result) return null;

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
        <FileText className="text-blue-500" />
        Алгоритм Хаффмана
      </h2>

      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Коди Хаффмана:</h3>
          <div className="max-h-40 overflow-y-auto font-mono text-xs bg-white p-3 rounded border">
            {Object.entries(result.codes).map(([char, code]) => (
              <div key={char} className="flex justify-between py-1">
                <span className="font-bold">'{char}':</span>
                <span className="text-blue-600">{code}</span>
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
          <h3 className="font-semibold text-gray-700 mb-2">Стиснені дані (перші 200 біт):</h3>
          <div className="font-mono text-xs bg-white p-3 rounded border break-all">
            {result.encoded.substring(0, 200)}...
          </div>
        </div>
      </div>
    </div>
  );
};

export default HuffmanResults;
