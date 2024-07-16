"use client"
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDarkMode } from '@/context/DarkModeContext';

const Colors = ["Black", "Blue", "Cyan", "Gray", "Green", "Indigo", "Light Pink", "Lime Green", "Orange", "Pink", "Purple", "Red", "Rose Red", "Sky Blue", "Teal", "Violet", "White", "Yellow"];
const Sizes = ["S", "M", "L", "XL", "XXL"];
const sortingOrder = ["Price: Low to High", "Price: High to Low"];

const filterOptions = [
    {
        id: "sort",
        title: "Sort",
        options: sortingOrder,
        type: "radio"
    },
    {
        id: "colors",
        title: "Colors",
        options: Colors,
        type: "checkbox"
    },
    {
        id: "sizes",
        title: "Sizes",
        options: Sizes,
        type: "checkbox"
    }
];

function checkValidQuery(queries) {
    return queries.filter((query) => query !== "").length > 0;
}

export function convertStringToQueriesObject(ReadonlyURLSearchParams) {
    let selectedQueries = {};
    ReadonlyURLSearchParams.forEach((values, key) => {
        const queries = values.split(",").map(value => value.toLowerCase());
        if (selectedQueries[key]) {
            selectedQueries[key].push(...queries);
        } else {
            selectedQueries[key] = queries;
        }
    });

    return selectedQueries;
}

export function convertValidStringQueries(queries) {
    const filterQueries = Object.entries(queries).map(([key, value]) => {
        return `${key}=${value.join(",")}`;
    });
    return filterQueries.join("&");
}

const colorNameToHex = (color) => {
    const colors = {
        "black": "#000000",
        "blue": "#0000FF",
        "cyan": "#00FFFF",
        "gray": "#808080",
        "green": "#008000",
        "indigo": "#4B0082",
        "light pink": "#FFB6C1",
        "lime green": "#32CD32",
        "orange": "#FFA500",
        "pink": "#FFC0CB",
        "purple": "#800080",
        "red": "#FF0000",
        "rose red": "#FF007F",
        "sky blue": "#87CEEB",
        "teal": "#008080",
        "violet": "#EE82EE",
        "white": "#FFFFFF",
        "yellow": "#FFFF00",
    };
    return colors[color.toLowerCase()] || "#000000";
};

