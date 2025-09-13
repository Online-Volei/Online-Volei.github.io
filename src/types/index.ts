export interface Player {
  id: string;
  name: string;
  number?: number;
}

export type Team = 'team1' | 'team2';

export type ActionType = 
  | 'saque'
  | 'ataque' 
  | 'bloqueio'
  | 'recepção'
  | 'defesa'
  | 'erro'
  | 'ponto';

export type ActionResult = 
  | 'positivo'
  | 'negativo'
  | 'ponto'
  | 'erro';

export interface Action {
  id: string;
  timestamp: number;
  player: string;
  team: Team;
  action: ActionType;
  result: ActionResult;
  zone?: number;
  notes?: string;
}

export interface Set {
  setNumber: number;
  actions: Action[];
  team1Score: number;
  team2Score: number;
  isCompleted: boolean;
}

export interface TrainingSession {
  id: string;
  date: string;
  duration: number;
  teams: {
    team1: Player[];
    team2: Player[];
  };
  sets: Set[];
  currentSet: number;
  isActive: boolean;
}

export interface Statistics {
  totalActions: number;
  actionsByPlayer: Record<string, Record<ActionType, number>>;
  actionsByTeam: Record<Team, Record<ActionType, number>>;
  pointsByPlayer: Record<string, number>;
  pointsByTeam: Record<Team, number>;
  efficiencyByPlayer: Record<string, number>;
  efficiencyByTeam: Record<Team, number>;
}

export interface CourtZone {
  id: number;
  name: string;
  position: 'front' | 'back';
  side: 'left' | 'center' | 'right';
}