import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RatingInput } from '@/components/RatingInput';
import { Card } from '@/components/ui/card';
import { CATEGORIAS, Location } from '@/types/location';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';
import 'leaflet/dist/leaflet.css';
import PickLocationMap, { LatLngLiteral } from '@/components/PickLocationMap';

// Removido react-leaflet Consumer para evitar erro de contexto

const Add = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState<Location['categoria']>('outros');
  const [comentario, setComentario] = useState('');
  const [ratings, setRatings] = useState({
    rampas: 3,
    banheiros: 3,
    elevadores: 3,
    vagas: 3,
  });
  const [position, setPosition] = useState<LatLngLiteral | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      toast.error('Por favor, insira o nome do local');
      return;
    }

    if (!position) {
      toast.error('Por favor, clique no mapa para selecionar a localização');
      return;
    }

    const newLocation: Location = {
      id: crypto.randomUUID(),
      nome: nome.trim(),
      categoria,
      latitude: position.lat,
      longitude: position.lng,
      acessibilidade: ratings,
      comentario: comentario.trim(),
      fotos: [],
      criadoPor: 'Usuário Atual',
      criadoEm: new Date(),
    };

    storage.saveLocation(newLocation);
    toast.success('Local adicionado com sucesso!');
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-6">Adicionar Novo Local</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-base font-semibold">
                Nome do Local *
              </Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Parque Ibirapuera"
                className="text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria" className="text-base font-semibold">
                Categoria *
              </Label>
              <Select value={categoria} onValueChange={(value) => setCategoria(value as Location['categoria'])}>
                <SelectTrigger id="categoria" className="text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIAS.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value} className="text-base">
                      {cat.icon} {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold">Avaliação de Acessibilidade</h2>
              
              <RatingInput
                label="Rampas"
                icon="♿"
                value={ratings.rampas}
                onChange={(value) => setRatings({ ...ratings, rampas: value })}
              />
              
              <RatingInput
                label="Banheiros Acessíveis"
                icon="🚻"
                value={ratings.banheiros}
                onChange={(value) => setRatings({ ...ratings, banheiros: value })}
              />
              
              <RatingInput
                label="Elevadores"
                icon="🛗"
                value={ratings.elevadores}
                onChange={(value) => setRatings({ ...ratings, elevadores: value })}
              />
              
              <RatingInput
                label="Vagas para PCD"
                icon="🅿️"
                value={ratings.vagas}
                onChange={(value) => setRatings({ ...ratings, vagas: value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comentario" className="text-base font-semibold">
                Comentário
              </Label>
              <Textarea
                id="comentario"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Descreva sua experiência com a acessibilidade do local..."
                className="text-base min-h-24"
                maxLength={500}
              />
              <p className="text-sm text-muted-foreground">
                {comentario.length}/500 caracteres
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-semibold">
                Localização no Mapa *
              </Label>
              <p className="text-sm text-muted-foreground mb-2">
                Clique no mapa para selecionar a localização do local
              </p>
<div className="h-64 md:h-96 rounded-lg overflow-hidden border-2 border-border">
                <PickLocationMap value={position} onChange={setPosition} />
              </div>
              {position && (
                <p className="text-sm text-success">
                  ✓ Localização selecionada: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate('/')}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                size="lg"
                className="flex-1"
              >
                Salvar Local
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default Add;
