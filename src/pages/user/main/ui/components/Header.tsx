import SearchInput from "@/components/ui/Input/SearchInput";

interface IProps {
    search: string;
    setSearch: (search: string) => void;
}

const Header = ({ search, setSearch }: IProps) => {
    return (
        <div className="flex justify-between items-center mt-12">
            <div className="font-semibold text-[40px]">Safe City</div>

            <div className="w-[35%]">
                <SearchInput
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Header;
