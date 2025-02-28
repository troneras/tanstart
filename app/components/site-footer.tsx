import { Link } from "@tanstack/react-router";
import { cn } from "../lib/utils";

// Define the data structure for the footer content
// This will make it easier to replace with CMS data later
const footerContent = {
    about: {
        title: "About Mr Vegas Casino",
        paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus mauris elit, nec elementum risus blandit quis. Nam vel nisl in felis aliquet volutpat. Integer vitae consequat massa. Etiam id enim magna. Phasellus porta aliquam risus vitae pellentesque. Donec blandit viverra ex a lacinia. Curabitur ornare sollicitudin mauris vel maximus. Pellentesque nec odio dictum, auctor orci vitae, facilisis nibh.",
            "Integer a orci cursus, tempus eros interdum, rutrum purus. Proin maximus urna in mauris iaculis, ut auctor ligula eleifend. Cras ipsum sem, rhoncus ac bibendum at, lacinia in sapien. Cras malesuada placerat libero sed imperdiet. Ut non purus eget enim lacinia luctus."
        ]
    },
    links: [
        { title: "Terms & Conditions", path: "/" },
        { title: "Cookies", path: "/" },
        { title: "Privacy Policy", path: "/" },
        { title: "Site Map", path: "/" },
        { title: "Contact Us", path: "/" },
        { title: "FAQs", path: "/" }
    ],
    legal: {
        text: "This website mrvegas.com is operated in Denmark and Greenland, and the United Kingdom, by Videoslots Limited, a Malta based company, with registration number C49090, and registered address at the Space, Level 2 & 3, Alfred Craig Street, Pieta, PTA 1320 Malta, licensed and regulated by the Spillemyndigheden (the Danish Gambling Authority) under license number 18-0650512, valid until and including the 29th August 2024, and the Great Britain Gambling Commission in the United Kingdom under license number 39380. This website mrvegas.com is operated in Sweden, and other jurisdictions not aforementioned, by Mr Vegas Limited, a Malta based company, with registration number C93203, and registered address at the Space, Level 2 & 3, Alfred Craig Street, Pieta, PTA 1320 Malta. Mr Vegas Limited is licensed and regulated by the Spelinspektionen (the Swedish Gambling Authority), under license number 20-08254, issued on the 29th of January 2026, and by the Malta Gaming Authority under license number MGA/CRP/258/2014/01, issued on the 19th of May 2020."
    },
    logos: {
        row1: [
            { src: "/mga-logo.svg", alt: "MGA" },
            { src: "/adm-logo.svg", alt: "ADM" },
            { src: "/begambleaware-logo.svg", alt: "BeGambleAware" }
        ],
        row2: [
            { src: "/gambling-commission-logo.svg", alt: "Gambling Commission" },
            { src: "/spel-inspektionen-logo.svg", alt: "Spel Inspektionen" },
            { src: "/18-plus-logo.svg", alt: "18+" }
        ]
    },
    responsibleGambling: {
        text: "Gambling can be addictive. Play responsibly."
    },
    copyright: {
        text: "© MrVegas.com 2011 - 2023."
    }
};

// Footer link component
const FooterLink = ({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) => (
    <Link
        to={href}
        className="text-muted-foreground hover:text-foreground transition-colors"
    >
        {children}
    </Link>
);

// Read More link component
const ReadMoreLink = ({ to = "#" }: { to?: string }) => (
    <Link
        to={to}
        className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
    >
        Read More
    </Link>
);

// About section component
const AboutSection = () => (
    <div className="space-y-4">
        <h3 className="font-semibold text-foreground">{footerContent.about.title}</h3>
        {footerContent.about.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-sm text-muted-foreground leading-relaxed">
                {paragraph}
            </p>
        ))}
    </div>
);

// Footer links section component
const FooterLinksSection = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {footerContent.links.map((link, index) => (
            <div key={index} className="flex justify-between items-center bg-secondary p-4 rounded-2xl">
                <h4 className="font-medium text-foreground">{link.title}</h4>
                <ReadMoreLink to={link.path} />
            </div>
        ))}
    </div>
);

// Legal information component
const LegalInformation = () => (
    <div className="text-xs text-muted-foreground leading-relaxed">
        <p className="mb-4">
            {footerContent.legal.text}
        </p>
    </div>
);

// Gambling logos component
const GamblingLogos = () => (
    <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-around gap-4">
            {footerContent.logos.row1.map((logo, index) => (
                <img key={index} src={logo.src} alt={logo.alt} className="h-10 w-auto" />
            ))}
        </div>
        <div className="flex flex-wrap items-center justify-around gap-4">
            {footerContent.logos.row2.map((logo, index) => (
                <img key={index} src={logo.src} alt={logo.alt} className="h-10 w-auto" />
            ))}
        </div>
    </div>
);

// Responsible gambling message component
const ResponsibleGamblingMessage = () => (
    <div className="text-center text-sm text-muted-foreground">
        <p>{footerContent.responsibleGambling.text}</p>
    </div>
);

// Copyright component
const Copyright = () => (
    <div className="text-center text-sm text-muted-foreground">
        <p>{footerContent.copyright.text}</p>
    </div>
);

// Main footer component
export default function SiteFooter() {
    return (
        <footer className="bg-card text-card-foreground border-t">
            {/* Main footer content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AboutSection />
                    <FooterLinksSection />
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/30"></div>

            {/* Legal section */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <LegalInformation />
                    <div className="flex flex-col gap-4">
                        <GamblingLogos />
                        <ResponsibleGamblingMessage />
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/30"></div>

            {/* Copyright section */}
            <div className="container mx-auto px-4 py-4">
                <Copyright />
            </div>
        </footer>
    );
}
