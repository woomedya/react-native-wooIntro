import settingsModel from './models/wooIntro';
import opts from '../../config';

var defaultSettings = {
};

var cacheValue = null;

const get = async () => {
    if (defaultSettings.delete && opts.removeSettings) {
        defaultSettings.delete = false;
        await settingsModel.clear();
    }

    if (cacheValue == null) {
        var list = await settingsModel.list();
        if (list.length) {
            cacheValue = list[0];
        } else {
            cacheValue = defaultSettings;
        }
    }
    return cacheValue;
}

const set = async (key, value) => {
    cacheValue = await get();
    cacheValue[key] = value;
    await settingsModel.upsert(cacheValue);
}

export const getIntro = async () => {
    var value = await get();
    return value[opts.introKey] == null ? false : value[opts.introKey];
}

export const setIntro = async () => {
    await set(opts.introKey, true);
}

