"use client";

import React, { useEffect, useState } from 'react'
import { ChevronUpCircle } from 'lucide-react'

const ScrollTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsVisible(false);
    }
    // Check if the ScrollTop component is above the footer
    const checkScrollTop = () => {
        const footer = document.querySelector('footer');
        const scrollTop = document.querySelector('.scrollTop');
        if (footer && scrollTop) {
            const footerTop = footer.getBoundingClientRect().top;
            const scrollTopBottom = scrollTop.getBoundingClientRect().bottom;
            setIsVisible(footerTop >= scrollTopBottom && window.scrollY > 0);
        }
    };

    // Listen to the scroll event
    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => {
        window.removeEventListener('scroll', checkScrollTop);
        };
  }, []);
    return (
        <section className={isVisible ? 'absolute top-[1000px] right-0' : 'hidden'}>
           
            <div className='scrollTop cursor-pointer drop-shadow-md text-black' onClick={handleScrollToTop} >
                <ChevronUpCircle size={48} />
            </div>
        </section>
    )
}

export default ScrollTop
