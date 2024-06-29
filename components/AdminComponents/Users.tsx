import { clerkClient } from '@clerk/nextjs/server';
import React from 'react'
import { DataTable } from './data-table';
import { columns } from './UserColumnDef';
function transformData(data: any[]) {
  return data.map((user, index) => ({
    id: (index + 1).toString(),
    firstname: user.firstName || '',
    lastname: user.lastName || '',
    emailaddress: user.emailAddresses[0]?.emailAddress || '',
    role: user.publicMetadata.role || '',
  }));
}


const Users = async () => {
  const response = await clerkClient.users.getUserList();
  //console.log(response.data);
  const transformedData = transformData(response.data);
  return (
    <div className=' w-full h-full'><DataTable columns={columns} data={transformedData} /></div>
  )
}

export default Users