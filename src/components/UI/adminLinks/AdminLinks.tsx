import { LINKS } from '@src/shared/lib/constants/enums'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const AdminLinks: FC = () => {
	return (
		<div className='container mx-auto flex justify-center items-center'>
			<ul className='mt-4 flex gap-3'>
				<li>
					<Link className='hover:text-blue-300' to={LINKS.ADMIN_USERS}>
						Пользователи
					</Link>
				</li>
				<li>
					<Link className='hover:text-blue-300' to={LINKS.ADMIN_ATHLETES}>
						Спортсмены
					</Link>
				</li>
				<li>
					<Link className='hover:text-blue-300' to={LINKS.ADMIN_COMPETITIONS}>
						Соревнования
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default AdminLinks
