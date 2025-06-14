'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/common';
import { Ticket, TicketType } from '@/types/ticket';
import { ticketApi } from '@/services/api/ticket';
import TicketTypeModal from '@/components/admin/tickets/TicketTypeModal';
import TicketModal from '@/components/admin/tickets/TicketModal';
import TicketDetailModal from '@/components/admin/tickets/TicketDetailModal';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [selectedTicketType, setSelectedTicketType] = useState<TicketType | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isTicketTypeModalOpen, setIsTicketTypeModalOpen] = useState(false);
  const [isTicketDetailModalOpen, setIsTicketDetailModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ticketsData, ticketTypesData] = await Promise.all([
        ticketApi.getAllTickets(),
        ticketApi.getAllTicketTypes()
      ]);
      setTickets(ticketsData);
      setTicketTypes(ticketTypesData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleCreateTicket = async (data: Partial<Ticket>) => {
    try {
      await ticketApi.createTicket(data);
      setIsTicketModalOpen(false);
      loadData();
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const handleUpdateTicket = async (data: Partial<Ticket>) => {
    if (!selectedTicket) return;
    try {
      await ticketApi.updateTicket(selectedTicket.id, data);
      setIsTicketModalOpen(false);
      loadData();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const handleDeleteTicket = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa vé này?')) return;
    try {
      await ticketApi.deleteTicket(id);
      loadData();
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const handleCreateTicketType = async (data: Partial<TicketType>) => {
    try {
      await ticketApi.createTicketType(data);
      setIsTicketTypeModalOpen(false);
      loadData();
    } catch (error) {
      console.error('Error creating ticket type:', error);
    }
  };

  const handleUpdateTicketType = async (data: Partial<TicketType>) => {
    if (!selectedTicketType) return;
    try {
      await ticketApi.updateTicketType(selectedTicketType.id, data);
      setIsTicketTypeModalOpen(false);
      loadData();
    } catch (error) {
      console.error('Error updating ticket type:', error);
    }
  };

  const handleDeleteTicketType = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa loại vé này?')) return;
    try {
      await ticketApi.deleteTicketType(id);
      loadData();
    } catch (error) {
      console.error('Error deleting ticket type:', error);
    }
  };

  const openTicketModal = (mode: 'create' | 'edit', ticket?: Ticket) => {
    setModalMode(mode);
    setSelectedTicket(ticket || null);
    setIsTicketModalOpen(true);
  };

  const openTicketTypeModal = (mode: 'create' | 'edit', ticketType?: TicketType) => {
    setModalMode(mode);
    setSelectedTicketType(ticketType || null);
    setIsTicketTypeModalOpen(true);
  };

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Quản lý vé</h1>
        <div className="space-x-4">
          <Button onClick={() => openTicketTypeModal('create')}>
            <PlusIcon className="h-5 w-5 mr-2" />
            Thêm loại vé
          </Button>
          <Button onClick={() => openTicketModal('create')}>
            <PlusIcon className="h-5 w-5 mr-2" />
            Thêm vé
          </Button>
        </div>
      </div>

      {/* Ticket Types Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Loại vé</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số lượng
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ticketTypes.map((type) => (
                <tr key={type.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{type.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{type.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(type.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{type.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openTicketTypeModal('edit', type)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTicketType(type.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tickets Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Danh sách vé</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã vé
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sự kiện
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người mua
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày phát hành
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ticket.ticketCode}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{ticket.event?.name}</div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(ticket.event?.startTime || ''), 'dd/MM/yyyy', { locale: vi })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{ticket.user?.fullName}</div>
                    <div className="text-sm text-gray-500">{ticket.user?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[ticket.status]}`}>
                      {statusLabels[ticket.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(ticket.issuedAt), 'dd/MM/yyyy', { locale: vi })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setIsTicketDetailModalOpen(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => openTicketModal('edit', ticket)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTicket(ticket.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <TicketTypeModal
        isOpen={isTicketTypeModalOpen}
        onClose={() => setIsTicketTypeModalOpen(false)}
        onSubmit={modalMode === 'create' ? handleCreateTicketType : handleUpdateTicketType}
        ticketType={selectedTicketType || undefined}
        mode={modalMode}
      />

      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        onSubmit={modalMode === 'create' ? handleCreateTicket : handleUpdateTicket}
        ticket={selectedTicket || undefined}
        mode={modalMode}
      />

      <TicketDetailModal
        isOpen={isTicketDetailModalOpen}
        onClose={() => setIsTicketDetailModalOpen(false)}
        ticket={selectedTicket}
        onReload={loadData}
      />
    </div>
  );
} 