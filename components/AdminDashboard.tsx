import { Roles } from "@/lib/definitions";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Users from "./AdminComponents/Users";
import AdminPapers from "./AdminComponents/AdminPapers";
import AdminUpload from "./AdminComponents/AdminUpload";

const AdminDashboard = () => {

    const { sessionClaims } = auth();
    const role = (sessionClaims as any)?.metadata.role;

    if(role !== Roles.ADMIN) {
        return <div>Unauthorized</div>
    }

  return (
    <div className=" w-[80%] rounded-md border-white/40 h-full flex justify-center items-start">
      <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="papers">Papers</TabsTrigger>
        <TabsTrigger value="upload">Upload</TabsTrigger>
      </TabsList>
      <TabsContent value="users"><Users /></TabsContent>
      <TabsContent value="papers">
        <AdminPapers />
      </TabsContent>
      <TabsContent value="upload">
          <AdminUpload />
      </TabsContent>
    </Tabs>
    </div>
  )
}

export default AdminDashboard