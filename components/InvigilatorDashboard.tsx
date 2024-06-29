import { auth, clerkClient } from "@clerk/nextjs/server";
import { Roles } from "../lib/definitions";

const InvigilatorDashboard = () => {

    const { sessionClaims } = auth();
    const role = (sessionClaims as any)?.metadata.role;

    if(role !== Roles.INVIGILATOR) {
        return <div>Unauthorized</div>
    }

  return (
    <div>InvigilatorDashboard</div>
  )
}

export default InvigilatorDashboard