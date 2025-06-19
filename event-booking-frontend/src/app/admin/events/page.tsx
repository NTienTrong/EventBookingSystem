'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, RefreshCw } from 'lucide-react';
import { Button, Card } from '@/components/common';
import { EventModal, EventDetailModal } from '@/components/admin/events';
import { DeleteConfirmModal } from '@/components/admin/common/DeleteConfirmModal';
import { Event } from '@/types/event';
import { useRouter } from 'next/navigation';
import { eventApi } from '@/services/api/event';
import { toast } from 'react-hot-toast';
import { ToasterProvider } from '@/components/providers/ToasterProvider';

export default function EventsManagementPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const response = await eventApi.getAllEvents({
        search: searchQuery,
        status: filterStatus
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error loading events:', error);
      toast.error('Không thể tải danh sách sự kiện');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [searchQuery, filterStatus]);

  const handleReload = async () => {
    await loadEvents();
  };

  const handleCreate = async (eventData: Event) => {
    try {
      await eventApi.createEvent(eventData);
      toast.success('Tạo sự kiện thành công');
      setIsCreateModalOpen(false);
      loadEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Không thể tạo sự kiện');
    }
  };

  const handleEdit = async (eventData: Event) => {
    if (!selectedEvent) return;
    try {
      await eventApi.updateEvent(Number(selectedEvent.id), eventData);
      toast.success('Cập nhật sự kiện thành công');
      setIsEditModalOpen(false);
      loadEvents();
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Không thể cập nhật sự kiện');
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;
    try {
      await eventApi.deleteEvent(Number(selectedEvent.id));
      toast.success('Xóa sự kiện thành công');
      setIsDeleteModalOpen(false);
      loadEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Không thể xóa sự kiện');
    }
  };

  const statusStyles: Record<Event['status'], string> = {
    DRAFT: 'bg-gray-100 text-gray-800',
    UPCOMING: 'bg-yellow-100 text-yellow-800',
    ONGOING: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-gray-100 text-gray-800',
    CANCELLED: 'bg-red-100 text-red-800',
  };

  const statusLabels: Record<Event['status'], string> = {
    DRAFT: 'Bản nháp',
    UPCOMING: 'Sắp diễn ra',
    ONGOING: 'Đang diễn ra',
    COMPLETED: 'Đã kết thúc',
    CANCELLED: 'Đã hủy',
  };

  const statusOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'UPCOMING', label: 'Sắp diễn ra' },
    { value: 'ONGOING', label: 'Đang diễn ra' },
    { value: 'COMPLETED', label: 'Đã kết thúc' },
    { value: 'CANCELLED', label: 'Đã hủy' }
  ];

  return (
    <div className="space-y-6">
      <ToasterProvider />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Quản lý sự kiện
        </h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReload}
            disabled={isLoading}
            className="p-2"
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Thêm sự kiện
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sự kiện..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Events List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên sự kiện
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Địa điểm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vé đã bán
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event: Event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          src={event.imageUrl}
                          alt={event.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {event.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(event.startTime).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(event.startTime).toLocaleTimeString('vi-VN')} - {new Date(event.endTime).toLocaleTimeString('vi-VN')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{event.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[event.status]}`}
                    >
                      {statusLabels[event.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.soldTickets}/{event.totalTickets}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedEvent(event);
                          setIsDetailModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedEvent(event);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          setSelectedEvent(event);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modals */}
      <EventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        mode="create"
      />

      <EventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEdit}
        event={selectedEvent}
        mode="edit"
      />

      <EventDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        event={selectedEvent}
        onReload={handleReload}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Xóa sự kiện"
        message="Bạn có chắc chắn muốn xóa sự kiện này không? Hành động này không thể hoàn tác."
      />
    </div>
  );
} 