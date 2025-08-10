"use server"

import { Template } from "../types/Template";
import { createClient } from "../utils/supabase/server";
import { fetchProfile } from "./fetch-profile";

export async function fetchTemplates(): Promise<Template[]> {
    const supabase = await createClient();
    const profile = await fetchProfile()
    const org_id = profile.org_id;

    const {data: templateList, error: templateListError} = await supabase
    .from("templates")
    .select("id, name, path")
    .eq("org_id", org_id)
    .eq("is_deleted", false)
    .order('created_at', {ascending: true})

    if (templateListError) {
        throw Error(`${templateListError.name}: ${templateListError.message}`);
    }

    const templates: Template[] = [];

    for (const template of templateList) {
        const {data: downloadData, error: downloadError} = await supabase.storage
            .from("templates")
            .download(template.path)

        if (downloadError) {
            throw Error(`${downloadError.name}: ${downloadError.message}`);
        }

        const fileContents = await downloadData?.text();

        if (!fileContents) {
            throw Error(`No template found for ${template.name}`);
        }

        try {
            templates.push({
                ...JSON.parse(fileContents),
                id: template.id,
                name: template.name,
            });
        } catch (error) {
            throw error;
        }
    }

    return templates;
}

