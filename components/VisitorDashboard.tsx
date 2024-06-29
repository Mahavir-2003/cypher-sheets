import { Roles } from "@/lib/definitions";
import { auth, clerkClient } from "@clerk/nextjs/server";

const VisitorDashboard = () => {

    const { sessionClaims } = auth();
    const role = (sessionClaims as any)?.metadata.role;

    if(role !== Roles.VISITOR) {
        return <div>Unauthorized</div>
    }

  return (
    <div>VisitorDashboard</div>
  )
}

export default VisitorDashboard