import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

interface HeaderProps {
    title: string;
    btnText: string;
    btnLink: string;
    btnIcon: React.ReactNode;
}

const Header = ({ title, btnText, btnLink, btnIcon }: HeaderProps) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h1>
            </div>
            <Button className="flex cursor-pointer items-center gap-2" onClick={() => router.visit(btnLink)}>
                {btnIcon}
                {btnText}
            </Button>
        </div>
    );
};

export default Header;
