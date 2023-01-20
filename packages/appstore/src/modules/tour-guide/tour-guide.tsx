import Joyride from 'react-joyride';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Localize, localize } from '@deriv/translations';
import {
    tour_step_config,
    tour_styles,
    tour_step_locale,
    tour_styles_dark_mode,
    high_risk_tour_step_config,
    high_risk_tour_step_locale,
} from 'Constants/tour-steps-config-new';
import { useStores } from 'Stores/index';
import { routes, ContentFlag } from '@deriv/shared';
import { Button } from '@deriv/components';

const TourGuide = () => {
    const { traders_hub, ui } = useStores();
    const {
        is_tour_open,
        toggleIsTourOpen,
        setIsOnboardingVisited,
        content_flag,
        selectAccountType,
        is_onboarding_visited,
    } = traders_hub;
    const { is_dark_mode_on } = ui;

    const history = useHistory();
    const [joyride_index, setJoyrideIndex] = React.useState<number>(0);

    tour_step_locale.last = (
        <div
            onClick={() => {
                setIsOnboardingVisited(true);
                toggleIsTourOpen(false);
            }}
        >
            <Localize i18n_default_text='OK' />
        </div>
    );

    high_risk_tour_step_locale.last = (
        <div
            onClick={() => {
                setIsOnboardingVisited(true);
                toggleIsTourOpen(false);
            }}
        >
            <Localize i18n_default_text='OK' />
        </div>
    );

    if (joyride_index === 0) {
        tour_step_locale.next = (
            <div
                onClick={() => {
                    selectAccountType('real');
                }}
            >
                <Localize i18n_default_text='Next' />
            </div>
        );

        high_risk_tour_step_locale.next = (
            <div
                onClick={() => {
                    selectAccountType('real');
                }}
            >
                <Localize i18n_default_text='Next' />
            </div>
        );
    }

    if (tour_step_config.length === joyride_index + 1) {
        tour_step_locale.back = (
            <Button
                has_effect
                text={localize('Repeat tour')}
                secondary
                medium
                onClick={() => {
                    history.push(routes.onboarding);
                    toggleIsTourOpen(true);
                }}
            />
        );
    }

    if (high_risk_tour_step_config.length === joyride_index + 1) {
        high_risk_tour_step_locale.back = (
            <Button
                has_effect
                text={localize('Repeat tour')}
                secondary
                medium
                onClick={() => {
                    history.push(routes.onboarding);
                    toggleIsTourOpen(true);
                }}
            />
        );
    }

    const low_risk = content_flag === ContentFlag.LOW_RISK_CR_NON_EU || content_flag === ContentFlag.LOW_RISK_CR_EU;

    return (
        <Joyride
            run={!is_onboarding_visited && is_tour_open}
            continuous
            disableScrolling
            hideCloseButton
            disableCloseOnEsc
            steps={low_risk ? tour_step_config : high_risk_tour_step_config}
            styles={is_dark_mode_on ? tour_styles_dark_mode : tour_styles}
            locale={tour_step_locale}
            floaterProps={{
                disableAnimation: true,
            }}
            callback={data => setJoyrideIndex(data.index)}
        />
    );
};

export default observer(TourGuide);