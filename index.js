import React, { Component } from "react";
import { View, } from "react-native";
import opts from './config';
import i18n from './libs/locales';
import * as introApi from "./libs/api";
import Intro from './libs/Intro';
import * as wooIntroRepo from './libs/repostories/wooIntro';
import appNavigator from './libs/components/AppNavigator';
import * as langStore from './libs/store/language';

export const config = ({
    wooServerUrl, publicKey, privateKey, applicationId, tokenTimeout, lang,
    onChange, primaryColor, locales, introKey, appNavigator, introRouteName
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
    opts.appNavigator = appNavigator;
    opts.introRouteName = introRouteName;

    langStore.setLanguage(lang);
}

export const setLang = (lang) => {
    opts.lang = lang;
    langStore.setLanguage(lang);
}

export const getIntroStatus = async () => {
    return await wooIntroRepo.getIntro();
}

export const getIntroImages = async () => {
    return await introApi.getIntoImageItems(langStore.getLanguage());
}

export const AppNavigator = appNavigator;

export default class WooIntro extends Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            introImages: []
        }
    }

    componentDidMount() {
        this.controlIntro();

        langStore.default.addListener(langStore.LANG, this.langChanged);
    }

    componentWillUnmount() {
        langStore.default.removeListener(langStore.LANG, this.langChanged);
    }

    langChanged = () => {
        this.controlIntro();
    }

    controlIntro = async () => {
        var introImages = await introApi.getIntoImageItems(langStore.getLanguage());
        this.setState({ introImages }, async () => {
            if (!this.state.introImages.length)
                this.goBack()
            else
                await wooIntroRepo.setIntro();
        });

    };

    goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.introImages.length ?
                    <Intro introSkip={this.goBack} primaryColor={opts.primaryColor} introImages={this.state.introImages} />
                    : null}
            </View>
        );
    }
}