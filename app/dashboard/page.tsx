import { auth, clerkClient } from "@clerk/nextjs/server";
import { Roles } from "../../lib/definitions";
import AdminDashboard from "@/components/AdminDashboard";
import ExaminerDashboard from "@/components/ExaminerDashboard";
import InvigilatorDashboard from "@/components/InvigilatorDashboard";
import VisitorDashboard from "@/components/VisitorDashboard";

const Dashboard = () => {
  const { sessionClaims, userId } = auth();

  let role = (sessionClaims as any)?.metadata.role;

  if (!role) {
    clerkClient.users.updateUser(userId?.toString() ?? "", {
      publicMetadata: { role: Roles.VISITOR },
    });
    role = Roles.VISITOR;
  }


  return (
    <div className="w-full flex-1 flex justify-center items-center py-5">
      {role === Roles.ADMIN && <AdminDashboard />}
      {role === Roles.EXAMINER && <ExaminerDashboard />}
      {role === Roles.INVIGILATOR && <InvigilatorDashboard />}
      {role === Roles.VISITOR && <VisitorDashboard />}
    </div>
  );
};

export default Dashboard;
