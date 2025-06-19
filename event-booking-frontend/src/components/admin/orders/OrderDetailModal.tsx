'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Order } from '@/types/order';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { OrderStatus as OrderStatusEnum, PaymentStatus as PaymentStatusEnum } from '@/types/enums';

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onStatusChange: (orderId: number, status: OrderStatusEnum) => void;
  onPaymentStatusChange: (orderId: number, status: PaymentStatusEnum) => void;
  onCancel: (orderId: number) => void;
  onRefund: (orderId: number) => void;
}

export default function OrderDetailModal({
  isOpen,
  onClose,
  order,
  onStatusChange,
  onPaymentStatusChange,
  onCancel,
  onRefund
}: OrderDetailModalProps) {
  if (!order) return null;

  const statusStyles: Record<typeof OrderStatusEnum[keyof typeof OrderStatusEnum], string> = {
    [OrderStatusEnum.PENDING]: 'bg-yellow-100 text-yellow-800',
    [OrderStatusEnum.CONFIRMED]: 'bg-green-100 text-green-800',
    [OrderStatusEnum.CANCELLED]: 'bg-red-100 text-red-800',
    [OrderStatusEnum.REFUNDED]: 'bg-gray-100 text-gray-800',
    [OrderStatusEnum.COMPLETED]: 'bg-green-100 text-green-800',
  };

  const statusLabels: Record<typeof OrderStatusEnum[keyof typeof OrderStatusEnum], string> = {
    [OrderStatusEnum.PENDING]: 'Chờ xác nhận',
    [OrderStatusEnum.CONFIRMED]: 'Đã xác nhận',
    [OrderStatusEnum.CANCELLED]: 'Đã hủy',
    [OrderStatusEnum.REFUNDED]: 'Đã hoàn tiền',
    [OrderStatusEnum.COMPLETED]: 'Đã hoàn thành',
  };

  const paymentStatusStyles: Record<typeof PaymentStatusEnum[keyof typeof PaymentStatusEnum], string> = {
    [PaymentStatusEnum.PENDING]: 'bg-yellow-100 text-yellow-800',
    [PaymentStatusEnum.COMPLETED]: 'bg-green-100 text-green-800',
    [PaymentStatusEnum.FAILED]: 'bg-red-100 text-red-800',
    [PaymentStatusEnum.REFUNDED]: 'bg-gray-100 text-gray-800',
  };

  const paymentStatusLabels: Record<typeof PaymentStatusEnum[keyof typeof PaymentStatusEnum], string> = {
    [PaymentStatusEnum.PENDING]: 'Chờ thanh toán',
    [PaymentStatusEnum.COMPLETED]: 'Đã thanh toán',
    [PaymentStatusEnum.FAILED]: 'Thất bại',
    [PaymentStatusEnum.REFUNDED]: 'Đã hoàn tiền',
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Đóng</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-gray-900 mb-6">
                      Chi tiết đơn hàng #{order.orderNumber}
                    </Dialog.Title>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Thông tin đơn hàng */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Thông tin đơn hàng</h4>
                        <dl className="space-y-3">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Mã đơn hàng</dt>
                            <dd className="mt-1 text-sm text-gray-900">{order.orderNumber}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Ngày đặt</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Trạng thái</dt>
                            <dd className="mt-1">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[order.status]}`}>
                                {statusLabels[order.status]}
                              </span>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Trạng thái thanh toán</dt>
                            <dd className="mt-1">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${paymentStatusStyles[order.paymentStatus]}`}>
                                {paymentStatusLabels[order.paymentStatus]}
                              </span>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Phương thức thanh toán</dt>
                            <dd className="mt-1 text-sm text-gray-900">{order.paymentMethod || 'Chưa chọn'}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Mã giao dịch</dt>
                            <dd className="mt-1 text-sm text-gray-900">{order.transactionId || 'Chưa có'}</dd>
                          </div>
                        </dl>
                      </div>

                      {/* Thông tin khách hàng */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Thông tin khách hàng</h4>
                        <dl className="space-y-3">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="mt-1 text-sm text-gray-900">{order.customerEmail}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    {/* Chi tiết sản phẩm */}
                    <div className="mt-8">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Chi tiết sản phẩm</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Loại vé
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Số lượng
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Đơn giá
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thành tiền
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {order.orderItems.map((item) => (
                              <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {item.ticketTypeName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {item.quantity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                  }).format(item.unitPrice)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                  }).format(item.subtotal)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                                Tổng cộng:
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {new Intl.NumberFormat('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND'
                                }).format(order.totalAmount)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex justify-end space-x-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={onClose}
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 