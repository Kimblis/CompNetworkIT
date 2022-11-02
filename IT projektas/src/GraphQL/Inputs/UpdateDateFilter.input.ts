import { InputType, PartialType } from '@nestjs/graphql';

import { DateFilters } from './DateFilter.input';

@InputType()
export class UpdateDateFilters extends PartialType(DateFilters) {}
