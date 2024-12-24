import { z } from "zod";

export const formSchema = z.object({
    news: z.string().min(1, "What's new is required"),
    name: z.string().min(1, "Name is required"),
    type: z.string().min(1, "Required"),
    version: z.string().min(1, "Version is required"),
    description: z.string().min(1, "Description is required"),
    url: z.string().min(1, "App file is required"),
    logo: z.string().min(1, "Logo is required"),
    platform: z.string().min(1, "Platform is required"),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export const formDefaultValues: FormSchemaType = {
    news: "",
    name: "",
    type: "release",
    version: "",
    description: "",
    url: "",
    logo: "",
    platform: "android",
};
