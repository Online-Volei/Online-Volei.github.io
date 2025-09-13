import { Action, Player } from '../types';
import { ACTION_ICONS, ACTION_COLORS, RESULT_COLORS } from '../constants';
import { Clock, MapPin, MessageSquare } from 'lucide-react';

interface ActionLogProps {
  actions: Action[];
  team1Players: Player[];
  team2Players: Player[];
}

export function ActionLog({ actions, team1Players }: ActionLogProps) {
  
  const getPlayerTeam = (playerName: string) => {
    return team1Players.some(p => p.name === playerName) ? 'team1' : 'team2';
  };

  const getTeamColor = (team: 'team1' | 'team2') => {
    return team === 'team1' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200';
  };

  if (actions.length === 0) {
    return (
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Histórico de Ações
        </h2>
        <div className="text-center py-8 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Nenhuma ação registrada ainda</p>
          <p className="text-sm">Clique em uma zona da quadra para começar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Histórico de Ações ({actions.length})
      </h2>
      
      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
        {actions.map((action, index) => {
          const team = getPlayerTeam(action.player);
          const teamColor = getTeamColor(team);
          
          return (
            <div
              key={action.id}
              className={`p-4 rounded-lg border ${teamColor} transition-all duration-200 hover:shadow-sm`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {/* Action Icon */}
                  <div className={`p-2 rounded-lg ${ACTION_COLORS[action.action]}`}>
                    <span className="text-lg">{ACTION_ICONS[action.action]}</span>
                  </div>
                  
                  {/* Action Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {action.player}
                      </span>
                      <span className={`text-sm font-medium ${RESULT_COLORS[action.result]}`}>
                        {action.result}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="capitalize font-medium">
                        {action.action}
                      </span>
                      
                      {action.zone && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>Zona {action.zone}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(action.timestamp).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                    
                    {action.notes && (
                      <div className="mt-2 flex items-start space-x-1">
                        <MessageSquare className="w-3 h-3 mt-0.5 text-gray-400" />
                        <span className="text-sm text-gray-600 italic">
                          {action.notes}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Number */}
                <div className="text-xs text-gray-400 font-mono">
                  #{index + 1}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total de ações:</span>
          <span className="font-medium">{actions.length}</span>
        </div>
      </div>
    </div>
  );
}
