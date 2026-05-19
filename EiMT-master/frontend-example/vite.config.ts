// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import 'dotenv/config';
//
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: Number(process.env.PORT),
//     proxy: {
//       '/api': {
//         // In Docker compose we provide VITE_API_TARGET=http://api:8080.
//         // Fallback keeps local dev working.
//         target: process.env.VITE_API_TARGET ?? 'http://localhost:8081',
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
//   define: {
//     'process.env.TOKEN': JSON.stringify(process.env.TOKEN)
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import 'dotenv/config';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_TARGET || 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});