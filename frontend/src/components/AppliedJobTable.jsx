import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
        </TableHeader>
        <TableBody>
            {
                [1,2,].map((item,index)=>(
                    <TableRow key={index}>
                        <TableCell>13-07-2025</TableCell>
                        <TableCell>Frontend Developer</TableCell>
                        <TableCell>TCS</TableCell>
                        <TableCell className="text-right"><Badge>Selected</Badge></TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
