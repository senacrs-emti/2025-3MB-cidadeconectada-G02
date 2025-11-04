import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { storage } from '@/lib/storage';
import { Location, CATEGORIAS } from '@/types/location';
import { toast } from 'sonner';
import { Trash2, Edit, MapPin } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Profile = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<Location[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = () => {
    const loadedLocations = storage.getLocations();
    setLocations(loadedLocations);
  };

  const handleDelete = (id: string) => {
    storage.deleteLocation(id);
    loadLocations();
    setDeleteId(null);
    toast.success('Local removido com sucesso');
  };

  const getCategoriaLabel = (categoria: Location['categoria']) => {
    return CATEGORIAS.find(c => c.value === categoria)?.label || categoria;
  };

  const getCategoriaIcon = (categoria: Location['categoria']) => {
    return CATEGORIAS.find(c => c.value === categoria)?.icon || '📍';
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
              U
            </div>
            <div>
              <h1 className="text-2xl font-bold">Usuário Atual</h1>
              <p className="text-muted-foreground">usuario@exemplo.com</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <p className="text-sm text-muted-foreground mb-2">Estatísticas</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-2xl font-bold">{locations.length}</p>
                <p className="text-sm text-muted-foreground">Locais Cadastrados</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-2xl font-bold">
                  {locations.length > 0 
                    ? (locations.reduce((acc, loc) => {
                        const media = (loc.acessibilidade.rampas + loc.acessibilidade.banheiros + 
                                      loc.acessibilidade.elevadores + loc.acessibilidade.vagas) / 4;
                        return acc + media;
                      }, 0) / locations.length).toFixed(1)
                    : '0.0'
                  }
                </p>
                <p className="text-sm text-muted-foreground">Média de Acessibilidade</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Meus Locais Cadastrados</h2>
          
          {locations.length === 0 ? (
            <Card className="p-8 text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl font-semibold mb-2">Nenhum local cadastrado</p>
              <p className="text-muted-foreground mb-6">
                Comece adicionando locais acessíveis que você conhece
              </p>
              <Button onClick={() => navigate('/add')} size="lg">
                Adicionar Primeiro Local
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {locations.map((location) => (
                <Card key={location.id} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold">
                          {getCategoriaIcon(location.categoria)} {location.nome}
                        </h3>
                        <Badge variant="secondary">
                          {getCategoriaLabel(location.categoria)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                        <div className="text-sm">
                          <span className="text-muted-foreground">♿ Rampas:</span>
                          <span className="font-semibold ml-1">{location.acessibilidade.rampas}/5</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">🚻 Banheiros:</span>
                          <span className="font-semibold ml-1">{location.acessibilidade.banheiros}/5</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">🛗 Elevadores:</span>
                          <span className="font-semibold ml-1">{location.acessibilidade.elevadores}/5</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">🅿️ Vagas:</span>
                          <span className="font-semibold ml-1">{location.acessibilidade.vagas}/5</span>
                        </div>
                      </div>

                      {location.comentario && (
                        <p className="text-sm text-muted-foreground">
                          {location.comentario}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          toast.info('Funcionalidade de edição em desenvolvimento');
                        }}
                        aria-label="Editar local"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => setDeleteId(location.id)}
                        aria-label="Excluir local"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir este local? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
};

export default Profile;
