import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { MapPin, User, Plus } from 'lucide-react';

export function Header() {
  const location = useLocation();

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <MapPin className="w-8 h-8" aria-hidden="true" />
            <span className="text-xl font-bold">InkluiMap</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant={location.pathname === '/' ? 'secondary' : 'ghost'}
              size="lg"
              className="text-base"
            >
              <Link to="/" aria-label="Ir para mapa">
                <MapPin className="w-5 h-5 mr-2" aria-hidden="true" />
                Mapa
              </Link>
            </Button>

            <Button
              asChild
              variant={location.pathname === '/add' ? 'secondary' : 'ghost'}
              size="lg"
              className="text-base"
            >
              <Link to="/add" aria-label="Adicionar local">
                <Plus className="w-5 h-5 mr-2" aria-hidden="true" />
                <span className="hidden sm:inline">Adicionar</span>
              </Link>
            </Button>

            <Button
              asChild
              variant={location.pathname === '/profile' ? 'secondary' : 'ghost'}
              size="lg"
              className="text-base"
            >
              <Link to="/profile" aria-label="Meu perfil">
                <User className="w-5 h-5 mr-2" aria-hidden="true" />
                <span className="hidden sm:inline">Perfil</span>
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
