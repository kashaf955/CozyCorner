import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  if (mode === 'production' && !env.VITE_API_URL) {
    throw new Error(
      'VITE_API_URL is required for production builds. ' +
        'On Render → your Static Site → Environment, set VITE_API_URL=' +
        'https://YOUR-BACKEND.onrender.com/api/v1 then Clear build cache & deploy.'
    )
  }

  return {
    plugins: [react(), tailwindcss()],
  }
})
