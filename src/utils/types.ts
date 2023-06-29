export type Cliente = {
    id?: number;
    numeroDocumento: string;
    tipoDocumento: string;
    nome: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
}

export type Condutor = {
    id?: number;
    nome: string;
    numeroHabilitacao: string;
    catergoriaHabilitacao: string;
    vencimentoHabilitacao: String;
}

export type Deslocamento = {
    id?: number;
    kmInicial: number;
    kmFinal: number;
    inicioDeslocamento: string;
    fimDeslocamento: string;
    checkList: string;
    motivo: string;
    observacao: string;
    idCondutor: number;
    idVeiculo: number;
    idCliente: number;
}

export type DeslocamentoCreate = {
    kmInicial: number;
    inicioDeslocamento: string;
    checkList: string;
    motivo: string;
    observacao: string;
    idCondutor: number;
    idVeiculo: number;
    idCliente: number;
}

export type DeslocamentoDetails = {
    id?: number;
    kmInicial: number;
    kmFinal: number;
    inicioDeslocamento: string;
    fimDeslocamento: string;
    checkList: string;
    motivo: string;
    observacao: string;
    nomeCliente: string
    nomeCondutor: string
    nomeVeiculo: string
}

export type DeslocamentoEdit = {
    id?: number;
    kmFinal: number;
    fimDeslocamento: string;
    observacao: string;
}

export type Veiculo = {
    id?: number;
    placa?: string;
    marcaModelo: string;
    anoFabricacao: number;
    kmAtual: number;
}