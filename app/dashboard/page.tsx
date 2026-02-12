'use client';

import { Box } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import UserHeader from '@/components/header/UserHeader';
import AppHeader from '@/components/header/Appheader';
import CreateNominationBox from '@/components/nomination/CreateNominationBox';
import StatsButtons from '@/components/nomination/StatsButtons';
import NominationCard from '@/components/nomination/NominationCard';
import Title1 from '@/components/Titel1';
import hi from '@/messages/hi.json';
import en from '@/messages/en.json';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ApprovedCard from '@/components/nomination/ApprovedCard';
import { BorderColor } from '@mui/icons-material';
function DashboardPage() {
  const [show, setShow] = useState({
    submitted: true,
    training: false,
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [canReview, setCanReview] = useState(false);
  const [showPending, setShowPending] = useState(true);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowScrollTop(container.scrollTop > 200);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [nominations] = useState([
    { name: 'Ravi', id: 'ID-001', amount: 5000, type: 'Type 1' },
    { name: 'Meena', id: 'ID-002', amount: 12000, type: 'Type 1' },
    { name: 'Kumar', id: 'ID-003', amount: 8000, type: 'Type 1' },
    { name: 'Anjali', id: 'ID-004', amount: 15000, type: 'Type 1' },
    { name: 'Vikram', id: 'ID-005', amount: 2500, type: 'Type 1' },
    { name: 'Sonia', id: 'ID-006', amount: 9500, type: 'Type 1' },
    { name: 'Rahul', id: 'ID-007', amount: 4200, type: 'Type 1' },
    { name: 'Priya', id: 'ID-008', amount: 11000, type: 'Type 1' },
    { name: 'Arjun', id: 'ID-009', amount: 7000, type: 'Type 1' },
    { name: 'Neha', id: 'ID-010', amount: 13500, type: 'Type 1' },
  ]);

  const [approved] = useState([
    { name: 'Ravi', id: 'ID-001', amount: 5000, type: 'Type 1' },
    { name: 'Meena', id: 'ID-002', amount: 12000, type: 'Type 1' },
    { name: 'Kumar', id: 'ID-003', amount: 8000, type: 'Type 1' },
    { name: 'Anjali', id: 'ID-004', amount: 15000, type: 'Type 1' },
    { name: 'Vikram', id: 'ID-005', amount: 2500, type: 'Type 1' },
    { name: 'Sonia', id: 'ID-006', amount: 9500, type: 'Type 1' },
    { name: 'Rahul', id: 'ID-007', amount: 4200, type: 'Type 1' },
    { name: 'Priya', id: 'ID-008', amount: 11000, type: 'Type 1' },
    { name: 'Arjun', id: 'ID-009', amount: 7000, type: 'Type 1' },
    { name: 'Neha', id: 'ID-010', amount: 13500, type: 'Type 1' },
  ]);
  const handleStatsChange = (type: 'submitted' | 'training') => {
    setShow({
      submitted: type === 'submitted',
      training: type === 'training',
    });

    setShowPending(type === 'submitted' ? true : false);
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
        <AppHeader showUser userName={'स्वाति दीक्षित'} />
      </Box>

      <Box
        ref={scrollRef}
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: 0,
            display: 'none',
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <CreateNominationBox />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <StatsButtons
                h1={hi.dashboard.submitted_nominatio}
                h2={en.dashboard.submitted_nominatio}
                count={12}
                show={show.submitted}
                onClick={() => handleStatsChange('submitted')}
              />

              <StatsButtons
                h1={hi.dashboard.training}
                h2={en.dashboard.training}
                count={32}
                show={show.training}
                onClick={() => handleStatsChange('training')}
              />
            </Box>

            {showPending
              ? nominations.length > 0
                ? nominations.map((item) => (
                    <NominationCard
                      key={item.id}
                      data={item}
                      canReview={canReview}
                    />
                  ))
                : NoData
              : approved.length > 0
                ? nominations.map((item) => (
                    <ApprovedCard
                      key={item.id}
                      data={item}
                      canReview={canReview}
                    />
                  ))
                : NoData}
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
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          }}
        >
          <ArrowDropUpIcon sx={{ fontSize: 32 }} />
        </Box>
      )}
    </Box>
  );
}

export default DashboardPage;
