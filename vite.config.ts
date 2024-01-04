import { defineConfig } from 'vite'

import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [],
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, 'src/'),
			'@app': path.resolve(__dirname, 'src/app'),
			'@shared': path.resolve(__dirname, 'src/shared'),
			'@entities': path.resolve(__dirname, 'src/entities'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@pages': path.resolve(__dirname, 'src/pages')
		}
	}
})
