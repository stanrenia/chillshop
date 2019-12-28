import { ID } from '@datorama/akita';
import { ShopListItem } from 'src/app/shopper/state/shoplist.state';

export interface Template {
  id: ID;
  label: string;
  shoplistId: ID;
}

/**
 * A factory function that creates Templates
 */
export function createTemplate(params: Partial<Template>) {
  return {
    ...params
  } as Template;
}
