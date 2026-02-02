
import React, { useState } from 'react';
import { getDaysInMonth, getFirstDayOfMonth, getMonthName, isSameDay } from '../utils/dateUtils';
import { Contest, EventType } from '../types';

interface CalendarProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  contests: Contest[];
  onSelectContest: (contest: Contest) => void;
}

interface EventMarker {
  type: EventType;
  contest: Contest;
}

const Calendar: React.FC<CalendarProps> = ({ currentDate, setCurrentDate, contests, onSelectContest }) => {
  const [hoveredDayEvents, setHoveredDayEvents] = useState<{ day: number, events: EventMarker[] } | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days = [];
  // Padding for start of month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`pad-${i}`} className="h-28 border-b border-r border-slate-100 bg-slate-50/30"></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    const dayEvents: EventMarker[] = [];

    contests.forEach(c => {
      if (isSameDay(c.dates.start, dateObj)) dayEvents.push({ type: 'start', contest: c });
      if (isSameDay(c.dates.end, dateObj)) dayEvents.push({ type: 'end', contest: c });
      if (isSameDay(c.dates.submission_deadline, dateObj)) dayEvents.push({ type: 'submission', contest: c });
    });

    days.push(
      <div 
        key={d} 
        className="h-28 border-b border-r border-slate-200 bg-white relative hover:bg-slate-50 transition-colors group cursor-default p-2"
        onMouseEnter={() => dayEvents.length > 0 && setHoveredDayEvents({ day: d, events: dayEvents })}
        onMouseLeave={() => setHoveredDayEvents(null)}
      >
        <span className={`text-sm font-semibold ${[0, 6].includes((firstDay + d - 1) % 7) ? 'text-slate-400' : 'text-slate-700'}`}>
          {d}
        </span>
        
        <div className="mt-1 flex flex-wrap gap-1">
          {dayEvents.map((evt, idx) => (
            <button
              key={`${evt.contest.id}-${evt.type}-${idx}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelectContest(evt.contest);
              }}
              className={`
                w-2 h-2 rounded-full 
                ${evt.type === 'start' ? 'bg-green-500' : evt.type === 'end' ? 'bg-red-500' : 'bg-purple-500'}
                hover:scale-150 transition-transform duration-200
              `}
              title={`${evt.contest.title} (${evt.type})`}
            />
          ))}
        </div>

        {/* Short Badge View (visible if few events) */}
        <div className="mt-2 space-y-1 overflow-hidden">
          {dayEvents.slice(0, 2).map((evt, idx) => (
            <div 
              key={idx}
              className={`text-[10px] px-1.5 py-0.5 rounded border leading-tight truncate max-w-full
                ${evt.type === 'start' ? 'bg-green-50 text-green-700 border-green-200' : 
                  evt.type === 'end' ? 'bg-red-50 text-red-700 border-red-200' : 
                  'bg-purple-50 text-purple-700 border-purple-200'}
              `}
            >
              {evt.type === 'start' ? '신청:' : evt.type === 'end' ? '마감:' : '제출:'} {evt.contest.title}
            </div>
          ))}
          {dayEvents.length > 2 && (
            <div className="text-[10px] text-slate-400 font-medium pl-1">+{dayEvents.length - 2} more</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Calendar Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-800">
            {getMonthName(month)} <span className="text-slate-400 font-light">{year}</span>
          </h2>
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button onClick={prevMonth} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-600">
              <ChevronLeftIcon />
            </button>
            <button onClick={nextMonth} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-600">
              <ChevronRightIcon />
            </button>
          </div>
          <button 
            onClick={() => setCurrentDate(new Date(2024, 4, 1))}
            className="text-xs font-semibold px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Today
          </button>
        </div>

        <div className="flex gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> 신청시작</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> 신청마감</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500"></span> 제출마감</div>
        </div>
      </div>

      {/* Weekdays Row */}
      <div className="calendar-grid bg-slate-50 border-b border-slate-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-2 text-center text-xs font-bold text-slate-400 uppercase tracking-widest border-r border-slate-200 last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid flex-1 overflow-y-auto">
        {days}
      </div>

      {/* Hover Tooltip */}
      {hoveredDayEvents && (
        <div className="fixed z-50 bg-white shadow-2xl rounded-xl border border-slate-200 p-4 w-64 pointer-events-none"
             style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 border-b pb-1">5월 {hoveredDayEvents.day}일 일정</h4>
          <div className="space-y-3">
            {hoveredDayEvents.events.map((evt, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${evt.type === 'start' ? 'bg-green-500' : evt.type === 'end' ? 'bg-red-500' : 'bg-purple-500'}`} />
                  <p className="text-sm font-bold text-slate-800 line-clamp-1">{evt.contest.title}</p>
                </div>
                <div className="pl-4 text-[10px] text-slate-500 space-y-0.5">
                  <p>• 주최: {evt.contest.host}</p>
                  <p>• 상금: {evt.contest.reward}</p>
                  <p>• 대상: {evt.contest.target}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

export default Calendar;
