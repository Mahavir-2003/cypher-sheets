import { Roles } from "@/lib/definitions";
import { auth } from "@clerk/nextjs/server";

const AdminDashboard = () => {

    const { sessionClaims } = auth();
    const role = (sessionClaims as any)?.metadata.role;

    if(role !== Roles.ADMIN) {
        return <div>Unauthorized</div>
    }

  return (
    <div>AdminDashboard hheh</div>
  )
}

export default AdminDashboard