"use server"

import { createClient } from "@/lib/utils/supabase/server";
import { getUserServer } from "../utils/supabase/get-user-server";

export async function fetchProfile(){
    const supabase = await createClient()
    const user = await getUserServer()

    const {data, error} = await supabase
      .from('profiles')
      .select('id, org_id, role, name, email')
      .eq('user_id', user.id)
      .single()

    if (error) {
        throw new Error(`${error.code}: ${error.message}`)
    }

    return data
}