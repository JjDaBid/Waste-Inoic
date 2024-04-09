export interface WasteRegister{
  fecha: Date,
  id: string,
  image: string,
  residuosOrdinariosNoAprovechables: string,
  residuosOrdinariosAprovechables: string,
  residuosReciclables: string,
  residuosBiosanitarios: string,
  residuosAnatomopatologicos: string,
  residuosCortopunzantes: string,
  residuosQuimicos: string,
  totalResiduos: string
}
