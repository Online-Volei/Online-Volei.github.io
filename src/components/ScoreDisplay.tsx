import { Player } from '../types';

interface ScoreDisplayProps {
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
  team1Players: Player[];
  team2Players: Player[];
}

export function ScoreDisplay({ 
  team1Name, 
  team2Name, 
  team1Score, 
  team2Score, 
  team1Players, 
  team2Players 
}: ScoreDisplayProps) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Placar
      </h3>
      
      <div className="space-y-4">
        {/* Team 1 */}
        <div className="text-center">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{team1Name}</h4>
              <div className="flex flex-wrap justify-center gap-1 mt-1">
                {team1Players.map((player) => (
                  <span
                    key={player.id}
                    className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                  >
                    {player.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="ml-4">
              <div className="text-3xl font-bold text-green-600">
                {team1Score}
              </div>
            </div>
          </div>
        </div>

        {/* VS Separator */}
        <div className="flex items-center justify-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-sm font-medium text-gray-500">VS</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Team 2 */}
        <div className="text-center">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{team2Name}</h4>
              <div className="flex flex-wrap justify-center gap-1 mt-1">
                {team2Players.map((player) => (
                  <span
                    key={player.id}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {player.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="ml-4">
              <div className="text-3xl font-bold text-blue-600">
                {team2Score}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total de pontos:</span>
          <span className="font-medium">{team1Score + team2Score}</span>
        </div>
      </div>
    </div>
  );
}
