import Modal from '@/components/common/Modal';
import { Button } from '@/components/common';
import { User } from '@/types/user';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onReload?: () => void;
}

export default function UserDetailModal({ isOpen, onClose, user, onReload }: UserDetailModalProps) {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-semibold">Chi tiết người dùng</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Họ tên</h3>
              <p className="mt-1 text-lg font-medium">{user.fullName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Số điện thoại</h3>
              <p className="mt-1 text-lg font-medium">{user.phoneNumber || 'Chưa cập nhật'}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Vai trò</h3>
              <p className="mt-1 text-lg font-medium">
                {user.role === 'ADMIN' ? 'Quản trị viên' : 'Người dùng'}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Ngày tạo</h3>
              <p className="mt-1 text-lg font-medium">
                {format(new Date(user.createdAt), 'HH:mm - dd/MM/yyyy', { locale: vi })}
              </p>
            </div>
            {user.lastLoginAt && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Lần đăng nhập cuối</h3>
                <p className="mt-1 text-lg font-medium">
                  {format(new Date(user.lastLoginAt), 'HH:mm - dd/MM/yyyy', { locale: vi })}
                </p>
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-lg font-medium">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button onClick={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  );
} 