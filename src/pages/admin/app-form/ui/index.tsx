import logo from "@/assets/logo.png";
import Button from "@/components/ui/Button";
import DropdownMenu from "@/components/ui/DropdownMenu";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function AdminAppFromPage() {
    const { platform } = useParams();
    const [value, setValue] = useState("beta");
    console.log(platform);
    return (
        <div className="w-[85%] mx-auto">
            <div className="flex justify-between items-end my-8">
                <div className="w-[88px] h-[52px]">
                    <img src={logo} className="object-cover object-center" />
                </div>
                <div className="flex items-center">
                    <DropdownMenu
                        data={[
                            { label: "Beta", value: "beta" },
                            { label: "Release", value: "release" },
                        ]}
                        value={value}
                        onChange={setValue}
                    />
                </div>
            </div>
            <div className="rounded-xl bg-[#0A0A0A] w-full p-6 pb-8">
                <div className="text-lg font-semibold">Upgrade app</div>
                <div className="w-full my-6 h-[1px] bg-[#141414]" />
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <Input
                            textarea
                            label="What’s new"
                            placeholder="Upgrade new.."
                            className="h-[120px]"
                        />
                    </div>

                    <Input label="Name" placeholder="Name app" />
                    <Input label="Version" placeholder="11.03.05" />
                    <div className="col-span-2">
                        <Input
                            label="Description"
                            placeholder="App description.."
                            textarea
                            className="h-[120px]"
                        />
                    </div>
                    <Input label="App file" placeholder="Upload app file" />
                    <Input label="Logo" placeholder="Upload Logo" />
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
                    <Button border="10px" size="lg" className="w-[200px]">
                        Upload
                    </Button>
                </div>
            </div>
        </div>
    );
}
