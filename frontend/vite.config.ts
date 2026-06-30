import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    {
      name: 'ignore-appspecific',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/.well-known/appspecific')) {
            res.statusCode = 404; // Return 404 instead of 500
            res.end();
          } else {
            next();
          }
        });
      }
    }
  ],
  server: {
    host: process.env.HOST ?? '127.0.0.1',
    port: Number(process.env.PORT ?? 5173)
  }
});

// ========== Docker/Production Config (uncomment for Docker) ==========
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     sveltekit(),
//     {
//       name: 'ignore-appspecific',
//       configureServer(server) {
//         server.middlewares.use((req, res, next) => {
//           if (req.url?.startsWith('/.well-known/appspecific')) {
//             res.statusCode = 404;
//             res.end();
//           } else {
//             next();
//           }
//         });
//       }
//     }
//   ],
//   server: {
//     host: '0.0.0.0', // allows access from Docker network
//     port: 3000       // Docker production port
//   }
// });

