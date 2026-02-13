'use client';

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { Typography } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

type Step = {
  title: string;
  subtitle?: string;
  active?: boolean;
};

type Props = {
  steps: Step[];
};

function NextTimeline({ steps }: Props) {
  return (
    <Timeline
      position="right"
      sx={{
        p: 0,
        m: 0,
        '& .MuiTimelineItem-root:before': {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {steps.map((step, index) => {
        const iconList = [
          <GroupsIcon key="groups-icon" />,
          <ApartmentIcon key="apartment-icon" />,
          <AccountBalanceIcon key="account-icon" />,
        ];

        const isActive = step.active;

        return (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  bgcolor: isActive ? '#000' : '#E5E7EB',
                  color: isActive ? '#fff' : '#6B7280',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {iconList[index]}
              </TimelineDot>

              {index !== steps.length - 1 && (
                <TimelineConnector
                  sx={{
                    bgcolor: '#98999c',
                    width: 2,
                    height: '2rem',
                  }}
                />
              )}
            </TimelineSeparator>

            <TimelineContent sx={{ py: 1 }}>
              <Typography fontWeight={600} fontSize={14}>
                {step.title}
              </Typography>

              {step.subtitle && (
                <Typography fontSize={12} color="#6B7280">
                  {step.subtitle}
                </Typography>
              )}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}

export default NextTimeline;
