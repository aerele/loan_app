export type FrappeCustomResponse<T> = {
  message: T;
};

export type FrappeRestApiResponse<T> = {
  data: T;
};

export type CustomApiMessage = {
  status: number;
  msg: string | unknown[];
};

async function postFrappe<T>(
  url: string,
  body: unknown
): Promise<FrappeCustomResponse<T>> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Request failed (${response.status}): ${text}`);
  }

  return (await response.json()) as FrappeCustomResponse<T>;
}

async function getFrappe<T>(url: string): Promise<FrappeRestApiResponse<T>> {
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Request failed (${response.status}): ${text}`);
  }

  return (await response.json()) as FrappeRestApiResponse<T>;
}

export const getNumberChecked = (number: string) => {
  return postFrappe<CustomApiMessage>(
    '/api/method/nomination.api.login.user_validation',
    { mobile_number: number }
  );
};

export const verifyOtpApi = (number: string, otp: string) => {
  return postFrappe<CustomApiMessage>(
    '/api/method/nomination.api.login.verify_user_otp',
    {
      mobile_number: number,
      otp,
    }
  );
};

export const validatAadhar = (aadhar_number: string) => {
  return postFrappe<CustomApiMessage>(
    '/api/method/nomination.api.form.validate_aadhare',
    {
      aadhaar_number: aadhar_number,
    }
  );
};

export const validatPan = (pan_number: string) => {
  return postFrappe<CustomApiMessage>(
    '/api/method/nomination.api.form.validate_pan',
    {
      pan_number: pan_number,
    }
  );
};
