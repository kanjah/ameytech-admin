import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { SettingsForm } from "./components/settings-form";


// Extract params, available in nextjs 14 by default
interface SettingsPageProps{
    params: {
        storeId: string
    }
};


const SettingsPage: React.FC<SettingsPageProps> = async ({params}) => {
    const {userId} = auth();  //authenticate using clerk

//check if logged in
    if(!userId){
        redirect('/');
    }
    // Find the store from parameters of logged in userId
    const store = await prismadb.store.findFirst({
        where: {
          id: params.storeId,
          userId
        }
      });

    //   if no store is found
    if (!store) {
        redirect('/');
      }
    
    return ( 
        <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SettingsForm initialData={store} />
        </div>
      </div>
     );
}
 
export default SettingsPage ;