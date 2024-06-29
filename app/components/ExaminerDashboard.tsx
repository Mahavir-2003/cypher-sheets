import { auth, clerkClient } from "@clerk/nextjs/server";
import { Roles } from "../lib/definitions";

const ExaminerDashboard = () => {

    const { sessionClaims } = auth();
    const role = (sessionClaims as any)?.metadata.role;

    if(role !== Roles.EXAMINER) {
        return <div>Unauthorized</div>
    }

  return (
    <div>ExaminerDashboard</div>
  )
}

export default ExaminerDashboard