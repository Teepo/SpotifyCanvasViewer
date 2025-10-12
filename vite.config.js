import fs from 'fs'

import dotenv from 'dotenv'

import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import { fileURLToPath, URL } from 'node:url'
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
        build : {
            outDir: `/var/www/anthony-ribeiro.dev/${gitRepoName}/`,
            emptyOutDir: true
        },
        plugins: [
            basicSsl(),
            vue({
                template: { transformAssetUrls }
            }),
            vuetify({
                autoImport: true,
                styles: {
                    configFile: 'src/styles/settings.scss',
                },
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
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
        middlewareMode: false,
        fs: {
            strict: true
        },
    });
};