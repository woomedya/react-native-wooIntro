import { iysRequest } from './request';
import * as langUtil from './utilities/language';
import opts from '../config';

var cache = null;

export const intro = async (lang) => {
    try {
        if (cache == null) {
            var responseJson = (await iysRequest({
                categories: [opts.introKey],
                tags: [],
                content: {}
            })).map(item => ({
                title: langUtil.getNameByLang({ name: item.content.title }, lang),
                text: langUtil.getNameByLang({ name: item.content.text }, lang),
                url: langUtil.getNameByLang({ name: item.content.iconUrl }, lang),
                Index: item.content.index
            })).sort((a, b) => (a.Index > b.Index) ? 1 : -1);

            cache = responseJson;
        } else {
            responseJson = cache;
        }
        return responseJson;
    } catch (error) {
        return [];
    }
}