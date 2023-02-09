/*
 * @Date: 2023-01-11 10:33:43
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-11 11:11:01
 */
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
export class PageDto {
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  readonly pageSize: number = 10;
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  readonly pageCount: number = 1;
}
