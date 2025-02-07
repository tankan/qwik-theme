import { createContextId, type QRL } from '@builder.io/qwik';
import type { TranslationKey } from '~/types';

export const I18nContext = createContextId<{
  lang: string;
  t: QRL<(key: TranslationKey) => string>;
}>('i18n'); 