import AdminLinks from '@src/components/UI/adminLinks/AdminLinks'
import Layout from '@src/components/layout/Layout'
import AdminUsersTable from '@src/components/tables/UsersTable/admin/AdminUsersTable'
import { FC } from 'react'

const UsersPage: FC = () => {
	return (
		<Layout>
			<AdminLinks />
			<div className='h-screen mx-auto max-w-[1200px] p-8'>
				<AdminUsersTable />
			</div>
		</Layout>
	)
}

export default UsersPage
