// component/types.ts
export interface Loan {
  id: string;
  nama: string;
  noBuku: string;
  judulBuku: string;
  pengarang?: string;
  tglPinjam?: string;
  tglKembali?: string;
  createdAt?: string;
}

export interface Book {
  id: string;
  namaBuku: string;
  judulBuku: string;
  rak: string;
}
