import React, { Component } from "react";
import { View, } from "react-native";
import opts from './config';
import i18n from './libs/locales';
import { intro } from "./libs/introApi"
import Intro from './libs/Intro';
import * as wooIntroRepo from './libs/repostories/wooIntro';

export const config = ({
    wooServerUrl, publicKey, privateKey, applicationId, tokenTimeout, lang,
    onChange, primaryColor, locales, introKey
}) => {
    opts.wooServerUrl = wooServerUrl;
    opts.privateKey = privateKey;
    opts.publicKey = publicKey;
    opts.applicationId = applicationId;
    opts.tokenTimeout = tokenTimeout || opts.tokenTimeout;
    opts.lang = lang;
    opts.onChange = onChange;
    opts.primaryColor = primaryColor || opts.primaryColor;
    opts.locales = locales || opts.locales;
    opts.introKey = introKey || opts.introKey;
}

export const setLang = (lang) => {
    opts.lang = lang;
}

export const getIntroStatus = async () => {
    var startup = await wooIntroRepo.getIntro();
    return startup;
}

export const getIntroImages = async (lang) => {
    var introImages = await intro(lang);
    return introImages;
}

export default class BilllingComponent extends Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            textBilling: i18n().textBilling,
            introImages: [],
            lang: opts.lang
        }
    }

    async componentDidMount() {
        this.controlIntro();
    }

    controlIntro = async () => {
        var introImages = await intro(this.state.lang);
        this.setState({ introImages });
        if (!this.state.introImages.length)
            this.goBack()
        else
            await wooIntroRepo.setIntro();
    };

    goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <Intro introSkip={this.goBack} primaryColor={opts.primaryColor} introImages={this.state.introImages} />
            </View>
        );
    }
}
