import React from "react";
import { AnimatedText } from "./AnimatedText";
import { LogoLoop } from "./LogoLoop";
import { IconButton } from "./IconButton";
import { foodIcons } from "../config/foodIcons";

export const Footer: React.FC = () => {
  return (
    <>
      {/* Footer Section */}
      <footer
        className="flex justify-center px-4 sm:px-8 py-8 sm:py-[60px] mt-12 sm:mt-[80px]"
        role="contentinfo"
      >
        <div className="flex w-full max-w-[1130px] justify-between items-center gap-4 sm:gap-8">
          {/* Decorative horse illustration */}
          <div
            className="w-[120px] sm:w-[200px] md:w-[300px] lg:w-[400px] h-[170px] sm:h-[280px] md:h-[420px] lg:h-[560px] flex items-center justify-center flex-shrink-0"
            aria-hidden="true"
          >
            <img
              src={`${import.meta.env.BASE_URL}vectors/illustrations/Horse.svg`}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          {/* Contact Information */}
          <address className="font-['Roboto_Mono',monospace] font-medium text-xs sm:text-base md:text-2xl lg:text-[36px] text-black uppercase flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-[30px] not-italic">
            {/* Contact */}
            <div className="leading-none">
              <AnimatedText className="mb-1 sm:mb-2" delay={0.2}>
                <a
                  href="mailto:contact@menu.com"
                  className="hover:underline focus:underline"
                >
                  COntact@MENú.com
                </a>
              </AnimatedText>
              <AnimatedText delay={0.3}>
                <a
                  href="tel:+3541234-0123"
                  className="hover:underline focus:underline"
                >
                  (+354)1234 0123
                </a>
              </AnimatedText>
            </div>

            {/* Address */}
            <div className="leading-none">
              <AnimatedText className="mb-2" delay={0.4}>
                Laugavegur 1
              </AnimatedText>
              <AnimatedText className="mb-2" delay={0.5}>
                101 reykjavik
              </AnimatedText>
              <AnimatedText delay={0.6}>ICeland</AnimatedText>
            </div>

            {/* Social Links */}
            <nav aria-label="Social media links">
              <div className="leading-none">
                <AnimatedText className="mb-2" delay={0.7}>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline focus:underline"
                  >
                    Instagram
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </AnimatedText>
                <AnimatedText className="mb-2" delay={0.8}>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline focus:underline"
                  >
                    FACEBOOK
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </AnimatedText>
                <AnimatedText delay={0.9}>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline focus:underline"
                  >
                    X<span className="sr-only"> (opens in new tab)</span>
                  </a>
                </AnimatedText>
              </div>
            </nav>
          </address>
        </div>
      </footer>

      {/* Bottom Logo Loop - decorative */}
      <div
        className="w-full my-4 sm:my-6 md:my-8 overflow-hidden"
        aria-hidden="true"
      >
        <div className="h-[36px] sm:h-[48px] md:h-[64px] lg:h-[80px] flex items-center">
          <LogoLoop
            logos={foodIcons}
            speed={120}
            direction="right"
            logoHeight={36}
            gap={50}
            hoverSpeed={0}
            scaleOnHover={false}
            ariaLabel="Decorative food icons"
          />
        </div>
      </div>

      {/* Copyright */}
      <div className="flex justify-end px-4 sm:px-8 pb-4 sm:pb-8">
        <p className="font-['Roboto_Mono',monospace] font-medium text-black uppercase text-right">
          <span
            className="text-2xl sm:text-3xl md:text-[48px]"
            aria-hidden="true"
          >
            ©
          </span>
          <span className="text-xl sm:text-2xl md:text-[36px]">
            <span className="sr-only">Copyright </span>2025
          </span>
        </p>
      </div>

      {/* Scroll to Top Button */}
      <IconButton
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-50 group"
        shape="circle"
        size="lg"
        aria-label="Scroll to top of page"
      >
        <img
          src={
            new URL(
              "../assets/arrow_upward_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg",
              import.meta.url
            ).href
          }
          alt=""
          aria-hidden="true"
          className="w-6 h-6 sm:w-8 sm:h-8 brightness-[10] group-hover:brightness-0 transition-all duration-200"
        />
      </IconButton>
    </>
  );
};
