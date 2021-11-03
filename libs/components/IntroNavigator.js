import React from 'react';
import opts from '../../config';
import * as wooIntroRepo from '../repostories/wooIntro';
import * as introApi from "../api";
import * as langStore from '../store/language';

export default class IntroNavigator extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.startupConfig();
    }

    getIntroImages = async () => {
        return await introApi.getIntoImageItems(langStore.getLanguage());
    }

    getIntroStatus = async () => {
        return await wooIntroRepo.getIntro();
    }

    startupConfig = async () => {
        var startup = await wooIntroRepo.getStartup();

        if (startup) {
            setTimeout(async () => {
                var introStatus = await this.getIntroStatus();

                if (!introStatus) {
                    var introImages = await this.getIntroImages();

                    if (introImages.length > 0) {
                        await wooIntroRepo.setStartup();
                        this.props.navigate(opts.introRouteName);
                    }
                }
            }, 100);
        }
    }

    render() {
        return null;
    }
}
