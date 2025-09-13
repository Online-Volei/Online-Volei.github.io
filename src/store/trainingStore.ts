import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TrainingSession, Action, Set, Player, ActionType } from '../types';

interface TrainingState {
  currentSession: TrainingSession | null;
  sessions: TrainingSession[];
  
  // Actions
  createNewSession: (team1Players: Player[], team2Players: Player[]) => void;
  loadSession: (sessionId: string) => void;
  addAction: (action: Omit<Action, 'id' | 'timestamp'>) => void;
  updateAction: (actionId: string, updates: Partial<Action>) => void;
  deleteAction: (actionId: string) => void;
  startNewSet: () => void;
  completeCurrentSet: () => void;
  exportSession: () => string;
  importSession: (jsonData: string) => void;
  saveSession: () => void;
  deleteSession: (sessionId: string) => void;
  
  // Computed values
  getCurrentSet: () => Set | null;
  getCurrentScore: () => { team1: number; team2: number };
  getSessionStatistics: () => any;
}

export const useTrainingStore = create<TrainingState>()(
  persist(
    (set, get) => ({
      currentSession: null,
      sessions: [],

      createNewSession: (team1Players, team2Players) => {
        const newSession: TrainingSession = {
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0],
          duration: 0,
          teams: {
            team1: team1Players,
            team2: team2Players,
          },
          sets: [{
            setNumber: 1,
            actions: [],
            team1Score: 0,
            team2Score: 0,
            isCompleted: false,
          }],
          currentSet: 1,
          isActive: true,
        };

        set((state) => ({
          currentSession: newSession,
          sessions: [newSession, ...state.sessions],
        }));
      },

      loadSession: (sessionId) => {
        const session = get().sessions.find(s => s.id === sessionId);
        if (session) {
          set({ currentSession: session });
        }
      },

      addAction: (actionData) => {
        const { currentSession } = get();
        if (!currentSession) return;

        const newAction: Action = {
          ...actionData,
          id: Date.now().toString(),
          timestamp: Date.now(),
        };

        const updatedSession = {
          ...currentSession,
          sets: currentSession.sets.map((set, index) => {
            if (index === currentSession.currentSet - 1) {
              const updatedActions = [...set.actions, newAction];
              let newTeam1Score = set.team1Score;
              let newTeam2Score = set.team2Score;

              // Update scores based on action
              if (actionData.result === 'ponto') {
                if (actionData.team === 'team1') {
                  newTeam1Score++;
                } else {
                  newTeam2Score++;
                }
              }

              return {
                ...set,
                actions: updatedActions,
                team1Score: newTeam1Score,
                team2Score: newTeam2Score,
              };
            }
            return set;
          }),
        };

        set({ currentSession: updatedSession });
      },

      updateAction: (actionId, updates) => {
        const { currentSession } = get();
        if (!currentSession) return;

        const updatedSession = {
          ...currentSession,
          sets: currentSession.sets.map(set => ({
            ...set,
            actions: set.actions.map(action =>
              action.id === actionId ? { ...action, ...updates } : action
            ),
          })),
        };

        set({ currentSession: updatedSession });
      },

      deleteAction: (actionId) => {
        const { currentSession } = get();
        if (!currentSession) return;

        const updatedSession = {
          ...currentSession,
          sets: currentSession.sets.map(set => ({
            ...set,
            actions: set.actions.filter(action => action.id !== actionId),
          })),
        };

        set({ currentSession: updatedSession });
      },

      startNewSet: () => {
        const { currentSession } = get();
        if (!currentSession) return;

        const newSet: Set = {
          setNumber: currentSession.sets.length + 1,
          actions: [],
          team1Score: 0,
          team2Score: 0,
          isCompleted: false,
        };

        const updatedSession = {
          ...currentSession,
          sets: [...currentSession.sets, newSet],
          currentSet: currentSession.sets.length + 1,
        };

        set({ currentSession: updatedSession });
      },

      completeCurrentSet: () => {
        const { currentSession } = get();
        if (!currentSession) return;

        const updatedSession = {
          ...currentSession,
          sets: currentSession.sets.map((set, index) => {
            if (index === currentSession.currentSet - 1) {
              return { ...set, isCompleted: true };
            }
            return set;
          }),
        };

        set({ currentSession: updatedSession });
      },

      exportSession: () => {
        const { currentSession } = get();
        if (!currentSession) return '';

        return JSON.stringify(currentSession, null, 2);
      },

      importSession: (jsonData) => {
        try {
          const session = JSON.parse(jsonData) as TrainingSession;
          set((state) => ({
            currentSession: session,
            sessions: [session, ...state.sessions],
          }));
        } catch (error) {
          console.error('Error importing session:', error);
        }
      },

      saveSession: () => {
        const { currentSession, sessions } = get();
        if (!currentSession) return;

        const updatedSessions = sessions.map(session =>
          session.id === currentSession.id ? currentSession : session
        );

        set({ sessions: updatedSessions });
      },

      deleteSession: (sessionId) => {
        set((state) => ({
          sessions: state.sessions.filter(s => s.id !== sessionId),
          currentSession: state.currentSession?.id === sessionId ? null : state.currentSession,
        }));
      },

      getCurrentSet: () => {
        const { currentSession } = get();
        if (!currentSession) return null;
        return currentSession.sets[currentSession.currentSet - 1] || null;
      },

      getCurrentScore: () => {
        const currentSet = get().getCurrentSet();
        if (!currentSet) return { team1: 0, team2: 0 };
        return { team1: currentSet.team1Score, team2: currentSet.team2Score };
      },

      getSessionStatistics: () => {
        const { currentSession } = get();
        if (!currentSession) return null;

        // Calculate basic statistics
        const allActions = currentSession.sets.flatMap(set => set.actions);
        const totalActions = allActions.length;
        
        const actionsByPlayer: Record<string, Record<ActionType, number>> = {};
        const pointsByPlayer: Record<string, number> = {};
        
        allActions.forEach(action => {
          if (!actionsByPlayer[action.player]) {
            actionsByPlayer[action.player] = {
              saque: 0, ataque: 0, bloqueio: 0, recepção: 0, defesa: 0, erro: 0, ponto: 0
            };
          }
          actionsByPlayer[action.player][action.action]++;
          
          if (action.result === 'ponto') {
            pointsByPlayer[action.player] = (pointsByPlayer[action.player] || 0) + 1;
          }
        });

        return {
          totalActions,
          actionsByPlayer,
          pointsByPlayer,
        };
      },
    }),
    {
      name: 'volleyball-training-storage',
      partialize: (state) => ({
        sessions: state.sessions,
        currentSession: state.currentSession,
      }),
    }
  )
);
