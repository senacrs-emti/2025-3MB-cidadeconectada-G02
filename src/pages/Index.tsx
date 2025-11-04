import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Map } from '@/components/Map';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { storage } from '@/lib/storage';
import { Location } from '@/types/location';

const Index = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const loadedLocations = storage.getLocations();
    setLocations(loadedLocations);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 relative">
        <div className="absolute inset-0">
          <Map locations={locations} />
        </div>

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

        {locations.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-card p-8 rounded-lg shadow-lg max-w-md text-center pointer-events-auto">
              <h2 className="text-2xl font-bold mb-4">Bem-vindo ao InkluiMap!</h2>
              <p className="text-muted-foreground mb-6">
                Ainda não há locais cadastrados. Seja o primeiro a adicionar um local acessível!
              </p>
              <Button asChild size="lg">
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
