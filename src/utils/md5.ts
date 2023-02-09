/*
 * @Date: 2023-01-16 16:07:14
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-16 16:07:24
 */
import { createHash } from 'crypto';
export function md5(source) {
  const hash = createHash('md5');
  return hash.update(source).digest('hex');
}
