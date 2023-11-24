import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { SortOrder } from '../enum/sort.order.enum';

@Injectable()
export class GenericSearch<T> {
  async search(
    repository: Repository<T>,
    searchFields: Extract<keyof T, string>[],
    search: string,
    take?: number,
    skip?: number,
    sort?: SortOrder,
    order?: string,
    additionalWhere?: Record<string, any>,
  ) {
    const queryBuilder = repository.createQueryBuilder('alias');
    const whereSearch: FindOptionsWhere<T> = {};
    searchFields.forEach(
      (field) => (whereSearch[`${field}` as string] = ILike(`%${search}%`)),
    );
    if (additionalWhere) {
      Object.assign(whereSearch, additionalWhere);
    }
    queryBuilder.andWhere(whereSearch);

    if (take !== undefined) {
      queryBuilder.take(take);
    }
    if (skip != undefined) {
      queryBuilder.skip(skip);
    }
    if (order && sort) {
      queryBuilder.addOrderBy(`alias.${order}`, sort);
    }

    const [items, totalCount] = await queryBuilder.getManyAndCount();

    return { items, totalCount };
  }
}
