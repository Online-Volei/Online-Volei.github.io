import { CourtZone, ActionType, ActionResult } from '../types';

export const COURT_ZONES: CourtZone[] = [
  { id: 1, name: 'Zona 1', position: 'back', side: 'right' },
  { id: 2, name: 'Zona 2', position: 'front', side: 'right' },
  { id: 3, name: 'Zona 3', position: 'front', side: 'center' },
  { id: 4, name: 'Zona 4', position: 'front', side: 'left' },
  { id: 5, name: 'Zona 5', position: 'back', side: 'left' },
  { id: 6, name: 'Zona 6', position: 'back', side: 'center' },
];

export const ACTION_TYPES: ActionType[] = [
  'saque',
  'ataque',
  'bloqueio',
  'recepção',
  'defesa',
  'erro',
  'ponto'
];

export const ACTION_RESULTS: ActionResult[] = [
  'positivo',
  'negativo',
  'ponto',
  'erro'
];

export const ACTION_ICONS: Record<ActionType, string> = {
  saque: '🎾',
  ataque: '⚡',
  bloqueio: '🛡️',
  recepção: '🤲',
  defesa: '🏐',
  erro: '❌',
  ponto: '✅'
};

export const ACTION_COLORS: Record<ActionType, string> = {
  saque: 'bg-yellow-100 text-yellow-800',
  ataque: 'bg-red-100 text-red-800',
  bloqueio: 'bg-blue-100 text-blue-800',
  recepção: 'bg-green-100 text-green-800',
  defesa: 'bg-purple-100 text-purple-800',
  erro: 'bg-gray-100 text-gray-800',
  ponto: 'bg-emerald-100 text-emerald-800'
};

export const RESULT_COLORS: Record<ActionResult, string> = {
  positivo: 'text-green-600',
  negativo: 'text-red-600',
  ponto: 'text-emerald-600 font-bold',
  erro: 'text-red-600 font-bold'
};

export const DEFAULT_PLAYERS = {
  team1: [
    { id: '1', name: 'Kel' },
    { id: '2', name: 'Luís' },
    { id: '3', name: 'Pedro' },
    { id: '4', name: 'João' },
    { id: '5', name: 'Mateus' },
    { id: '6', name: 'Rafael' }
  ],
  team2: [
    { id: '7', name: 'Carlos' },
    { id: '8', name: 'Bruno' },
    { id: '9', name: 'André' },
    { id: '10', name: 'Felipe' },
    { id: '11', name: 'Hugo' },
    { id: '12', name: 'Tiago' }
  ]
};
