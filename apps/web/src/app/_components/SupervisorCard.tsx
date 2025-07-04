import React from 'react';
import Button from './Button';

interface Supervisor {
    id: number;
    name: string;
    gender: string;
    age: number;
    experience: string;
    avatar: string;
}

interface SupervisorCardProps {
    supervisor: Supervisor;
    isSelected?: boolean;
    onSelect?: (id: number) => void;
    showActionButton?: boolean;
    hasCurrentSupervisor?: boolean;
    onActionClick?: (id: number) => void;
    width?: string | number;
    height?: string | number;
    maxWidth?: string | number;
}

const SupervisorCard = ({ 
    supervisor, 
    isSelected = false, 
    onSelect, 
    showActionButton = false,
    hasCurrentSupervisor = false,
    onActionClick,
    width,
    height,
    maxWidth = 'max-w-md'
}: SupervisorCardProps) => {
    const handleCardClick = () => {
        if (onSelect) {
            onSelect(supervisor.id);
        }
    };

    const handleActionClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.stopPropagation();
    };

    return (
        <div
            onClick={handleCardClick}
            className={`
                bg-[#4A4E8A] rounded-3xl p-4 flex flex-col
                ${onSelect ? 'cursor-pointer' : ''} transition-all duration-200
                border-2 w-72 md:w-80 lg:w-84 h-48 shadow-[0px_2px_0_rgba(30,30,30,1)]
                ${isSelected ? 'border-[#B3EBD6]' : 'border-[#1E1E1E]'}
            `}
        >
            <div className="flex items-center gap-4 mb-3">
                <img
                    src={supervisor.avatar}
                    alt={supervisor.name}
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-white flex-1">
                    <h3 className="font-semibold text-[#FFE16B]">{supervisor.name}</h3>
                    <p className="text-sm mt-1">{supervisor.gender}, {supervisor.age} tahun</p>
                    <p className="text-xs mt-2 line-clamp-2">{supervisor.experience}</p>
                </div>
            </div>

            <div className="flex-1 min-h-2"></div>
            
            {showActionButton && (
                <div className="flex justify-center">
                    <Button
                        onClick={handleActionClick}
                        bgColor="#B3EBCE"
                        width="250px"
                        height="40px"
                        fontSize="text-sm"
                    >
                        {hasCurrentSupervisor ? 'Ganti Pendamping' : 'Jadikan Pendamping'}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SupervisorCard;