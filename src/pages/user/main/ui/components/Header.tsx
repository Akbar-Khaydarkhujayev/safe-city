import SearchInput from "@/components/ui/Input/SearchInput";
import logo from "/public/logo.png";
import { useNavigate } from "react-router-dom";

interface IProps {
    search: string;
    setSearch: (search: string) => void;
}

const Header = ({ search, setSearch }: IProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center mt-12">
            <div className="w-[74px] h-[34px]" onClick={() => navigate("/")}>
                <img src={logo} />
            </div>

            <div className="w-[60%] md:w-[50%] lg:w-[40%] xl:w-[35%]">
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
