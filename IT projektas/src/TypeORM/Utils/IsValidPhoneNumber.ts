import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

export const isValidPhoneNumber = (phone: string) => {
  if (!phone) {
    return true;
  }

  try {
    const whiteListedPrefixes = ['+451010'];
    const number = phoneUtil.parseAndKeepRawInput(phone);
    const isInWhiteListedPrefixes = whiteListedPrefixes.find((prefix) => phone.startsWith(prefix));

    return phoneUtil.isValidNumber(number) || isInWhiteListedPrefixes;
  } catch (err) {
    return false;
  }
};
