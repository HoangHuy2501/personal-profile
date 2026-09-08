'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { trackVisit } from '../../services/VisitorServices';
import { toast } from 'sonner';
export default function VisitorTracker({ enabled }: { enabled: boolean }) {
  const pathname = usePathname() || '';
  const [choice, setChoice] = useState<'pending' | 'yes' | 'no'>('pending');
  useEffect(() => { if (!enabled || !pathname.match(/^\/(en|vi)(?:\/|$)/) || pathname.includes('/visitor-map')) return; const saved = localStorage.getItem('visitor-consent'); if (saved === 'no') { setChoice('no'); return; } if (saved === 'yes') { setChoice('yes'); let id = sessionStorage.getItem('visitor-session-id'); if (!id) { id = crypto.randomUUID(); sessionStorage.setItem('visitor-session-id', id); void trackVisit(id).catch(() => undefined); } } }, [enabled, pathname]);
  if (!enabled || choice !== 'pending' || pathname.includes('/visitor-map')) return null;
  return <aside className="tracking-notice text-text-light dark:text-text-dark" role="status"><p>Website ghi nhận khu vực truy cập gần đúng để thống kê. Không thu GPS hoặc lưu địa chỉ IP thô.</p><p className="text-xs mt-1">This site estimates visitor region for statistics. No GPS or raw IP is stored.</p><div className="flex gap-2 mt-3"><button className="mint-button" onClick={() => { localStorage.setItem('visitor-consent', 'yes'); setChoice('yes'); const id = crypto.randomUUID(); sessionStorage.setItem('visitor-session-id', id); void trackVisit(id).then(() => toast.success('Visitor statistics enabled')).catch(() => toast.error('Could not record visit')); }}>Cho phép / Allow</button><button className="text-link" onClick={() => { localStorage.setItem('visitor-consent', 'no'); setChoice('no'); toast.message('Visitor statistics disabled'); }}>Tắt / Disable</button></div></aside>;
}
