import dayjs from 'dayjs';

/**
 * 주어진 ISO 형식의 날짜 문자열을 "YYYY-MM-DD HH:mm:ss" 형식으로 변환하는 함수
 * @param isoString ISO 형식의 날짜 문자열 (예: 2024-08-22T00:30:32)
 * @returns 변환된 날짜 문자열 (예: 2024-08-22 00:30:32)
 */
export const formatDate = (isoString: string): string => {
  return dayjs(isoString).format('YYYY-MM-DD HH:mm:ss');
};
