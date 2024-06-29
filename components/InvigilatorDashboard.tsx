import { auth, clerkClient } from "@clerk/nextjs/server";
import { Roles } from "../lib/definitions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvigilatorPapers from "./InvigilatorComponents/InvigilatorPapers";

const InvigilatorDashboard = () => {

    const { sessionClaims } = auth();
    const role = (sessionClaims as any)?.metadata.role;

    if(role !== Roles.INVIGILATOR) {
        return <div>Unauthorized</div>
    }

  return (
    <div className=" w-[80%] rounded-md  h-full relative flex justify-center items-start">
      <Tabs defaultValue="users" className="w-full h-[90%]">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="papers">Papers Accessible by Invigilator (You)</TabsTrigger>
        </TabsList>
        <div className="w-full h-full">
        <TabsContent className="w-full h-full" value="papers">
          <InvigilatorPapers />
        </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default InvigilatorDashboard