'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/common';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TicketType } from '@/types/ticket';
import { Event } from '@/types/event';
import { eventApi } from '@/api/event';
import { toast } from 'react-hot-toast';

const ticketTypeSchema = z.object({
  name: z.enum(['VIP', 'STANDARD'], { required_error: 'Vui lòng chọn loại vé' }),
  description: z.string().optional(),
  price: z.number().min(0, 'Giá vé phải lớn hơn hoặc bằng 0'),
  quantity: z.number().min(1, 'Số lượng vé phải lớn hơn 0'),
  active: z.boolean(),
  saleStartDate: z.string().optional(),
  saleEndDate: z.string().optional(),
  eventId: z.string().min(1, 'Vui lòng chọn sự kiện'),
});

type TicketTypeFormData = z.infer<typeof ticketTypeSchema>;

interface TicketTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<TicketType>) => Promise<void>;
  ticketType?: TicketType;
  mode: 'create' | 'edit';
}

export default function TicketTypeModal({
  isOpen,
  onClose,
  onSubmit,
  ticketType,
  mode,
}: TicketTypeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TicketTypeFormData>({
    resolver: zodResolver(ticketTypeSchema),
    defaultValues: {
      name: 'STANDARD',
      description: '',
      price: 0,
      quantity: 1,
      active: true,
      saleStartDate: '',
      saleEndDate: '',
      eventId: '',
    },
  });

  const watchName = watch('name');

  useEffect(() => {
    if (isOpen) {
      loadEvents();
    }
  }, [isOpen]);

  useEffect(() => {
    if (ticketType) {
      reset({
        name: ticketType.name as 'VIP' | 'STANDARD',
        description: ticketType.description || '',
        price: ticketType.price,
        quantity: ticketType.quantity,
        active: ticketType.active,
        saleStartDate: ticketType.saleStartDate ? new Date(ticketType.saleStartDate).toISOString().split('T')[0] : '',
        saleEndDate: ticketType.saleEndDate ? new Date(ticketType.saleEndDate).toISOString().split('T')[0] : '',
        eventId: ticketType.eventId ? String(ticketType.eventId) : '',
      });
    } else {
      reset({
        name: 'STANDARD',
        description: '',
        price: 0,
        quantity: 1,
        active: true,
        saleStartDate: '',
        saleEndDate: '',
        eventId: '',
      });
    }
  }, [ticketType, reset]);

  const loadEvents = async () => {
    try {
      const response = await eventApi.getAllEvents();
      setEvents(response.data);
    } catch (error) {
      console.error('Error loading events:', error);
      toast.error('Không thể tải danh sách sự kiện');
    }
  };

  const onSubmitForm = async (data: TicketTypeFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit({
        ...data,
        eventId: parseInt(data.eventId),
        saleStartDate: data.saleStartDate ? data.saleStartDate + 'T00:00:00' : undefined,
        saleEndDate: data.saleEndDate ? data.saleEndDate + 'T00:00:00' : undefined,
      });
      toast.success(mode === 'create' ? 'Tạo loại vé thành công' : 'Cập nhật loại vé thành công');
      onClose();
    } catch (error) {
      console.error('Failed to submit form:', error);
      toast.error('Có lỗi xảy ra khi lưu loại vé');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Thêm loại vé mới' : 'Chỉnh sửa loại vé'}
    >
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="eventId" className="mb-1 font-semibold">Sự kiện</Label>
          <select
            id="eventId"
            className="w-full h-10 rounded-md border px-3 py-2 text-sm"
            value={watch('eventId') ?? ''}
            onChange={e => setValue('eventId', e.target.value)}
            disabled={isSubmitting}
          >
            <option value="" disabled>Chọn sự kiện</option>
            {events.map(event => (
              <option key={event.id} value={String(event.id)}>{event.name}</option>
            ))}
          </select>
          {errors.eventId && (
            <p className="text-sm text-red-500">{errors.eventId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="ticketType" className="mb-1 font-semibold">Loại vé</Label>
          <select
            id="ticketType"
            className="w-full h-10 rounded-md border px-3 py-2 text-sm"
            value={watch('name')}
            onChange={e => {
              const value = e.target.value as 'VIP' | 'STANDARD';
              setValue('name', value);
              if (value === 'VIP') setValue('price', 500000);
              else if (value === 'STANDARD') setValue('price', 200000);
            }}
            disabled={isSubmitting}
          >
            <option value="" disabled>Chọn loại vé</option>
            <option value="VIP">⭐ Vé VIP - Chỗ ngồi đẹp, ưu tiên</option>
            <option value="STANDARD">🎫 Vé Thường - Chỗ ngồi tiêu chuẩn</option>
          </select>
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Mô tả</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Nhập mô tả loại vé"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Giá vé (VNĐ)</Label>
            <Input
              id="price"
              type="number"
              {...register('price', { valueAsNumber: true })}
              placeholder={watchName === 'VIP' ? '500,000' : '200,000'}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Số lượng vé</Label>
            <Input
              id="quantity"
              type="number"
              {...register('quantity', { valueAsNumber: true })}
              placeholder="Nhập số lượng vé"
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="saleStartDate">Ngày bắt đầu bán</Label>
            <Input
              id="saleStartDate"
              type="date"
              {...register('saleStartDate')}
            />
            {errors.saleStartDate && (
              <p className="text-sm text-red-500">{errors.saleStartDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="saleEndDate">Ngày kết thúc bán</Label>
            <Input
              id="saleEndDate"
              type="date"
              {...register('saleEndDate')}
            />
            {errors.saleEndDate && (
              <p className="text-sm text-red-500">{errors.saleEndDate.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="active"
            {...register('active')}
          />
          <Label htmlFor="active">Đang bán</Label>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Hủy
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Đang lưu...' : mode === 'create' ? 'Thêm mới' : 'Cập nhật'}
          </Button>
        </div>
      </form>
    </Modal>
  );
} 