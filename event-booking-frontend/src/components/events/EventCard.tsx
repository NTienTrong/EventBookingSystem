import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils/dateTime';
import { Button } from '@/components/common';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  price: number;
  category: string;
}

export const EventCard = ({
  id,
  title,
  description,
  image,
  date,
  time,
  location,
  price,
  category,
}: EventCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
          {category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{formatDate(date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{formatTime(time)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-indigo-600 font-semibold">
            {price.toLocaleString('vi-VN')} VNĐ
          </div>
          <Link href={`/events/${id}`}>
            <Button variant="outline" size="sm">
              Xem chi tiết
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}; 