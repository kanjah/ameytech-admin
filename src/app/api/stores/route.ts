import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(
    req: Request,
){
    try{
     const { userId} = auth(); //authenticate from clerk
     const body = await req.json();
     const {name} = body
   
    //  we check for model Store {
//   id        String     @id @default(uuid())
//   name      String
//   userId    String
//   createdAt DateTime @default(now())
//   updateAt  DateTime @updatedAt
// }
//since only name and userId are not provided automatically, we check if they 
//have been passed in the request body
     if(!userId){
        return new NextResponse("Unauthorized", {status: 401});
     }
    
     if(!name){
        return new NextResponse("Name is required", {status: 400});
     }

    //  create a new store
    const store = await prismadb.store.create({
        data:{
            name,
            userId
        }
    });
    return NextResponse.json(store);
    }
    catch (erro){
        console.log('[STORE-POST]', erro);
        return new NextResponse("Internal error", {status:500});
    }
}