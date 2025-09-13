import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Upload, Download, Play, BarChart3, Users, History } from 'lucide-react';
import { useTrainingStore } from '../store/trainingStore';
import { PlayerSetupModal } from '../components/PlayerSetupModal';
import { ImportModal } from '../components/ImportModal';

export function HomePage() {
  const navigate = useNavigate();
  const { sessions, createNewSession, exportSession, importSession } = useTrainingStore();
  const [showPlayerSetup, setShowPlayerSetup] = useState(false);
  const [showImport, setShowImport] = useState(false);

  const handleNewTraining = () => {
    setShowPlayerSetup(true);
  };

  const handlePlayerSetupComplete = (team1Players: any[], team2Players: any[]) => {
    createNewSession(team1Players, team2Players);
    setShowPlayerSetup(false);
    navigate('/training');
  };

  const handleExport = () => {
    const data = exportSession();
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `treino-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleImport = (jsonData: string) => {
    importSession(jsonData);
    setShowImport(false);
    navigate('/training');
  };

  const recentSessions = sessions.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Análise de Treinos de Vôlei
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Registre e analise os treinos da sua equipe de forma simples e eficiente. 
          Acompanhe estatísticas, pontos e performance dos jogadores.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <button
          onClick={handleNewTraining}
          className="card hover:shadow-md transition-shadow duration-200 group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-volleyball-100 rounded-lg flex items-center justify-center group-hover:bg-volleyball-200 transition-colors">
              <Plus className="w-6 h-6 text-volleyball-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Novo Treino</h3>
              <p className="text-sm text-gray-600">Iniciar um novo treino</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setShowImport(true)}
          className="card hover:shadow-md transition-shadow duration-200 group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Carregar Treino</h3>
              <p className="text-sm text-gray-600">Importar arquivo JSON</p>
            </div>
          </div>
        </button>

        <button
          onClick={handleExport}
          className="card hover:shadow-md transition-shadow duration-200 group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Exportar Treino</h3>
              <p className="text-sm text-gray-600">Baixar dados em JSON</p>
            </div>
          </div>
        </button>
      </div>

      {/* Recent Sessions */}
      {recentSessions.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <History className="w-5 h-5 mr-2" />
            Treinos Recentes
          </h2>
          <div className="space-y-3">
            {recentSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => navigate('/training')}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-volleyball-100 rounded-lg flex items-center justify-center">
                    <Play className="w-5 h-5 text-volleyball-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Treino de {new Date(session.date).toLocaleDateString('pt-BR')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {session.sets.length} set(s) • {session.teams.team1.length + session.teams.team2.length} jogadores
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {session.sets.reduce((acc, set) => acc + set.actions.length, 0)} ações
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-6 h-6 text-volleyball-600" />
            <h3 className="text-lg font-semibold text-gray-900">Estatísticas Detalhadas</h3>
          </div>
          <p className="text-gray-600">
            Acompanhe a performance de cada jogador com estatísticas completas de ações, 
            pontos e eficiência durante os treinos.
          </p>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="w-6 h-6 text-volleyball-600" />
            <h3 className="text-lg font-semibold text-gray-900">Interface Intuitiva</h3>
          </div>
          <p className="text-gray-600">
            Registre ações rapidamente durante o treino com uma interface simples e 
            visualização clara da quadra dividida em zonas.
          </p>
        </div>
      </div>

      {/* Modals */}
      <PlayerSetupModal
        isOpen={showPlayerSetup}
        onClose={() => setShowPlayerSetup(false)}
        onComplete={handlePlayerSetupComplete}
      />
      
      <ImportModal
        isOpen={showImport}
        onClose={() => setShowImport(false)}
        onImport={handleImport}
      />
    </div>
  );
}
