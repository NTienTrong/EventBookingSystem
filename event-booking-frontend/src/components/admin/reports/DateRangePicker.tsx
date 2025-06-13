'use client';

interface DateRangePickerProps {
  value: {
    from: Date;
    to: Date;
  };
  onChange: (range: { from: Date; to: Date }) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <div className="flex items-center space-x-4">
      <div>
        <label htmlFor="from" className="block text-sm font-medium text-gray-700">
          Từ ngày
        </label>
        <input
          type="date"
          id="from"
          value={value.from.toISOString().split('T')[0]}
          onChange={(e) =>
            onChange({ ...value, from: new Date(e.target.value) })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="to" className="block text-sm font-medium text-gray-700">
          Đến ngày
        </label>
        <input
          type="date"
          id="to"
          value={value.to.toISOString().split('T')[0]}
          onChange={(e) => onChange({ ...value, to: new Date(e.target.value) })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
} 