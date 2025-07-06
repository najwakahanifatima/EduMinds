'use client'
import React, { useState, useEffect } from 'react';
import NavbarSupervisor from "@/app/_components/NavbarSupervisor";
import Button from '../_components/Button';

interface MentoringEvent {
  id: number;
  title: string;
  mentor: string;
  date: string;
  time: string;
  color: string;
}

type ViewMode = 'Hari' | 'Minggu' | 'Bulan';

const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date(2025, 5, 1)); // Juni 2025
  const [viewMode, setViewMode] = useState<ViewMode>('Minggu'); // Default tampilannya minggu
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const months: string[] = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const days: string[] = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  // INI MASIH DUMMY
  const mentoringSchedule: MentoringEvent[] = [
    {
      id: 1,
      title: 'Mentoring',
      mentor: 'Grace Doe',
      date: '2025-06-23',
      time: '14:00-15:00',
      color: 'bg-[#374394]'
    },
    {
      id: 2,
      title: 'Mentoring',
      mentor: 'Grace Doe',
      date: '2025-06-26',
      time: '16:00-17:00',
      color: 'bg-[#374394]'
    },
    {
      id: 3,
      title: 'Bimbingan Karir',
      mentor: 'John Smith',
      date: '2025-06-24',
      time: '10:00-11:00',
      color: 'bg-[#20217A]'
    },
    {
      id: 4,
      title: 'Konsultasi',
      mentor: 'Sarah Wilson',
      date: '2025-06-27',
      time: '13:00-14:00',
      color: 'bg-[#3D3FA0]'
    },
    {
      id: 5,
      title: 'Workshop',
      mentor: 'Alex Johnson',
      date: '2025-06-23',
      time: '09:00-10:00',
      color: 'bg-[#2D4A92]'
    },
    {
      id: 6,
      title: 'Presentasi',
      mentor: 'Maria Garcia',
      date: '2025-06-25',
      time: '15:00-16:00',
      color: 'bg-[#1F3A8A]'
    },
    {
      id: 7,
      title: 'Meeting',
      mentor: 'David Chen',
      date: '2025-06-15',
      time: '11:00-12:00',
      color: 'bg-[#374394]'
    },
    {
      id: 8,
      title: 'Review',
      mentor: 'Lisa Park',
      date: '2025-06-18',
      time: '14:00-15:00',
      color: 'bg-[#20217A]'
    }
  ];

  const timeSlots: string[] = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const getWeekDates = (): Date[] => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const weekDates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const getMonthDates = (): Date[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startCalendar = new Date(firstDay);
    const endCalendar = new Date(lastDay);

    // Start from Sunday of the first week
    startCalendar.setDate(firstDay.getDate() - firstDay.getDay());
    
    // End at Saturday of the last week
    endCalendar.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

    const dates: Date[] = [];
    const current = new Date(startCalendar);
    
    while (current <= endCalendar) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date: Date): MentoringEvent[] => {
    const dateStr = formatDate(date);
    return mentoringSchedule.filter(event => event.date === dateStr);
  };

  const navigateDate = (direction: number): void => {
    const newDate = new Date(currentDate);
    
    if (viewMode === 'Hari') {
      newDate.setDate(currentDate.getDate() + direction);
    } else if (viewMode === 'Minggu') {
      newDate.setDate(currentDate.getDate() + (direction * 7));
    } else if (viewMode === 'Bulan') {
      newDate.setMonth(currentDate.getMonth() + direction);
    }
    
    setCurrentDate(newDate);
  };

  const handleViewModeChange = (mode: ViewMode): void => {
    setViewMode(mode);
  };

  const isToday = (date: Date): boolean => {
    if (!isClient) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate.getTime() === today.getTime();
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentDate.getMonth();
  };

  const weekDates = getWeekDates();
  const monthDates = getMonthDates();

  const renderDayView = () => {
    const events = getEventsForDate(currentDate);
    
    return (
      <div className="bg-white rounded-2xl shadow-[0px_2px_0_rgba(30,30,30,1)] border-2 border-[#1E1E1E] overflow-hidden">
        {/* Day Header */}
        <div className="bg-[#F4F4FF] p-4 border-b-2 border-[#1E1E1E]">
          <h2 className="text-xl font-bold text-[#1E1E1E]">
            {days[currentDate.getDay()]}, {currentDate.getDate()} {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
        </div>

        {/* Time Slots */}
        <div className="max-h-96 overflow-y-auto">
          {timeSlots.map((time, timeIndex) => {
            const timeEvents = events.filter(event => 
              event.time.startsWith(time.slice(0, 2))
            );
            
            return (
              <div key={time} className="flex border-b border-[#1E1E1E]/20 min-h-16">
                <div className="w-20 p-4 bg-[#F4F4FF] border-r-2 border-[#1E1E1E] text-sm text-[#1E1E1E]/80 font-medium flex items-center justify-center">
                  {time}
                </div>
                <div className="flex-1 p-2 relative">
                  {timeEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`${event.color} text-white p-2 rounded-lg text-xs font-medium mb-1 shadow-[0px_1px_0_rgba(30,30,30,0.3)] border border-[#1E1E1E]/20`}
                    >
                      <div className="font-semibold">{event.title}</div>
                      <div className="text-xs opacity-90">{event.mentor}</div>
                      <div className="text-xs opacity-75">{event.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    return (
      <div className="bg-white rounded-2xl shadow-[0px_2px_0_rgba(30,30,30,1)] border-2 border-[#1E1E1E] overflow-hidden">
        {/* Days Header */}
        <div className="flex border-b-2 border-[#1E1E1E]">
          <div className="w-20 p-4 bg-[#F4F4FF] border-r-2 border-[#1E1E1E] flex-shrink-0"></div>
          <div className="flex-1 grid grid-cols-7">
            {weekDates.map((date, index) => (
              <div key={index} className="p-4 text-center bg-[#F4F4FF]">
                <div className="text-sm font-medium text-[#1E1E1E]/80 mb-1">
                  {days[index]}
                </div>
                <div className={`text-xl font-bold ${isToday(date) ? 'text-[#374394]' : 'text-[#1E1E1E]'}`}>
                  {date.getDate()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="max-h-96 overflow-y-auto">
          {timeSlots.map((time, timeIndex) => (
            <div key={time} className="flex border-b border-[#1E1E1E]/20 min-h-16">
              <div className="w-20 p-4 bg-[#F4F4FF] border-r-2 border-[#1E1E1E] text-sm text-[#1E1E1E]/80 font-medium flex items-center justify-center flex-shrink-0">
                {time}
              </div>
              <div className="flex-1 grid grid-cols-7">
                {weekDates.map((date, dayIndex) => {
                  const events = getEventsForDate(date);
                  const timeEvents = events.filter(event => 
                    event.time.startsWith(time.slice(0, 2))
                  );
                  
                  return (
                    <div key={dayIndex} className="p-1 relative">
                      {timeEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`${event.color} text-white p-1 rounded text-xs font-medium mb-1 shadow-[0px_1px_0_rgba(30,30,30,0.3)] border border-[#1E1E1E]/20`}
                        >
                          <div className="font-semibold truncate">{event.title}</div>
                          <div className="text-xs opacity-90 truncate">{event.mentor}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const weeks = [];
    for (let i = 0; i < monthDates.length; i += 7) {
      weeks.push(monthDates.slice(i, i + 7));
    }

    return (
      <div className="bg-white rounded-2xl shadow-[0px_2px_0_rgba(30,30,30,1)] border-2 border-[#1E1E1E] overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b-2 border-[#1E1E1E]">
          {days.map((day, index) => (
            <div key={index} className="p-4 text-center bg-[#F4F4FF] border-r border-[#1E1E1E] last:border-r-0">
              <div className="text-sm font-medium text-[#1E1E1E]/80">
                {day}
              </div>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 border-b border-[#1E1E1E]/20 last:border-b-0">
              {week.map((date, dayIndex) => {
                const events = getEventsForDate(date);
                const isCurrentMonthDate = isCurrentMonth(date);
                const isTodayDate = isToday(date);
                
                return (
                  <div key={dayIndex} className="min-h-24 p-2 border-r border-[#1E1E1E]/20 last:border-r-0 relative">
                    <div className={`text-sm font-medium mb-1 ${
                      isTodayDate 
                        ? 'text-white bg-[#374394] rounded-full w-6 h-6 flex items-center justify-center' 
                        : isCurrentMonthDate 
                          ? 'text-[#1E1E1E]' 
                          : 'text-[#1E1E1E]/40'
                    }`}>
                      {date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {events.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`${event.color} text-white p-1 rounded text-xs font-medium truncate shadow-[0px_1px_0_rgba(30,30,30,0.3)] border border-[#1E1E1E]/20`}
                        >
                          <div className="truncate">{event.title}</div>
                        </div>
                      ))}
                      {events.length > 2 && (
                        <div className="text-xs text-[#1E1E1E]/60 font-medium">
                          +{events.length - 2} lainnya
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarSupervisor />

      {/* Calendar Content */}
      <div className="max-w-7xl mx-20 px-6 py-8">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigateDate(-1)} 
              className="p-2 hover:bg-[#DCDDFF] rounded-lg border border-[#1E1E1E] bg-white shadow-[0px_2px_0_rgba(30,30,30,1)]"
              type="button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-[#1E1E1E]">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h1>
            <button 
              onClick={() => navigateDate(1)} 
              className="p-2 hover:bg-[#DCDDFF] rounded-lg border border-[#1E1E1E] bg-white shadow-[0px_2px_0_rgba(30,30,30,1)]"
              type="button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex bg-[#DCDDFF] rounded-lg p-1 border border-[#1E1E1E] shadow-[0px_2px_0_rgba(30,30,30,1)]">
              <button
                onClick={() => handleViewModeChange('Hari')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'Hari' 
                    ? 'bg-[#374394] text-white shadow-[0px_1px_0_rgba(30,30,30,1)] border border-[#1E1E1E]' 
                    : 'text-[#1E1E1E]/80 hover:text-[#1E1E1E]'
                }`}
                type="button"
              >
                Hari
              </button>
              <button
                onClick={() => handleViewModeChange('Minggu')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'Minggu' 
                    ? 'bg-[#374394] text-white shadow-[0px_1px_0_rgba(30,30,30,1)] border border-[#1E1E1E]' 
                    : 'text-[#1E1E1E]/80 hover:text-[#1E1E1E]'
                }`}
                type="button"
              >
                Minggu
              </button>
              <button
                onClick={() => handleViewModeChange('Bulan')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'Bulan' 
                    ? 'bg-[#374394] text-white shadow-[0px_1px_0_rgba(30,30,30,1)] border border-[#1E1E1E]' 
                    : 'text-[#1E1E1E]/80 hover:text-[#1E1E1E]'
                }`}
                type="button"
              >
                Bulan
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Views */}
        {viewMode === 'Hari' && renderDayView()}
        {viewMode === 'Minggu' && renderWeekView()}
        {viewMode === 'Bulan' && renderMonthView()}

        {/* Add Schedule Button */}
        <div className="fixed bottom-6 right-6">
          <Button>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Tambah Jadwal</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;