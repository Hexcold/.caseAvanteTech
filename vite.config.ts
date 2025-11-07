import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Configuração do atalho '@' (apontando para 'src')
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // CONFIGURAÇÃO DO VITEST
  test: {
    globals: true, // Permite usar 'describe', 'it', 'expect' globalmente
    environment: 'jsdom', // Simula o ambiente DOM (necessário para testes React)
    // O 'setupFiles' foi removido, e a exclusão abaixo resolve o erro de cache:
  },
  
  // Exclusão para evitar problemas de cache com o setup
  optimizeDeps: {
    exclude: [
      'vitest.setup.ts' 
    ],
  },
});