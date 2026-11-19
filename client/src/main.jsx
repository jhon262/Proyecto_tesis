import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import '@rainbow-me/rainbowkit/styles.css';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { config } from './config/wagmi.js';

const queryClient = new QueryClient();

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('App Error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: 20, fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ background: '#fff', maxWidth: 640, width: '100%', padding: 28, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#B91C1C', marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>⚠️</span>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Ocurrió un error al cargar la vista</h2>
            </div>
            <p style={{ fontSize: 13, color: '#475569', marginBottom: 16 }}>
              Se detectó una excepción en la interfaz. Puedes reiniciar la sesión temporal o ver los detalles técnicos abajo:
            </p>
            <pre style={{ background: '#F1F5F9', padding: 14, borderRadius: 10, fontSize: 12, overflowX: 'auto', color: '#0F172A', border: '1px solid #CBD5E1', maxHeight: 200 }}>
              {this.state.error?.message || String(this.state.error)}
              {'\n\n'}
              {this.state.error?.stack}
            </pre>
            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
              <button
                onClick={() => { sessionStorage.clear(); window.location.href = '/'; }}
                style={{ padding: '10px 18px', background: '#007A3D', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
              >
                Volver a Iniciar Sesión
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{ padding: '10px 18px', background: '#F1F5F9', color: '#334155', border: '1px solid #CBD5E1', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
              >
                Recargar Página
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: '#10B981', // Emerald institucional
              accentColorForeground: 'white',
              borderRadius: 'medium',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
          >
            <App />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
