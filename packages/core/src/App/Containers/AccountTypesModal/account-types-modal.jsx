import { Icon, Modal, ThemedScrollbars } from '@deriv/components';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { website_name } from 'App/Constants/app-config';
import routes from '@deriv/shared/utils/routes';
import { localize } from '@deriv/translations';
import { connect } from 'Stores/connect';
import { urlFor } from '@deriv/shared/utils/url';
import AccountCard from './account-card.jsx';

import 'Sass/app/modules/account-types.scss';

const Box = ({ title, description, footer_text, icons, cards }) => {
    return (
        <div className='account-types__box'>
            <div className='account-types__box-left'>
                <h2 className='account-types__box-title'>{title}</h2>
                <p className='account-types__box-description'>{description}</p>
                {footer_text && <p className='account-types__box-footer'>{footer_text}</p>}
                <div className='account-types__box-icons'>
                    {icons.map((icon, index) => {
                        return <Icon className='account-types__box-icon' icon={icon} key={index} />;
                    })}
                </div>
            </div>
            {cards}
        </div>
    );
};

Box.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    footer_text: PropTypes.string,
    icons: PropTypes.arrayOf(PropTypes.string),
    cards: PropTypes.array,
};

const FinancialBox = ({ derivOnClick, mt5OnClick }) => {
    return (
        <Box
            title={localize('Financial')}
            description={localize(
                'Trade commodities, cryptocurrencies, major and minor currency pairs with high leverage and variable spreads for maximum flexibility.'
            )}
            footer_text={localize('Over 50 tradable financial assets')}
            icons={['IcUnderlyingFRXNZDJPY', 'IcUnderlyingOTC_NDX', 'IcUnderlyingFRXXAUUSD', 'IcUnderlyingFRXBROUSD']}
            cards={[
                <AccountCard
                    key={0}
                    title={localize('Trade Options')}
                    subtitle={localize('with a Deriv Financial account')}
                    button_text={localize('Add this real account')}
                    buttonOnClick={derivOnClick}
                    items={{
                        [localize('Multiplier')]: localize('Up to X1000'),
                        [localize('Stop loss')]: localize('Flexible'),
                        [localize('Take profit')]: localize('Flexible'),
                        [localize('Cancel trade')]: localize('Allowed'),
                        [localize('Currency')]: localize('USD/GBP/EUR'),
                    }}
                    // TODO: [deriv-eu] Update paths
                    platforms={[
                        {
                            icon: 'IcBrandDtrader',
                            name: 'DTrader',
                            path: '/#',
                        },
                        {
                            icon: 'IcBrandDbot',
                            name: 'DBot',
                            path: '/#',
                        },
                        {
                            icon: 'IcBrandSmarttrader',
                            name: 'SmartTrader',
                            path: '/#',
                        },
                    ]}
                >
                    <p className='account-card__description-text'>
                        {localize(
                            'Options are contracts that give the owner the right to buy or sell an asset at a fixed price for a specific period of time. That period could be as short as a day or as long as a couple of years, depending on the type of option contract.'
                        )}
                    </p>
                    <p className='account-card__description-text--small'>{localize('Supported platform:')}</p>
                    <p className='account-card__description-text--small'>{localize('DTrader and Dbot')}</p>
                </AccountCard>,
                <AccountCard
                    key={1}
                    title={localize('Trade on Margin')}
                    subtitle={localize('with a DMT5 Financial account')}
                    button_text={localize('Add this real account')}
                    buttonOnClick={mt5OnClick}
                    items={{
                        [localize('Leverage')]: localize('Up to 1:1000'),
                        [localize('Margin call')]: localize('150%'),
                        [localize('Stop out level')]: localize('75%'),
                        [localize('Currency')]: localize('USD'),
                    }}
                    // TODO: [deriv-eu] Update paths
                    platforms={[
                        {
                            icon: 'IcBrandDMT5',
                            name: 'MetaTrader 5',
                            path: '/#',
                        },
                    ]}
                >
                    <p className='account-card__description-text'>
                        {localize(
                            'Margin trading is a method of trading assets using funds provided by Deriv.com. It allow you to access greater sums of capital to leverage your positions and realize larger profits on successful trades.'
                        )}
                    </p>
                    <p className='account-card__description-text--small'>{localize('Supported platform:')} </p>
                    <p className='account-card__description-text--small'>
                        {localize('DMT5')} <br />
                    </p>
                </AccountCard>,
            ]}
        />
    );
};

