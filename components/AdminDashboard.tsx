import { Roles } from "@/lib/definitions";
import { auth } from "@clerk/nextjs/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Users from "./AdminComponents/Users";
import AdminPapers from "./AdminComponents/AdminPapers";
import AdminUpload from "./AdminComponents/AdminUpload";

const AdminDashboard = () => {
  const { sessionClaims } = auth();
  const role = (sessionClaims as any)?.metadata.role;

  if (role !== Roles.ADMIN) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className=" w-[80%] rounded-md  h-full relative flex justify-center items-start">
      <Tabs defaultValue="users" className="w-full h-[90%]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="papers">Papers</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>
        <div className="w-full h-full">
        <TabsContent className="w-full h-full" value="users">
          <Users />
        </TabsContent>
        <TabsContent className="w-full h-full" value="papers">
          <AdminPapers />
        </TabsContent>
        <TabsContent className="w-full h-full" value="upload">
          <AdminUpload />
        </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
