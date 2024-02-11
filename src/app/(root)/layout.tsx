// This page will be loaded becouse of the {children} in app/layout.tsx
//checks for an active user with any store created by the user
//if the store exists, redirects to dashboard\storeId\layout.tsx


import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function SetupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // check if logged in
    const { userId } = auth();
    if (!userId) {
        redirect('/');
    }
    // load store associated with the user id
    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    });

    // if the store exists, redirect to dashboard
    if(store){
        redirect(`/${store.id}`);
    }
    return (
        <>{children}</>
    );
   
}