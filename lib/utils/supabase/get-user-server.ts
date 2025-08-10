"use server"

import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getUserServer() {
    const supabase = await createClient()
    const {data, error} = await supabase.auth.getUser()
    if (error || !data.user) {
        redirect('/login')
    }
    revalidatePath('/', 'layout')
    return data.user
}
