import { config } from 'react-native-woointro';
import env from '../env';
import { color } from '../constants/ThemeStyle';

export default async () => {

    config({
        wooServerUrl: env.wooiys.url,
        publicKey: env.wooiys.publicKey,
        privateKey: env.wooiys.privateKey,
        applicationId: env.applicationId || "",
        tokenTimeout: env.wooiys.timeout,
        lang: "tr",
        primaryColor: color.PRIMARY,
        introKey: env.introKey,
        locales: {},
    });
}