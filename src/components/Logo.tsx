import { Armchair } from 'lucide-react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link
      to="/"
      className="hidden lg:flex justify-center items-center p-2 bg-primary rounded-lg text-white"
    >
      <Armchair className="w-8 h-8" />
    </Link>
  );
}

export default Logo;
