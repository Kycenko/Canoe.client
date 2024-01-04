import Layout from '@src/components/layout/Layout'
import AdminAthletesTable from '@src/components/tables/AthletesTable/admin/AdminAthletesTable'
import { LINKS } from '@src/shared/lib/constants/enums'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const AdminAthletesPage: FC = () => {
	return (
		<Layout>
			<div className='container mx-auto flex justify-center items-center'>
				<ul className='mt-4 flex gap-3'>
					<li>
						<Link to={LINKS.ADMIN_USERS}>Пользователи</Link>
					</li>
					<li>
						<Link to={LINKS.ADMIN_ATHLETES}>Спортсмены</Link>
					</li>
					<li>
						<Link to={LINKS.ADMIN_COMPETITIONS}>Соревнования</Link>
					</li>
				</ul>
			</div>
			<div className='container h-screen mx-auto p-8'>
				<AdminAthletesTable />
			</div>
		</Layout>
	)
}

export default AdminAthletesPage
