import { defineConfig, loadEnv } from 'vite';

import basicSsl from '@vitejs/plugin-basic-ssl';

const gitRepoName = 'SpotifyCanvasViewer';

export default ({ mode }) => {

    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        base: mode === 'production' ? `/${gitRepoName}/` : '/',
        build: {
            assetsInlineLimit: 0,
        },
        plugins: [basicSsl()],
        resolve: {
            extensions: [
                '.js',
                '.json',
                '.jsx',
                '.mjs',
                '.ts',
                '.tsx',
                '.vue',
                '.scss',
            ],
        },
        define: { 'process.env': {} },
        server: {
            port: 3000,
            watch: {
                usePolling: true
            }
        },
    });
};