export interface AccessibilityRatings {
  rampas: number; // 1-5
  banheiros: number; // 1-5
  elevadores: number; // 1-5
  vagas: number; // 1-5
}

export interface Location {
  id: string;
  nome: string;
  categoria: 'lazer' | 'saude' | 'transporte' | 'educacao' | 'comercio' | 'outros';
  latitude: number;
  longitude: number;
  acessibilidade: AccessibilityRatings;
  comentario: string;
  fotos: string[];
  criadoPor: string;
  criadoEm: Date;
}

export const CATEGORIAS = [
  { value: 'lazer', label: 'Lazer', icon: '🎭' },
  { value: 'saude', label: 'Saúde', icon: '🏥' },
  { value: 'transporte', label: 'Transporte', icon: '🚌' },
  { value: 'educacao', label: 'Educação', icon: '🎓' },
  { value: 'comercio', label: 'Comércio', icon: '🏪' },
  { value: 'outros', label: 'Outros', icon: '📍' },
] as const;
