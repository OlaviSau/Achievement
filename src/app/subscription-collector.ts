import {Subscription} from 'rxjs';

export interface SubscriptionCollector {
  subscriptions: Subscription[];
}
