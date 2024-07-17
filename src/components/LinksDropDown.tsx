import { Button } from '@/components/ui/button';
import { links } from '@/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlignLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/hooks';

function LinksDropDown() {
  const user = useAppSelector((state) => state.userState.user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon">
          <AlignLeft />
          <span className="sr-only">Toggle Links</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-52 lg:hidden"
        sideOffset={25}
        align="start"
      >
        {links.map((link) => {
          const { href, label } = link;
          const restrictedRoutes = href === 'checkout' || href === 'orders';
          if (restrictedRoutes && !user) return null;
          return (
            <DropdownMenuItem key={label}>
              <NavLink
                to={href}
                className={({ isActive }) => {
                  return `w-full capitalize ${isActive ? 'text--primary' : ''}`;
                }}
              >
                {label}
              </NavLink>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropDown;
