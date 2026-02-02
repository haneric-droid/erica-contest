
import React from 'react';
import { Contest } from '../types';
import { ERICA_BLUE } from '../constants';

interface DetailsPanelProps {
  contest: Contest | null;
  onClose: () => void;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ contest, onClose }) => {
  if (!contest) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">공모전 상세 정보</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="aspect-[3/4] w-full rounded-2xl bg-slate-100 mb-8 overflow-hidden border border-slate-100 shadow-sm relative group">
            <img src={contest.posterUrl} alt={contest.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4">
              <span className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                {contest.category}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
                {contest.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-md font-medium border border-blue-100">
                  {contest.reward}
                </span>
                {contest.is_team_recruiting && (
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-md font-medium border border-green-100">
                    팀원 모집 중
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">신청 기간</p>
                <p className="text-sm font-semibold text-slate-700">{contest.dates.start} ~ {contest.dates.end}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">제출 마감</p>
                <p className="text-sm font-semibold text-slate-700">{contest.dates.submission_deadline}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <DetailRow label="주최측" value={contest.host} />
              <DetailRow label="참여 대상" value={contest.target} />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-2">공모 내용</h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {contest.description}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
          <a 
            href={contest.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 bg-[#003c71] text-white py-3 rounded-xl font-bold text-sm text-center hover:opacity-90 transition-opacity shadow-lg shadow-blue-900/10"
          >
            원문 공고 보기
          </a>
          <button className="px-4 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
            <ShareIcon />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex items-start">
    <span className="w-24 text-xs font-bold text-slate-400 shrink-0 mt-0.5">{label}</span>
    <span className="text-sm text-slate-700 font-medium">{value}</span>
  </div>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
);

export default DetailsPanel;
