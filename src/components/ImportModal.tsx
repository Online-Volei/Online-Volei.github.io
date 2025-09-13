import { useState } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (jsonData: string) => void;
}

export function ImportModal({ isOpen, onClose, onImport }: ImportModalProps) {
  const [jsonData, setJsonData] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setJsonData(content);
        setError('');
      };
      reader.readAsText(file);
    }
  };

  const handleImport = () => {
    try {
      JSON.parse(jsonData);
      onImport(jsonData);
    } catch (err) {
      setError('Arquivo JSON inválido. Verifique o formato e tente novamente.');
    }
  };

  const handleClose = () => {
    setJsonData('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Importar Treino</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecione um arquivo JSON
              </label>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-volleyball-50 file:text-volleyball-700 hover:file:bg-volleyball-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ou cole o JSON aqui
              </label>
              <textarea
                value={jsonData}
                onChange={(e) => {
                  setJsonData(e.target.value);
                  setError('');
                }}
                placeholder="Cole o conteúdo do arquivo JSON aqui..."
                className="input h-32 resize-none"
              />
            </div>

            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm text-red-600">{error}</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={handleImport}
            disabled={!jsonData.trim()}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="w-4 h-4 mr-2" />
            Importar
          </button>
        </div>
      </div>
    </div>
  );
}
