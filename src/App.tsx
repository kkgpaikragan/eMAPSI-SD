import React, { Component, useState, useEffect, ReactNode, ErrorInfo } from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  Trophy, 
  Settings, 
  LogOut, 
  Search,
  Plus,
  Printer,
  CheckCircle2,
  AlertCircle,
  Camera,
  ChevronRight,
  Star,
  ChevronDown,
  Trash2,
  ListOrdered,
  FileText,
  Eye,
  EyeOff,
  Edit,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Participant, Branch, Score, AppData, Category, School } from './types';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick, hasSubmenu, isOpen }: any) => (
  <div className="space-y-1">
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
        active && !hasSubmenu
          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
          : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </div>
      {hasSubmenu && (
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      )}
    </button>
  </div>
);

const SidebarSubItem = ({ label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 pl-12 pr-4 py-2 rounded-xl transition-all duration-200 text-sm ${
      active 
        ? 'text-emerald-600 font-bold bg-emerald-50' 
        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
    }`}
  >
    <span>{label}</span>
  </button>
);

const Card = ({ children, className = "" }: any) => (
  <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

// --- Pages ---

const Dashboard = ({ data }: { data: AppData }) => {
  // Calculate recap
  const recap = data.branches.map(branch => {
    const category = data.categories.find(c => c.id === branch.categoryId);
    const participants = data.participants.filter(p => p.branchId === branch.id);
    return {
      branchName: branch.name,
      categoryName: category?.name || 'Tanpa Kategori',
      count: participants.length,
      putra: participants.filter(p => p.genderCategory === 'Putra').length,
      putri: participants.filter(p => p.genderCategory === 'Putri').length,
      duet: participants.filter(p => p.genderCategory === 'Duet').length,
    };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-emerald-50 border-emerald-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-600 text-sm font-medium uppercase tracking-wider">Total Peserta</p>
              <h3 className="text-3xl font-bold text-emerald-900 mt-1">{data.participants.length}</h3>
            </div>
            <div className="p-3 bg-white rounded-xl text-emerald-500 shadow-sm">
              <Users size={24} />
            </div>
          </div>
        </Card>
        <Card className="bg-blue-50 border-blue-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-600 text-sm font-medium uppercase tracking-wider">Cabang Lomba</p>
              <h3 className="text-3xl font-bold text-blue-900 mt-1">{data.branches.length}</h3>
            </div>
            <div className="p-3 bg-white rounded-xl text-blue-500 shadow-sm">
              <Trophy size={24} />
            </div>
          </div>
        </Card>
        <Card className="bg-amber-50 border-amber-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-amber-600 text-sm font-medium uppercase tracking-wider">Lembaga Terdaftar</p>
              <h3 className="text-3xl font-bold text-amber-900 mt-1">
                {data.schools.length}
              </h3>
            </div>
            <div className="p-3 bg-white rounded-xl text-amber-500 shadow-sm">
              <Users size={24} />
            </div>
          </div>
        </Card>
        <Card className="bg-indigo-50 border-indigo-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-600 text-sm font-medium uppercase tracking-wider">Akun Panitera</p>
              <h3 className="text-3xl font-bold text-indigo-900 mt-1">
                {data.paniteras.length}
              </h3>
            </div>
            <div className="p-3 bg-white rounded-xl text-indigo-500 shadow-sm">
              <ShieldCheck size={24} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <ListOrdered size={20} className="text-emerald-500" />
            <span>Rekap Peserta per Cabang</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-4 py-2 font-semibold">Cabang Lomba</th>
                  <th className="px-4 py-2 font-semibold">Kategori</th>
                  <th className="px-4 py-2 font-semibold text-center">Pa</th>
                  <th className="px-4 py-2 font-semibold text-center">Pi</th>
                  <th className="px-4 py-2 font-semibold text-center">Dt</th>
                  <th className="px-4 py-2 font-semibold text-center">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recap.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900">{item.branchName}</td>
                    <td className="px-4 py-3 text-slate-500">{item.categoryName}</td>
                    <td className="px-4 py-3 text-center text-blue-600 font-semibold">{item.putra}</td>
                    <td className="px-4 py-3 text-center text-pink-600 font-semibold">{item.putri}</td>
                    <td className="px-4 py-3 text-center text-emerald-600 font-semibold">{item.duet}</td>
                    <td className="px-4 py-3 text-center font-bold text-slate-900">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Peserta Terbaru</h3>
          <div className="space-y-4">
            {data.participants.slice(-5).reverse().map((p) => {
              const school = data.schools.find(s => s.id === p.schoolId);
              const branch = data.branches.find(b => b.id === p.branchId);
              return (
                <div key={p.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                  <div className="flex items-center space-x-4">
                    <img src={p.photo} alt={p.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-semibold text-slate-900">{p.name}</p>
                      <p className="text-xs text-slate-500">
                        {school?.name || 'Sekolah'} • {branch?.name || 'Cabang'} ({p.genderCategory})
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              );
            })}
            {data.participants.length === 0 && (
              <p className="text-center py-8 text-slate-400 italic">Belum ada peserta terdaftar.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

const RegistrationForm = ({ data, onRegister, initialData }: { data: AppData, onRegister: (p: any) => void, initialData?: Participant }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    nisn: initialData?.nisn || '',
    birthPlace: initialData?.birthPlace || '',
    birthDate: initialData?.birthDate || '',
    gender: initialData?.gender || 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    grade: initialData?.grade || 'Kelas 1' as any,
    schoolId: initialData?.schoolId || data.schools[0]?.id || '',
    branchId: initialData?.branchId || data.branches[0]?.id || '',
    genderCategory: initialData?.genderCategory || 'Putra' as 'Putra' | 'Putri' | 'Duet',
    photo: initialData?.photo || ''
  });
  const [preview, setPreview] = useState<string | null>(initialData?.photo || null);

  const selectedSchool = data.schools.find(s => s.id === formData.schoolId);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        setFormData({ ...formData, photo: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.photo) return alert("Harap upload foto peserta!");
    if (!formData.schoolId) return alert("Harap pilih sekolah!");
    if (!formData.branchId) return alert("Harap pilih cabang lomba!");
    onRegister(formData);
    if (!initialData) {
      setFormData({ 
        name: '', 
        nisn: '',
        birthPlace: '',
        birthDate: '',
        gender: 'Laki-laki',
        grade: 'Kelas 1',
        schoolId: data.schools[0]?.id || '', 
        branchId: data.branches[0]?.id || '', 
        genderCategory: 'Putra', 
        photo: '' 
      });
      setPreview(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
            <UserPlus size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {initialData ? 'Edit Data Peserta' : 'Form Pendaftaran Peserta'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <Camera size={32} className="text-slate-400" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="absolute -bottom-2 -right-2 p-2 bg-white rounded-lg shadow-md border border-slate-100 text-emerald-500">
                <Plus size={16} />
              </div>
            </div>
            <p className="text-xs text-slate-500">Klik untuk upload foto peserta (Max 2MB)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Sekolah / Lembaga</label>
              <div className="flex gap-2">
                <div className="w-24 px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-mono font-bold flex items-center justify-center" title="No Undi">
                  {selectedSchool?.lotteryNumber || '---'}
                </div>
                <select
                  required
                  value={formData.schoolId}
                  onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                >
                  <option value="">Pilih Sekolah</option>
                  {data.schools.map(sch => (
                    <option key={sch.id} value={sch.id}>{sch.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">NISN</label>
              <input
                required
                type="text"
                value={formData.nisn}
                onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="Nomor Induk Siswa Nasional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="Nama lengkap peserta"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tempat Lahir</label>
              <input
                required
                type="text"
                value={formData.birthPlace}
                onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="Kota kelahiran"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Lahir</label>
              <input
                required
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Kelamin</label>
              <select
                required
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kelas</label>
              <select
                required
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value as any })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              >
                {['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cabang Lomba</label>
              <select
                required
                value={formData.branchId}
                onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              >
                <option value="">Pilih Cabang</option>
                {data.categories.map(cat => (
                  <optgroup key={cat.id} label={cat.name}>
                    {data.branches.filter(br => br.categoryId === cat.id).map(br => (
                      <option key={br.id} value={br.id}>{br.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
              <select
                value={formData.genderCategory}
                onChange={(e) => setFormData({ ...formData, genderCategory: e.target.value as any })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              >
                <option value="Putra">Putra</option>
                <option value="Putri">Putri</option>
                <option value="Duet">Duet</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-all active:scale-95"
          >
            {initialData ? 'Simpan Perubahan' : 'Daftarkan Peserta'}
          </button>
        </form>
      </Card>
    </div>
  );
};

const ParticipantList = ({ data, onEdit, onDelete }: { data: AppData, onEdit: (p: Participant) => void, onDelete: (id: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchoolFilter, setSelectedSchoolFilter] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [viewingParticipant, setViewingParticipant] = useState<Participant | null>(null);

  const filtered = data.participants.filter(p => {
    const school = data.schools.find(s => s.id === p.schoolId);
    const branch = data.branches.find(b => b.id === p.branchId);
    
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSchool = selectedSchoolFilter === '' || p.schoolId === selectedSchoolFilter;
    
    return matchesSearch && matchesSchool;
  });

  const handlePrintRecap = () => {
    const school = data.schools.find(s => s.id === selectedSchoolFilter);
    const schoolName = school?.name || 'Semua Sekolah';
    const lotteryNumber = school?.lotteryNumber || '-';
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const tableRows = filtered.map((p, idx) => {
      const branch = data.branches.find(b => b.id === p.branchId);
      const schoolOfP = data.schools.find(s => s.id === p.schoolId);
      return `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${idx + 1}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${p.name}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${p.nisn}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${schoolOfP?.name || '-'}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${branch?.name || '-'}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${p.genderCategory}</td>
        </tr>
      `;
    }).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Rekap Peserta - ${schoolName}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #333; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .header h1 { margin: 0; font-size: 24px; text-transform: uppercase; }
            .header p { margin: 5px 0; font-size: 14px; color: #666; }
            .info { margin-bottom: 20px; display: flex; justify-content: space-between; }
            .info div { font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
            th { background-color: #f2f2f2; border: 1px solid #ddd; padding: 10px; text-align: left; text-transform: uppercase; }
            .footer { margin-top: 50px; text-align: right; font-size: 12px; }
            .signature { margin-top: 80px; display: inline-block; border-top: 1px solid #333; padding-top: 5px; width: 200px; text-align: center; }
            @media print {
              @page { size: A4; margin: 1cm; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            ${data.logo ? `<img src="${data.logo}" style="height: 60px; margin-bottom: 10px;" />` : ''}
            <h1>REKAPITULASI DAFTAR PESERTA MAPSI SD</h1>
            <p>${data.subtitle || 'Tingkat Sekolah Dasar Tahun 2026'}</p>
          </div>
          
          <div class="info">
            <div>Lembaga: ${schoolName}</div>
            <div>No Undi: ${lotteryNumber}</div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 40px;">No</th>
                <th>Nama Peserta</th>
                <th>NISN</th>
                <th>Sekolah</th>
                <th>Cabang Lomba</th>
                <th>Kategori</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>

          <div class="footer">
            <p>Dicetak pada: ${new Date().toLocaleString('id-ID')}</p>
            <div style="margin-top: 40px;">
              <p>Panitia Pelaksana,</p>
              <div class="signature">
                ( ................................. )
              </div>
            </div>
          </div>

          <script>
            window.onload = () => {
              window.print();
              // window.close();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900">Daftar Peserta Terdaftar</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Cari nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-48 text-sm"
            />
          </div>
          
          <select
            value={selectedSchoolFilter}
            onChange={(e) => setSelectedSchoolFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
          >
            <option value="">Semua Sekolah</option>
            {data.schools.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <button
            onClick={handlePrintRecap}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all text-sm font-bold"
          >
            <Printer size={18} />
            <span>Cetak Rekap</span>
          </button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Foto</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Nama / ID</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Sekolah / No Undi</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Cabang Lomba</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((p) => {
                const school = data.schools.find(s => s.id === p.schoolId);
                const branch = data.branches.find(b => b.id === p.branchId);
                return (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <img src={p.photo} alt={p.name} className="w-12 h-12 rounded-lg object-cover shadow-sm" referrerPolicy="no-referrer" />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{p.name}</p>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{p.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">{school?.name || '-'}</p>
                      <p className="text-xs font-mono font-bold text-amber-600">No Undi: {school?.lotteryNumber || '-'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">{branch?.name || '-'}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{p.genderCategory}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button 
                          onClick={() => setViewingParticipant(p)}
                          className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                          title="Detail"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => onEdit(p)}
                          className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => onDelete(p.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button 
                          onClick={() => setSelectedParticipant(p)}
                          className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                          title="Cetak Kartu"
                        >
                          <Printer size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                    Tidak ada peserta yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <AnimatePresence>
        {selectedParticipant && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
              <button 
                onClick={() => setSelectedParticipant(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <Plus className="rotate-45" size={24} />
              </button>

              <div id="participant-card" className="text-center space-y-6">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  {data.logo && <img src={data.logo} alt="Logo" className="w-12 h-12 object-contain" referrerPolicy="no-referrer" />}
                  <div className="flex-1 text-right">
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-tight">Kartu Peserta</h3>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Digital MAPSI SD 2026</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative">
                    <img 
                      src={selectedParticipant.photo} 
                      alt={selectedParticipant.name} 
                      className="w-32 h-40 object-cover rounded-2xl border-4 border-white shadow-xl"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-xl shadow-lg">
                      <QRCodeSVG value={selectedParticipant.id} size={48} />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-2xl font-bold text-slate-900 leading-tight">{selectedParticipant.name}</h4>
                  <p className="text-slate-500 font-medium">
                    {data.schools.find(s => s.id === selectedParticipant.schoolId)?.name || 'Sekolah tidak ditemukan'}
                  </p>
                  <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                    No Undi: {data.schools.find(s => s.id === selectedParticipant.schoolId)?.lotteryNumber || '-'}
                  </div>
                </div>

                <div className="py-3 px-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Cabang Lomba</p>
                  <p className="text-emerald-900 font-bold">
                    {data.branches.find(b => b.id === selectedParticipant.branchId)?.name || 'Cabang tidak ditemukan'} ({selectedParticipant.genderCategory})
                  </p>
                </div>

                <div className="pt-4 border-t border-dashed border-slate-200">
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">ID: {selectedParticipant.id}</p>
                </div>
              </div>

              <button 
                onClick={() => {
                  const content = document.getElementById('participant-card')?.innerHTML;
                  const win = window.open('', '', 'width=800,height=1000');
                  if (win) {
                    win.document.write(`
                      <html>
                        <head>
                          <title>Cetak Kartu - ${selectedParticipant.name}</title>
                          <script src="https://cdn.tailwindcss.com"></script>
                          <style>
                            @page {
                              size: A3;
                              margin: 0;
                            }
                            @media print {
                              body { margin: 0; padding: 0; }
                              .print-container {
                                width: 297mm;
                                height: 420mm;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background: white;
                              }
                              .card-box {
                                width: 200mm; /* Large ID Card for A3 */
                                padding: 20mm;
                                border: 2px solid #f1f5f9;
                                border-radius: 40px;
                                box-shadow: none !important;
                              }
                            }
                          </style>
                        </head>
                        <body class="bg-slate-50 flex justify-center items-center min-h-screen">
                          <div class="print-container">
                            <div class="card-box bg-white p-10 rounded-[40px] shadow-2xl border-2 border-slate-100 w-[600px] text-center">
                              ${content}
                            </div>
                          </div>
                          <script>
                            setTimeout(() => { window.print(); window.close(); }, 500);
                          </script>
                        </body>
                      </html>
                    `);
                  }
                }}
                className="w-full mt-8 bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
              >
                <Printer size={20} />
                <span>Cetak Sekarang (A3)</span>
              </button>
            </motion.div>
          </div>
        )}

        {viewingParticipant && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setViewingParticipant(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <Plus className="rotate-45" size={24} />
              </button>

              <div className="flex items-center space-x-4 mb-6">
                <img src={viewingParticipant.photo} alt={viewingParticipant.name} className="w-20 h-20 rounded-2xl object-cover shadow-md" referrerPolicy="no-referrer" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{viewingParticipant.name}</h3>
                  <p className="text-emerald-600 font-bold text-sm uppercase tracking-wider">{viewingParticipant.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">NISN</p>
                  <p className="text-slate-900 font-medium">{viewingParticipant.nisn || '-'}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Sekolah</p>
                  <p className="text-slate-900 font-medium">{data.schools.find(s => s.id === viewingParticipant.schoolId)?.name || '-'}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tempat Lahir</p>
                  <p className="text-slate-900 font-medium">{viewingParticipant.birthPlace || '-'}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tanggal Lahir</p>
                  <p className="text-slate-900 font-medium">{viewingParticipant.birthDate || '-'}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Jenis Kelamin</p>
                  <p className="text-slate-900 font-medium">{viewingParticipant.gender || '-'}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Kelas</p>
                  <p className="text-slate-900 font-medium">{viewingParticipant.grade || '-'}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl col-span-2">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Cabang Lomba</p>
                  <p className="text-emerald-900 font-bold">
                    {data.branches.find(b => b.id === viewingParticipant.branchId)?.name || '-'} ({viewingParticipant.genderCategory})
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ScoringPanel = ({ data, onSaveScore }: { data: AppData, onSaveScore: (s: any) => void }) => {
  const [selectedBranch, setSelectedBranch] = useState(data.branches[0]?.id || '');
  const [scores, setScores] = useState<Record<string, { score1: number, score2: number, score3: number, score: number }>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const initialScores: Record<string, { score1: number, score2: number, score3: number, score: number }> = {};
    data.scores.forEach(s => {
      if (s.branchId === selectedBranch) {
        initialScores[s.participantId] = {
          score1: s.score1 || 0,
          score2: s.score2 || 0,
          score3: s.score3 || 0,
          score: s.score || 0
        };
      }
    });
    setScores(initialScores);
  }, [selectedBranch, data.scores]);

  const handleScoreChange = (participantId: string, field: string, value: string) => {
    const num = parseInt(value) || 0;
    const current = scores[participantId] || { score1: 0, score2: 0, score3: 0, score: 0 };
    const updated = { ...current, [field]: num };
    updated.score = updated.score1 + updated.score2 + updated.score3;
    setScores({ ...scores, [participantId]: updated });
  };

  const handleSave = (participantId: string) => {
    const s = scores[participantId] || { score1: 0, score2: 0, score3: 0, score: 0 };
    onSaveScore({ 
      participantId, 
      branchId: selectedBranch, 
      ...s
    });
    setEditingId(null);
  };

  const participantsInBranch = data.participants.filter(p => p.branchId === selectedBranch);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Input Nilai Peserta</h2>
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {data.categories.map(cat => (
            <optgroup key={cat.id} label={cat.name}>
              {data.branches.filter(br => br.categoryId === cat.id).map(br => (
                <option key={br.id} value={br.id}>{br.name}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-100">
                <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-wider">Peserta</th>
                <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-wider">No Undi</th>
                <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-wider text-center">Juri 1</th>
                <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-wider text-center">Juri 2</th>
                <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-wider text-center">Juri 3</th>
                <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-wider text-center">Total</th>
                <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {participantsInBranch.map((p) => {
                const isEditing = editingId === p.id;
                const s = scores[p.id] || { score1: 0, score2: 0, score3: 0, score: 0 };
                const school = data.schools.find(sch => sch.id === p.schoolId);
                
                return (
                  <tr key={p.id} className="group">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <img src={p.photo} alt={p.name} className="w-8 h-8 rounded-lg object-cover" referrerPolicy="no-referrer" />
                        <div>
                          <p className="font-bold text-slate-900">{p.name}</p>
                          <p className="text-[10px] text-emerald-500 font-bold uppercase">{p.genderCategory}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-slate-500 text-sm font-bold">
                      {school?.lotteryNumber || '-'}
                    </td>
                    <td className="py-4 text-center">
                      <input
                        type="number"
                        disabled={!isEditing}
                        value={s.score1 || ''}
                        onChange={(e) => handleScoreChange(p.id, 'score1', e.target.value)}
                        className={`w-16 px-2 py-1 rounded-lg border ${isEditing ? 'border-emerald-300 ring-2 ring-emerald-100' : 'border-slate-100 bg-slate-50'} outline-none text-center font-bold`}
                      />
                    </td>
                    <td className="py-4 text-center">
                      <input
                        type="number"
                        disabled={!isEditing}
                        value={s.score2 || ''}
                        onChange={(e) => handleScoreChange(p.id, 'score2', e.target.value)}
                        className={`w-16 px-2 py-1 rounded-lg border ${isEditing ? 'border-emerald-300 ring-2 ring-emerald-100' : 'border-slate-100 bg-slate-50'} outline-none text-center font-bold`}
                      />
                    </td>
                    <td className="py-4 text-center">
                      <input
                        type="number"
                        disabled={!isEditing}
                        value={s.score3 || ''}
                        onChange={(e) => handleScoreChange(p.id, 'score3', e.target.value)}
                        className={`w-16 px-2 py-1 rounded-lg border ${isEditing ? 'border-emerald-300 ring-2 ring-emerald-100' : 'border-slate-100 bg-slate-50'} outline-none text-center font-bold`}
                      />
                    </td>
                    <td className="py-4 text-center font-black text-emerald-600">
                      {s.score}
                    </td>
                    <td className="py-4 text-right">
                      {isEditing ? (
                        <button
                          onClick={() => handleSave(p.id)}
                          className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-1 ml-auto"
                        >
                          <CheckCircle2 size={14} />
                          <span>Simpan</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditingId(p.id)}
                          className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center space-x-1 ml-auto"
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {participantsInBranch.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 italic">
                    Belum ada peserta di cabang lomba ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const ScoreRecap = ({ data }: { data: AppData }) => {
  const [filterBranchId, setFilterBranchId] = useState<string>('all');

  const filteredBranches = filterBranchId === 'all' 
    ? data.branches 
    : data.branches.filter(b => b.id === filterBranchId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Rekapitulasi Nilai</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handlePrintPDF('Rekapitulasi Nilai', 'score-recap-content')}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors text-sm font-bold"
          >
            <Printer size={18} />
            <span>Cetak PDF</span>
          </button>
          <select
            value={filterBranchId}
            onChange={(e) => setFilterBranchId(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          >
            <option value="all">Semua Cabang Lomba</option>
            {data.categories.map(cat => (
              <optgroup key={cat.id} label={cat.name}>
                {data.branches.filter(br => br.categoryId === cat.id).map(br => (
                  <option key={br.id} value={br.id}>{br.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-8" id="score-recap-content">
        {filteredBranches.map(br => {
          const participantsInBranch = data.participants
            .filter(p => p.branchId === br.id)
            .map(p => {
              const score = data.scores.find(s => s.participantId === p.id && s.branchId === br.id);
              const school = data.schools.find(s => s.id === p.schoolId);
              return { p, score, school };
            });

          // Calculate ranks based on total score (descending)
          const sortedByScore = [...participantsInBranch].sort((a, b) => (b.score?.score || 0) - (a.score?.score || 0));
          const ranks = new Map();
          sortedByScore.forEach((item, index) => {
            ranks.set(item.p.id, index + 1);
          });

          // Sort by lottery number (ascending)
          const sortedByLottery = participantsInBranch.sort((a, b) => {
            return (a.school?.lotteryNumber || '').localeCompare(b.school?.lotteryNumber || '', undefined, { numeric: true });
          });

          return (
            <Card key={br.id}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <Trophy size={20} className="text-amber-500" />
                  <span>{br.name}</span>
                </h3>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-bold uppercase">
                  {data.categories.find(c => c.id === br.categoryId)?.name}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-slate-100">
                      <th className="pb-3 font-bold text-slate-400 text-xs uppercase">No Undi</th>
                      <th className="pb-3 font-bold text-slate-400 text-xs uppercase">Peserta</th>
                      <th className="pb-3 font-bold text-slate-400 text-xs uppercase">Sekolah</th>
                      <th className="pb-3 font-bold text-slate-400 text-xs uppercase text-center">J1</th>
                      <th className="pb-3 font-bold text-slate-400 text-xs uppercase text-center">J2</th>
                      <th className="pb-3 font-bold text-slate-400 text-xs uppercase text-center">J3</th>
                      <th className="pb-3 font-bold text-slate-400 text-xs uppercase text-center">Total</th>
                      <th className="pb-3 font-bold text-slate-400 text-xs uppercase text-center">Peringkat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {sortedByLottery.map(({ p, score, school }) => (
                      <tr key={p.id}>
                        <td className="py-3 font-mono font-bold text-emerald-600">
                          {school?.lotteryNumber || '-'}
                        </td>
                        <td className="py-3">
                          <span className="font-medium text-slate-900">{p.name}</span>
                        </td>
                        <td className="py-3 text-slate-500">
                          {school?.name}
                        </td>
                        <td className="py-3 text-center text-slate-400 font-medium">{score?.score1 || '-'}</td>
                        <td className="py-3 text-center text-slate-400 font-medium">{score?.score2 || '-'}</td>
                        <td className="py-3 text-center text-slate-400 font-medium">{score?.score3 || '-'}</td>
                        <td className="py-3 text-center font-bold text-emerald-600">
                          {score?.score || '-'}
                        </td>
                        <td className="py-3 text-center">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                            ranks.get(p.id) === 1 ? 'bg-amber-100 text-amber-600' :
                            ranks.get(p.id) === 2 ? 'bg-slate-200 text-slate-600' :
                            ranks.get(p.id) === 3 ? 'bg-orange-100 text-orange-600' :
                            'bg-slate-100 text-slate-400'
                          }`}>
                            {ranks.get(p.id)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const SpreadsheetSettings = () => (
  <Card className="bg-blue-50 border-blue-100">
    <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
        <FileText size={24} />
      </div>
      <h2 className="text-xl font-bold text-blue-900">Integrasi Google Sheets</h2>
    </div>
    <div className="space-y-4 text-sm text-blue-800">
      <p>Aplikasi ini saat ini menggunakan penyimpanan lokal (prototype). Untuk menghubungkan ke Google Sheets:</p>
      <ol className="list-decimal list-inside space-y-2 ml-2">
        <li>Buka Google Sheet baru.</li>
        <li>Buka <b>Extensions &gt; Apps Script</b>.</li>
        <li>Salin isi file <code>code.gs</code> dari proyek ini ke editor Apps Script.</li>
        <li>Klik <b>Deploy &gt; New Deployment</b> sebagai <b>Web App</b>.</li>
        <li>Pilih <b>Execute as: Me</b> dan <b>Who has access: Anyone</b>.</li>
        <li>Salin URL Web App yang dihasilkan dan masukkan ke dalam konfigurasi aplikasi.</li>
      </ol>
      <div className="p-4 bg-white rounded-xl border border-blue-200 mt-4">
        <p className="font-bold mb-2">Status Koneksi:</p>
        <div className="flex items-center space-x-2 text-emerald-600">
          <CheckCircle2 size={16} />
          <span className="font-medium">Local Prototype Mode (Aktif)</span>
        </div>
      </div>
    </div>
  </Card>
);

const SettingsPage = ({ 
  data, 
  onAddCategory, 
  onDeleteCategory, 
  onAddBranch, 
  onDeleteBranch,
  onAddSchool,
  onDeleteSchool,
  onAddPanitera,
  onDeletePanitera,
  onUpdateLogo,
  onUpdateSubtitle
}: { 
  data: AppData, 
  onAddCategory: (n: string) => void, 
  onDeleteCategory: (id: string) => void,
  onAddBranch: (n: string, catId: string) => void, 
  onDeleteBranch: (id: string) => void,
  onAddSchool: (n: string, l: string) => void,
  onDeleteSchool: (id: string) => void,
  onAddPanitera: (p: any) => void,
  onDeletePanitera: (id: string) => void,
  onUpdateLogo: (l: string) => void,
  onUpdateSubtitle: (s: string) => void
}) => {
  const [newCat, setNewCat] = useState('');
  const [newBranch, setNewBranch] = useState('');
  const [selectedCatId, setSelectedCatId] = useState(data.categories[0]?.id || '');
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newSchoolLottery, setNewSchoolLottery] = useState('');
  const [subtitle, setSubtitle] = useState(data.subtitle || '');

  // Panitera State
  const [paniteraName, setPaniteraName] = useState('');
  const [paniteraBranchId, setPaniteraBranchId] = useState('');
  const [paniteraCategoryId, setPaniteraCategoryId] = useState('');
  const [paniteraPassword, setPaniteraPassword] = useState('');
  const [showPaniteraPassword, setShowPaniteraPassword] = useState(false);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <SpreadsheetSettings />

          {/* Logo & Teks Aplikasi */}
          <Card className="p-3">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                <Camera size={18} />
              </div>
              <h2 className="text-base font-bold text-slate-900">Identitas Lomba</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden shrink-0">
                  {data.logo ? (
                    <img src={data.logo} alt="Logo Lomba" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  ) : (
                    <Camera size={20} className="text-slate-400" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Logo Lomba</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="block w-full text-[10px] text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Teks Subtitle Aplikasi</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Contoh: Tingkat Sekolah Dasar Tahun 2026"
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => onUpdateSubtitle(subtitle)}
                    className="bg-emerald-500 text-white px-3 py-1.5 text-xs rounded-lg font-bold hover:bg-emerald-600 transition-all"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Kategori Lomba */}
          <Card className="p-3">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                <Star size={18} />
              </div>
              <h2 className="text-base font-bold text-slate-900">Kategori Lomba</h2>
            </div>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                placeholder="Nama kategori..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={() => { if(newCat) { onAddCategory(newCat); setNewCat(''); } }}
                className="bg-emerald-500 text-white px-3 py-1.5 text-xs rounded-lg font-bold hover:bg-emerald-600 transition-all"
              >
                Tambah
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {data.categories.map(cat => (
                <div key={cat.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-xs font-bold text-slate-700">{cat.name}</span>
                  <button onClick={() => onDeleteCategory(cat.id)} className="text-red-400 hover:text-red-600"><Trash2 size={12}/></button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Cabang Lomba */}
          <Card className="p-3">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                <Trophy size={18} />
              </div>
              <h2 className="text-base font-bold text-slate-900">Cabang Lomba</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
              <input
                type="text"
                value={newBranch}
                onChange={(e) => setNewBranch(e.target.value)}
                placeholder="Nama cabang..."
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <select
                value={selectedCatId}
                onChange={(e) => setSelectedCatId(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Kategori</option>
                {data.categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
              <button
                onClick={() => { if(newBranch && selectedCatId) { onAddBranch(newBranch, selectedCatId); setNewBranch(''); } }}
                className="bg-blue-500 text-white px-3 py-1.5 text-xs rounded-lg font-bold hover:bg-blue-600 transition-all"
              >
                Tambah
              </button>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {data.categories.map(cat => (
                <div key={cat.id} className="space-y-1">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{cat.name}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {data.branches.filter(br => br.categoryId === cat.id).map(br => (
                      <div key={br.id} className="flex items-center justify-between p-1.5 bg-white rounded-lg border border-slate-100 shadow-sm">
                        <span className="text-xs font-medium text-slate-700">{br.name}</span>
                        <button onClick={() => onDeleteBranch(br.id)} className="text-red-400 hover:text-red-600"><Trash2 size={12}/></button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pengaturan Sekolah */}
          <Card className="p-3">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg">
                <Users size={18} />
              </div>
              <h2 className="text-base font-bold text-slate-900">Sekolah / Lembaga</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
              <input
                type="text"
                value={newSchoolLottery}
                onChange={(e) => setNewSchoolLottery(e.target.value)}
                placeholder="No Undi"
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text"
                value={newSchoolName}
                onChange={(e) => setNewSchoolName(e.target.value)}
                placeholder="Nama Sekolah"
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={() => { if(newSchoolName && newSchoolLottery) { onAddSchool(newSchoolName, newSchoolLottery); setNewSchoolName(''); setNewSchoolLottery(''); } }}
                className="bg-amber-500 text-white px-3 py-1.5 text-xs rounded-lg font-bold hover:bg-amber-600 transition-all"
              >
                Tambah
              </button>
            </div>
            <div className="max-h-[250px] overflow-y-auto pr-1">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">No Undi</th>
                    <th className="pb-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Sekolah</th>
                    <th className="pb-1.5 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.schools.map(sch => (
                    <tr key={sch.id} className="border-b border-slate-50 last:border-0">
                      <td className="py-1.5 font-mono font-bold text-emerald-600">{sch.lotteryNumber}</td>
                      <td className="py-1.5 font-medium text-slate-700">{sch.name}</td>
                      <td className="py-1.5 text-right">
                        <button onClick={() => onDeleteSchool(sch.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={12}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* Pengaturan Panitera */}
      <Card className="p-3">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
            <ShieldCheck size={18} />
          </div>
          <h2 className="text-base font-bold text-slate-900">Akun Panitera</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-3">
          <input
            type="text"
            value={paniteraName}
            onChange={(e) => setPaniteraName(e.target.value)}
            placeholder="Nama Panitera"
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={paniteraCategoryId}
            onChange={(e) => setPaniteraCategoryId(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Kategori</option>
            {data.categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <select
            value={paniteraBranchId}
            onChange={(e) => setPaniteraBranchId(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Cabang</option>
            {data.branches.filter(b => b.categoryId === paniteraCategoryId).map(br => (
              <option key={br.id} value={br.id}>{br.name}</option>
            ))}
          </select>
          <div className="relative">
            <input
              type={showPaniteraPassword ? "text" : "password"}
              value={paniteraPassword}
              onChange={(e) => setPaniteraPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPaniteraPassword(!showPaniteraPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPaniteraPassword ? <EyeOff size={12} /> : <Eye size={12} />}
            </button>
          </div>
          <button
            onClick={() => { 
              if(paniteraName && paniteraBranchId && paniteraCategoryId && paniteraPassword) { 
                onAddPanitera({ name: paniteraName, branchId: paniteraBranchId, categoryId: paniteraCategoryId, password: paniteraPassword }); 
                setPaniteraName(''); setPaniteraPassword(''); 
              } 
            }}
            className="bg-indigo-500 text-white px-4 py-1.5 text-xs rounded-lg font-bold hover:bg-indigo-600 transition-all"
          >
            Tambah
          </button>
        </div>
        <div className="max-h-[250px] overflow-y-auto pr-1">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Nama Panitera</th>
                <th className="pb-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Kategori</th>
                <th className="pb-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Cabang</th>
                <th className="pb-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Password</th>
                <th className="pb-1.5 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {data.paniteras.map(p => (
                <tr key={p.id} className="border-b border-slate-50 last:border-0">
                  <td className="py-1.5 font-bold text-slate-700">{p.name}</td>
                  <td className="py-1.5 text-slate-600">{data.categories.find(c => c.id === p.categoryId)?.name}</td>
                  <td className="py-1.5 text-slate-600">{data.branches.find(b => b.id === p.branchId)?.name}</td>
                  <td className="py-1.5 font-mono text-slate-400 flex items-center space-x-2">
                    <span>{showPaniteraPassword ? p.password : '••••••••'}</span>
                  </td>
                  <td className="py-1.5 text-right">
                    <button onClick={() => onDeletePanitera(p.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={12}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const ResultsPage = ({ data }: { data: AppData }) => {
  const getRankLabel = (index: number) => {
    switch (index) {
      case 0: return "Juara 1";
      case 1: return "Juara 2";
      case 2: return "Juara 3";
      case 3: return "Harapan 1";
      case 4: return "Harapan 2";
      case 5: return "Harapan 3";
      default: return "";
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return "bg-amber-400 text-white";
      case 1: return "bg-slate-300 text-white";
      case 2: return "bg-amber-700 text-white";
      default: return "bg-emerald-100 text-emerald-700";
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-start">
        <div className="text-center flex-1 space-y-4">
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Pengumuman Hasil Lomba</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            Daftar pemenang lomba MAPSI SD berdasarkan perolehan nilai tertinggi pada masing-masing cabang lomba.
          </p>
        </div>
        <button
          onClick={() => handlePrintPDF('Pengumuman Hasil Lomba', 'results-content')}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors text-sm font-bold no-print"
        >
          <Printer size={18} />
          <span>Cetak PDF</span>
        </button>
      </div>

      <div className="space-y-12" id="results-content">
        {data.categories.map(category => {
          const categoryBranches = data.branches.filter(b => b.categoryId === category.id);
          if (categoryBranches.length === 0) return null;

          return (
            <div key={category.id} className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-px flex-1 bg-slate-200" />
                <h3 className="text-xl font-black text-emerald-600 uppercase tracking-widest px-4">{category.name}</h3>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="grid grid-cols-1 gap-8">
                {categoryBranches.map(branch => {
                  const branchScores = data.scores
                    .filter(s => s.branchId === branch.id)
                    .sort((a, b) => b.score - a.score);

                  return (
                    <Card key={branch.id} className="overflow-hidden p-0 border-none shadow-xl shadow-slate-200/50">
                      <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <Trophy className="text-amber-400" size={24} />
                          <h4 className="text-lg font-bold tracking-tight">{branch.name}</h4>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest opacity-50">{category.name}</span>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Peringkat</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Peserta</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sekolah</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Skor</th>
                            </tr>
                          </thead>
                          <tbody>
                            {branchScores.slice(0, 6).map((score, idx) => {
                              const participant = data.participants.find(p => p.id === score.participantId);
                              if (!participant) return null;
                              const school = data.schools.find(s => s.id === participant.schoolId);
                              
                              return (
                                <tr key={participant.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                  <td className="px-6 py-4">
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getRankColor(idx)}`}>
                                      {getRankLabel(idx)}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <p className="font-bold text-slate-900">{participant.name}</p>
                                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{participant.genderCategory}</p>
                                  </td>
                                  <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-slate-600">{school?.name || '-'}</p>
                                  </td>
                                  <td className="px-6 py-4 text-center">
                                    <span className="text-lg font-black text-emerald-600">{score.score}</span>
                                  </td>
                                </tr>
                              );
                            })}
                            {branchScores.length === 0 && (
                              <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic text-sm">
                                  Belum ada data penilaian untuk cabang ini.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const handlePrintPDF = (title: string, elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const html = `
    <html>
      <head>
        <title>${title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
          body { font-family: 'Inter', sans-serif; padding: 20px; color: #333; }
          h1 { text-align: center; margin-bottom: 20px; text-transform: uppercase; font-size: 24px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px 8px; text-align: left; font-size: 12px; }
          th { background-color: #f8f9fa; font-weight: bold; text-transform: uppercase; }
          .text-center { text-align: center; }
          .font-bold { font-weight: bold; }
          .rank-1 { background-color: #fef3c7; }
          .rank-2 { background-color: #f1f5f9; }
          .rank-3 { background-color: #fff7ed; }
          .footer { margin-top: 40px; text-align: right; font-size: 12px; }
          .signature { margin-top: 60px; display: inline-block; text-align: center; min-width: 200px; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div class="content">
          ${element.innerHTML}
        </div>
        <div class="footer">
          <p>Dicetak pada: ${new Date().toLocaleString('id-ID')}</p>
          <div class="signature">
            <p>Ketua Panitia</p>
            <div style="height: 80px;"></div>
            <p><strong>( ____________________ )</strong></p>
          </div>
        </div>
        <script>
          window.onload = () => {
            window.print();
            setTimeout(() => window.close(), 500);
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
};

const JuryPage = ({ data, onAddJury, onUpdateJury, onDeleteJury }: { 
  data: AppData, 
  onAddJury: (j: any) => void, 
  onUpdateJury: (id: string, j: any) => void,
  onDeleteJury: (id: string) => void 
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingJury, setEditingJury] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    branchId: data.branches[0]?.id || '',
    categoryId: data.categories[0]?.id || '',
    origin: '',
    photo: ''
  });
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (editingJury) {
      setFormData({
        name: editingJury.name,
        branchId: editingJury.branchId,
        categoryId: editingJury.categoryId,
        origin: editingJury.origin,
        photo: editingJury.photo
      });
      setPreview(editingJury.photo);
    } else {
      setFormData({
        name: '',
        branchId: data.branches[0]?.id || '',
        categoryId: data.categories[0]?.id || '',
        origin: '',
        photo: ''
      });
      setPreview(null);
    }
  }, [editingJury, data.branches, data.categories]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        setFormData({ ...formData, photo: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingJury) {
      onUpdateJury(editingJury.id, formData);
    } else {
      onAddJury(formData);
    }
    setShowForm(false);
    setEditingJury(null);
  };

  const handlePrintCard = (jury: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const branch = data.branches.find(b => b.id === jury.branchId);
    const category = data.categories.find(c => c.id === jury.categoryId);

    printWindow.document.write(`
      <html>
        <head>
          <title>ID Card Juri - ${jury.name}</title>
          <style>
            @page { size: 8.5cm 12.5cm; margin: 0; }
            body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f8fafc; }
            .card { width: 8cm; height: 12cm; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; position: relative; border: 1px solid #e2e8f0; }
            .header { background: #10b981; color: white; padding: 20px 10px; text-align: center; }
            .header h1 { margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; }
            .header p { margin: 5px 0 0; font-size: 10px; opacity: 0.9; }
            .photo-container { width: 120px; height: 150px; margin: 20px auto; border: 4px solid #f1f5f9; border-radius: 8px; overflow: hidden; }
            .photo-container img { width: 100%; height: 100%; object-fit: cover; }
            .info { text-align: center; padding: 0 15px; }
            .info h2 { margin: 0; font-size: 16px; color: #0f172a; }
            .info p { margin: 5px 0; font-size: 12px; color: #64748b; font-weight: 500; }
            .role { margin-top: 15px; display: inline-block; padding: 4px 12px; background: #ecfdf5; color: #059669; border-radius: 999px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
            .footer { position: absolute; bottom: 0; left: 0; right: 0; padding: 10px; text-align: center; font-size: 8px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>DEWAN JURI</h1>
              <p>MAPSI SD TINGKAT KABUPATEN 2026</p>
            </div>
            <div class="photo-container">
              <img src="${jury.photo}" />
            </div>
            <div class="info">
              <h2>${jury.name}</h2>
              <p>${branch?.name || '-'} (${category?.name || '-'})</p>
              <p>Asal: ${jury.origin}</p>
              <span class="role">OFFICIAL JURY</span>
            </div>
            <div class="footer">
              Digital MAPSI SD &copy; 2026
            </div>
          </div>
          <script>
            window.onload = () => {
              window.print();
              setTimeout(() => window.close(), 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manajemen Dewan Juri</h2>
          <p className="text-slate-500">Kelola data dewan juri dan cetak kartu identitas.</p>
        </div>
        <button
          onClick={() => { setEditingJury(null); setShowForm(true); }}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200"
        >
          <Plus size={20} />
          <span>Tambah Juri</span>
        </button>
      </div>

      {showForm && (
        <Card className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">{editingJury ? 'Edit Juri' : 'Tambah Juri Baru'}</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
              <Plus size={24} className="rotate-45" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                <div className="w-32 h-40 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera size={32} className="text-slate-400" />
                  )}
                </div>
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <p className="text-xs text-slate-500 mt-2">Upload Foto Juri</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {data.categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cabang Lomba</label>
                <select
                  value={formData.branchId}
                  onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {data.branches.filter(b => b.categoryId === formData.categoryId).map(br => (
                    <option key={br.id} value={br.id}>{br.name}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Asal (Instansi/Daerah)</label>
                <input
                  type="text"
                  required
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors"
              >
                {editingJury ? 'Simpan Perubahan' : 'Simpan Data Juri'}
              </button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Photo</th>
                <th className="px-4 py-3 font-semibold">Nama Juri</th>
                <th className="px-4 py-3 font-semibold">Cabang & Kategori</th>
                <th className="px-4 py-3 font-semibold">Asal</th>
                <th className="px-4 py-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.juries.map((jury) => {
                const branch = data.branches.find(b => b.id === jury.branchId);
                const category = data.categories.find(c => c.id === jury.categoryId);
                return (
                  <tr key={jury.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <img src={jury.photo} alt={jury.name} className="w-10 h-12 rounded object-cover border border-slate-200" />
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900">{jury.name}</td>
                    <td className="px-4 py-3">
                      <div className="text-slate-900 font-medium">{branch?.name || '-'}</div>
                      <div className="text-xs text-slate-500">{category?.name || '-'}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{jury.origin}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handlePrintCard(jury)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Cetak Kartu"
                        >
                          <Printer size={18} />
                        </button>
                        <button
                          onClick={() => { setEditingJury(jury); setShowForm(true); }}
                          className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => { if(confirm('Hapus data juri ini?')) onDeleteJury(jury.id); }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {data.juries.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-400 italic">Belum ada data juri.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// --- Error Boundary ---

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class AppErrorBoundary extends Component<any, any> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("AppErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center space-y-4 border border-red-100">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Terjadi Kesalahan</h2>
            <p className="text-slate-500 font-medium">Aplikasi mengalami kendala teknis. Silakan muat ulang halaman.</p>
            <div className="p-4 bg-slate-50 rounded-2xl text-left overflow-auto max-h-40">
              <code className="text-xs text-red-500">{this.state.error?.message}</code>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 transition-all"
            >
              MUAT ULANG HALAMAN
            </button>
          </div>
        </div>
      );
    }
    return (this as any).props.children;
  }
}

// --- Loading Screen ---

const LoadingScreen = () => (
  <div className="min-h-screen bg-emerald-600 flex flex-col items-center justify-center p-6 overflow-hidden relative">
    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative z-10 text-center space-y-6"
    >
      <div className="inline-flex p-6 bg-white/20 backdrop-blur-md rounded-[2.5rem] shadow-2xl relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-white/30 rounded-[2.5rem]"
        />
        <Trophy size={64} className="text-white relative z-10" />
      </div>
      <div className="space-y-2">
        <h2 className="text-4xl font-black text-white tracking-tighter">Digital MAPSI SD</h2>
        <div className="flex items-center justify-center space-x-2">
          <motion.div 
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-2 bg-emerald-200 rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            className="w-2 h-2 bg-emerald-200 rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            className="w-2 h-2 bg-emerald-200 rounded-full" 
          />
        </div>
      </div>
    </motion.div>
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <AppErrorBoundary>
      <AppContent />
    </AppErrorBoundary>
  );
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'school' | 'panitera' | null>(null);
  const [currentSchool, setCurrentSchool] = useState<School | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    peserta: true,
    penilaian: true,
    dewanjuri: true
  });
  const [data, setData] = useState<AppData>({ 
    participants: [], 
    branches: [], 
    categories: [], 
    schools: [], 
    scores: [],
    paniteras: [],
    juries: [],
    logo: "",
    subtitle: ""
  });
  const [loading, setLoading] = useState(true);
  const [loginType, setLoginType] = useState<'admin' | 'school' | 'panitera'>('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/data');
      const json = await res.json();
      setData({
        participants: json.participants || [],
        branches: json.branches || [],
        categories: json.categories || [],
        schools: json.schools || [],
        scores: json.scores || [],
        paniteras: json.paniteras || [],
        juries: json.juries || [],
        logo: json.logo || "",
        subtitle: json.subtitle || ""
      });
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleRegister = async (participant: any) => {
    try {
      const method = editingParticipant ? 'PUT' : 'POST';
      const url = editingParticipant ? `/api/participants/${editingParticipant.id}` : '/api/participants';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(participant)
      });
      if (res.ok) {
        fetchData();
        setEditingParticipant(null);
        // User requested to stay on registration page for consecutive registrations
        if (editingParticipant) {
          setActiveTab('participants');
        }
      }
    } catch (err) {
      console.error("Error registering:", err);
    }
  };

  const handleDeleteParticipant = async (id: string) => {
    try {
      const res = await fetch(`/api/participants/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error deleting participant:", err);
    }
  };

  const handleSaveScore = async (scoreData: any) => {
    try {
      const res = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scoreData)
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error("Error saving score:", err);
    }
  };

  const handleAddCategory = async (name: string) => {
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  const handleAddBranch = async (name: string, categoryId: string) => {
    try {
      const res = await fetch('/api/branches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, categoryId })
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error adding branch:", err);
    }
  };

  const handleDeleteBranch = async (id: string) => {
    try {
      const res = await fetch(`/api/branches/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error deleting branch:", err);
    }
  };

  const handleAddPanitera = async (panitera: any) => {
    try {
      const res = await fetch('/api/paniteras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(panitera)
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error adding panitera:", err);
    }
  };

  const handleDeletePanitera = async (id: string) => {
    try {
      const res = await fetch(`/api/paniteras/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error deleting panitera:", err);
    }
  };

  const handleAddJury = async (jury: any) => {
    try {
      const res = await fetch('/api/juries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jury)
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error adding jury:", err);
    }
  };

  const handleUpdateJury = async (id: string, jury: any) => {
    try {
      const res = await fetch(`/api/juries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jury)
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error updating jury:", err);
    }
  };

  const handleDeleteJury = async (id: string) => {
    try {
      const res = await fetch(`/api/juries/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error deleting jury:", err);
    }
  };

  const handleAddSchool = async (name: string, lotteryNumber: string) => {
    try {
      const res = await fetch('/api/schools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, lotteryNumber })
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error adding school:", err);
    }
  };

  const handleDeleteSchool = async (id: string) => {
    try {
      const res = await fetch(`/api/schools/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error deleting school:", err);
    }
  };

  const handleUpdateLogo = async (logo: string) => {
    try {
      const res = await fetch('/api/logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logo })
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error updating logo:", err);
    }
  };

  const handleUpdateSubtitle = async (subtitle: string) => {
    try {
      const res = await fetch('/api/subtitle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subtitle })
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error updating subtitle:", err);
    }
  };

  const handleLogin = () => {
    if (loginType === 'admin') {
      if (username === 'admin' && password === 'admin123') {
        setIsLoggedIn(true);
        setUserRole('admin');
      } else {
        alert('Username atau Password salah!');
      }
    } else if (loginType === 'panitera') {
      const panitera = data.paniteras.find(p => 
        p.branchId === selectedBranchId && 
        p.categoryId === selectedCategoryId && 
        p.password === password
      );
      if (panitera) {
        setIsLoggedIn(true);
        setUserRole('panitera');
      } else {
        alert('Data Panitera tidak ditemukan atau Password salah!');
      }
    } else {
      const school = data.schools.find(s => s.name.toLowerCase() === schoolName.toLowerCase());
      if (school) {
        setIsLoggedIn(true);
        setUserRole('school');
        setCurrentSchool(school);
      } else {
        alert('Nama Sekolah tidak terdaftar!');
      }
    }
  };

  if (loading) return <LoadingScreen />;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex font-sans overflow-hidden">
        {/* Left Side: Welcome Message */}
        <div className="hidden lg:flex lg:w-2/3 bg-emerald-600 relative items-center justify-center p-12 overflow-hidden">
          {/* Islamic Geometric Pattern Overlay (Subtle) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-700 rounded-full blur-3xl opacity-50" />
          
          <div className="relative z-10 text-white space-y-12 max-w-2xl">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-6">
                <div className="inline-flex">
                  {data.logo ? (
                    <img src={data.logo} alt="Logo" className="w-36 h-36 object-contain" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="p-6 bg-white/20 backdrop-blur-md rounded-[2.5rem]">
                      <Trophy size={64} className="text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-7xl font-black tracking-tighter leading-none">
                    Digital <br />
                    <span className="text-emerald-200">MAPSI SD</span>
                  </h1>
                  {data.subtitle && (
                    <p className="text-emerald-100 font-bold uppercase tracking-[0.3em] mt-4 text-sm">{data.subtitle}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-4 max-w-xl">
                <p className="text-2xl text-emerald-50 font-medium leading-relaxed">
                  Sistem Manajemen Perlombaan Mata Pelajaran Pendidikan Agama Islam dan Seni Islami tingkat Sekolah Dasar.
                </p>
                <p className="text-emerald-100/60 font-medium">
                  Mewujudkan generasi cerdas, berakhlak mulia, dan berprestasi melalui kompetisi yang transparan dan akuntabel.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-3 gap-6"
            >
              <div className="p-8 bg-white/10 backdrop-blur-sm rounded-[2rem] border border-white/10 group hover:bg-white/20 transition-all">
                <div className="w-12 h-12 bg-emerald-500/30 rounded-2xl flex items-center justify-center mb-4">
                  <Star className="text-white" size={24} />
                </div>
                <h4 className="text-2xl font-bold">Real-time</h4>
                <p className="text-emerald-100/70 text-sm font-medium mt-1">Penilaian & Pengumuman</p>
              </div>
              <div className="p-8 bg-white/10 backdrop-blur-sm rounded-[2rem] border border-white/10 group hover:bg-white/20 transition-all">
                <div className="w-12 h-12 bg-emerald-500/30 rounded-2xl flex items-center justify-center mb-4">
                  <QRCodeSVG value="MAPSI" size={24} className="text-white" />
                </div>
                <h4 className="text-2xl font-bold">Digital</h4>
                <p className="text-emerald-100/70 text-sm font-medium mt-1">Kartu Peserta & QR Code</p>
              </div>
              <div className="p-8 bg-white/10 backdrop-blur-sm rounded-[2rem] border border-white/10 group hover:bg-white/20 transition-all">
                <div className="w-12 h-12 bg-emerald-500/30 rounded-2xl flex items-center justify-center mb-4">
                  <Users className="text-white" size={24} />
                </div>
                <h4 className="text-2xl font-bold">Terintegrasi</h4>
                <p className="text-emerald-100/70 text-sm font-medium mt-1">Sekolah & Panitia</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Login Box */}
        <div className="w-full lg:w-1/3 flex items-center justify-center p-6 md:p-12 bg-white relative">
          <div className="lg:hidden absolute top-8 left-8 flex items-center space-x-2">
            <div className="p-2 bg-emerald-500 text-white rounded-lg">
              <Trophy size={20} />
            </div>
            <span className="font-black text-slate-900 tracking-tighter">Digital MAPSI</span>
          </div>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md space-y-10"
          >
            <div className="space-y-3">
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">Masuk <br />Aplikasi</h2>
              <p className="text-slate-500 font-medium text-lg">Silakan pilih tipe akses Anda untuk melanjutkan.</p>
            </div>

            <div className="flex p-1.5 bg-slate-100 rounded-[1.5rem] mb-8">
              <button 
                onClick={() => setLoginType('admin')}
                className={`flex-1 py-3.5 rounded-[1.25rem] font-black text-xs uppercase tracking-widest transition-all ${loginType === 'admin' ? 'bg-white text-emerald-600 shadow-xl shadow-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Admin
              </button>
              <button 
                onClick={() => setLoginType('panitera')}
                className={`flex-1 py-3.5 rounded-[1.25rem] font-black text-xs uppercase tracking-widest transition-all ${loginType === 'panitera' ? 'bg-white text-emerald-600 shadow-xl shadow-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Panitera
              </button>
              <button 
                onClick={() => setLoginType('school')}
                className={`flex-1 py-3.5 rounded-[1.25rem] font-black text-xs uppercase tracking-widest transition-all ${loginType === 'school' ? 'bg-white text-emerald-600 shadow-xl shadow-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Sekolah
              </button>
            </div>

            <div className="space-y-8">
              {loginType === 'admin' ? (
                <>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={`Masukkan username ${loginType}`}
                        className="w-full px-6 py-5 rounded-[1.5rem] border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all bg-slate-50 font-bold text-slate-900"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-6 py-5 rounded-[1.5rem] border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all bg-slate-50 font-bold text-slate-900"
                    />
                  </div>
                </>
              ) : loginType === 'panitera' ? (
                <>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Kategori Lomba</label>
                    <select 
                      value={selectedCategoryId}
                      onChange={(e) => setSelectedCategoryId(e.target.value)}
                      className="w-full px-6 py-5 rounded-[1.5rem] border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all bg-slate-50 font-bold text-slate-900 appearance-none"
                    >
                      <option value="">Pilih Kategori</option>
                      {data.categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Cabang Lomba</label>
                    <select 
                      value={selectedBranchId}
                      onChange={(e) => setSelectedBranchId(e.target.value)}
                      className="w-full px-6 py-5 rounded-[1.5rem] border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all bg-slate-50 font-bold text-slate-900 appearance-none"
                    >
                      <option value="">Pilih Cabang</option>
                      {data.branches.filter(b => b.categoryId === selectedCategoryId).map(br => (
                        <option key={br.id} value={br.id}>{br.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-6 py-5 rounded-[1.5rem] border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all bg-slate-50 font-bold text-slate-900"
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nama Sekolah</label>
                  <input 
                    type="text" 
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Masukkan nama sekolah terdaftar"
                    className="w-full px-6 py-5 rounded-[1.5rem] border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all bg-slate-50 font-bold text-slate-900"
                  />
                  <p className="text-[10px] text-slate-400 mt-3 px-2 font-medium italic">
                    *Gunakan nama sekolah yang telah didaftarkan oleh panitia.
                  </p>
                </div>
              )}

              <button 
                onClick={handleLogin}
                className="w-full bg-slate-900 text-white font-black py-6 rounded-[1.5rem] hover:bg-emerald-600 transition-all active:scale-[0.98] shadow-2xl shadow-slate-200 flex items-center justify-center space-x-3 group"
              >
                <span className="tracking-widest text-sm">MASUK SEKARANG</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {loginType !== 'school' && (
              <div className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                <p className="text-[10px] text-slate-400 text-center font-black uppercase tracking-widest">
                  Demo {loginType}: <span className="text-emerald-600">{loginType}</span> / <span className="text-emerald-600">{loginType}123</span>
                </p>
              </div>
            )}
          </motion.div>
          
          <div className="absolute bottom-8 text-slate-300 text-[10px] font-black uppercase tracking-widest">
            &copy; 2026 Digital MAPSI SD. All Rights Reserved.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-100">
            <Trophy size={20} />
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tighter">Digital MAPSI SD</h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
        >
          {isSidebarOpen ? <Plus className="rotate-45" size={24} /> : <ListOrdered size={24} />}
        </button>
      </header>

      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-100 p-6 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="hidden lg:flex items-center space-x-3 mb-10 px-2">
          <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-100">
            <Trophy size={20} />
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tighter">Digital MAPSI SD</h1>
        </div>
        {data.subtitle && (
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 px-2">{data.subtitle}</p>
        )}

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 mt-6">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Beranda" 
            active={activeTab === 'dashboard'} 
            onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }} 
          />

          {userRole === 'admin' && (
            <SidebarItem 
              icon={Users} 
              label="Dewan Juri" 
              active={activeTab === 'juries'} 
              onClick={() => { setActiveTab('juries'); setIsSidebarOpen(false); }} 
            />
          )}
          
          {userRole !== 'panitera' && (
            <div className="space-y-1">
              <SidebarItem 
                icon={Users} 
                label="Peserta" 
                hasSubmenu 
                isOpen={openMenus.peserta}
                onClick={() => toggleMenu('peserta')} 
              />
              <AnimatePresence>
                {openMenus.peserta && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <SidebarSubItem 
                      label="Form Pendaftaran" 
                      active={activeTab === 'registration'} 
                      onClick={() => { setEditingParticipant(null); setActiveTab('registration'); setIsSidebarOpen(false); }} 
                    />
                    <SidebarSubItem 
                      label="Daftar Peserta" 
                      active={activeTab === 'participants'} 
                      onClick={() => { setActiveTab('participants'); setIsSidebarOpen(false); }} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="space-y-1">
            <SidebarItem 
              icon={Star} 
              label="Penilaian" 
              hasSubmenu 
              isOpen={openMenus.penilaian}
              onClick={() => toggleMenu('penilaian')} 
            />
            <AnimatePresence>
              {openMenus.penilaian && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <SidebarSubItem 
                    label="Input Nilai" 
                    active={activeTab === 'scoring'} 
                    onClick={() => { setActiveTab('scoring'); setIsSidebarOpen(false); }} 
                  />
                  {userRole !== 'panitera' && (
                    <SidebarSubItem 
                      label="Rekap Nilai" 
                      active={activeTab === 'score-recap'} 
                      onClick={() => { setActiveTab('score-recap'); setIsSidebarOpen(false); }} 
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <SidebarItem 
            icon={Trophy} 
            label="Pengumuman" 
            active={activeTab === 'results'} 
            onClick={() => { setActiveTab('results'); setIsSidebarOpen(false); }} 
          />
          
          {userRole === 'admin' && (
            <SidebarItem 
              icon={Settings} 
              label="Pengaturan" 
              active={activeTab === 'settings'} 
              onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }} 
            />
          )}
        </nav>

        <div className="pt-6 border-t border-slate-100">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
          >
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full relative">
        <header className="sticky top-0 z-50 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50 px-4 md:px-8 lg:px-12 py-6 flex items-center justify-between mb-10">
          <div className="hidden lg:block">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter capitalize">
              {activeTab === 'dashboard' ? 'Dashboard Overview' : activeTab.replace('-', ' ')}
            </h2>
            <p className="text-slate-500 font-medium">
              {data.subtitle || 'Selamat datang kembali, Panitia MAPSI!'}
            </p>
          </div>
          <div className="lg:hidden">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter capitalize">
              {activeTab === 'dashboard' ? 'Dashboard' : activeTab.replace('-', ' ')}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              {userRole === 'admin' ? 'AD' : userRole === 'panitera' ? 'PN' : 'SK'}
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 lg:p-12 pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && <Dashboard data={data} />}
              {activeTab === 'juries' && (
                <JuryPage 
                  data={data} 
                  onAddJury={handleAddJury}
                  onUpdateJury={handleUpdateJury}
                  onDeleteJury={handleDeleteJury}
                />
              )}
              {activeTab === 'registration' && (
                <RegistrationForm 
                  data={data} 
                  onRegister={handleRegister} 
                  initialData={editingParticipant || undefined} 
                />
              )}
              {activeTab === 'participants' && (
                <ParticipantList 
                  data={data} 
                  onEdit={(p) => { setEditingParticipant(p); setActiveTab('registration'); }}
                  onDelete={handleDeleteParticipant}
                />
              )}
              {activeTab === 'scoring' && <ScoringPanel data={data} onSaveScore={handleSaveScore} />}
              {activeTab === 'score-recap' && <ScoreRecap data={data} />}
              {activeTab === 'results' && <ResultsPage data={data} />}
              {activeTab === 'settings' && (
                <SettingsPage 
                  data={data} 
                  onAddCategory={handleAddCategory}
                  onDeleteCategory={handleDeleteCategory}
                  onAddBranch={handleAddBranch} 
                  onDeleteBranch={handleDeleteBranch}
                  onAddSchool={handleAddSchool}
                  onDeleteSchool={handleDeleteSchool}
                  onAddPanitera={handleAddPanitera}
                  onDeletePanitera={handleDeletePanitera}
                  onUpdateLogo={handleUpdateLogo}
                  onUpdateSubtitle={handleUpdateSubtitle}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
