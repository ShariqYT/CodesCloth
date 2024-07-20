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
import Banner5 from '@/public/banner/5.webp';
import Banner6 from '@/public/banner/6.webp';
import MBanner1 from '@/public/banner/mobileVersion/1.webp';
import MBanner2 from '@/public/banner/mobileVersion/2.webp';
import MBanner4 from '@/public/banner/mobileVersion/4.webp';
import MBanner5 from '@/public/banner/mobileVersion/5.webp';
import MBanner6 from '@/public/banner/mobileVersion/6.webp';
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
            {/* Desktop Carousel */}
            <div className='relative'>
                <CarouselContent className="m-0 md:w-[99vw] mt-10 md:mt-0 rounded-xl md:h-[89vh]">
                    <CarouselItem className="w-full p-0 h-full rounded-xl" >
                        <Image className='rounded-xl object-cover bg-white h-full hidden md:block' src={Banner1} alt="Banner 1" />
                        <Image className='rounded-xl object-contain bg-white h-full block md:hidden' src={MBanner1} alt="Banner 1" />
                    </CarouselItem>
                    <CarouselItem className="w-full p-0 h-full rounded-xl" >
                        <Image className='rounded-xl object-cover bg-white h-full hidden md:block' src={Banner2} alt="Banner 2" />
                        <Image className='rounded-xl object-contain bg-white h-full block md:hidden' src={MBanner2} alt="Banner 2" />
                    </CarouselItem>
                    <CarouselItem className="w-full p-0 h-full rounded-xl" >
                        <Image className='rounded-xl object-cover bg-white h-full hidden md:block' src={Banner3} alt="Banner 3" />
                        <Image className='rounded-xl object-contain bg-white h-full block md:hidden' src={MBanner4} alt="Banner 4" />
                    </CarouselItem>
                    {/* <CarouselItem className="w-full p-0 h-full rounded-xl" >
                        <Image className='rounded-xl object-contain bg-white h-full hidden md:block' src={Banner4} alt="Banner 4" />
                    </CarouselItem> */}
                    <CarouselItem className="w-full p-0 h-full rounded-xl" >
                        <Image className='rounded-xl object-cover bg-white h-full hidden md:block' src={Banner5} alt="Banner 5" />
                        <Image className='rounded-xl object-contain bg-white h-full block md:hidden' src={MBanner5} alt="Banner 5" />
                    </CarouselItem>
                    <CarouselItem className="w-full p-0 h-full rounded-xl" >
                        <Image className='rounded-xl object-cover bg-white h-full hidden md:block' src={Banner6} alt="Banner 6" />
                        <Image className='rounded-xl object-contain bg-white h-full block md:hidden' src={MBanner6} alt="Banner 6" />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="absolute h-5 w-5 md:h-10 md:w-10 top-1/2 left-5" onClick={handlePrev} />
                <CarouselNext className="absolute h-5 w-5 md:h-10 md:w-10 top-1/2 right-5" onClick={handleNext} />
                <Link href={'/tshirts'} className='absolute bottom-12 left-32 md:bottom-52 md:left-[46%]'>
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
        <div className="absolute bottom-2 md:bottom-32 left-0 right-0 flex items-center justify-center">
            {Array.from({ length: totalSlides }).map((_, index) => (
                <span
                    style={{ boxShadow: '0px 0px 50px 1px #000000' }}
                    key={index}
                    className={cn(
                        "h-3 w-3 md:w-4 md:h-4 rounded-full mx-1 border-2 border-white transition-all duration-1000 ease-in-out",
                        index === currentSlideIndex ? "bg-black h-4 w-8 md:h-4 md:w-8" : "bg-white"
                    )}
                />
            ))}
        </div>
    );
};

export default CarouselComponent;
