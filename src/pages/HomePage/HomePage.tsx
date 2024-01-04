import Layout from '@src/components/layout/Layout'
import UserCompetitionsTable from '@src/components/tables/СompetitionsTable/user/UserCompetitionsTable'

import UserAthletesTable from '@src/components/tables/AthletesTable/user/UserAthletesTable'
import { FC } from 'react'

const HomePage: FC = () => {
	return (
		<Layout>
			<div className='flex h-full w-full'>
				<div className='w-1/2 p-4'>
					<UserCompetitionsTable />
				</div>

				<div className='w-1/2 p-4'>
					<UserAthletesTable />
				</div>
			</div>
		</Layout>
	)
}

export default HomePage
