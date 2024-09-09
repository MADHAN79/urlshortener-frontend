// vite.config.js
import cdn from 'vite-plugin-cdn-import'

export default {
    plugins: [
        cdn({
            modules: ['react', 'react-dom', 'react-router-dom'],
        }),
    ],
}