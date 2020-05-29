import i18n from '../i18n';

type TranslateFnParameters = Parameters<typeof i18n.t>;

export class I18nError extends Error {
    public constructor(...args: TranslateFnParameters) {
        const message = i18n.t(...args);
        super(message);
    }
}

export default I18nError;