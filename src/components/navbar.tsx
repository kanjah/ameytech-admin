import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
    // get current store
    const {userId} = auth(); //authenticate from clerk

    //check if logged in
    if(!userId){
        redirect('/');
    }

    //get store from db
    const stores = await prismadb.store.findMany({
        where:{
            userId,
        }
    })
    return (
        <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />

        {/* Main Navbar */}
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {/* <ThemeToggle /> */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
      );
}
 
export default Navbar ;