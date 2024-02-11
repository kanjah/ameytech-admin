// this will be loaded coz of root/layout.tsx, meaning
//a logged in user created this store using the storeId
//since the store exists we render the value in return and
//<children> which points to dashboard\storeId\routes\page.tsxt


import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { storeId: string };
}) {
    // check if logged in
    const {userId} = auth();
    if(!userId){
       redirect('/');
    }
    // search for store
    const store = await prismadb.store.findFirst({
        where:{
            id: params.storeId,
            userId
        }
    });
    // check if store exists
    if(!store){
        redirect('/');
    }
    return (
        <>
        <div>this will be a nav bar</div>
        {children}
        </>
    )
    }
    
    
