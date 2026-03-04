'use client';

import { useEffect } from 'react';

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
    useEffect(() => {
        // Avoid re-initialization
        if (document.getElementById('google-translate-script')) return;

        window.googleTranslateElementInit = () => {
            if (document.getElementById('google_translate_element')) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'en,hi,bn,te,mr,ta,gu,kn,ml,pa,or,as,ur,sa',
                        layout: 0, // HORIZONTAL — more compact
                        autoDisplay: false,
                    },
                    'google_translate_element'
                );
            }
        };

        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src =
            '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);

        // Clean up any Google Translate banner that appears
        const observer = new MutationObserver(() => {
            // Force body.top = 0 whenever Google tries to change it
            if (document.body.style.top !== '0px' && document.body.style.top !== '') {
                document.body.style.top = '0px';
            }
            // Hide banner frames
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
                भाषा:
            </span>
            <div
                id="google_translate_element"
                className="[&_.goog-te-gadget]:!m-0 [&_.goog-te-gadget]:!p-0 min-w-[90px] max-w-[150px] overflow-hidden"
            />
        </div>
    );
}
