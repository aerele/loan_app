'use client';

import { Box } from '@mui/material';
import NominationCard from './NominationCard';
import NominationCard2 from './NominationCard2';

type NominationData = {
  name: string;
  id: string;
  amount: number;
  type: string;
};

type cardValue = {
  data: NominationData;
  canReview: boolean;
};

function ApprovedCard({ data, canReview }: cardValue) {
  return (
    <Box>
      {canReview ? (
        <Box>
          <NominationCard
            key={data?.id}
            data={data}
            canReview={false}
            cardSx={{ borderLeft: '4px' }}
            approvedSx={{ backgroundColor: '#D1D5DB' }}
          />
        </Box>
      ) : (
        <Box>
          <NominationCard2 key={data?.id} data={data} />
        </Box>
      )}
    </Box>
  );
}

export default ApprovedCard;
