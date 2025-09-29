import fs from 'fs'

import dotenv from 'dotenv'

import { defineConfig } from 'vite';

import basicSsl from '@vitejs/plugin-basic-ssl';

const gitRepoName = 'SpotifyCanvasViewer';

export default ({ mode }) => {

    const envContent = fs.readFileSync('.env')
    const env = dotenv.parse(envContent)

    const defineEnv = {}
    for (const key in env) {
        defineEnv[`process.env.${key}`] = JSON.stringify(env[key])
    }

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
        define: defineEnv,
        server: {
            port: 3000,
            watch: {
                usePolling: true
            }
        },
    });
};