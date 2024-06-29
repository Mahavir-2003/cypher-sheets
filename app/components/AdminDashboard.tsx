import { auth, clerkClient } from "@clerk/nextjs/server";
import { Roles } from "../lib/definitions";

const AdminDashboard = () => {

    const { sessionClaims } = auth();
    const role = (sessionClaims as any)?.metadata.role;

    if(role !== Roles.ADMIN) {
        return <div>Unauthorized</div>
    }

  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard