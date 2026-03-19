export interface Category {
  id: string;
  name: string;
}

export interface Branch {
  id: string;
  name: string;
  categoryId: string;
}

export interface School {
  id: string;
  name: string;
  lotteryNumber: string;
}

export interface Participant {
  id: string;
  name: string;
  nisn: string;
  birthPlace: string;
  birthDate: string;
  gender: 'Laki-laki' | 'Perempuan';
  grade: 'Kelas 1' | 'Kelas 2' | 'Kelas 3' | 'Kelas 4' | 'Kelas 5' | 'Kelas 6';
  schoolId: string;
  branchId: string;
  genderCategory: 'Putra' | 'Putri' | 'Duet';
  photo: string; // base64
  createdAt: string;
}

export interface Score {
  participantId: string;
  branchId: string;
  score1: number;
  score2: number;
  score3: number;
  score: number; // Total score
}

export interface Panitera {
  id: string;
  name: string;
  branchId: string;
  categoryId: string;
  password: string;
}

export interface Jury {
  id: string;
  name: string;
  branchId: string;
  categoryId: string;
  origin: string;
  photo: string; // base64
}

export interface AppData {
  participants: Participant[];
  branches: Branch[];
  categories: Category[];
  schools: School[];
  scores: Score[];
  paniteras: Panitera[];
  juries: Jury[];
  logo?: string;
  subtitle?: string;
}
