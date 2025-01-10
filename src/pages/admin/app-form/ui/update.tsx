import logo from "/public/logo.png";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { editFormSchema, EditFormSchemaType } from "./components/formSchema";
import FileUpload from "@/components/ui/Input/Upload";
import { useEffect, useState } from "react";
import useResize from "@/hooks/use-resize";
import { IoIosArrowBack } from "react-icons/io";
import ConfirmDialog from "@/components/ui/Dialog/Confirm";
import { useGetAppById } from "./api/getById";
import { baseUrl } from "@/config/axios";
import { useEditApp } from "./api/edit";
import { useUpload } from "@/hooks/useUpload";

export default function AdminUpdateFromPage() {
    const { appId } = useParams();
    const { md } = useResize();
    const navigate = useNavigate();

    const [confirm, setConfirm] = useState(false);

    const { data } = useGetAppById(appId);

    useEffect(() => {
        if (!appId) navigate("/");
    }, [appId, navigate]);

    const { control, handleSubmit, setValue } = useForm<EditFormSchemaType>({
        resolver: zodResolver(editFormSchema),
    });

    const { mutate, isPending } = useEditApp();
    const { handleUpload, handleCancel, loading, loadingInputContent } =
        useUpload();

    const onSubmit = (data: EditFormSchemaType) => {
        mutate(data);
    };

    useEffect(() => {
        if (data) {
            setValue("id", data.id);
            setValue("name", data.name);
            setValue("logo", data.logo);
            setValue("description", data.description);
        }
    }, [data, setValue]);

    const handleDrop = (acceptedFiles: File[], folder: string) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const formData = new FormData();
            formData.append("folder", folder);
            formData.append("file", file);
            handleUpload(formData, (data: string) => setValue("logo", data));
        }
    };

    return (
        <div className="w-[85%] mx-auto">
            <ConfirmDialog
                message="Are you sure you want to go to home page?"
                title="Back"
                open={confirm}
                onConfirm={() => navigate("/")}
                onCancel={() => setConfirm(false)}
            />
            <div className="flex justify-between items-end mt-10">
                <div
                    className="w-[88px] h-[52px] cursor-pointer"
                    onClick={() => setConfirm(true)}
                >
                    <img src={logo} />
                </div>
            </div>

            <Button
                variant="text"
                onClick={() => setConfirm(true)}
                className="my-6"
            >
                <div className="flex items-center gap-2 pr-3 text-[17px]">
                    <IoIosArrowBack className="text-2xl" />
                    Back
                </div>
            </Button>

            <form
                onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}
                className="rounded-xl bg-[#0A0A0A] w-full p-6 pb-8"
            >
                <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">
                        Edit: {data?.name}
                    </div>
                    <div className="h-[50px] w-[50px] rounded-xl overflow-hidden flex justify-center">
                        <img src={`${baseUrl}/img/${data?.logo}`} alt="" />
                    </div>
                </div>
                <div className="w-full my-6 h-[1px] bg-[#141414]" />
                <div className="grid grid-cols-2 gap-6">
                    <div className="md:col-span-1 col-span-2">
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
                    </div>

                    <div className="md:col-span-1 col-span-2">
                        <Controller
                            control={control}
                            name="logo"
                            render={({ field, fieldState }) => (
                                <FileUpload
                                    label="Logo"
                                    placeholder="Upload logo"
                                    onDrop={(acceptedFiles) => {
                                        field.onChange(acceptedFiles[0].name);
                                        handleDrop(acceptedFiles, "img");
                                    }}
                                    handleCancel={handleCancel}
                                    loading={loading}
                                    inputContent={loadingInputContent}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    </div>

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
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <Button
                        border="10px"
                        size={md ? "md" : "lg"}
                        className={md ? "w-[150px] text-lg" : "w-[200px]"}
                        type="submit"
                        disabled={loading}
                        isLoading={isPending}
                    >
                        Edit
                    </Button>
                </div>
            </form>
        </div>
    );
}
