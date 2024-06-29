import { auth, clerkClient } from "@clerk/nextjs/server";
import { Roles } from "../lib/definitions";
import AdminDashboard from "../components/AdminDashboard";

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
    <>
      {role === Roles.ADMIN && <AdminDashboard />}
      {role === Roles.EXAMINER && <h1>Examiner Dashboard</h1>}
      {role === Roles.INVIGILATOR && <h1>Invigilator Dashboard</h1>}
      {role === Roles.VISITOR && <h1>Visitor Dashboard</h1>}
    </>
  );
};

export default Dashboard;
