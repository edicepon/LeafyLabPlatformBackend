"use client"

import { useMonitor } from "@/lib/store/monitor"
import { orgSlice } from "@/lib/store/slices/orgSlice"
import { NULL_ORG } from "@/lib/constants"

export default function Layout({children}: {children: React.ReactNode}) {
    
    useMonitor({
        statusSelector: orgSlice.selectors.selectName,
        redirectOn: [NULL_ORG],
        redirectTo: '/join'
    })
    
    return (
        <>
            {children}
        </>
    )
}