const SyntheticBox = () => {
    return (
        <Box
            title={localize('Synthetic')}
            description={localize(
                'Trade synthetic indices that are available 24/7, have constant volatility, and are free of market and liquidity risks.'
            )}
            icons={[
                'IcUnderlying1HZ10V',
                'IcUnderlying1HZ100V',
                'IcUnderlyingR_10',
                'IcUnderlyingR_25',
                'IcUnderlyingR_50',
                'IcUnderlyingR_75',
                'IcUnderlyingR_100',
            ]}
            cards={[
                <AccountCard
                    key={0}
                    title={localize('Trade Options')}
                    subtitle={localize('with a Deriv Synthetic account')}
                    button_text={localize('Add this real account')}
                    // TODO: [deriv-eu] Add click handler
                    buttonOnClick={() => {}}
                    items={{
                        [localize('Trade type')]: localize('10+'),
                        [localize('Min duration')]: localize('1 Tick'),
                        [localize('Max duration')]: localize('365 days'),
                        [localize('Availability')]: localize('24/7'),
                        [localize('Currency')]: localize('USD/GBP/EUR'),
                    }}
                    // TODO: [deriv-eu] Update paths
                    platforms={[
                        {
                            icon: 'IcBrandDtrader',
                            name: 'DTrader',
                            path: '/#',
                        },
                        {
                            icon: 'IcBrandDbot',
                            name: 'DBot',
                            path: '/#',
                        },
                        {
                            icon: 'IcBrandSmarttrader',
                            name: 'SmartTrader',
                            path: '/#',
                        },
                    ]}
                >
                    <p className='account-card__description-text'>
                        {localize(
                            'Options are contracts that give the owner the right to buy or sell an asset at a fixed price for a specific period of time. That period could be as short as a day or as long as a couple of years, depending on the type of option contract.'
                        )}
                    </p>
                    <p className='account-card__description-text--small'>{localize('Supported platform:')}</p>
                    <p className='account-card__description-text--small'>{localize('DTrader and Dbot')}</p>
                </AccountCard>,
            ]}
        />
    );
};

class AccountTypesModal extends React.Component {
    closeModal = () => {
        this.props.toggleAccountTypesModal(false);
    };

    redirectToMt5 = account_type => {
        this.closeModal();
        this.props.history.push(`${routes.mt5}#${account_type}`);
    };

    redirectToMt5Real = () => {
        if (!this.props.is_logged_in || this.props.is_mt5_allowed) {
            this.redirectToMt5('real');
            // TODO: [deriv-eu] Update this after EU account sign-up completion
        } else {
            window.open(urlFor('user/metatrader', { legacy: true }));
        }
    };

    createRealAccount = (target = 'svg') => {
        this.props.toggleAccountTypesModal();
        this.props.openRealAccountSignup(target);
    };

    render() {
        return (
            <Modal
                title={localize('Account types')}
                width='904px'
                is_open={this.props.is_account_types_modal_visible}
                toggleModal={this.closeModal}
                has_close_icon={this.props.is_dismissible}
            >
                <ThemedScrollbars autoHide style={{ height: '63.5rem' }}>
                    <div className='account-types'>
                        <p className='account-types__intro'>{localize('Choose an account that suits your needs.')}</p>
                        <div>
                            <SyntheticBox
                                derivOnClick={() => openRealAccountSignup(this.props.standpoint.gaming_company)}
                            />
                            <FinancialBox
                                derivOnClick={() => openRealAccountSignup(this.props.standpoint.financial_company)}
                                mt5OnClick={this.redirectToMt5Real}
                            />
                        </div>
                    </div>
                </ThemedScrollbars>
            </Modal>
        );
    }
}

AccountTypesModal.propTypes = {
    has_any_real_account: PropTypes.bool,
    is_account_types_modal_visible: PropTypes.bool,
    is_dismissible: PropTypes.bool,
    is_logged_in: PropTypes.bool,
    is_mt5_allowed: PropTypes.bool,
    is_virtual: PropTypes.bool,
    residence: PropTypes.string,
    standpoint: PropTypes.object,
    toggleAccountTypesModal: PropTypes.func,
};

export default withRouter(
    connect(({ ui, client }) => ({
        can_upgrade: client.can_upgrade,
        can_upgrade_to: client.can_upgrade_to,
        has_any_real_account: client.has_any_real_account,
        // TODO: [deriv-eu] Change this later and make it a separate computed
        is_account_types_modal_visible: ui.is_account_types_modal_visible,
        is_dismissible: !client.should_have_real_account,
        is_logged_in: client.is_logged_in,
        is_mt5_allowed: client.is_mt5_allowed,
        is_virtual: client.is_virtual,
        openRealAccountSignup: ui.openRealAccountSignup,
        residence: client.residence,
        standpoint: client.standpoint,
        toggleAccountTypesModal: ui.toggleAccountTypesModal,
    }))(AccountTypesModal)
);
