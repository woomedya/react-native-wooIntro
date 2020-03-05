import opts from '../../config';

export const getNameByLang = (item, lang) => {
    if (item && item.name)
        return item.name[lang] || item.name[opts.lang] || '';
    else
        return '';
}