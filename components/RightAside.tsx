
import React from 'react';
import { Contest } from '../types';

interface RightAsideProps {
  urgentContests: Contest[];
  onSelectContest: (contest: Contest) => void;
}

const RightAside: React.FC<RightAsideProps> = ({ urgentContests, onSelectContest }) => {
  return (
    <aside className="w-80 bg-white border-l border-slate-200 flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            🔥 오늘의 마감 <span className="text-xs font-normal text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">5/15 기준</span>
          </h3>
        </div>
        
        <div className="space-y-4">
          {urgentContests.length > 0 ? (
            urgentContests.map(contest => {
              const dDay = Math.ceil((new Date(contest.dates.end).getTime() - new Date(2024, 4, 15).getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div 
                  key={contest.id}
                  onClick={() => onSelectContest(contest)}
                  className="group cursor-pointer hover:bg-slate-50 p-2 -m-2 rounded-xl transition-all"
                >
                  <div className="flex justify-between items-start gap-3 mb-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${dDay === 0 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                      D-{dDay === 0 ? 'Day' : dDay}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{contest.category}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {contest.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1">{contest.host}</p>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-slate-400 text-center py-8">오늘은 마감 일정이 없네요!</p>
          )}
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto hide-scrollbar">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">최근 본 공모전</h3>
        <div className="space-y-4 opacity-50 grayscale pointer-events-none">
          <div className="h-12 bg-slate-100 rounded-lg"></div>
          <div className="h-12 bg-slate-100 rounded-lg w-4/5"></div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Links</h3>
          <ul className="text-xs space-y-3">
            <li><a href="#" className="text-slate-600 hover:text-blue-600 flex items-center gap-2">HY-in 바로가기 <ExternalLinkIcon /></a></li>
            <li><a href="#" className="text-slate-600 hover:text-blue-600 flex items-center gap-2">ERICA 홈페이지 <ExternalLinkIcon /></a></li>
            <li><a href="#" className="text-slate-600 hover:text-blue-600 flex items-center gap-2">학부 전용 장학 공지 <ExternalLinkIcon /></a></li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);

export default RightAside;
