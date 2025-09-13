import { useState } from 'react';
import { useTrainingStore } from '../store/trainingStore';
import { CourtVisualization } from '../components/CourtVisualization';
import { ActionLog } from '../components/ActionLog';
import { ActionModal } from '../components/ActionModal';
import { ScoreDisplay } from '../components/ScoreDisplay';
import { SetControls } from '../components/SetControls';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TrainingPage() {
  const navigate = useNavigate();
  const { 
    currentSession, 
    getCurrentSet, 
    getCurrentScore, 
    addAction, 
    startNewSet,
    completeCurrentSet 
  } = useTrainingStore();
  
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  if (!currentSession) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Nenhum treino ativo
        </h2>
        <p className="text-gray-600 mb-6">
          Inicie um novo treino para começar a registrar as ações.
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Início
        </button>
      </div>
    );
  }

  const currentSet = getCurrentSet();
  const score = getCurrentScore();

  const handleZoneClick = (zoneId: number) => {
    setSelectedZone(zoneId);
    setShowActionModal(true);
  };

  const handleActionSubmit = (actionData: any) => {
    addAction({
      ...actionData,
      zone: selectedZone,
    });
    setShowActionModal(false);
    setSelectedZone(null);
  };

  const handleNewSet = () => {
    if (currentSet && currentSet.actions.length > 0) {
      completeCurrentSet();
    }
    startNewSet();
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Treino - {new Date(currentSession.date).toLocaleDateString('pt-BR')}
          </h1>
          <p className="text-gray-600">
            Set {currentSession.currentSet} • {currentSet?.actions.length || 0} ações registradas
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`btn ${isPaused ? 'btn-success' : 'btn-secondary'}`}
          >
            {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
            {isPaused ? 'Retomar' : 'Pausar'}
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="btn btn-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Court Visualization */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Quadra de Vôlei
              </h2>
              <p className="text-sm text-gray-600">
                Clique em uma zona para registrar uma ação
              </p>
            </div>
            
            <CourtVisualization
              team1Players={currentSession.teams.team1}
              team2Players={currentSession.teams.team2}
              onZoneClick={handleZoneClick}
              selectedZone={selectedZone}
            />
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Score Display */}
          <ScoreDisplay
            team1Name="Time 1"
            team2Name="Time 2"
            team1Score={score.team1}
            team2Score={score.team2}
            team1Players={currentSession.teams.team1}
            team2Players={currentSession.teams.team2}
          />

          {/* Set Controls */}
          <SetControls
            currentSet={currentSession.currentSet}
            totalSets={currentSession.sets.length}
            onNewSet={handleNewSet}
            canStartNewSet={currentSet ? currentSet.actions.length > 0 : false}
          />

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ações Rápidas
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setShowActionModal(true)}
                className="w-full btn btn-primary"
                disabled={isPaused}
              >
                Registrar Ação
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full btn btn-secondary"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Log */}
      <div className="mt-6">
        <ActionLog
          actions={currentSet?.actions || []}
          team1Players={currentSession.teams.team1}
          team2Players={currentSession.teams.team2}
        />
      </div>

      {/* Action Modal */}
      <ActionModal
        isOpen={showActionModal}
        onClose={() => {
          setShowActionModal(false);
          setSelectedZone(null);
        }}
        onSubmit={handleActionSubmit}
        team1Players={currentSession.teams.team1}
        team2Players={currentSession.teams.team2}
        selectedZone={selectedZone}
      />
    </div>
  );
}
