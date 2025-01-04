import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../Button";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
    open,
    title,
    message,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    return (
        <Dialog
            open={open}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
        >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <DialogTitle
                            as="h3"
                            className="text-2xl font-bold text-white"
                        >
                            {title}
                        </DialogTitle>
                        <div className="mt-4">
                            <p className="text-lg text-gray-400">{message}</p>
                        </div>
                        <div className="mt-6 flex justify-end gap-4">
                            <Button
                                variant="secondary"
                                border="10px"
                                size="md"
                                className="text-base mr-2 w-[120px] h-9"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="error"
                                border="10px"
                                size="md"
                                className="text-base w-[120px] h-9"
                                onClick={onConfirm}
                            >
                                Confirm
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}
