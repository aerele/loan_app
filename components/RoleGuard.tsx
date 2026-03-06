'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getUserRoles } from '@/app/utils/user';

type Props = {
  children: React.ReactNode;
};

export default function RoleGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      try {
        if (pathname === '/login') {
          setAllowed(true);
          setLoading(false);
          return;
        }

        const roles = await getUserRoles();

        const hasAllowedRole =
          roles.includes('CLF') ||
          roles.includes('VO') ||
          roles.includes('SHG');

        if (!hasAllowedRole && pathname !== '/no-permission') {
          router.replace('/no-permission');
          return;
        }

        if (hasAllowedRole && pathname === '/no-permission') {
          router.replace('/dashboard');
          return;
        }

        setAllowed(true);
      } catch {
        router.replace('/no-permission');
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, [pathname, router]);

  if (loading) return null;
  if (!allowed) return null;

  return <>{children}</>;
}
