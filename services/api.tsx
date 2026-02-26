export type FrappeResponse<T> = {
  message: T;
};

export type ApiMessage = {
  status: number;
  msg: string;
};

async function postFrappe<T>(
  url: string,
  body: unknown
): Promise<FrappeResponse<T>> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Request failed (${response.status}): ${text}`);
  }

  return (await response.json()) as FrappeResponse<T>;
}

export const getNumberChecked = (number: string) => {
  return postFrappe<ApiMessage>(
    '/api/method/nomination.api.login.user_validation',
    { mobile_number: number }
  );
};

export const verifyOtpApi = (number: string, otp: string) => {
  return postFrappe<ApiMessage>(
    '/api/method/nomination.api.login.verify_user_otp',
    {
      mobile_number: number,
      otp,
    }
  );
};

export const validatAadhar = (aadhar_number: string) => {
  return postFrappe<ApiMessage>(
    '/api/method/nomination.api.form.validate_aadhare',
    {
      aadhaar_number: aadhar_number,
    }
  );
};

export const validatPan = (pan_number: string) => {
  return postFrappe<ApiMessage>(
    '/api/method/nomination.api.form.validate_pan',
    {
      pan_number: pan_number,
    }
  );
};