const FilterSection = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isDarkMode } = useDarkMode();
    const [selectedFilterQueries, setSelectedFilterQueries] = useState({});

    useEffect(() => {
        const paramsObj = convertStringToQueriesObject(searchParams);
        setSelectedFilterQueries(paramsObj);
    }, [searchParams]);

    const handleSelectFilterOption = (e) => {
        const name = e.target.name;
        const value = e.target.value.toLowerCase();
        const type = e.target.type;

        let selectedQueries = { ...selectedFilterQueries };
        if (selectedQueries[name]) {
            if (type === "radio") {
                selectedQueries[name] = [value];
            } else if (selectedQueries[name].includes(value)) {
                selectedQueries[name] = selectedQueries[name].filter((query) => query !== value);
                if (!checkValidQuery(selectedQueries[name])) {
                    delete selectedQueries[name];
                }
            } else {
                selectedQueries[name].push(value);
            }
        } else {
            selectedQueries[name] = [value];
        }
        router.push(`?${convertValidStringQueries(selectedQueries)}`, {
            scroll: false
        });
    };

    const isChecked = (id, option) => {
        return (
            Boolean(selectedFilterQueries[id]) &&
            selectedFilterQueries[id].includes(option.toLowerCase())
        );
    };

    const clearFilters = () => {
        setSelectedFilterQueries({});
        router.push(`?`, { scroll: false });
    }

    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='relative'>
            {/* Desktop Filter */}
            <div className="md:block hidden w-80 h-[80vh] sticky ml-4 my-20 top-44 border-2 border-purple-700 rounded-lg p-8 shadow-lg overflow-y-auto">
                <div className='flex items-center justify-between mb-10'>
                    <h2 className="text-2xl font-semibold">Filter Options</h2>
                    <svg onClick={clearFilters} className='cursor-pointer hover:scale-[1.2] hover:text-red-600 transition-all duration-300 ease-in-out w-7 h-7 flex items-center justify-center' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                        <path d="M20.9987 4.5C20.9869 4.06504 20.8956 3.75346 20.672 3.5074C20.2111 3 19.396 3 17.7657 3H6.23433C4.60404 3 3.7889 3 3.32795 3.5074C2.86701 4.0148 2.96811 4.8008 3.17033 6.3728C3.22938 6.8319 3.3276 7.09253 3.62734 7.44867C4.59564 8.59915 6.36901 10.6456 8.85746 12.5061C9.08486 12.6761 9.23409 12.9539 9.25927 13.2614C9.53961 16.6864 9.79643 19.0261 9.93278 20.1778C10.0043 20.782 10.6741 21.2466 11.226 20.8563C12.1532 20.2006 13.8853 19.4657 14.1141 18.2442C14.1986 17.7934 14.3136 17.0803 14.445 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M21 7L15 13M21 13L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                {filterOptions.map((filter) => (
                    <div key={filter.id} className="mb-6 ">
                        <h3 className="text-lg font-semibold mb-2">{filter.title}</h3>

                        <div>
                            {filter.options.map((option) => (
                                <div key={option}>
                                    <label htmlFor={`${filter.id}-${option}`} className='flex cursor-pointer items-center mb-1'>
                                        <input
                                            type={filter.type}
                                            name={filter.id}
                                            value={option}
                                            id={`${filter.id}-${option}`}
                                            checked={isChecked(filter.id, option)}
                                            onChange={handleSelectFilterOption}
                                            className="mr-2"
                                        />
                                        <div
                                            style={{
                                                backgroundColor: filter.id === 'colors' ? colorNameToHex(option) : 'transparent',
                                                width: filter.id === 'colors' ? '15px' : '0',
                                                height: filter.id === 'colors' ? '15px' : '0',
                                                marginRight: filter.id === 'colors' ? '8px' : '0',
                                                border: filter.id === 'colors' ? '1px solid #000' : 'none',
                                                borderRadius: filter.id === 'colors' ? '100%' : 'none'
                                            }}
                                        ></div>

                                        {option}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {/* Mobile Filter */}
            <svg onClick={() => setIsOpen(!isOpen)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='rounded-lg border-2 transition-all duration-300 ease-in-out border-purple-700 w-8 h-8 md:hidden cursor-pointer absolute -right-[22rem] top-4' fill="none">
                <path d="M8.85746 12.5061C6.36901 10.6456 4.59564 8.59915 3.62734 7.44867C3.3276 7.09253 3.22938 6.8319 3.17033 6.3728C2.96811 4.8008 2.86701 4.0148 3.32795 3.5074C3.7889 3 4.60404 3 6.23433 3H17.7657C19.396 3 20.2111 3 20.672 3.5074C21.133 4.0148 21.0319 4.8008 20.8297 6.37281C20.7706 6.83191 20.6724 7.09254 20.3726 7.44867C19.403 8.60062 17.6261 10.6507 15.1326 12.5135C14.907 12.6821 14.7583 12.9567 14.7307 13.2614C14.4837 15.992 14.2559 17.4876 14.1141 18.2442C13.8853 19.4657 12.1532 20.2006 11.226 20.8563C10.6741 21.2466 10.0043 20.782 9.93278 20.1778C9.79643 19.0261 9.53961 16.6864 9.25927 13.2614C9.23409 12.9539 9.08486 12.6761 8.85746 12.5061Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden fixed z-30 bg-[rgba(0,0,0,0.8)] w-screen h-screen transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'
                    }`}></div>
            <div
                className={`md:hidden fixed z-50 w-full h-1/2 ${isDarkMode ? 'bg-black' : 'bg-white'} 
                    transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-y-0' : 'translate-y-[400px]'}
                    ml-4 my-20 -bottom-4 right-0 border-2 border-purple-700 rounded-lg p-8 shadow-lg overflow-y-auto`}
            >
                <div className='flex items-center justify-between mb-10'>
                    <h2 className="text-2xl font-semibold">Filter Options</h2>
                    <div className='flex gap-4'>
                        <svg onClick={clearFilters} className='cursor-pointer hover:scale-[1.2] hover:text-red-600 transition-all duration-300 ease-in-out w-7 h-7 flex items-center justify-center' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path d="M20.9987 4.5C20.9869 4.06504 20.8956 3.75346 20.672 3.5074C20.2111 3 19.396 3 17.7657 3H6.23433C4.60404 3 3.7889 3 3.32795 3.5074C2.86701 4.0148 2.96811 4.8008 3.17033 6.3728C3.22938 6.8319 3.3276 7.09253 3.62734 7.44867C4.59564 8.59915 6.36901 10.6456 8.85746 12.5061C9.08486 12.6761 9.23409 12.9539 9.25927 13.2614C9.53961 16.6864 9.79643 19.0261 9.93278 20.1778C10.0043 20.782 10.6741 21.2466 11.226 20.8563C12.1532 20.2006 13.8853 19.4657 14.1141 18.2442C14.1986 17.7934 14.3136 17.0803 14.445 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 7L15 13M21 13L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg onClick={() => setIsOpen(!isOpen)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-7 cursor-pointer' fill="none">
                            <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                {filterOptions.map((filter) => (
                    <div key={filter.id} className="mb-6 ">
                        <h3 className="text-lg font-semibold mb-2">{filter.title}</h3>

                        <div>
                            {filter.options.map((option) => (
                                <div key={option}>
                                    <label htmlFor={`${filter.id}-${option}`} className='flex cursor-pointer items-center mb-1'>
                                        <input
                                            type={filter.type}
                                            name={filter.id}
                                            value={option}
                                            id={`${filter.id}-${option}`}
                                            checked={isChecked(filter.id, option)}
                                            onChange={handleSelectFilterOption}
                                            className="mr-2"
                                        />
                                        <div
                                            style={{
                                                backgroundColor: filter.id === 'colors' ? colorNameToHex(option) : 'transparent',
                                                width: filter.id === 'colors' ? '15px' : '0',
                                                height: filter.id === 'colors' ? '15px' : '0',
                                                marginRight: filter.id === 'colors' ? '8px' : '0',
                                                border: filter.id === 'colors' ? '1px solid #000' : 'none',
                                                borderRadius: filter.id === 'colors' ? '100%' : 'none'
                                            }}
                                        ></div>

                                        {option}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default FilterSection;
