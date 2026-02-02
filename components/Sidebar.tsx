
import React from 'react';
import { CATEGORIES, REWARD_OPTIONS } from '../constants';
import { FilterState } from '../types';

interface SidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, setFilters }) => {
  const toggleCategory = (cat: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-8 overflow-y-auto">
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">관심 분야</h3>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              <span className={`text-sm ${filters.categories.includes(cat) ? 'text-slate-900 font-medium' : 'text-slate-500 group-hover:text-slate-700'}`}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">상금 규모</h3>
        <select
          value={filters.rewardScale}
          onChange={(e) => setFilters(prev => ({ ...prev, rewardScale: e.target.value }))}
          className="w-full bg-slate-50 border border-slate-200 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          {REWARD_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">추가 옵션</h3>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            checked={filters.teamOnly}
            onChange={(e) => setFilters(prev => ({ ...prev, teamOnly: e.target.checked }))}
          />
          <span className={`text-sm ${filters.teamOnly ? 'text-slate-900 font-medium' : 'text-slate-500 group-hover:text-slate-700'}`}>
            팀원 모집 중인 공모전만
          </span>
        </label>
      </div>

      <div className="mt-auto">
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
          <p className="text-xs font-medium text-blue-600 mb-1">한눈에 보는 공모전 팁</p>
          <p className="text-xs text-blue-500 leading-relaxed">
            마감 일주일 전은 서버 부하가 높을 수 있으니 여유있게 제출하세요!
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
