"use client"

import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation"

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>){
    // Pathname
    const Pathname = usePathname();
    //Params
    const params = useParams();
    // Routes
    const routes = [
        {
            // settings for the specific store
            href: `/${params.storeId}/settings`,
            label: "Settings",
            active: Pathname === `/${params.storeId}/settings`,
        }
    ];

    return(
        // ilterate the routes
       <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}{...props} >
        {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
       </nav>
    )
};
    
