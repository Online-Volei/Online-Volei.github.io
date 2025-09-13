import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Player, ActionType, ActionResult, Team } from '../types';
import { ACTION_TYPES, ACTION_RESULTS, ACTION_ICONS, RESULT_COLORS } from '../constants';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (actionData: { player: string; team: Team; action: ActionType; result: ActionResult; notes?: string }) => void;
  team1Players: Player[];
  team2Players: Player[];
  selectedZone?: number | null;
}

export function ActionModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  team1Players, 
  team2Players, 
  selectedZone 
}: ActionModalProps) {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<Team>('team1');
  const [selectedAction, setSelectedAction] = useState<ActionType>('saque');
  const [selectedResult, setSelectedResult] = useState<ActionResult>('positivo');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlayer) {
      onSubmit({
        player: selectedPlayer,
        team: selectedTeam,
        action: selectedAction,
        result: selectedResult,
        notes: notes.trim() || undefined,
      });
      
      // Reset form
      setSelectedPlayer('');
      setSelectedTeam('team1');
      setSelectedAction('saque');
      setSelectedResult('positivo');
      setNotes('');
    }
  };

  const handleClose = () => {
    setSelectedPlayer('');
    setSelectedTeam('team1');
    setSelectedAction('saque');
    setSelectedResult('positivo');
    setNotes('');
    onClose();
  };

  if (!isOpen) return null;

  const currentPlayers = selectedTeam === 'team1' ? team1Players : team2Players;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Registrar Ação</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {selectedZone && (
            <p className="text-sm text-gray-600 mt-1">
              Zona {selectedZone} selecionada
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Team Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setSelectedTeam('team1')}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                  selectedTeam === 'team1'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                Time 1
              </button>
              <button
                type="button"
                onClick={() => setSelectedTeam('team2')}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                  selectedTeam === 'team2'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                Time 2
              </button>
            </div>
          </div>

          {/* Player Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jogador
            </label>
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              className="input"
              required
            >
              <option value="">Selecione um jogador</option>
              {currentPlayers.map((player) => (
                <option key={player.id} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>
          </div>

          {/* Action Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ação
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ACTION_TYPES.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => setSelectedAction(action)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    selectedAction === action
                      ? 'border-volleyball-500 bg-volleyball-50 text-volleyball-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg">{ACTION_ICONS[action]}</div>
                    <div className="text-sm font-medium capitalize">{action}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Result Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resultado
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ACTION_RESULTS.map((result) => (
                <button
                  key={result}
                  type="button"
                  onClick={() => setSelectedResult(result)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    selectedResult === result
                      ? 'border-volleyball-500 bg-volleyball-50 text-volleyball-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-sm font-medium capitalize ${RESULT_COLORS[result]}`}>
                      {result}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Adicione observações sobre a ação..."
              className="input h-20 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!selectedPlayer}
            >
              <Check className="w-4 h-4 mr-2" />
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
