import { Injectable, PipeTransform } from '@nestjs/common';
import moment from 'moment';
import { ApolloError } from 'apollo-server-core';

import { DateFilters } from '#GraphQL/Inputs';
import { GraphQLErrorCodes } from '#GraphQL';

@Injectable()
export class DatesValidationPipe implements PipeTransform {
  async transform(data: DateFilters) {
    if (!data?.startDate && !data?.endDate) {
      return data;
    }

    if (moment(data.startDate).isAfter(moment(data.endDate))) {
      throw new ApolloError('End date can not be earlier than start date', GraphQLErrorCodes.BAD_REQUEST);
    }

    return data;
  }
}
