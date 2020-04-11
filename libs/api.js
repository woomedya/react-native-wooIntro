import opts from '../config';
import { getNameByLang } from 'woo-utilities/language';
import Crypto from 'woo-crypto';
import { getUTCTime } from 'woo-utilities/date';
import { post } from 'woo-utilities/request';

var cache = null;

const url = {
    items: '/woointro/items'
}

export const getIntoImageItems = async (lang) => {
    try {
        var responseJson = [];
        if (cache == null) {
            try {
                var type = 'woointro.items';
                var token = (Crypto.encrypt(JSON.stringify({ expire: getUTCTime(opts.timeout).toString(), type }), opts.publicKey, opts.privateKey));
                var resault = await post(opts.wooServerUrl, url.items, {
                    public: opts.publicKey,
                    token
                }, {
                    introKey: opts.introKey
                });

                responseJson = resault.data.data || [];
            } catch (error) {
                responseJson = [];
            }

            responseJson = responseJson.map(item => ({
                title: getNameByLang({ name: item.content.title }, lang),
                text: getNameByLang({ name: item.content.text }, lang),
                url: getNameByLang({ name: item.content.iconUrl }, lang),
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