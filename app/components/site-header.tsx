import * as React from 'react';
import { useConfig } from '@/hooks/useConfig';
import { Icons } from './icons';
import { useSidebar } from '@/components/ui/sidebar';
interface HeaderProps {
    onMenuToggle?: () => void;
}

export function SiteHeader({ onMenuToggle }: HeaderProps) {
    const { data: config } = useConfig("mrvegas");

    const { toggleSidebar } = useSidebar();

    return (
        <header className="flex sticky top-0 z-50 w-full items-center border-b bg-background h-16">
            <div className="flex w-full h-full items-center justify-between px-4">
                {/* Left side - Hamburger menu */}
                <div className="flex-shrink-0">
                    <button
                        onClick={toggleSidebar}
                        className="neon-icon text-gray-100"
                        aria-label="Toggle menu"
                    >
                        <Icons.menu className="h-6 w-6" />
                    </button>
                </div>

                {/* Center - Logo/Brand */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img src={config.logo?.url} alt={config.brand ?? ""} className="h-12" />
                </div>

                {/* Right side - Icons */}
                <div className="flex items-center space-x-4 flex-shrink-0">
                    <button
                        className="neon-icon text-green-500 hover:text-green-400"
                        aria-label="Gift"
                    >
                        <Icons.gift className="h-6 w-6" />
                    </button>
                    <button
                        className="neon-icon text-green-500 hover:text-green-400"
                        aria-label="Currency"
                    >
                        <Icons.dollarSign className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
