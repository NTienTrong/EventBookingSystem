'use client';

import { useState, useEffect } from 'react';
import { ticketApi } from '@/api/ticket';
import { TicketType } from '@/types/ticket';
import { Button } from '@/components/common';
import { Input } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import TicketTypeModal from '@/components/admin/tickets/TicketTypeModal';
import TicketTypeDetailModal from '@/components/admin/tickets/TicketTypeDetailModal';
import { toast } from 'react-hot-toast';
import { eventApi } from '@/api/event';
import ConfirmModal from '@/components/common/ConfirmModal';
import { Event } from '@/types/event';

export default function AdminTicketsPage() {
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState<TicketType | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const loadTicketTypes = async () => {
    try {
      setLoading(true);
      const response = await ticketApi.getAllTicketTypes();
      setTicketTypes(response.data);
    } catch (error) {
      console.error('Failed to load ticket types:', error);
      toast.error('Không thể tải danh sách loại vé');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTicketTypes();
    eventApi.getAllEvents().then(res => setEvents(res.data)).catch(() => toast.error('Không thể tải danh sách sự kiện'));
  }, []);

  const handleCreate = () => {
    setSelectedTicketType(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEdit = (ticketType: TicketType) => {
    setSelectedTicketType(ticketType);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleView = (ticketType: TicketType) => {
    setSelectedTicketType(ticketType);
    setIsDetailModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await ticketApi.deleteTicketType(deleteId);
      toast.success('Xóa loại vé thành công');
      loadTicketTypes();
    } catch (error) {
      toast.error('Không thể xóa loại vé');
    } finally {
      setIsConfirmOpen(false);
      setDeleteId(null);
    }
  };

  const handleSubmit = async (data: Partial<TicketType>) => {
    try {
      if (modalMode === 'create') {
        await ticketApi.createTicketType(data);
      } else if (selectedTicketType?.id) {
        await ticketApi.updateTicketType(selectedTicketType.id.toString(), {
          ...data,
          availableQuantity: data.availableQuantity ?? selectedTicketType.availableQuantity
        });
      }
      setIsModalOpen(false);
      loadTicketTypes();
    } catch (error) {
      console.error('Failed to save ticket type:', error);
      toast.error('Không thể lưu loại vé');
    }
  };

  const filteredTicketTypes = ticketTypes.filter(type =>
    (searchTerm === '' || type.name.toLowerCase().includes(searchTerm.toLowerCase()) || type.description?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedEventId === '' || type.eventId === Number(selectedEventId))
  );

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý loại vé</h1>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Thêm loại vé
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm loại vé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="h-10 rounded-md border px-3 py-2 text-sm"
              value={selectedEventId}
              onChange={e => setSelectedEventId(e.target.value)}
            >
              <option value="">Tất cả sự kiện</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>{event.name}</option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Đang tải...</div>
          ) : filteredTicketTypes.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              {searchTerm ? 'Không tìm thấy loại vé nào' : 'Chưa có loại vé nào'}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTicketTypes.map((type) => {
                const eventName = events.find(e => e.id === type.eventId)?.name || 'Không xác định';
                return (
                  <Card key={type.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{type.name}</h3>
                            <Badge variant={type.active ? "success" : "destructive"}>
                              {type.active ? 'Đang bán' : 'Ngừng bán'}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-700 font-medium">Sự kiện: {eventName}</div>
                          <p className="text-gray-600">{type.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{(type.price ?? 0).toLocaleString('vi-VN')} VNĐ</span>
                            <span>•</span>
                            <span>{type.quantity} vé</span>
                            <span>•</span>
                            <span>Còn lại: {type.availableQuantity ?? 0} vé</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>
                              Bắt đầu: {type.saleStartDate ? format(new Date(type.saleStartDate), 'dd/MM/yyyy', { locale: vi }) : 'Chưa có'}
                            </span>
                            <span>•</span>
                            <span>
                              Kết thúc: {type.saleEndDate ? format(new Date(type.saleEndDate), 'dd/MM/yyyy', { locale: vi }) : 'Chưa có'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleView({...type, eventName} as TicketType & { eventName?: string })}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(type)}
                            className="text-yellow-600 hover:text-yellow-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(type.id?.toString() || '')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <TicketTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        ticketType={selectedTicketType || undefined}
        mode={modalMode}
      />

      {selectedTicketType && (
        <TicketTypeDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          ticketType={selectedTicketType ? { ...selectedTicketType, eventName: events.find(e => e.id === selectedTicketType.eventId)?.name || '' } as TicketType & { eventName?: string } : null}
        />
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa loại vé này?"
      />
    </div>
  );
} 