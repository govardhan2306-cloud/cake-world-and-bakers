import React from 'react';

interface VegBadgeProps {
  isVeg: boolean;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export const VegBadge: React.FC<VegBadgeProps> = ({
  isVeg,
  showLabel = false,
  size = 'sm',
}) => {
  const boxClass = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const dotClass = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';

  return (
    <span
      className="inline-flex items-center gap-1.5 shrink-0"
      aria-label={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
      title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
    >
      <span
        className={`${boxClass} rounded-[3px] border-[1.5px] flex items-center justify-center bg-white ${
          isVeg ? 'border-[#2E7D32]' : 'border-[#B83227]'
        }`}
      >
        <span
          className={`${dotClass} rounded-full ${
            isVeg ? 'bg-[#2E7D32]' : 'bg-[#B83227]'
          }`}
        />
      </span>
      {showLabel && (
        <span className="text-xs font-medium text-[#302C28]">
          {isVeg ? 'Veg' : 'Non-Veg'}
        </span>
      )}
    </span>
  );
};
