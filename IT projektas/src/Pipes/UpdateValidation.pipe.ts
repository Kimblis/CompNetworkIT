import { PipeTransform, Injectable } from '@nestjs/common';

const nullableUpdateAttributes = [
  'title',
  'description',
  'address',
  'phone',
  'priceChangedDescription',
  'note',
  'title',
  'location',
  'extraCost',
];

@Injectable()
export class UpdateValidationPipe implements PipeTransform {
  async transform(data: Record<string, unknown>) {
    if (!data) {
      return undefined;
    }

    Object.keys(data).forEach((key) => {
      if (!nullableUpdateAttributes.includes(key) && data[key] === null) {
        delete data[key];
      }
    });

    return data;
  }
}
