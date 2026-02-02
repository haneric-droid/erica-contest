
import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { ERICA_BLUE } from '../constants';

interface TopBarProps {
  search: string;
  setSearch: (val: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ search, setSearch }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: ERICA_BLUE }}>
          <span className="text-white font-bold text-xl">E</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-800">
          ERICA <span className="font-light">공모전 통합 달력</span>
        </h1>
      </div>

      <div className="flex-1 max-w-2xl px-8">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="공모전 제목, 키워드 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 border rounded-full py-2 pl-10 pr-4 text-sm transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
        <button className="flex items-center gap-2 pl-2 group">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300">
            <User className="w-5 h-5 text-slate-500" />
          </div>
          <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">내 정보</span>
        </button>
      </div>
    </header>
  );
};

// Simplified SVG Icons to avoid dependencies if Lucide isn't standard
const LucideIcons = {
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Bell: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  User: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
};

export default TopBar;
