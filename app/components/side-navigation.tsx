import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Icons } from "./icons";
import { cn } from "../lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

// Define the data structure for the sidebar content
// This will make it easier to replace with CMS data later
const sidebarContent = {
    sections: [
        {
            items: [
                { icon: "home", label: "Home", path: "/" },
                { icon: "user", label: "Profile", path: "/" },
                { icon: "gift", label: "Promotions", path: "/" },
            ]
        },
        {
            items: [
                { icon: "dollarSign", label: "Deposit", path: "/" },
                { icon: "settings", label: "Settings", path: "/" },
                { icon: "help", label: "Help", path: "/" },
            ]
        },
        {
            items: [
                { icon: "sun", label: "Theme", path: "/" },
            ]
        }
    ]
};

// Icon button component
const IconButton = ({
    icon,
    label,
    path,
    color = "primary"
}: {
    icon: keyof typeof Icons;
    label: string;
    path: string;
    color?: "primary" | "green" | "orange" | "blue";
}) => {
    const IconComponent = Icons[icon];

    const colorClasses = {
        primary: "text-primary",
        green: "text-green-500",
        orange: "text-orange-500",
        blue: "text-blue-500"
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    to={path}
                    className="neon-icon flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent/10 transition-colors group"
                    aria-label={label}
                >
                    <IconComponent className={`h-5 w-5 ${colorClasses[color]}`} />
                    <span className="sr-only">{label}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right" align="center" sideOffset={10}>
                {label}
            </TooltipContent>
        </Tooltip>
    );
};

export function SideNavigation() {
    return (
        <aside className="fixed left-0 top-0 h-full w-14 bg-black/90 border-r border-border/20 hidden md:flex flex-col items-center pt-20 pb-4 z-1">
            {/* First section */}
            <div className="flex flex-col items-center space-y-6 py-4">
                <IconButton icon="home" label="Home" path="/" color="green" />
                <IconButton icon="user" label="Profile" path="/profile" color="blue" />
                <IconButton icon="gift" label="Promotions" path="/promotions" color="green" />
            </div>

            {/* Divider */}
            <div className="w-8 h-px bg-border/30 my-2"></div>

            {/* Second section */}
            <div className="flex flex-col items-center space-y-6 py-4">
                <IconButton icon="dollarSign" label="Deposit" path="/deposit" color="green" />
                <IconButton icon="settings" label="Settings" path="/settings" color="orange" />
                <IconButton icon="help" label="Help" path="/help" color="blue" />
            </div>

            {/* Divider */}
            <div className="w-8 h-px bg-border/30 my-2"></div>

            {/* Third section */}
            <div className="flex flex-col items-center space-y-6 py-4">
                <IconButton icon="sun" label="Theme" path="/theme" color="orange" />
            </div>
        </aside>
    );
} 