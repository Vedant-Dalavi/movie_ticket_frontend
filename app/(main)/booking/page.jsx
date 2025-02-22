"use client";
import { UserDetailContext } from "@/app/context/UserDetailContext";
import MovieCards from "@/components/custom/MovieCards";
import { moviesData } from "@/data/moviesData";
import { CircleUserRound, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState, useMemo } from "react";

function Page() {
    const { userDetails } = useContext(UserDetailContext);
    const [search, setSearch] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!userDetails) {
            router.push("/login");
        }
    }, [userDetails, router]);

    const filteredMovies = useMemo(() => {
        if (!search) return moviesData;
        return moviesData.filter((movie) =>
            movie.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    return (
        <div className="flex flex-col w-full rounded-lg text-black gap-y-3">
            {/* Top component */}
            <div className="flex flex-row items-center justify-between w-full">
                {/* Search */}
                <div className="flex flex-row items-center justify-between w-[70%] px-3 py-3 bg-[#D9D9D9] rounded-lg">
                    <p>Search</p>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent w-[80%] outline-none"
                    />
                    <button className="cursor-pointer" onClick={() => setSearch("")}>
                        {search ? <X /> : <Search />}
                    </button>
                </div>
                {/* User icon and name */}
                <div className="flex flex-row items-center justify-between gap-x-2">
                    <div className="p-4 w-14 h-14 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                        <CircleUserRound />
                    </div>
                    <div>
                        <p className="text-black">Naval</p>
                        <p className="text-black">Ravikant</p>
                    </div>
                </div>
            </div>
            {/* Greeting message */}
            <h2 className="text-xl">Good Morning Mr. Naval Ravikant!</h2>
            {/* Movie cards */}
            <MovieCards searchData={filteredMovies} />
        </div>
    );
}

export default Page;
