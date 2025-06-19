import Modal from '@/components/common/Modal';
import { TicketType } from '@/types/ticket';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

interface TicketTypeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketType: (TicketType & { eventName?: string }) | null;
}

const TicketTypeDetailModal = ({ isOpen, onClose, ticketType }: TicketTypeDetailModalProps) => {
  if (!ticketType) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chi tiết loại vé">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{ticketType.name}</h3>
          <Badge variant={ticketType.active ? "success" : "destructive"}>
            {ticketType.active ? 'Đang bán' : 'Ngừng bán'}
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Sự kiện</h4>
            <p className="mt-1 text-sm text-gray-900">{ticketType.eventName || 'Không xác định'}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Mô tả</h4>
            <p className="mt-1 text-sm text-gray-900">
              {ticketType.description || 'Không có mô tả'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Giá vé</h4>
              <p className="mt-1 text-sm text-gray-900">
                {(ticketType.price || 0).toLocaleString('vi-VN')} VNĐ
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Số lượng vé</h4>
              <p className="mt-1 text-sm text-gray-900">
                {ticketType.quantity} vé
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Số lượng vé còn lại</h4>
              <p className="mt-1 text-sm text-gray-900">
                {ticketType.availableQuantity || 0} vé
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Số vé đã bán</h4>
              <p className="mt-1 text-sm text-gray-900">
                {ticketType.quantity - (ticketType.availableQuantity || 0)} vé
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Ngày bắt đầu bán</h4>
              <p className="mt-1 text-sm text-gray-900">
                {ticketType.saleStartDate
                  ? format(new Date(ticketType.saleStartDate), 'dd/MM/yyyy', { locale: vi })
                  : 'Chưa có'}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Ngày kết thúc bán</h4>
              <p className="mt-1 text-sm text-gray-900">
                {ticketType.saleEndDate
                  ? format(new Date(ticketType.saleEndDate), 'dd/MM/yyyy', { locale: vi })
                  : 'Chưa có'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TicketTypeDetailModal; 