import { createServer } from 'vite';

async function run() {
  try {
    const server = await createServer({
      configFile: './vite.config.js',
      server: {
        port: 5173,
        host: '0.0.0.0',
      },
    });

    await server.listen();
    console.log('[DevPrep] Vite server is running and listening on http://localhost:5173');
    server.printUrls();

    // Prevent process exit
    setInterval(() => {}, 1 << 30);
  } catch (err) {
    console.error('[DevPrep] Failed to start server:', err);
    process.exit(1);
  }
}

run();
