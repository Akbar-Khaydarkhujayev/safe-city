import { Field, Label } from "@headlessui/react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "../Button";

interface FileUploadProps {
    label?: React.ReactNode;
    placeholder: string;
    error?: string;
    onDrop: (acceptedFiles: File[]) => void;
    inputContent: React.ReactNode;
    loading: boolean;
    handleCancel: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
    error,
    label,
    placeholder,
    onDrop,
    inputContent,
    loading,
    handleCancel,
}) => {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop: (acceptedFiles) => {
            setSelectedFile(acceptedFiles[0]?.name || null);
            onDrop(acceptedFiles);
        },
    });

    return (
        <Field
            {...getRootProps()}
            disabled={!!loading}
            className="cursor-pointer"
        >
            {!!label && (
                <Label
                    onClick={open}
                    className="text-base font-semibold flex gap-1 cursor-pointer"
                >
                    {label}
                    {!!error && (
                        <div className="text-red-600 text-base ml-1 -mb-2 font-semibold">
                            ({error})
                        </div>
                    )}
                </Label>
            )}
            <div
                className={`flex h-[51px] mt-3 w-full rounded-lg bg-black py-1.5 text-sm/6 text-white
                        justify-between items-center px-4
                        placeholder:text-sm placeholder:font-normal placeholder:text-[#FFFFFF] placeholder:opacity-40
                        ${isDragActive && "border-2 border-white/25"} ${
                    !!error && "border border-red-600"
                }`}
            >
                <input {...getInputProps()} />
                <div
                    className={`flex-grow text-sm font-normal text-[#FFFFFF] flex items-center h-full overflow-hidden pr-4 ${
                        !selectedFile && "opacity-40"
                    }`}
                >
                    <div className="overflow-hidden line-clamp-1 text-ellipsis">
                        {selectedFile || placeholder}
                    </div>
                </div>
                {loading ? (
                    <Button
                        variant="error"
                        size="sm"
                        className="w-[160px] rounded-md"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCancel();
                        }}
                    >
                        {inputContent}
                    </Button>
                ) : (
                    <Button
                        variant="secondary"
                        size="sm"
                        className="w-[160px] rounded-md"
                    >
                        {inputContent}
                    </Button>
                )}
            </div>
        </Field>
    );
};

export default FileUpload;
