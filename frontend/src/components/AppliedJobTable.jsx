import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector(store => store.job) || {}

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allAppliedJobs.length <= 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                  You haven't applied to any jobs yet.
                </TableCell>
              </TableRow>
            ) : (
              allAppliedJobs.map((appliedJob) => {
                const statusColor = 
                  appliedJob?.status === "accepted" ? "bg-green-100 text-green-800 hover:bg-green-200 border-green-300" :
                  appliedJob?.status === "rejected" ? "bg-red-100 text-red-800 hover:bg-red-200 border-red-300" :
                  "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300";

                return (
                  <TableRow key={appliedJob?._id}>
                    <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                    <TableCell>{appliedJob?.job?.title || "Job N/A (Deleted)"}</TableCell>
                    <TableCell>{appliedJob?.job?.company?.name || "N/A"}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold shadow-xs ${statusColor}`}>
                        {appliedJob?.status?.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable

