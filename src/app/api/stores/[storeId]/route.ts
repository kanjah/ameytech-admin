// route for updating & deleting the store[saveChanges] & delete button from
// dashbord/[storeId]/routes/settings/componets/settings-form.tsx

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
  ) {
    
    try {
        
      const { userId } = auth();
      const body = await req.json();
  
      const { name } = body;
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!name) {
        return new NextResponse("Name is required", { status: 400 });
      }
  
      if (!params.storeId) {
        return new NextResponse("Store id is required", { status: 400 });
      }
      
    //   update the name in the db
      const store = await prismadb.store.updateMany({
        where: {
          id: params.storeId,
          userId,
        },
        data: {
          name
        }
      });
    
      return NextResponse.json(store);

    } catch (error) {
      console.log('[STORE_PATCH]', error);
      return new NextResponse("Internal error", { status: 500 });
    }

  };

  //Delete route
  export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string } }
  ) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.storeId) {
        return new NextResponse("Store id is required", { status: 400 });
      }
      
      //Delete store from DB
      const store = await prismadb.store.deleteMany({
        where: {
          id: params.storeId,
          userId
        }
      });
    
      return NextResponse.json(store);
    } catch (error) {
      console.log('[STORE_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };

