'use client';

import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        google: {
            translate: {
                TranslateElement: new (
                    opts: {
                        pageLanguage: string;
                        includedLanguages: string;
                        layout: number;
                        autoDisplay: boolean;
                    },
                    element: string
                ) => void;
            };
        };
        googleTranslateElementInit: () => void;
    }
}

export default function GoogleTranslate() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initWidget = () => {
            const el = document.getElementById('google_translate_element');
            if (el && window.google?.translate?.TranslateElement) {
                // Clear any stale content so Google re-renders the dropdown
                el.innerHTML = '';
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'en,hi,bn,te,mr,ta,gu,kn,ml,pa,or,as,ur,sa',
                        layout: 0,
                        autoDisplay: false,
                    },
                    'google_translate_element'
                );
            }
        };

        // Always set the global init callback (used on first script load)
        window.googleTranslateElementInit = initWidget;

        const scriptExists = document.getElementById('google-translate-script');

        if (scriptExists) {
            // Script already loaded from a previous mount — just re-init the widget
            // Use a short timeout to let the DOM element settle
            const timer = setTimeout(initWidget, 100);
            return () => clearTimeout(timer);
        }

        // First time: inject the script
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src =
            '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);

        // Clean up any Google Translate banner that appears
        const observer = new MutationObserver(() => {
            if (document.body.style.top !== '0px' && document.body.style.top !== '') {
                document.body.style.top = '0px';
            }
            const frames = document.querySelectorAll('.goog-te-banner-frame, iframe.goog-te-banner-frame');
            frames.forEach((frame) => {
                (frame as HTMLElement).style.display = 'none';
            });
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['style', 'class'],
            childList: true,
            subtree: false,
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex items-center gap-1.5 relative z-50">
            <span className="text-xs text-muted-foreground hidden sm:inline whitespace-nowrap">
                Language:
            </span>
            <div
                ref={containerRef}
                id="google_translate_element"
                className="[&_.goog-te-gadget]:!m-0 [&_.goog-te-gadget]:!p-0 min-w-[90px] max-w-[150px] overflow-hidden"
            />
        </div>
    );
}
