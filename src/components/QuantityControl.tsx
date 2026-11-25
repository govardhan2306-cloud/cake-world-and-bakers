import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: 'sm' | 'md';
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  size = 'sm',
}) => {
  const btnSize = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9';
  const textClass = size === 'sm' ? 'min-w-[20px] text-sm' : 'min-w-[26px] text-base';

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-[#E9E5DE] bg-[#F8F7F4] p-0.5"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={onDecrement}
        aria-label="Decrease quantity"
        className={`${btnSize} rounded-full flex items-center justify-center text-[#302C28] hover:bg-[#E9E5DE]/60 active:scale-95 transition`}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span
        className={`${textClass} text-center font-semibold text-[#302C28] tabular-nums select-none`}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label="Increase quantity"
        className={`${btnSize} rounded-full flex items-center justify-center text-[#302C28] hover:bg-[#E9E5DE]/60 active:scale-95 transition`}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
