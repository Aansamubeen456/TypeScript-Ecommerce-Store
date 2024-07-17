import { useAppSelector } from '@/hooks';
import { links } from '@/utils';
import { NavLink } from 'react-router-dom';

function NavLinks() {
  const user = useAppSelector((state) => state.userState.user);

  return (
    <div className="hidden lg:flex justify-center items-center gap-x-4">
      {links.map((link) => {
        const { href, label } = link;
        const restrictedRoutes = href === 'checkout' || href === 'orders';
        if (restrictedRoutes && !user) {
          return null;
        }
        return (
          <NavLink
            key={label}
            to={href}
            className={({ isActive }) => {
              return `font-light tracking-wide capitalize ${
                isActive ? 'text-primary' : ''
              }`;
            }}
          >
            {label}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;
