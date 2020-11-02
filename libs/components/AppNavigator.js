import React from 'react';
import { NavigationActions } from 'react-navigation';
import opts from '../../config';
import * as wooIntroRepo from '../repostories/wooIntro';
import * as introApi from "../api";

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.startupConfig();
    }

    getIntroImages = async () => {
        return await introApi.getIntoImageItems(opts.lang);
    }

    getIntroStatus = async () => {
        return await wooIntroRepo.getIntro();
    }

    startupConfig = async () => {
        var startup = await wooIntroRepo.getStartup();

        if (startup && this.navigator) {
            setTimeout(async () => {
                var introStatus = await this.getIntroStatus();

                if (!introStatus) {
                    var introImages = await this.getIntroImages();

                    if (introImages.length > 0) {
                        await wooIntroRepo.setStartup();
                        this.navigator.dispatch(
                            NavigationActions.navigate({
                                routeName: opts.introRouteName
                            })
                        );
                    }
                }
            }, 100);
        }
    }

    render() {
        return opts.appNavigator ? <opts.appNavigator ref={nav => this.navigator = nav} /> : null
    }
}
