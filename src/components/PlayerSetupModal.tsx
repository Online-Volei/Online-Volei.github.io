import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Player } from '../types';
import { DEFAULT_PLAYERS } from '../constants';

interface PlayerSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (team1Players: Player[], team2Players: Player[]) => void;
}

export function PlayerSetupModal({ isOpen, onClose, onComplete }: PlayerSetupModalProps) {
  const [team1Players, setTeam1Players] = useState<Player[]>(DEFAULT_PLAYERS.team1);
  const [team2Players, setTeam2Players] = useState<Player[]>(DEFAULT_PLAYERS.team2);

  const addPlayer = (team: 'team1' | 'team2') => {
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: '',
    };

    if (team === 'team1') {
      setTeam1Players([...team1Players, newPlayer]);
    } else {
      setTeam2Players([...team2Players, newPlayer]);
    }
  };

  const removePlayer = (team: 'team1' | 'team2', playerId: string) => {
    if (team === 'team1') {
      setTeam1Players(team1Players.filter(p => p.id !== playerId));
    } else {
      setTeam2Players(team2Players.filter(p => p.id !== playerId));
    }
  };

  const updatePlayer = (team: 'team1' | 'team2', playerId: string, name: string) => {
    if (team === 'team1') {
      setTeam1Players(team1Players.map(p => 
        p.id === playerId ? { ...p, name } : p
      ));
    } else {
      setTeam2Players(team2Players.map(p => 
        p.id === playerId ? { ...p, name } : p
      ));
    }
  };

  const handleComplete = () => {
    const validTeam1 = team1Players.filter(p => p.name.trim());
    const validTeam2 = team2Players.filter(p => p.name.trim());
    
    if (validTeam1.length > 0 && validTeam2.length > 0) {
      onComplete(validTeam1, validTeam2);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Configurar Jogadores</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Team 1 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Time 1</h3>
              <div className="space-y-3">
                {team1Players.map((player, index) => (
                  <div key={player.id} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={player.name}
                      onChange={(e) => updatePlayer('team1', player.id, e.target.value)}
                      placeholder={`Jogador ${index + 1}`}
                      className="input flex-1"
                    />
                    <button
                      onClick={() => removePlayer('team1', player.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addPlayer('team1')}
                  className="w-full flex items-center justify-center space-x-2 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-volleyball-400 hover:text-volleyball-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Jogador</span>
                </button>
              </div>
            </div>

            {/* Team 2 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Time 2</h3>
              <div className="space-y-3">
                {team2Players.map((player, index) => (
                  <div key={player.id} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={player.name}
                      onChange={(e) => updatePlayer('team2', player.id, e.target.value)}
                      placeholder={`Jogador ${index + 1}`}
                      className="input flex-1"
                    />
                    <button
                      onClick={() => removePlayer('team2', player.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addPlayer('team2')}
                  className="w-full flex items-center justify-center space-x-2 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-volleyball-400 hover:text-volleyball-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Jogador</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={handleComplete}
            className="btn btn-primary"
          >
            Iniciar Treino
          </button>
        </div>
      </div>
    </div>
  );
}
