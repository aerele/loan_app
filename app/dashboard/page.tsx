'use client';

import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import AppHeader from '@/components/header/Appheader';
import CreateNominationBox from '@/components/nomination/CreateNominationBox';
import StatsButtons from '@/components/nomination/StatsButtons';
import NominationCard from '@/components/nomination/NominationCard';
import Title1 from '@/components/Titel1';
import hi from '@/messages/hi.json';
import en from '@/messages/en.json';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ApprovedCard from '@/components/nomination/ApprovedCard';
import { getUserRoles } from '../utils/user';
import { addToast } from '@/components/error/toastStore';
import { getNominationsform } from '@/services/api';

type ShowState = {
  submitted: boolean;
  training: boolean;
};

type NominationItem = {
  name: string;
  id: string;
  amount: number;
  type: string;
};

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null;

const toNominationItem = (v: unknown): NominationItem | null => {
  if (!isRecord(v)) return null;

  const name = typeof v.name === 'string' ? v.name : '';
  const id = typeof v.id === 'string' ? v.id : '';
  const amount =
    typeof v.amount === 'number'
      ? v.amount
      : typeof v.amount === 'string'
        ? Number(v.amount)
        : 0;
  const type = typeof v.type === 'string' ? v.type : '';

  if (!id) return null;

  return {
    name,
    id,
    amount: Number.isFinite(amount) ? amount : 0,
    type,
  };
};

export default function DashboardPage() {
  const [show, setShow] = useState<ShowState>({
    submitted: true,
    training: false,
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [roles, setRoles] = useState<string[]>([]);
  const [canReview, setCanReview] = useState(false);

  const [showPending, setShowPending] = useState(true);

  const [loadingNominations, setLoadingNominations] = useState(false);
  const [nominations, setNominations] = useState<NominationItem[]>([]);
  const [approved, setApproved] = useState<NominationItem[]>([]);
  const [disableCreation, setDisableCreation] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowScrollTop(container.scrollTop > 200);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const r = await getUserRoles();
        if (!mounted) return;

        setRoles(r);
        setCanReview(r.includes('CLF') || r.includes('VO'));
        setDisableCreation(!r.includes('SHG'));
      } catch {}
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoadingNominations(true);

        const res = await getNominationsform();
        const msg = res.message.msg;

        const items: NominationItem[] = Array.isArray(msg)
          ? msg
              .map((x) => toNominationItem(x))
              .filter((x): x is NominationItem => x !== null)
          : [];

        if (!mounted) return;

        setNominations(items);
        setApproved([]);
      } catch {
        addToast({
          type: 'error',
          hi: 'नामांकन लोड नहीं हो पाया',
          en: 'Failed to load nominations',
        });
      } finally {
        if (mounted) setLoadingNominations(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStatsChange = (type: 'submitted' | 'training') => {
    setShow({
      submitted: type === 'submitted',
      training: type === 'training',
    });

    setShowPending(type === 'submitted');
  };

  const NoData = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 10,
      }}
    >
      <Title1
        h1={hi.dashboard.no_data}
        h2={en.dashboard.no_data}
        boxStyle={{ alignItems: 'center' }}
        h1style={{ fontSize: '0.8rem', fontWeight: 600 }}
        h2style={{ fontWeight: 300, fontSize: '0.7rem' }}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#F3F4F6',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <AppHeader showUser userName="स्वाति दीक्षित" />
      </Box>

      <Box
        ref={scrollRef}
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          '&::-webkit-scrollbar': { width: 0, display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <CreateNominationBox disable={disableCreation} />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <StatsButtons
                h1={hi.dashboard.submitted_nominatio}
                h2={en.dashboard.submitted_nominatio}
                count={nominations.length}
                show={show.submitted}
                onClick={() => handleStatsChange('submitted')}
              />

              <StatsButtons
                h1={hi.dashboard.training}
                h2={en.dashboard.training}
                count={approved.length}
                show={show.training}
                onClick={() => handleStatsChange('training')}
              />
            </Box>
            {loadingNominations ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  py: 6,
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    border: '4px solid #E5E7EB',
                    borderTopColor: '#111111',
                    animation: 'spin 1s linear infinite',
                  }}
                />
                <style jsx>{`
                  @keyframes spin {
                    to {
                      transform: rotate(360deg);
                    }
                  }
                `}</style>
              </Box>
            ) : showPending ? (
              nominations.length > 0 ? (
                nominations.map((item) => (
                  <NominationCard
                    key={item.id}
                    data={item}
                    canReview={canReview}
                  />
                ))
              ) : (
                NoData
              )
            ) : approved.length > 0 ? (
              approved.map((item) => (
                <ApprovedCard key={item.id} data={item} canReview={canReview} />
              ))
            ) : (
              NoData
            )}
          </Box>
        </Box>
      </Box>

      {showScrollTop && (
        <Box
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            width: 44,
            height: 44,
            borderRadius: '50%',
            backgroundColor: '#000',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1000,
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            transition: '0.2s',
            '&:hover': { transform: 'translateY(-2px)' },
          }}
        >
          <ArrowDropUpIcon sx={{ fontSize: 32 }} />
        </Box>
      )}
    </Box>
  );
}
