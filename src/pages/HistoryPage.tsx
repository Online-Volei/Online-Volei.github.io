import { useTrainingStore } from '../store/trainingStore';
import { Download, Trash2, Eye, Calendar, Clock, Users, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HistoryPage() {
  const navigate = useNavigate();
  const { sessions, loadSession, deleteSession } = useTrainingStore();

  const handleLoadSession = (sessionId: string) => {
    loadSession(sessionId);
    navigate('/training');
  };

  const handleDeleteSession = (sessionId: string) => {
    if (confirm('Tem certeza que deseja excluir este treino?')) {
      deleteSession(sessionId);
    }
  };

  const handleExportSession = (sessionId: string) => {
    // Load session temporarily to export
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      const data = JSON.stringify(session, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `treino-${session.date}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const getTotalActions = (session: any) => {
    return session.sets.reduce((acc: number, set: any) => acc + set.actions.length, 0);
  };

  const getTotalDuration = (session: any) => {
    if (session.sets.length === 0) return '0 min';
    
    const firstAction = session.sets[0]?.actions[0];
    const lastAction = session.sets[session.sets.length - 1]?.actions[session.sets[session.sets.length - 1].actions.length - 1];
    
    if (!firstAction || !lastAction) return '0 min';
    
    const duration = (lastAction.timestamp - firstAction.timestamp) / (1000 * 60);
    return `${Math.round(duration)} min`;
  };

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Nenhum treino encontrado
        </h2>
        <p className="text-gray-600 mb-6">
          Inicie um novo treino para começar a registrar as ações.
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Iniciar Novo Treino
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Histórico de Treinos
          </h1>
          <p className="text-gray-600">
            {sessions.length} treino(s) registrado(s)
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {sessions.map((session) => {
          const totalActions = getTotalActions(session);
          const duration = getTotalDuration(session);
          
          return (
            <div
              key={session.id}
              className="card transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-volleyball-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-volleyball-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Treino de {new Date(session.date).toLocaleDateString('pt-BR')}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {session.sets.length} set(s) • {session.teams.team1.length + session.teams.team2.length} jogadores
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Ações</div>
                        <div className="font-semibold text-gray-900">{totalActions}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Duração</div>
                        <div className="font-semibold text-gray-900">{duration}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Time 1</div>
                        <div className="font-semibold text-gray-900">{session.teams.team1.length}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Time 2</div>
                        <div className="font-semibold text-gray-900">{session.teams.team2.length}</div>
                      </div>
                    </div>
                  </div>

                  {/* Players */}
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Time 1: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {session.teams.team1.map((player) => (
                          <span
                            key={player.id}
                            className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                          >
                            {player.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Time 2: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {session.teams.team2.map((player) => (
                          <span
                            key={player.id}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {player.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleLoadSession(session.id)}
                    className="p-2 text-volleyball-600 hover:bg-volleyball-100 rounded-lg transition-colors"
                    title="Carregar treino"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleExportSession(session.id)}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                    title="Exportar treino"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteSession(session.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="Excluir treino"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
