import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable);
}

// 1. Light Reveal Hook (interpolates between day and night/lit layers)
export function useLightReveal(containerRef: React.RefObject<HTMLElement | null>, triggerRef?: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const litLayer = containerRef.current?.querySelector('.lit-reveal-layer');
      if (litLayer) {
        gsap.fromTo(
          litLayer,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: triggerRef?.current || containerRef.current,
              start: 'top 75%',
              end: 'bottom 25%',
              scrub: 1
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, triggerRef]);
}

// 2. Parallax Image Effect
export function useParallax(targetRef: React.RefObject<HTMLElement | null>, speed = 0.2) {
  useEffect(() => {
    if (!targetRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(targetRef.current, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: targetRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, [targetRef, speed]);
}

// 3. Stagger Fade Up for text or cards
export function useStaggerFadeUp(containerRef: React.RefObject<HTMLElement | null>, targetSelector = '.fade-up-item') {
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(targetSelector);
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, targetSelector]);
}

// 4. Image Mask Shutter Reveal
export function useImageMask(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const mask = containerRef.current?.querySelector('.image-reveal-mask');
      const img = containerRef.current?.querySelector('img, svg');
      if (mask) {
        gsap.fromTo(
          mask,
          { scaleY: 1, transformOrigin: 'top' },
          {
            scaleY: 0,
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true
            }
          }
        );
      }
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.12 },
          {
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}

// 5. Section Light Shift (triggers global theme shift when scrolling into section)
export function useThemeShift(
  sectionRef: React.RefObject<HTMLElement | null>,
  themeName: 'morning' | 'afternoon' | 'golden' | 'evening' | 'midnight',
  setTheme: (t: 'morning' | 'afternoon' | 'golden' | 'evening' | 'midnight') => void
) {
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setTheme(themeName),
        onEnterBack: () => setTheme(themeName)
      });
    });

    return () => ctx.revert();
  }, [sectionRef, themeName, setTheme]);
}

// 6. Footer Lamp Illumination Hook
export function useFooterLight(footerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!footerRef.current) return;
    const ctx = gsap.context(() => {
      const lampGlow = footerRef.current?.querySelector('.footer-lamp-glow');
      const links = footerRef.current?.querySelectorAll('.footer-link-group');
      if (lampGlow) {
        gsap.fromTo(
          lampGlow,
          { opacity: 0.1, scale: 0.8 },
          {
            opacity: 1,
            scale: 1.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 70%',
              end: 'bottom bottom',
              scrub: 1
            }
          }
        );
      }
      if (links) {
        gsap.fromTo(
          links,
          { opacity: 0.5, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 75%'
            }
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, [footerRef]);
}
