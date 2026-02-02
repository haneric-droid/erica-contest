
import React, { useState, useMemo } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';
import RightAside from './components/RightAside';
import DetailsPanel from './components/DetailsPanel';
import { MOCK_CONTESTS } from './constants';
import { Contest, FilterState } from './types';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 1)); // Default to May 2024 for demo
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    rewardScale: '전체',
    teamOnly: false,
  });

  const filteredContests = useMemo(() => {
    return MOCK_CONTESTS.filter(contest => {
      const matchesSearch = contest.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(contest.category);
      const matchesTeam = !filters.teamOnly || contest.is_team_recruiting;
      
      let matchesReward = true;
      if (filters.rewardScale !== '전체') {
        const rewardValue = parseInt(contest.reward.replace(/[^0-9]/g, ''));
        const filterValue = parseInt(filters.rewardScale.replace(/[^0-9]/g, ''));
        matchesReward = rewardValue >= filterValue;
      }

      return matchesSearch && matchesCategory && matchesTeam && matchesReward;
    });
  }, [filters]);

  const urgentContests = useMemo(() => {
    const today = new Date(2024, 4, 15); // Mock "today" as May 15, 2024
    return MOCK_CONTESTS
      .filter(c => new Date(c.dates.end) >= today)
      .sort((a, b) => new Date(a.dates.end).getTime() - new Date(b.dates.end).getTime())
      .slice(0, 5);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 text-slate-900">
      <TopBar 
        search={filters.search} 
        setSearch={(val) => setFilters(prev => ({ ...prev, search: val }))} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar filters={filters} setFilters={setFilters} />
        
        <main className="flex-1 flex flex-col relative overflow-hidden">
          <Calendar 
            currentDate={currentDate} 
            setCurrentDate={setCurrentDate} 
            contests={filteredContests}
            onSelectContest={setSelectedContest}
          />
        </main>

        <RightAside 
          urgentContests={urgentContests} 
          onSelectContest={setSelectedContest} 
        />
      </div>

      <DetailsPanel 
        contest={selectedContest} 
        onClose={() => setSelectedContest(null)} 
      />
    </div>
  );
};

export default App;
