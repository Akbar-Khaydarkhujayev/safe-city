import logo from "/public/logo.png";
import Button from "@/components/ui/Button";
import DropdownMenu from "@/components/ui/DropdownMenu";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
    formDefaultValues,
    formSchema,
    upgradeFormSchema,
    UpgradeFormSchemaType,
    FormSchemaType,
} from "./components/formSchema";
import { useCreateApp } from "./api/create";
import FileUpload from "@/components/ui/Input/Upload";
import { useUpload } from "@/api/upload";
import { useEffect, useState } from "react";
import { useUgradeApp } from "./api/upgrade";
import Preview from "./components/Preview";
import useResize from "@/hooks/use-resize";
import { IoIosArrowBack } from "react-icons/io";
import ConfirmDialog from "@/components/ui/Dialog/Confirm";

export default function AdminAppFromPage() {
    const { platform, appId } = useParams();
    const { md } = useResize();
    const navigate = useNavigate();

    const [preview, setPreview] = useState(false);
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        if (!appId && !platform) navigate("/");
    }, [appId, platform]);

    const { control, handleSubmit, setValue, watch } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...formDefaultValues,
            platform: platform?.toUpperCase(),
        },
    });

    const {
        control: upgradeControl,
        handleSubmit: handleSubmitUpgrade,
        setValue: setUpgradeValue,
    } = useForm<UpgradeFormSchemaType>({
        resolver: zodResolver(upgradeFormSchema),
        defaultValues: {
            ...formDefaultValues,
            appId: appId ? Number(appId) : undefined,
        },
    });

    const app = watch();

    const { mutate: createApp, isPending: isCreationPending } = useCreateApp();
    const { mutate: updateApp, isPending: isUpgradePending } = useUgradeApp();
    const { mutate: mutateUpload, isPending: isUploadPending } = useUpload();

    const onSubmit = (data: FormSchemaType) => {
        createApp(data);
    };

    const onUpgradeSubmit = (data: UpgradeFormSchemaType) => {
        updateApp(data);
    };

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
                    const fileUrl = res.data;
                    setValue(value, fileUrl);
                },
            });
        }
    };

    const handleUpgradeDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const formData = new FormData();
            formData.append("folder", "app");
            formData.append("file", file);
            mutateUpload(formData, {
                onSuccess: (res) => {
                    const fileUrl = res.data;
                    setUpgradeValue("url", fileUrl);
                },
            });
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

                <div className="flex items-center">
                    {appId ? (
                        <Controller
                            control={upgradeControl}
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
                    ) : (
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
                    )}
                </div>
            </div>

            {preview ? (
                <Preview app={app} closePreview={() => setPreview(false)} />
            ) : !!appId ? (
                <>
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
                        onSubmit={handleSubmitUpgrade(onUpgradeSubmit, (err) =>
                            console.log(err)
                        )}
                        className="rounded-xl bg-[#0A0A0A] w-full p-6 pb-8"
                    >
                        <div className="text-lg font-semibold">Upgrade app</div>
                        <div className="w-full my-6 h-[1px] bg-[#141414]" />
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <Controller
                                    control={upgradeControl}
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

                            <div className="md:col-span-1 col-span-2">
                                <Controller
                                    control={upgradeControl}
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
                            </div>

                            <div className="md:col-span-1 col-span-2">
                                <Controller
                                    control={upgradeControl}
                                    name="url"
                                    render={({ field, fieldState }) => (
                                        <FileUpload
                                            label="App file"
                                            placeholder="Upload app file"
                                            onDrop={(acceptedFiles) => {
                                                field.onChange(
                                                    acceptedFiles[0].name
                                                );
                                                handleUpgradeDrop(
                                                    acceptedFiles
                                                );
                                            }}
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
                                className={
                                    md ? "w-[150px] text-lg" : "w-[200px]"
                                }
                                type="submit"
                                disabled={isUploadPending}
                                isLoading={
                                    isCreationPending || isUpgradePending
                                }
                            >
                                Upload
                            </Button>
                        </div>
                    </form>
                </>
            ) : (
                <>
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
                        onSubmit={handleSubmit(onSubmit, (err) =>
                            console.log(err)
                        )}
                        className="rounded-xl bg-[#0A0A0A] w-full p-6 pb-8"
                    >
                        <div className="text-lg font-semibold">
                            Upload new app
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

                            <div className="md:col-span-1 col-span-2">
                                <Controller
                                    control={control}
                                    name="url"
                                    render={({ field, fieldState }) => (
                                        <FileUpload
                                            label="App file"
                                            placeholder="Upload app file"
                                            onDrop={(acceptedFiles) => {
                                                field.onChange(
                                                    acceptedFiles[0].name
                                                );
                                                handleDrop(
                                                    acceptedFiles,
                                                    "url",
                                                    "app"
                                                );
                                            }}
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
                                                field.onChange(
                                                    acceptedFiles[0].name
                                                );
                                                handleDrop(
                                                    acceptedFiles,
                                                    "logo",
                                                    "img"
                                                );
                                            }}
                                            error={fieldState.error?.message}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <Button
                                variant="secondary"
                                border="10px"
                                size={md ? "md" : "lg"}
                                className={
                                    md ? "w-[150px] text-lg" : "w-[200px]"
                                }
                                disabled={isUploadPending}
                                isLoading={
                                    isCreationPending || isUpgradePending
                                }
                                onClick={() => setPreview(true)}
                            >
                                Preview
                            </Button>
                            <Button
                                border="10px"
                                size={md ? "md" : "lg"}
                                className={
                                    md ? "w-[150px] text-lg" : "w-[200px]"
                                }
                                type="submit"
                                disabled={isUploadPending}
                                isLoading={
                                    isCreationPending || isUpgradePending
                                }
                            >
                                Upload
                            </Button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}
