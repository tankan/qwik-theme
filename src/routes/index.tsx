import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useI18n } from "~/hooks/useI18n";
import { translations, defaultLang } from "~/i18n";

export default component$(() => {
  const { t } = useI18n();

  return (
    <>
      <h1>{t('home.welcome')}</h1>
      <div>
        {t('home.description')}
        <br />
        {t('home.happyCoding')}
      </div>
    </>
  );
});

export const head: DocumentHead = () => {
  const t = translations[defaultLang];
  
  return {
    title: t.common.meta.title,
    meta: [
      {
        name: "description",
        content: t.common.meta.description,
      },
    ],
  };
};
