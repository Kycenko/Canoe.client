'use client'

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow
} from '@nextui-org/react'
import { Loader } from 'lucide-react'

import { IAthlete } from '@/types/athlete.types'

import { columns, renderCell } from './athletes.data'
import { useGetAthletes } from '@/queries/athlete.queries'

export default function AthletesTable() {
	const { data, isLoading } = useGetAthletes()
	if (isLoading) return <Loader />
	return (
		<section>
			<div>
				<Table>
					<TableHeader columns={columns}>
						{column => (
							<TableColumn key={column.uid}>{column.name}</TableColumn>
						)}
					</TableHeader>
					<TableBody
						items={data}
						isLoading={isLoading}
						loadingContent={<Loader />}
						emptyContent='Список пуст'
					>
						{item => (
							<TableRow key={item.id}>
								{columnKey => (
									<TableCell>
										{renderCell(item, columnKey) as keyof IAthlete}
									</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</section>
	)
}
