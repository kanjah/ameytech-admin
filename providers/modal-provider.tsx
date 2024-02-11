"use client";

import { StoreModal } from "@/components/modals/store-modal";

import { useEffect, useState } from "react";


export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    // this is for the serverside,  to avoid error on the server side, esp app>layout.tsx
    //when modal is not mounted
    if(!isMounted){
        return null;
    }

    return (
        // for client side, when modal is mounted
        <>
        <StoreModal />
        </>
    )
    
}