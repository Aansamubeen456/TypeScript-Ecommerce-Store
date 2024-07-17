import CartButton from './CartButton';
import LinksDropDown from './LinksDropDown';
import Logo from './Logo';
import ModeToggle from './ModeToggle';
import NavLinks from './NavLinks';

function Navbar() {
  return (
    <nav className="bg-muted py-4">
      <div className="align-element flex justify-between items-center">
        <Logo />
        <LinksDropDown />
        <NavLinks />
        <div className="flex justify-center items-center gap-x-4">
          <ModeToggle />
          <CartButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
