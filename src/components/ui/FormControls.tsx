import { useEffect, useId, useRef, useState } from 'react';
import { FaCalendarDays, FaCheck, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  ariaLabel?: string;
  className?: string;
}

export function CustomSelect({ value, onChange, options, ariaLabel, className = '' }: CustomSelectProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [open, setOpen] = useState(false);
  const enabledOptions = options.filter((option) => !option.disabled);
  const selected = options.find((option) => option.value === value && !option.disabled) ?? enabledOptions[0];
  const selectedIndex = Math.max(0, enabledOptions.findIndex((option) => option.value === selected?.value));
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    setActiveIndex(selectedIndex);
    window.setTimeout(() => optionRefs.current[selectedIndex]?.focus(), 0);
  }, [open, selectedIndex]);

  const selectOption = (option: SelectOption) => {
    if (option.disabled) return;
    onChange(option.value);
    setOpen(false);
  };

  const move = (step: number) => {
    const next = (activeIndex + step + enabledOptions.length) % enabledOptions.length;
    setActiveIndex(next);
    optionRefs.current[next]?.focus();
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-label={ariaLabel}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className="form-control flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="min-w-0 truncate">{selected?.label}</span>
        <FaChevronDown className={`h-3.5 w-3.5 shrink-0 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          id={`${id}-listbox`}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute z-50 mt-1.5 max-h-72 w-full overflow-auto rounded-xl border border-gray-200 bg-white py-1.5 shadow-[0_18px_42px_-22px_rgba(16,24,40,0.45)] ring-1 ring-gray-900/[0.04]"
        >
          {options.map((option) => {
            if (option.disabled) {
              return (
                <div key={option.value} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {option.label}
                </div>
              );
            }

            const enabledIndex = enabledOptions.findIndex((item) => item.value === option.value);
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                ref={(node) => {
                  optionRefs.current[enabledIndex] = node;
                }}
                type="button"
                role="option"
                aria-selected={isSelected}
                tabIndex={enabledIndex === activeIndex ? 0 : -1}
                onClick={() => selectOption(option)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    move(1);
                  } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    move(-1);
                  } else if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    selectOption(option);
                  } else if (event.key === 'Escape') {
                    event.preventDefault();
                    setOpen(false);
                  }
                }}
                className={`flex min-h-10 w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors focus:outline-hidden ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-900'
                    : 'text-gray-900 hover:bg-emerald-50/60 focus:bg-emerald-50/60'
                }`}
              >
                <span className="min-w-0">{option.label}</span>
                {isSelected && <FaCheck className="h-3.5 w-3.5 shrink-0 text-emerald-700" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  ariaLabel?: string;
  className?: string;
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseIsoDate(value?: string) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

export function DatePicker({ value, onChange, min, ariaLabel, className = '' }: DatePickerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedDate = parseIsoDate(value);
  const minDate = parseIsoDate(min);
  const [viewDate, setViewDate] = useState(selectedDate ?? minDate ?? new Date());

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leading = firstDay.getDay();
  const monthLabel = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(viewDate);
  const cells = [
    ...Array.from({ length: leading }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1)),
  ];

  const moveMonth = (step: number) => {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + step, 1));
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="form-control flex w-full items-center justify-between gap-3 text-left"
      >
        <span className={selectedDate ? 'text-gray-900' : 'text-gray-400'}>
          {selectedDate ? dateFormatter.format(selectedDate) : 'dd-mm-yyyy'}
        </span>
        <FaCalendarDays className="h-4 w-4 shrink-0 text-emerald-700" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full max-w-sm rounded-xl border border-gray-200 bg-white p-3 shadow-[0_18px_42px_-22px_rgba(16,24,40,0.45)] ring-1 ring-gray-900/[0.04]">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-display text-sm font-bold text-gray-900">{monthLabel}</p>
            <div className="flex gap-1">
              <button type="button" onClick={() => moveMonth(-1)} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-800">
                <FaChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button type="button" onClick={() => moveMonth(1)} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-800">
                <FaChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-wider text-gray-500">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <span key={day} className="py-1">{day}</span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((date, index) => {
              if (!date) return <span key={`empty-${index}`} />;
              const iso = toIsoDate(date);
              const disabled = Boolean(minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()));
              const selected = value === iso;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={`flex h-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                    selected
                      ? 'bg-emerald-600 text-white'
                      : disabled
                      ? 'cursor-not-allowed text-gray-300'
                      : 'text-gray-900 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex justify-between border-t border-gray-100 pt-2">
            <button type="button" onClick={() => onChange('')} className="text-xs font-bold text-gray-600 hover:text-emerald-800">
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                if (!minDate || today >= minDate) onChange(toIsoDate(today));
                setViewDate(today);
                setOpen(false);
              }}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
