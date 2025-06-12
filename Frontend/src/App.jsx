import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Bus, MapPin, AlertTriangle, BarChart3, Menu, X } from 'lucide-react';
import './App.css';

// Componente de navegação
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: BarChart3 },
    { path: '/linhas', label: 'Linhas', icon: Bus },
    { path: '/relatorios', label: 'Relatórios', icon: AlertTriangle },
  ];

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Bus className="h-8 w-8 mr-3" />
            <span className="text-xl font-bold">Mobilidade Maringá</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-foreground text-primary'
                      : 'hover:bg-primary-foreground/10'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-primary-foreground/10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary-foreground text-primary'
                        : 'hover:bg-primary-foreground/10'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Componente Dashboard
const Dashboard = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/status')
      .then(res => res.json())
      .then(data => {
        setStatus(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar status:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Última atualização: {status ? new Date(status.ultimaAtualizacao).toLocaleString('pt-BR') : 'N/A'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <div className="flex items-center">
            <Bus className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total de Linhas</p>
              <p className="text-2xl font-bold text-card-foreground">{status?.totalLinhas || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-green-600 rounded-full"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Linhas Ativas</p>
              <p className="text-2xl font-bold text-card-foreground">{status?.linhasAtivas || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Com Problemas</p>
              <p className="text-2xl font-bold text-card-foreground">{status?.linhasComProblema || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Relatórios Pendentes</p>
              <p className="text-2xl font-bold text-card-foreground">{status?.relatoriosPendentes || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Sobre o Sistema</h2>
        <p className="text-muted-foreground mb-4">
          O sistema de Mobilidade Maringá foi desenvolvido para melhorar a experiência dos usuários do transporte público,
          fornecendo informações em tempo real sobre linhas de ônibus, tempos de espera e permitindo que os usuários
          relatem problemas para uma gestão mais eficiente.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Funcionalidades:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Monitoramento em tempo real das linhas</li>
              <li>• Relatórios colaborativos dos usuários</li>
              <li>• Dashboard com estatísticas do sistema</li>
              <li>• Interface responsiva para mobile e desktop</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Benefícios:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Redução do tempo de espera</li>
              <li>• Maior transparência no transporte público</li>
              <li>• Incentivo ao uso do transporte coletivo</li>
              <li>• Dados para políticas públicas mais eficientes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Linhas
const Linhas = () => {
  const [linhas, setLinhas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/linhas')
      .then(res => res.json())
      .then(data => {
        setLinhas(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar linhas:', err);
        setLoading(false);
      });
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'ativo': return 'status-ativo';
      case 'atrasado': return 'status-atrasado';
      default: return 'status-manutencao';
    }
  };

  const getLotacaoClass = (lotacao) => {
    switch (lotacao) {
      case 'baixa': return 'lotacao-baixa';
      case 'moderada': return 'lotacao-moderada';
      case 'alta': return 'lotacao-alta';
      default: return 'lotacao-moderada';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Linhas de Ônibus</h1>
        <div className="text-sm text-muted-foreground">
          {linhas.length} linhas encontradas
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {linhas.map((linha) => (
          <div key={linha.id} className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center mb-2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {linha.numero}
                  </span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(linha.status)}`}>
                    {linha.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">{linha.nome}</h3>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tempo de espera:</span>
                <span className="font-medium">{linha.tempoEspera} min</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Lotação:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLotacaoClass(linha.lotacao)}`}>
                  {linha.lotacao}
                </span>
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  Atualizado: {new Date(linha.ultimaAtualizacao).toLocaleTimeString('pt-BR')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente Relatórios
const Relatorios = () => {
  const [relatorios, setRelatorios] = useState([]);
  const [linhas, setLinhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    linhaId: '',
    usuario: '',
    tipo: '',
    descricao: ''
  });

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3001/api/relatorios').then(res => res.json()),
      fetch('http://localhost:3001/api/linhas').then(res => res.json())
    ])
    .then(([relatoriosData, linhasData]) => {
      setRelatorios(relatoriosData.data || []);
      setLinhas(linhasData.data || []);
      setLoading(false);
    })
    .catch(err => {
      console.error('Erro ao carregar dados:', err);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:3001/api/relatorios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setRelatorios([data.data, ...relatorios]);
        setFormData({ linhaId: '', usuario: '', tipo: '', descricao: '' });
        setShowForm(false);
      }
    })
    .catch(err => console.error('Erro ao criar relatório:', err));
  };

  const getLinhaName = (linhaId) => {
    const linha = linhas.find(l => l.id === linhaId);
    return linha ? `${linha.numero} - ${linha.nome}` : 'Linha não encontrada';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          {showForm ? 'Cancelar' : 'Novo Relatório'}
        </button>
      </div>

      {showForm && (
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Criar Novo Relatório</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Linha</label>
                <select
                  value={formData.linhaId}
                  onChange={(e) => setFormData({...formData, linhaId: e.target.value})}
                  className="w-full p-2 border rounded-md bg-background"
                  required
                >
                  <option value="">Selecione uma linha</option>
                  {linhas.map(linha => (
                    <option key={linha.id} value={linha.id}>
                      {linha.numero} - {linha.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Seu nome</label>
                <input
                  type="text"
                  value={formData.usuario}
                  onChange={(e) => setFormData({...formData, usuario: e.target.value})}
                  className="w-full p-2 border rounded-md bg-background"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tipo do problema</label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                  className="w-full p-2 border rounded-md bg-background"
                  required
                >
                  <option value="">Selecione o tipo</option>
                  <option value="atraso">Atraso</option>
                  <option value="superlotacao">Superlotação</option>
                  <option value="manutencao">Manutenção</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Descrição</label>
              <textarea
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                className="w-full p-2 border rounded-md bg-background h-24"
                placeholder="Descreva o problema encontrado..."
                required
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Enviar Relatório
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {relatorios.map((relatorio) => (
          <div key={relatorio.id} className="bg-card rounded-lg p-6 shadow-sm border">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-card-foreground">{getLinhaName(relatorio.linhaId)}</h3>
                <p className="text-sm text-muted-foreground">
                  Por {relatorio.usuario} • {new Date(relatorio.timestamp).toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {relatorio.tipo}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  relatorio.status === 'pendente' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {relatorio.status}
                </span>
              </div>
            </div>
            <p className="text-muted-foreground">{relatorio.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente principal da aplicação
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/linhas" element={<Linhas />} />
            <Route path="/relatorios" element={<Relatorios />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

