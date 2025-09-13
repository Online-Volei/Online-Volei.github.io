import { Plus, CheckCircle } from 'lucide-react';

interface SetControlsProps {
  currentSet: number;
  totalSets: number;
  onNewSet: () => void;
  canStartNewSet: boolean;
}

export function SetControls({ 
  currentSet, 
  totalSets, 
  onNewSet, 
  canStartNewSet 
}: SetControlsProps) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Controle de Sets
      </h3>
      
      <div className="space-y-4">
        {/* Current Set Info */}
        <div className="text-center">
          <div className="text-2xl font-bold text-volleyball-600 mb-1">
            Set {currentSet}
          </div>
          <div className="text-sm text-gray-600">
            {totalSets} set(s) total
          </div>
        </div>

        {/* Set Progress */}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalSets }, (_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i < currentSet - 1
                  ? 'bg-green-100 text-green-600'
                  : i === currentSet - 1
                  ? 'bg-volleyball-100 text-volleyball-600'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {i < currentSet - 1 ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                i + 1
              )}
            </div>
          ))}
        </div>

        {/* New Set Button */}
        <button
          onClick={onNewSet}
          disabled={!canStartNewSet}
          className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Iniciar Novo Set
        </button>

        {/* Help Text */}
        <div className="text-xs text-gray-500 text-center">
          {canStartNewSet 
            ? 'Registre pelo menos uma ação antes de iniciar um novo set'
            : 'Complete o set atual para iniciar um novo'
          }
        </div>
      </div>
    </div>
  );
}
