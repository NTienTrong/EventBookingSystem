import { useState, useEffect } from 'react';
import { Button } from '@/components/common';
import { User } from '@/types/user';
import { usersApi } from '@/services/api/users';
import UserDetailModal from './UserDetailModal';
import { DeleteConfirmModal } from '../common/DeleteConfirmModal';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Eye, Trash2, Lock, Unlock } from 'lucide-react';
import toast from 'react-hot-toast';

type StatusFilter = 'all' | 'active' | 'inactive';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await usersApi.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách người dùng');
      console.error('Error loading users:', err);
      toast.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      await usersApi.deleteUser(userToDelete.id.toString());
      await loadUsers();
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      toast.success(`Đã xóa người dùng "${userToDelete.username}" thành công`);
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Không thể xóa người dùng');
      toast.error('Không thể xóa người dùng. Vui lòng thử lại sau.');
    }
  };

  const handleToggleStatus = async (user: User) => {
    try {
      await usersApi.updateUserStatus(user.id.toString(), !user.isActive);
      await loadUsers();
      toast.success(
        user.isActive
          ? `Đã khóa tài khoản "${user.username}"`
          : `Đã mở khóa tài khoản "${user.username}"`
      );
    } catch (err) {
      console.error('Error updating user status:', err);
      toast.error('Không thể cập nhật trạng thái tài khoản. Vui lòng thử lại sau.');
    }
  };

  const filteredUsers = users.filter((user) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') return user.isActive;
    if (statusFilter === 'inactive') return !user.isActive;
    return true;
  });

  if (loading) {
    return <div className="text-center py-4">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Trạng thái:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="all">Tất cả</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Đã khóa</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên đăng nhập
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Họ tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vai trò
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày tạo
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role === 'ADMIN' ? 'Quản trị viên' : 'Người dùng'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.isActive ? 'Đang hoạt động' : 'Đã khóa'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(user.createdAt), 'dd/MM/yyyy', { locale: vi })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(user)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleStatus(user)}
                      className={user.isActive ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}
                      title={user.isActive ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                    >
                      {user.isActive ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <Unlock className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(user)}
                      className="text-red-600 hover:text-red-800"
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

      <UserDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onReload={loadUsers}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setUserToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Xác nhận xóa người dùng"
        message={`Bạn có chắc chắn muốn xóa người dùng "${userToDelete?.username}"? Hành động này không thể hoàn tác.`}
      />
    </div>
  );
} 