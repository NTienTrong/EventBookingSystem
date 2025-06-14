import Modal from '@/components/common/Modal';
import { Button } from '@/components/common';
import { Ticket } from '@/types/ticket';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface TicketDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket | null;
  onReload?: () => void;
}

export default function TicketDetailModal({ isOpen, onClose, ticket, onReload }: TicketDetailModalProps) {
  if (!ticket) return null;

  const statusStyles: Record<Ticket['status'], string> = {
    ACTIVE: 'bg-green-100 text-green-800',
    USED: 'bg-gray-100 text-gray-800',
    CANCELLED: 'bg-red-100 text-red-800',
  };

  const statusLabels: Record<Ticket['status'], string> = {
    ACTIVE: 'Còn hiệu lực',
    USED: 'Đã sử dụng',
    CANCELLED: 'Đã hủy',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-semibold">Chi tiết vé</h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[ticket.status]}`}
          >
            {statusLabels[ticket.status]}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Mã vé</h3>
              <p className="mt-1 text-lg font-medium">{ticket.ticketCode}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Sự kiện</h3>
              <p className="mt-1 text-lg font-medium">{ticket.event?.name}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(ticket.event?.startTime || ''), 'HH:mm - dd/MM/yyyy', { locale: vi })}
              </p>
              <p className="text-sm text-gray-500">{ticket.event?.location}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Người mua</h3>
              <p className="mt-1 text-lg font-medium">{ticket.user?.fullName}</p>
              <p className="text-sm text-gray-500">{ticket.user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Ngày phát hành</h3>
              <p className="mt-1 text-lg font-medium">
                {format(new Date(ticket.issuedAt), 'HH:mm - dd/MM/yyyy', { locale: vi })}
              </p>
            </div>

            {ticket.usedAt && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Ngày sử dụng</h3>
                <p className="mt-1 text-lg font-medium">
                  {format(new Date(ticket.usedAt), 'HH:mm - dd/MM/yyyy', { locale: vi })}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          {onReload && (
            <Button
              variant="outline"
              onClick={onReload}
            >
              Tải lại
            </Button>
          )}
          <Button onClick={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  );
} 