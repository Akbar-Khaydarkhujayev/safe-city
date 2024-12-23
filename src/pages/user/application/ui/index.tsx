import Button from "@/components/ui/Button";
import AppCard from "./components/AppCard";
import Header from "./components/Header";
import img from "../ui/components/image.png";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { IoIosArrowBack } from "react-icons/io";

const test1 = [
    {
        id: 1,
        name: "Name App - short description Name App - short description",
        version: "1.0.0",
    },
    {
        id: 2,
        name: "Name App - short description",
        version: "1.0.0",
    },
    {
        id: 3,
        name: "Name App - short description",
        version: "1.0.0",
    },
    {
        id: 3,
        name: "Name App - short description",
        version: "1.0.0",
    },
];

const categories = [
    {
        name: "Release",
    },
    {
        name: "Beta",
    },
];

export default function UserApplicationPage() {
    return (
        <div className="w-[80%] mx-auto mb-8">
            <Header />

            <div className="flex justify-between items-center my-6">
                <Button variant="text">
                    <div className="flex items-center gap-2 pr-3 text-[17px]">
                        <IoIosArrowBack className="text-2xl" />
                        Back
                    </div>
                </Button>
                <TabGroup className="rounded-lg bg-[#7676803D] h-[42px] p-1">
                    <TabList className="flex gap-1">
                        {categories.map(({ name }) => (
                            <Tab
                                key={name}
                                className="w-[120px] h-[34px] rounded-[7px] py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-[#636366] data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                            >
                                {name}
                            </Tab>
                        ))}
                    </TabList>
                </TabGroup>
            </div>

            <div className="flex justify-between my-12">
                <div className="grid gap-4">
                    <div className="font-bold text-5xl">
                        Name App - short description
                    </div>
                    <div className="font-normal text-xl text-[#EBEBF599]">
                        Version 12.4.5
                    </div>
                    <Button className="w-[200px]">Download</Button>
                </div>

                <div className="h-40">
                    <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                <div>
                    <div className="font-bold text-3xl">Description</div>
                    <div className="font-normal text-lg mt-4">
                        - Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                    </div>
                </div>
                <div>
                    <div className="font-bold text-3xl">What’s New</div>
                    <div className="font-bold text-lg text-[#EBEBF599] mt-2">
                        Version no.
                    </div>
                    <div className="font-normal text-lg mt-2">
                        - Bug fixes and performance improvements.
                    </div>
                </div>
            </div>

            <div className="font-semibold text-2xl text-white my-6">Apps</div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {test1.map((item) => (
                    <AppCard item={item} />
                ))}
            </div>
        </div>
    );
}
