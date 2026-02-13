import { Suspense } from 'react';
import ViewFormContent from '@/components/nomination/ViewFormContent';

export default async function ViewFormPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const params = await searchParams;
  const view = params.view === 'true';

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewFormContent view={view} />
    </Suspense>
  );
}
