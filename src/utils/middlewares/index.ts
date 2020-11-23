import { middleware as notFound } from './notFound';
import { middleware as error } from './error';
import { middleware as reqLogger } from './reqLogger';

export default {
  notFound,
  error,
  reqLogger,
};
