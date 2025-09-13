import { Player } from '../types';
import { COURT_ZONES } from '../constants';

interface CourtVisualizationProps {
  team1Players: Player[];
  team2Players: Player[];
  onZoneClick: (zoneId: number) => void;
  selectedZone?: number | null;
}

export function CourtVisualization({ 
  team1Players, 
  team2Players, 
  onZoneClick, 
  selectedZone 
}: CourtVisualizationProps) {
  return (
    <div className="bg-court-light border-4 border-court-line rounded-lg p-4">
      {/* Team 2 (Top) */}
      <div className="mb-2">
        <div className="text-center mb-2">
          <h3 className="font-semibold text-gray-800">Time 2</h3>
          <div className="flex flex-wrap justify-center gap-1">
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
        
        {/* Team 2 Zones */}
        <div className="grid grid-cols-3 gap-1 mb-2">
          {[4, 3, 2].map((zoneId) => {
            const zone = COURT_ZONES.find(z => z.id === zoneId);
            return (
              <button
                key={zoneId}
                onClick={() => onZoneClick(zoneId)}
                className={`court-zone aspect-square flex items-center justify-center text-sm font-medium ${
                  selectedZone === zoneId ? 'active' : ''
                }`}
              >
                <div className="text-center">
                  <div className="font-bold">{zoneId}</div>
                  <div className="text-xs">{zone?.name}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Net */}
      <div className="h-2 bg-court-line rounded mb-2"></div>

      {/* Team 1 (Bottom) */}
      <div>
        {/* Team 1 Zones */}
        <div className="grid grid-cols-3 gap-1 mb-2">
          {[5, 6, 1].map((zoneId) => {
            const zone = COURT_ZONES.find(z => z.id === zoneId);
            return (
              <button
                key={zoneId}
                onClick={() => onZoneClick(zoneId)}
                className={`court-zone aspect-square flex items-center justify-center text-sm font-medium ${
                  selectedZone === zoneId ? 'active' : ''
                }`}
              >
                <div className="text-center">
                  <div className="font-bold">{zoneId}</div>
                  <div className="text-xs">{zone?.name}</div>
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="text-center">
          <h3 className="font-semibold text-gray-800">Time 1</h3>
          <div className="flex flex-wrap justify-center gap-1">
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
      </div>

      {/* Legend */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-600">
          Clique em uma zona para registrar uma ação
        </p>
      </div>
    </div>
  );
}
