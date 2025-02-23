"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import { moviesData } from "@/data/moviesData";
import { Calendar, CircleUserRound, Globe, Moon, Sun } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Page() {
    const { id } = useParams();
    if (!id) return null;
    const movie = moviesData.find((movie) => movie.id == id);

    const [ticket, setTicket] = useState(1);
    const [time, setTime] = useState("12:00");
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState(25);
    const router = useRouter();

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const ticketCounter = (input) => {
        if (input == "-" && ticket == 0) {
            toast.error("Can't select less than 0 seats");
            return;
        }

        if (input == "-") {
            setPrice(price - 25);
            setTicket(ticket - 1);
        } else {
            setPrice(price + 25);
            setTicket(ticket + 1);
        }
    };

    const bookingHandler = () => {
        if (!ticket) {
            toast.error("Seat Not Selected");
            return;
        }
        if (!time) {
            toast.error("Time Not Selected");
            return;
        }

        setLoading(true);

        const storedDetails = localStorage.getItem("bookingDetails") || "[]";
        let retrievedDetails = JSON.parse(storedDetails);

        const movieName = movie.name.split("(", [1]).toString().trim();

        retrievedDetails.push({
            id,
            movieName,
            ticket,
            price,
            time,
            date: `${day}-${month}-${year}`,
        });

        localStorage.setItem("bookingDetails", JSON.stringify(retrievedDetails));

        // Show toast notification

        // Redirect after 5 seconds
        setTimeout(() => {
            setLoading(false);
            toast.success("Tickets Booked");
            router.push("/activity");
        }, 5000);
    };

    return (
        <div className="flex flex-col gap-y-6 text-black w-full">
            {/* Loading animation */}
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* Top section */}
            <div className="flex flex-row items-start justify-between gap-x-24">
                <img
                    src={movie.path}
                    alt={movie.name}
                    className="w-[900px] h-[250px] rounded-3xl shadow-md shadow-black"
                />

                {/* User info */}
                <div className="flex flex-row items-center justify-between gap-x-2">
                    <div className="p-4 w-14 h-14 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                        <CircleUserRound />
                    </div>
                    <div>
                        <p>Naval</p>
                        <p>Ravikant</p>
                    </div>
                </div>
            </div>

            {/* Booking section */}
            <div className="flex flex-col gap-y-5">
                <h2 className="text-3xl font-medium">{movie.name}</h2>

                <div className="flex flex-col gap-y-10">
                    {/* Ticket Counter */}
                    <div className="flex flex-row items-center justify-start gap-x-20">
                        <p className="text-lg">Ticket Count</p>
                        <div className="flex flex-row gap-x-2 items-center justify-center">
                            <p
                                className="text-3xl cursor-pointer font-light"
                                onClick={() => ticketCounter("-")}
                            >
                                -
                            </p>
                            <div className="w-14 h-8 bg-black text-white flex items-center justify-center rounded-md">
                                {ticket}
                            </div>
                            <p className="text-3xl cursor-pointer" onClick={() => ticketCounter("+")}>
                                +
                            </p>
                        </div>
                    </div>

                    {/* Show Time */}
                    <div className="flex flex-row items-center justify-start gap-x-20">
                        <p className="text-lg">Show Time</p>
                        <div className="flex items-center justify-between gap-x-5">
                            <button
                                className={`flex gap-x-3 items-center justify-center py-2 px-4 rounded-md ${time == "9:00" ? "bg-black text-white" : "bg-[#D9D9D9]"
                                    }`}
                                onClick={() => setTime("9:00")}
                            >
                                <Sun />
                                <p>9:00</p>
                            </button>
                            <button
                                className={`flex gap-x-3 items-center justify-center py-2 px-4 rounded-md ${time == "12:00" ? "bg-black text-white" : "bg-[#D9D9D9]"
                                    }`}
                                onClick={() => setTime("12:00")}
                            >
                                <Globe />
                                <p>12:00</p>
                            </button>
                            <button
                                className={`flex gap-x-3 items-center justify-center py-2 px-4 rounded-md ${time == "18:00" ? "bg-black text-white" : "bg-[#D9D9D9]"
                                    }`}
                                onClick={() => setTime("18:00")}
                            >
                                <Moon />
                                <p>18:00</p>
                            </button>
                        </div>
                    </div>

                    {/* Date */}
                    <div className="flex flex-row items-center justify-start gap-x-32">
                        <p className="text-lg">Date</p>
                        <div className="relative">
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                dateFormat="dd-MM-yyyy"
                                minDate={new Date()}
                                className="w-full py-2 px-4 rounded-md  text-black"
                                popperPlacement="bottom-start"
                                popperClassName="react-datepicker-popper"
                                calendarClassName="react-datepicker"
                                dayClassName={() => "react-datepicker-day"}
                                customInput={
                                    <button className="flex gap-x-3 items-center justify-center py-2 px-4 rounded-md bg-[#D9D9D9]">
                                        <Calendar />
                                        <p>{day}-{month}-{year}</p>
                                    </button>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Button */}
            <button
                className="w-72 h-12 bg-black text-white px-3 py-2 rounded-md"
                onClick={() => bookingHandler()}
                disabled={loading}
            >
                {loading ? "Processing..." : "Book Ticket"}
            </button>
        </div>
    );
}

export default Page;