import { z } from "zod";

export const createFormSchema = (isUpdate: boolean) => {
    return z.object({
        appId: isUpdate ? z.number() : z.number().optional(),
        news: isUpdate
            ? z.string().min(1, "News is required")
            : z.string().optional(),
        name: z.string().min(1, "Name is required"),
        type: z.string().min(1, "Required"),
        version: z.string().min(1, "Version is required"),
        description: z.string().min(1, "Description is required"),
        url: z.string().min(1, "App file is required"),
        logo: z.string().min(1, "Logo is required"),
        platform: isUpdate
            ? z.string().optional()
            : z.string().min(1, "Platform is required"),
    });
};

export type FormSchemaType = z.infer<ReturnType<typeof createFormSchema>>;

export const formDefaultValues: FormSchemaType = {
    news: "",
    name: "",
    type: "release",
    version: "",
    description: "",
    url: "",
    logo: "",
    platform: "",
};
