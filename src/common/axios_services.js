import Jwt_decrypt from './Jwt_decrypt';
import axiosCall from './axios_call';

const signIn = async (data) => {
  return axiosCall.post('/auth/login', data);
};

const pay_checkout = async ({ data }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post('/transactions/initiate_payments', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    return axiosCall.post('/transactions/initiate_payments', data, {
      headers: { Authorization: 'Bearer' },
    });
  }
};

export const logout_user = async () => {
  const jwt_token = localStorage.konnect_token;

  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post('/auth/logout', {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    return axiosCall.post('/auth/logout', {
      headers: { Authorization: 'Bearer' },
    });
  }
};

export const _change_password_email = async ({ email }) => {
  return axiosCall.post('/auth/forgot-password', { email });
};

export const _verify_passcode = async ({ email, passcode, type }) => {
  return axiosCall.post('/auth/verify/pass_code', {
    email,
    pass_code: passcode,
    type,
  });
};

export const _verify_email_code = async ({ email, passcode }) => {
  return axiosCall.post('/auth/confirm-email/pass_code', {
    email,
    pass_code: passcode,
  });
};

export const _checkout_summary = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post('/transactions/checkout_summery', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    return axiosCall.post('/transactions/checkout_summery', data, {
      headers: { Authorization: 'Bearer' },
    });
  }
};
export const _request_update_email = async (data, id) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/auth/user/${id}/request-change-email`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    return axiosCall.post(`/auth/user/${id}/request-change-email`, data, {
      headers: { Authorization: 'Bearer' },
    });
  }
};
export const _reset_email_passcode = async (data, id) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(`/auth/user/${id}/change-email`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    return axiosCall.patch(`/auth/user/${id}/change-email`, data, {
      headers: { Authorization: 'Bearer' },
    });
  }
};
export const _shop_discount = async ({ sub_amount }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(
      '/rate-settings/shop_discout',
      { sub_amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } else {
    return axiosCall.post(
      '/rate-settings/shop_discout',
      { sub_amount },
      { headers: { Authorization: 'Bearer' } }
    );
  }
};

export const _change_order_status = async ({ id, status }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(
      `/orders/${id}/change_status`,
      { status },
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall.patch(
      `/orders/${id}/change_status`,
      { status },
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};
export const _cancelation_fee = async ({ id }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(
      `/orders/calcelation_charge/${id}`,
      {},
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall.patch(
      `/orders/calcelation_charge/${id}`,
      {},
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};
export const _get_cms_page = async ({ page }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/cms/page/${page}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/cms/page/${page}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _balance_up = async ({ payment_mode, transaction_id }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(
      `/transactions/balance_payments`,
      {
        payment_mode,
        transaction_id,
      },
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall.post(
      `/transactions/balance_payments`,
      {
        payment_mode,
        transaction_id,
      },
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};
export const _order_status_change = async ({ id, status }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(
      `/orders/calcel_order/${id}`,
      { status },
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall.patch(
      `/orders/calcel_order/${id}`,
      { status },
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};

export const _recruit_so = async ({ address, recruitId }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(
      `/admin/user/invite_so/${recruitId}`,
      { address },
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall.patch(
      `/admin/user/invite_so/${recruitId}`,
      { address },
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};

export const _verify_pin = async ({ pin }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/admin/user/confirm-pin/${pin}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    return axiosCall(`/admin/user/confirm-pin/${pin}`, {
      headers: { Authorization: 'Bearer' },
    });
  }
};
const _get_profile = async () => {
  const jwt_token = localStorage.konnect_token;
  const appRole = 'user';
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.get(`/auth/profile?app=${appRole}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.get(`/auth/profile?app=${appRole}`, {
      headers: { Authorization: 'Bearer' },
    });
  }
};

