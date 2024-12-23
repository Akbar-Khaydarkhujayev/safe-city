import SearchInput from "@/components/ui/Input/SearchInput";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { useCallback } from "react";

const Header = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        if (searchValue) {
            setSearchParams({ search: searchValue });
        } else {
            searchParams.delete("search");
            setSearchParams(searchParams);
        }
    };

    const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

    return (
        <div className="flex justify-between items-center mt-12">
            <div className="font-semibold text-[40px]">Safe City</div>

            <div className="w-[35%]">
                <SearchInput placeholder="Search" onChange={debouncedSearch} />
            </div>
        </div>
    );
};

export default Header;
