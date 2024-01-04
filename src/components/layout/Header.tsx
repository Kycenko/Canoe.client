import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {
	Collapse,
	IconButton,
	Navbar,
	Typography
} from '@material-tailwind/react'
import { useAuth } from '@src/app/providers/AuthProvider/useAuth'
import { removeFromStorage } from '@src/shared/auth/auth.helper'
import { LINKS } from '@src/shared/lib/constants/enums'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavList = () => {
	const navigate = useNavigate()
	const { user } = useAuth()
	const handleLogout = () => {
		removeFromStorage()
		navigate('/auth/login')
	}
	return (
		<>
			<ul className='my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
				{user?.isAdmin ? (
					<>
						<li className='hover:text-blue-300 text-black'>
							<Link to={'/management'}>Управление</Link>
						</li>
					</>
				) : (
					''
				)}
				<Typography
					placeholder={undefined}
					as='li'
					variant='small'
					color='blue-gray'
					className='p-1 font-medium'
				>
					<button
						onClick={handleLogout}
						className='flex items-center bg-blue-400 rounded-md p-2 text-white transition-colors'
					>
						Выйти
					</button>
				</Typography>
			</ul>
		</>
	)
}

export function Header() {
	const [openNav, setOpenNav] = useState(false)

	const handleWindowResize = () => window.innerWidth >= 960 && setOpenNav(false)

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize)

		return () => {
			window.removeEventListener('resize', handleWindowResize)
		}
	}, [])

	return (
		<Navbar
			placeholder={undefined}
			className='mx-auto max-w-screen-xl px-6 py-3'
		>
			<div className='flex items-center justify-between text-blue-gray-900'>
				<Link to={LINKS.HOME}>
					<Typography
						placeholder={undefined}
						variant='h6'
						className='mr-4 cursor-pointer py-1.5 hover:text-blue-400'
					>
						Белорусская ассоциация каноэ
					</Typography>
				</Link>

				<div className='hidden lg:block'>
					<NavList />
				</div>
				<IconButton
					variant='text'
					className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
					ripple={false}
					onClick={() => setOpenNav(!openNav)}
					placeholder={undefined}
				>
					{openNav ? (
						<XMarkIcon className='h-6 w-6' strokeWidth={2} />
					) : (
						<Bars3Icon className='h-6 w-6' strokeWidth={2} />
					)}
				</IconButton>
			</div>
			<Collapse open={openNav}>
				<NavList />
			</Collapse>
		</Navbar>
	)
}

export default Header
