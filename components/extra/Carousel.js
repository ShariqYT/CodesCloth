import React, { useState, useEffect } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import Banner1 from '@/public/banner/1.webp';
import Banner2 from '@/public/banner/2.webp';
import Banner3 from '@/public/banner/3.webp';
import Banner4 from '@/public/banner/4.webp';
import Banner5 from '@/public/banner/5.webp';
import Banner6 from '@/public/banner/6.webp';
import Link from 'next/link';
import { useDarkMode } from '@/context/DarkModeContext';

const CarouselComponent = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [carouselApi, setCarouselApi] = useState(null);

    useEffect(() => {
        if (!carouselApi) return;

        const onSelect = () => {
            setCurrentSlideIndex(carouselApi.selectedScrollSnap());
        };

        carouselApi.on('select', onSelect);

        return () => {
            carouselApi.off('select', onSelect);
        };
    }, [carouselApi]);

    const handlePrev = () => {
        if (carouselApi) carouselApi.scrollPrev();
    };

    const handleNext = () => {
        if (carouselApi) carouselApi.scrollNext();
    };

    const { isDarkMode } = useDarkMode();

    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 5000,
                    stopOnInteraction: false,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                }),
            ]}
            className="flex justify-center md:min-h-screen"
            setApi={setCarouselApi} // Set the carousel API reference
        >
            <div className='relative'>
                <CarouselContent className="m-0 md:w-[99vw] rounded-xl w-[95vw] h-[80vh] md:h-[89vh]">
                    <CarouselItem className="w-full p-0 h-full rounded-xl" >
                        <Image className='rounded-xl object-cover h-full' src={Banner1} alt="Banner 1" />
                    </CarouselItem>
                    <CarouselItem className="w-full p-0 h-full rounded-xl" >
                        <Image className='rounded-xl object-cover h-full' src={Banner2} alt="Banner 2" />
                    </CarouselItem>
                    <CarouselItem className="w-full p-0 h-full rounded-xl" >
                        <Image className='rounded-xl object-cover h-full' src={Banner3} alt="Banner 3" />
                    </CarouselItem>
                    {/* <CarouselItem className="w-full p-0 h-full rounded-xl" >
                        <Image className='rounded-xl object-cover h-full' src={Banner4} alt="Banner 4" />
                    </CarouselItem> */}
                    <CarouselItem className="w-full p-0 h-full rounded-xl" >
                        <Image className='rounded-xl object-cover h-full' src={Banner5} alt="Banner 5" />
                    </CarouselItem>
                    <CarouselItem className="w-full p-0 h-full rounded-xl" >
                        <Image className='rounded-xl object-cover h-full' src={Banner6} alt="Banner 6" />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="absolute top-72 md:top-1/2 left-5" onClick={handlePrev} />
                <CarouselNext className="absolute top-72 md:top-1/2 right-5" onClick={handleNext} />
                <Link href={'/tshirts'} className='absolute bottom-20 left-[33%] md:bottom-52 md:left-[46%]'>
                    <button className={`${isDarkMode ? 'bg-black text-white shadow-[0_0_20px_rgba(0,0,0,.4)]' : 'bg-white text-black shadow-[0_0_20px_rgba(0,0,0,.4)]'} md:hover:scale-[1.2] transition-all duration-300 ease-in-out py-2 px-4 md:text-2xl text-lg rounded-lg`}>SHOP NOW</button>
                </Link>
                <CarouselIndicators
                    totalSlides={5}
                    currentSlideIndex={currentSlideIndex}
                />
            </div >
        </Carousel>
    );
};

const CarouselIndicators = ({ totalSlides, currentSlideIndex }) => {
    return (
        <div className="absolute bottom-8 md:bottom-36 left-0 right-0 flex items-center justify-center">
            {Array.from({ length: totalSlides }).map((_, index) => (
                <span
                    style={{ boxShadow: '0px 0px 50px 1px #000000' }}
                    key={index}
                    className={cn(
                        "h-4 w-4 rounded-full mx-1 border-2 border-white",
                        index === currentSlideIndex ? "bg-black h-5 w-5" : "bg-white"
                    )}
                />
            ))}
        </div>
    );
};

export default CarouselComponent;
