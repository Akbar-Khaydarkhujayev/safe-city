import logo from "@/assets/logo.png";
import Button from "@/components/ui/Button";
import DropdownMenu from "@/components/ui/DropdownMenu";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
    formDefaultValues,
    formSchema,
    FormSchemaType,
} from "./components/formSchema";
import { useCreateApp } from "./api/create";
import FileUpload from "@/components/ui/Input/Upload";
import { useUpload } from "@/api/upload";

export default function AdminAppFromPage() {
    const { platform } = useParams();

    const { control, handleSubmit, setValue } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...formDefaultValues,
            platform: platform?.toUpperCase(),
        },
    });

    const { mutate } = useCreateApp();
    const { mutate: mutateUpload } = useUpload();

    const onSubmit = (data: FormSchemaType) => {
        mutate(data);
    };
    console.log("IOS" === platform?.toUpperCase());
    const handleDrop = (
        acceptedFiles: File[],
        value: "logo" | "url",
        folder: string
    ) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const formData = new FormData();
            formData.append("folder", folder);
            formData.append("file", file);
            mutateUpload(formData, {
                onSuccess: (res) => {
                    console.log(res);
                    const fileUrl = res.data;
                    setValue(value, fileUrl);
                },
            });
        }
    };

    return (
        <div className="w-[85%] mx-auto">
            <div className="flex justify-between items-end my-8">
                <div className="w-[88px] h-[52px]">
                    <img src={logo} className="object-cover object-center" />
                </div>
                <div className="flex items-center">
                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => (
                            <DropdownMenu
                                data={[
                                    { label: "Release", value: "release" },
                                    { label: "Beta", value: "beta" },
                                ]}
                                {...field}
                                value={field.value}
                            />
                        )}
                    />
                </div>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-xl bg-[#0A0A0A] w-full p-6 pb-8"
            >
                <div className="text-lg font-semibold">Upgrade app</div>
                <div className="w-full my-6 h-[1px] bg-[#141414]" />
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <Controller
                            control={control}
                            name="news"
                            render={({ field, fieldState }) => (
                                <Input
                                    textarea
                                    label="What’s new"
                                    placeholder="Upgrade new.."
                                    className="h-[120px]"
                                    {...field}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    </div>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field, fieldState }) => (
                            <Input
                                label="Name"
                                placeholder="Name app"
                                {...field}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="version"
                        render={({ field, fieldState }) => (
                            <Input
                                label="Version"
                                placeholder="11.03.05"
                                {...field}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                    <div className="col-span-2">
                        <Controller
                            control={control}
                            name="description"
                            render={({ field, fieldState }) => (
                                <Input
                                    label="Description"
                                    placeholder="App description.."
                                    textarea
                                    className="h-[120px]"
                                    {...field}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    </div>
                    <Controller
                        control={control}
                        name="url"
                        render={({ field, fieldState }) => (
                            <FileUpload
                                label="App file"
                                placeholder="Upload app file"
                                onDrop={(acceptedFiles) => {
                                    field.onChange(acceptedFiles[0].name);
                                    handleDrop(acceptedFiles, "url", "app");
                                }}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="logo"
                        render={({ field, fieldState }) => (
                            <FileUpload
                                label="Logo"
                                placeholder="Upload logo"
                                onDrop={(acceptedFiles) => {
                                    field.onChange(acceptedFiles[0].name);
                                    handleDrop(acceptedFiles, "logo", "img");
                                }}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <Button
                        variant="secondary"
                        border="10px"
                        size="lg"
                        className="w-[200px]"
                    >
                        Preview
                    </Button>
                    <Button
                        border="10px"
                        size="lg"
                        className="w-[200px]"
                        type="submit"
                    >
                        Upload
                    </Button>
                </div>
            </form>
        </div>
    );
}
