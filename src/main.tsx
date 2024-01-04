import { AuthProvider } from '@app/providers/AuthProvider/AuthProvider.tsx'
import { ThemeProvider } from '@material-tailwind/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App.tsx'
import './app/styles/index.css'
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: true
		}
	}
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<ThemeProvider>
			<BrowserRouter>
				<AuthProvider>
					<App />
				</AuthProvider>
			</BrowserRouter>
		</ThemeProvider>
	</QueryClientProvider>
)
