'use client';

import { Modal } from '@/components/common';
import { EventForm } from './EventForm';
import { Event } from '@/types/event';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: Event) => void;
  event?: Event | null;
  mode: 'create' | 'edit';
}

export function EventModal({ isOpen, onClose, onSubmit, event, mode }: EventModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">
          {mode === 'create' ? 'Thêm sự kiện mới' : 'Chỉnh sửa sự kiện'}
        </h2>
        <EventForm
          onSubmit={onSubmit}
          onCancel={onClose}
          event={event}
          mode={mode}
        />
      </div>
    </Modal>
  );
} 