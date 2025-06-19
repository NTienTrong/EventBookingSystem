'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  Lock,
  Edit2,
  Key,
  MapPin,
  UserCircle,
  AlertCircle,
  CheckCircle,
  X,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Button } from '@/components/common';
import { authApi } from '@/services/api/auth';
import { customersApi } from '@/services/api/customers';
import { UserDTO, UpdateProfileRequest, ChangePasswordRequest } from '@/types/user';

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = await authApi.getCurrentUser();
        setProfile(currentUser);
        setFormData(prev => ({
          ...prev,
          fullName: currentUser.fullName || '',
          phoneNumber: currentUser.phoneNumber || '',
          address: currentUser.address || '',
        }));
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Không thể tải thông tin tài khoản');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateProfileForm = () => {
    if (!formData.fullName.trim()) {
      throw new Error('Vui lòng nhập họ tên');
    }
    if (!formData.phoneNumber.trim()) {
      throw new Error('Vui lòng nhập số điện thoại');
    }
    if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      throw new Error('Số điện thoại không hợp lệ');
    }
  };

  const validatePasswordForm = () => {
    if (!formData.currentPassword) {
      throw new Error('Vui lòng nhập mật khẩu hiện tại');
    }
    if (!formData.newPassword) {
      throw new Error('Vui lòng nhập mật khẩu mới');
    }
    if (formData.newPassword.length < 6) {
      throw new Error('Mật khẩu mới phải có ít nhất 6 ký tự');
    }
    if (formData.newPassword !== formData.confirmPassword) {
      throw new Error('Mật khẩu mới không khớp');
    }
  };

  const handleUpdateProfile = async () => {
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      validateProfileForm();

      const updateData: UpdateProfileRequest = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        address: formData.address || undefined,
      };

      const updatedUser = await customersApi.updateProfile(updateData);
      setProfile(updatedUser);
      setIsEditingProfile(false);
      setSuccess('Cập nhật thông tin thành công');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error instanceof Error ? error.message : 'Không thể cập nhật thông tin');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      validatePasswordForm();

      const changePasswordData: ChangePasswordRequest = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };

      await customersApi.changePassword(changePasswordData);

      setIsChangingPassword(false);
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      setSuccess('Đổi mật khẩu thành công');
    } catch (error) {
      console.error('Error changing password:', error);
      setError(error instanceof Error ? error.message : 'Không thể đổi mật khẩu');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900">Thông tin tài khoản</h1>
        <p className="text-gray-500 mt-1">Quản lý thông tin cá nhân và bảo mật tài khoản</p>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Thông tin cá nhân</h2>
          {!isEditingProfile && (
            <Button
              onClick={() => setIsEditingProfile(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Chỉnh sửa
            </Button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center text-red-600">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>{success}</span>
            </div>
          </div>
        )}

        {isEditingProfile ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Họ tên</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={() => setIsEditingProfile(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Hủy
              </Button>
              <Button
                onClick={handleUpdateProfile}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Họ tên</p>
                <p className="font-medium">{profile?.fullName}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Số điện thoại</p>
                <p className="font-medium">{profile?.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Địa chỉ</p>
                <p className="font-medium">{profile?.address || 'Chưa cập nhật'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Đổi mật khẩu</h2>
          {!isChangingPassword && (
            <Button
              onClick={() => setIsChangingPassword(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Key className="h-4 w-4 mr-2" />
              Đổi mật khẩu
            </Button>
          )}
        </div>

        {isChangingPassword && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={() => setIsChangingPassword(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Hủy
              </Button>
              <Button
                onClick={handleChangePassword}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {saving ? 'Đang lưu...' : 'Đổi mật khẩu'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 