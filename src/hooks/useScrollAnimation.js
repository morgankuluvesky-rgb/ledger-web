import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * @param {Object} options - Intersection Observer options
 * @returns {Array} [ref, isVisible, hasAnimated]
 */
export function useScrollAnimation(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        triggerOnce: true,
        ...options,
    };

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setHasAnimated(true);

                    if (defaultOptions.triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!defaultOptions.triggerOnce) {
                    setIsVisible(false);
                }
            },
            {
                threshold: defaultOptions.threshold,
                rootMargin: defaultOptions.rootMargin,
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [defaultOptions.threshold, defaultOptions.rootMargin, defaultOptions.triggerOnce]);

    return [ref, isVisible, hasAnimated];
}

/**
 * Custom hook for staggered animations on multiple elements
 * @param {number} itemCount - Number of items to animate
 * @param {number} staggerDelay - Delay between each item in ms
 * @param {Object} options - Intersection Observer options
 * @returns {Object} { containerRef, isVisible, getItemStyle }
 */
export function useStaggerAnimation(itemCount, staggerDelay = 100, options = {}) {
    const [containerRef, isVisible] = useScrollAnimation(options);

    const getItemStyle = (index) => ({
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${index * staggerDelay}ms, transform 0.6s ease ${index * staggerDelay}ms`,
    });

    return { containerRef, isVisible, getItemStyle };
}

/**
 * Custom hook for parallax scroll effects
 * @param {number} speed - Parallax speed multiplier
 * @returns {Object} { ref, offset }
 */
export function useParallax(speed = 0.5) {
    const ref = useRef(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const scrollPosition = window.scrollY;
            const elementTop = rect.top + scrollPosition;
            const relativeScroll = scrollPosition - elementTop + window.innerHeight;

            if (relativeScroll > 0) {
                setOffset(relativeScroll * speed);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return { ref, offset };
}

/**
 * Custom hook for counting animation
 * @param {number} end - Target number
 * @param {number} duration - Animation duration in ms
 * @param {boolean} start - Whether to start the animation
 * @returns {number} Current count value
 */
export function useCountUp(end, duration = 2000, start = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let startTime;
        let animationFrame;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Easing function (easeOutExpo)
            const easeOutExpo = 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeOutExpo * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [end, duration, start]);

    return count;
}

export default useScrollAnimation;
