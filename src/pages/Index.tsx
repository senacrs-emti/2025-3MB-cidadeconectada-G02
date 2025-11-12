import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Map } from '@/components/Map';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { storage } from '@/lib/storage';
import { Location } from '@/types/location';

const Index = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const loadedLocations = storage.getLocations();
    setLocations(loadedLocations);

    // 👇 Mostra o pop-up sempre que a página for recarregada/iniciada
    setShowWelcome(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />

      <main className="flex-1 relative">
        <div className="absolute inset-0">
          <Map locations={locations} />
        </div>

        {/* Botão flutuante para adicionar novo local */}
        <Link
          to="/add"
          className="fixed bottom-6 right-6 z-[1000]"
          aria-label="Adicionar novo local"
        >
          <Button
            size="lg"
            className="h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all"
            variant="default"
          >
            <Plus className="w-8 h-8" aria-hidden="true" />
          </Button>
        </Link>

        {/* Pop-up de boas-vindas (mostra ao iniciar/reiniciar a página) */}
        {showWelcome && locations.length === 0 && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[2000] animate-fade-in">
            <div className="relative bg-card p-8 rounded-2xl shadow-2xl max-w-md text-center animate-scale-in">
              {/* Botão X para fechar */}
              <button
                onClick={() => setShowWelcome(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                aria-label="Fechar mensagem de boas-vindas"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold mb-4">Bem-vindo ao InkluiMap!</h2>
              <p className="text-muted-foreground mb-6">
                Ainda não há locais cadastrados. Seja o primeiro a adicionar um local acessível!
              </p>

              <Button asChild size="lg" onClick={() => setShowWelcome(false)}>
                <Link to="/add">
                  <Plus className="w-5 h-5 mr-2" />
                  Adicionar Primeiro Local
                </Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
