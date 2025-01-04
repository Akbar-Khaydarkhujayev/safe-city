import { z } from "zod";
import semver from "semver";

export const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    type: z.string().min(1, "Required"),
    version: z
        .string()
        .min(1, "Version is required")
        .refine((val) => semver.valid(val) !== null, {
            message: "Version must be a valid semantic version (e.g., 1.0.0)",
        }),
    description: z.string().min(1, "Description is required"),
    url: z.string().min(1, "App file is required"),
    logo: z.string().min(1, "Logo is required"),
    platform: z.string().min(1, "Platform is required"),
    news: z.string().optional(),
});

export const upgradeFormSchema = z.object({
    appId: z.number(),
    news: z.string().min(1, "News is required"),
    type: z.string().min(1, "Required"),
    version: z
        .string()
        .min(1, "Version is required")
        .refine((val) => semver.valid(val) !== null, {
            message: "Version must be a valid semantic version (e.g., 1.0.0)",
        }),
    url: z.string().min(1, "App file is required"),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export type UpgradeFormSchemaType = z.infer<typeof upgradeFormSchema>;

export const formDefaultValues: FormSchemaType = {
    name: "",
    type: "release",
    version: "",
    description: "",
    url: "",
    logo: "",
    platform: "",
};