const _get_all_referrals = async ({ page, page_size, category }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(
      `/referral/user?page=${page}&per_page=${page_size}&category=${category}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall(
      `/referral/user?page=${page}&per_page=${page_size}&category=${category}`,
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};
export const _get_sa_report = async ({ page, page_size, search, from, to }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(
      `/sales-reps/user/sa_report?page=${page}&per_page=${page_size}&search=${search}&from=${from}&to=${to}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall(
      `/sales-reps/user/sa_report?page=${page}&per_page=${page_size}&search=${search}&from=${from}&to=${to}`,
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};
export const _get_all_sl_sa = async ({ page, page_size, search, from, to }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(
      `/sales-reps/sl/sa_users?page=${page}&per_page=${page_size}&search=${search}&from=${from}&to=${to}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall(
      `/sales-reps/sl/sa_users?page=${page}&per_page=${page_size}&search=${search}&from=${from}&to=${to}`,
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};
export const _get_all_sa_so = async ({ page, page_size, search, from, to }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(
      `/sales-reps/sa/so_users?page=${page}&per_page=${page_size}&search=${search}&from=${from}&to=${to}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall(
      `/sales-reps/sa/so_users?page=${page}&per_page=${page_size}&search=${search}&from=${from}&to=${to}`,
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};
export const _get_all_transaction_data = async ({ page, page_size }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/transactions/user?page=${page}&per_page=${page_size}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/transactions/user?page=${page}&per_page=${page_size}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _get_all_account_details = async ({ page, page_size }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/account/details?page=${page}&per_page=${page_size}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/account/details?page=${page}&per_page=${page_size}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _check_ref = async ({ refCode }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/admin/user/ref_code/${refCode}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/admin/user/ref_code/${refCode}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _sales_matrix = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/sales-reps/user/metrix`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/sales-reps/user/metrix`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _invite_recuit = async ({ refCode }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(
      `/admin/user/invite_sa/${refCode}`,
      {},
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall.patch(
      `/admin/user/invite_sa/${refCode}`,
      {},
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};
export const _update_user_type = async ({ status }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(
      `/admin/user/become_ra`,
      { status },
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall.patch(
      `/admin/user/become_ra`,
      { status },
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};
export const _cancel_konnect_request = async ({ id }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(
      `/transfer/konnect_tranfer_approval/${id}`,
      { status: 'cancel' },
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall.patch(
      `/transfer/konnect_tranfer_approval/${id}`,
      { status: 'cancel' },
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};
export const _activate_sa = async ({ status, refId }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(
      `/admin/user/activate_sales_user`,
      {
        status,
        ref_id: refId,
      },
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall.post(
      `/admin/user/activate_sales_user`,
      {
        status,
        ref_id: refId,
      },
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};
export const _validate_referral_code = async ({ code }) => {
  return axiosCall(`/auth/validate_referal_code/${code}`);
};

const _confirm_user_transfer_pin = async (pin) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/admin/user/confirm-pin/${pin}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/admin/user/confirm-pin/${pin}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _get_user_wallet_history = async ({
  page,
  page_size,
  account_type,
  is_resturant_history,
}) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(
      `/user-dashboard/account_history?search=&page=${page}&per_page=${page_size}&account_type=${account_type}&is_resturant_history=${is_resturant_history}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall(
      `/user-dashboard/account_history?search=&page=${page}&per_page=${page_size}&account_type=${account_type}&is_resturant_history=${is_resturant_history}`,
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};
export const _get_konnect_request = async ({ page, page_size }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(
      `/transfer/user/konnect_tranfer_request?search=&page=${page}&per_page=${page_size}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall(
      `/transfer/user/konnect_tranfer_request?search=&page=${page}&per_page=${page_size}`,
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};

const _get_saved_address = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/delivery-addresses/user`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/delivery-addresses/user`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _add_delivery_address = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/delivery-addresses`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/delivery-addresses`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _bank_verification = async ({ account_bank, account_number }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(
      `/beneficiaries/verify_account_number/${account_bank}/${account_number}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall(
      `/beneficiaries/verify_account_number/${account_bank}/${account_number}`,
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};

export const _account_number_verification = async ({ account_number }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.get(`/wallet/verify_user_account/${account_number}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.get(`/wallet/verify_user_account/${account_number}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _get_wallet_lookup_by_account_id = async (account_id) => {
  const jwt_token = localStorage.konnect_token;
  let token = '';
  if (jwt_token) {
    token = Jwt_decrypt({ token: jwt_token });
  }
  return axiosCall.get(`/transfer/account-lookup/${account_id}`, {
    headers: { Authorization: 'Bearer ' + token },
  });
};

const _wallet_verification = async ({ ref }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.get(`/admin/user/ref_code/${ref}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.get(`/admin/user/ref_code/${ref}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _payout_internal = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/transfer/wallet_to_wallet`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/transfer/wallet_to_wallet`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
const _payout = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/transfer/nip`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/transfer/nip`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _get_referral_pool = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/user-profile/referal_pool`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/user-profile/referal_pool`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _get_beneficiaries = async ({ type }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/beneficiaries/user?type=${type}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/beneficiaries/user?type=${type}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _delivery_info = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/delivery-fees/shop_order`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/delivery-fees/shop_order`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _checkout_data = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.get(`/general-settings/1`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.get(`/general-settings/1`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _general_settings_by_id = async ({ id }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.get(`/general-settings/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.get(`/general-settings/${id}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _change_password = async ({
  current_password,
  new_password,
  confirm_new_password,
}) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(
      `/admin/user/change-password`,
      {
        current_password,
        new_password,
        confirm_new_password,
      },
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall.patch(
      `/admin/user/change-password`,
      {
        current_password,
        new_password,
        confirm_new_password,
      },
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};

export const _update_password = async ({
  id,
  new_password,
  confirm_new_password,
  token,
  type,
}) => {
  return axiosCall.patch(`/auth/reset-password/${token}`, {
    id,
    new_password,
    confirm_new_password,
    type,
  });
};

export const _get_user_notification = async ({ page, per_page }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/notifications/user?page=${page}&per_page=${per_page}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/notifications/user?page=${page}&per_page=${per_page}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _update_profile = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(`/auth/profile`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.patch(`/auth/profile`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _update_2fa_verification = async ({ value }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(
      `/admin/user/change_login_2fa`,
      { status: value },
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall.patch(
      `/admin/user/change_login_2fa`,
      { status: value },
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};

const _verify_2fa = async ({ otp }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/auth/confirm-otp-staus/${otp}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/auth/confirm-otp-staus/${otp}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _update_trans_pin = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(`/auth/change-transaction-pin`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.patch(`/auth/change-transaction-pin`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _update_so_nod = async ({ id, selectedDate }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(
      `/sales-reps/update_next_order_date/${id}`,
      { next_order_date: selectedDate },
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall.patch(
      `/sales-reps/update_next_order_date/${id}`,
      { next_order_date: selectedDate },
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};

const _calc_commission = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/rate-settings/transaction_fees`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/rate-settings/transaction_fees`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _wise9ja_topup = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/transactions/initiate_payments`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/transactions/initiate_payments`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _rate_setting_by_id = async ({ id }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.get(`/rate-settings/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.get(`/rate-settings/${id}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _generate_otp = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/auth/generate_otp`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/auth/generate_otp`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _get_all_banks = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/beneficiaries/banks`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/beneficiaries/banks`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _verify_otp = async ({ otp }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/auth/confirm-otp-staus/${otp}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/auth/confirm-otp-staus/${otp}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _get_cities_by_state_code = async (
  state_code = 'LA',
  keyword = ''
) => {
  return axiosCall(`/cities?state_code=${state_code}&keyword=${keyword}`);
};

const _get_all_state = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/states/no_pagination`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/states/no_pagination`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _single_product = async ({ id }) => {
  return axiosCall(`/products/${id}`);
};
export const _all_product = async ({ page, per_page, search }) => {
  return axiosCall(
    `/products/no_pagination?page=${page}&per_page=${per_page}&search=${search}`
  );
};
const _get_search_product = async ({ page, page_size, search }) => {
  return axiosCall(
    `/products?page=${page}&per_page=${page_size}&search=${search}`
  );
};

const _get_all_cities = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/cities/no_pagination`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/cities/no_pagination`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _get_all_pickup_locations = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/locations/no_pagination`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/locations/no_pagination`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _get_selected_delivery_location = async ({ id }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/delivery-addresses/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/delivery-addresses/${id}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _get_selected_pickup_location = async ({ id }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/locations/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/locations/${id}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _get_all_invoice = async ({ page, page_size }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/invoice/user?page=${page}&per_page=${page_size}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/invoice/user?page=${page}&per_page=${page_size}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _get_all_sales_orders = async ({ page, page_size, ref_id }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(
      `sales-reps/sa/so_users/transaction_history/${ref_id}?page=${page}&per_page=${page_size}&from=&to=`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall(
      `sales-reps/sa/so_users/transaction_history/${ref_id}?page=${page}&per_page=${page_size}&from=&to=`,
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};
export const _get_all_orders = async ({ page, page_size }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/orders/user?page=${page}&per_page=${page_size}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/orders/user?page=${page}&per_page=${page_size}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _get_bonus_history = async ({ page, page_size }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(
      `/user-dashboard/bonus_account_history?page=${page}&per_page=${page_size}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall(
      `/user-dashboard/bonus_account_history?page=${page}&per_page=${page_size}`,
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};

export const _delete_cooking_area_image = async (restaurant_id, image_id) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.delete(`/restaurant/${restaurant_id}/image/${image_id}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.delete(`/restaurant/${restaurant_id}/image/${image_id}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _delete_menu_image = async (menu_id, image_id) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.delete(`/menu/${menu_id}/image/${image_id}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.delete(`/menu/${menu_id}/image/${image_id}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _delete_menu_ = async (menu_id) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.delete(`/menu/${menu_id}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.delete(`/menu/${menu_id}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _complete_wise9ja_payment = async (e) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/wisenija-subs`, e, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/wisenija-subs`, e, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _fetch_wise9ja_plans = async (e) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/wisenija-subs/generate_sub_plan`, e, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/wisenija-subs/generate_sub_plan`, e, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _fetch_user_wise9ja_data = async ({ page_no, page_size }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(
      `/wisenija-subs/user?page=${page_no}&per_page=${page_size}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall(
      `/wisenija-subs/user?page=${page_no}&per_page=${page_size}`,
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};
export const _get_user_account_history = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/user-dashboard/loyalty_account`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/user-dashboard/loyalty_account`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _get_user_wallet_account = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/wallet/user_wallet`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/wallet/user_wallet`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _fetch_wallet_data = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/wallet-history`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/wallet-history`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _fetch_user_wallet_data = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/user-dashboard/account_balance`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/user-dashboard/account_balance`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _fetch_user_dashboard_data = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });

  } else {

  }
};

export const _fetch_user_wisenija_history = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/user-dashboard/wisenija_history`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/user-dashboard/wisenija_history`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _fetch_bank_list = async (country) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/transfer/banks/${country}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/transfer/banks/${country}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _verfy_account_datas = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post('/user-profile/complete_kyc', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    return axiosCall.post('/user-profile/complete_kyc', data, {
      headers: { Authorization: 'Bearer' },
    });
  }
};
export const _verify_user_info = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch('/admin/user/complete_basic_info', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    return axiosCall.patch('/admin/user/complete_basic_info', data, {
      headers: { Authorization: 'Bearer' },
    });
  }
};

export const _complete_bank_transfer = async (req) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/transfer/initiat`, req, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/transfer/initiat`, req, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _verify_user_bank_account = async (e) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/transfer/banks_account/verification`, e, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/transfer/banks_account/verification`, e, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _fund_user_wallet = (req) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/transactions/found_wallet`, req, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/transactions/found_wallet`, req, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _buy_airtime = (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/bills/buy_airtime`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/bills/buy_airtime`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _buy_data = (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/bills/buy_data`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/bills/buy_data`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _buy_tv = (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/bills/buy_television`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/bills/buy_television`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _buy_electricity = (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/bills/buy_electricity`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/bills/buy_electricity`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _validate_cards = ({ product_slug, customer_id }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(
      `/bills/validate_customer/${product_slug}/${customer_id}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall(
      `/bills/validate_customer/${product_slug}/${customer_id}`,
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};
export const _get_order = async ({ trxt_ref }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/orders/transaction_ref/${trxt_ref}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/orders/transaction_ref/${trxt_ref}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _get_sales_order = async ({ trxt_ref }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/orders/so/${trxt_ref}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/orders/so/${trxt_ref}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
const _get_invoice = async ({ trxt_ref }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/invoice/transaction_ref/${trxt_ref}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/invoice/transaction_ref/${trxt_ref}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _get_all_dates = async ({ payment_opt }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(
      `/delivery-date/available_dates?payment_opt=${payment_opt}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall(
      `/delivery-date/available_dates?payment_opt=${payment_opt}`,
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};

const _verify_transactions = async ({ reference }) => {
  const jwt_token = localStorage.konnect_token;
  const token = Jwt_decrypt({ token: jwt_token });
  return axiosCall(`/transactions/verify_payment_callback/${reference}`, {
    headers: { Authorization: 'Bearer ' + token },
  });
};

export const _get_vendor_restaurant = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/restaurant`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/restaurant`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _update_restaurant_profile = async (id, data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(`/restaurant/${id}`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.patch(`/restaurant/${id}`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _add_restaurant = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/restaurant`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/restaurant`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _update_kitchen_profile = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/restaurant`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/restaurant`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _get_extras = async ({ search, page, per_page }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(
      `/menu/extra?keyword=${search}&page=${page}&per_page=${per_page}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall(
      `/menu/extra?keyword=${search}&page=${page}&per_page=${per_page}`,
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};

export const _get_categories = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`admin/menu/category`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`admin/menu/category`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _get_menu = async ({ search, page, per_page }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(
      `/menu?keyword=${search}&page=${page}&per_page=${per_page}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall(
      `/menu?keyword=${search}&page=${page}&per_page=${per_page}`,
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};

export const _add_menu = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/menu`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/menu`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _update_menu_qty = async (id, qty) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(
      `/menu/update_qty/${id}`,
      { qty_available: qty },
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall.patch(
      `/menu/update_qty/${id}`,
      { qty_available: qty },
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};

export const _update_extra = async (id, data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(`/menu/extra/${id}`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.patch(`/menu/extra/${id}`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};











export const _update_menu = async (id, data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(`/menu/${id}`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.patch(`/menu/${id}`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _add_extra = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/menu/extra`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/menu/extra`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _add_category = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`admin/menu/category`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`admin/menu/category`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _get_all_wise9ja = async () => {
  return axiosCall(`/wisenija_plan/user?page=1&per_page=20`);
};

const _get_bills = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/bills/categories`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/bills/categories`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _get_bill_providers = async ({ slug }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/bills/providers?category_slug=${slug}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/bills/providers?category_slug=${slug}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _get_bill_packages = async ({ id }) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/bills/products/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/bills/products/${id}`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const verify_user_email = async (token) => {
  return axiosCall(`/auth/${token}/confirm-email`);
};

export const _user_dashboard_referrals = async (token) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/user-dashboard/referal`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/user-dashboard/referal`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _user_dashboard_shop = async (token) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/user-dashboard/shop`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/user-dashboard/shop`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _user_dashboard_wise9ja = async (token) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/user-dashboard/wisenija_history`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/user-dashboard/wisenija_history`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

const _change_login_pin = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(`/auth/change-login-pin`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.patch(`/auth/change-login-pin`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _get_user_wallet = async () => {
  const jwt_token = localStorage.konnect_token;
  const appRole = 'user';
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.get(`/wallet/user_wallet?app=${appRole}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    return axiosCall.get(`/wallet/user_wallet?app=${appRole}`, {
      headers: { Authorization: 'Bearer' },
    });
  }
};

export const _restaurants_in_lga = async ({
  page,
  per_page,
  search,
  state,
  lga,
}) => {
  return axiosCall(
    `/home/restaurant?page=${page}&per_page=${per_page}&state=${state}&lga=${lga}`
  );
};

export const _single_restaurant = async ({ id }) => {
  return axiosCall(`/home/restaurant/${id}`);
};

export const _single_restaurant_menu = async ({ id, page, per_page }) => {
  return axiosCall(
    `/home/restaurant/${id}/menu?page=${page}&per_page=${per_page}`
  );
};

export const _calculate_restaurant_order_price = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/menu-order/calculate-price`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/menu-order/calculate-price`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};
export const _placeMenuOrder = async (data) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.post(`/menu-order`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.post(`/menu-order`, data, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _get_restaurant_order = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/menu-order/restaurant`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/menu-order/restaurant`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _get_restaurant_order_metrics = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/menu-order/restaurant/metrics`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/menu-order/restaurant/metrics`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _get_all_restaurant_orders = async () => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall(`/menu-order/user`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall(`/menu-order/user`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _reject_restaurant_order = async (id) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(
      `/menu-order/${id}/reject`,
      {},
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall.patch(
      `/menu-order/${id}/reject`,
      {},
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};

export const _accept_restaurant_order = async (id) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(
      `/menu-order/${id}/accept`,
      {},
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall.patch(
      `/menu-order/${id}/accept`,
      {},
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};

export const _ready_restaurant_order = async (id, data = {}) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(`/menu-order/${id}/ready`, data, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.patch(
      `/menu-order/${id}/ready`,
      {},
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};

export const _confirmPickupCode = async (id, code) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.patch(
      `/menu-order/${id}/pickup`,
      { code: code },
      { headers: { Authorization: 'Bearer ' + token } }
    );
  } else {
    return axiosCall.patch(
      `/menu-order/${id}/pickup`,
      { code: code },
      { headers: { Authorization: 'Bearer ' } }
    );
  }
};

export const _get_single_restaurant_order_details = async (id) => {
  const jwt_token = localStorage.konnect_token;
  if (jwt_token) {
    const token = Jwt_decrypt({ token: jwt_token });
    return axiosCall.get(`/menu-order/${id}/user`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } else {
    return axiosCall.get(`/menu-order/${id}/user`, {
      headers: { Authorization: 'Bearer ' },
    });
  }
};

export const _get_korapay_dynamic_account = async (data) => {
  const jwt_token = localStorage.konnect_token;
  let token = '';
  if (jwt_token) {
    token = Jwt_decrypt({ token: jwt_token });
  }
  return axiosCall.post(`/transactions/korapay/initiate-transfer`, data, {
    headers: { Authorization: 'Bearer ' + token },
  });
};

export const _get_lookup_korapay_transaction = async (reference) => {
  const jwt_token = localStorage.konnect_token;
  let token = '';
  if (jwt_token) {
    token = Jwt_decrypt({ token: jwt_token });
  }
  return axiosCall.get(`/transactions/korapay/lookup/${reference}`, {
    headers: { Authorization: 'Bearer ' + token },
  });
};

export const _get_user_by_account_id = async (accountId) => {
  const jwt_token = localStorage.konnect_token;
  let token = '';
  if (jwt_token) {
    token = Jwt_decrypt({ token: jwt_token });
  }
  return axiosCall.get(`/account/lookup/${accountId}`, {
    headers: { Authorization: 'Bearer ' + token },
  });
};

export const _post_restaurant_drivers_by_account_id = async (accountId) => {
  const jwt_token = localStorage.konnect_token;
  let token = '';
  if (jwt_token) {
    token = Jwt_decrypt({ token: jwt_token });
  }
  console.log(token);
  return axiosCall.post(
    `/restaurant/drivers/${accountId}`,
    {},
    {
      headers: { Authorization: 'Bearer ' + token },
    }
  );
};

export const _get_restaurant_bikers = async ({ page, per_page }) => {
  const jwt_token = localStorage.konnect_token;
  let token = '';
  if (jwt_token) {
    token = Jwt_decrypt({ token: jwt_token });
  }
  return axiosCall.get(
    `/restaurant/drivers?page=${page}&per_page=${per_page}`,
    {
      headers: { Authorization: 'Bearer ' + token },
    }
  );
};

export {
  _add_delivery_address,
  _bank_verification,
  _calc_commission,
  _change_password,
  _confirm_user_transfer_pin,
  _delivery_info,
  _fund_user_wallet,
  _generate_otp,
  _get_all_banks,
  _get_all_cities,
  _get_all_dates,
  _get_all_invoice,
  _get_all_pickup_locations,
  _get_all_referrals,
  _get_all_state,
  _get_all_wise9ja,
  _get_bills,
  _get_invoice,
  _get_profile,
  _get_saved_address,
  _get_search_product,
  _get_selected_delivery_location,
  _get_selected_pickup_location,
  _payout,
  _rate_setting_by_id,
  _update_2fa_verification,
  _update_profile,
  _update_trans_pin,
  _verify_2fa,
  _verify_otp,
  _verify_transactions,
  _wallet_verification,
  _wise9ja_topup,
  pay_checkout,
  signIn,
  _change_login_pin,
};
