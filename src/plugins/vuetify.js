import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
    theme: {
        defaultTheme: 'dark',
        themes: {
            light: {
                colors: {
                    primary: '#1867C0',
                    secondary: '#5CBBF6',
                },
            },
        },
        defaults: {
            global: {
                style: {
                    fontSize: 'clamp(14px, 1vw + 12px, 18px)'
                }
            }
        }
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi
        }
    },
})