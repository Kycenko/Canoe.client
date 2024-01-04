import AdminLinks from '@src/components/UI/adminLinks/AdminLinks'
import Layout from '@src/components/layout/Layout'
import AdminCompetitionsTable from '@src/components/tables/СompetitionsTable/admin/AdminCompetitionsTable'
import { FC } from 'react'

const AdminCompetitionsPage: FC = () => {
	return (
		<Layout>
			<AdminLinks />
			<div className='container h-screen mx-auto p-8'>
				<AdminCompetitionsTable />
			</div>
		</Layout>
	)
}

export default AdminCompetitionsPage
