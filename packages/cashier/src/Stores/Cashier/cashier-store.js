/* eslint-disable max-classes-per-file */
import React from 'react';
import { action, computed, observable, reaction, when } from 'mobx';
import { isCryptocurrency, getPropertyValue, routes } from '@deriv/shared';
import { localize } from '@deriv/translations';
import CashierNotifications from 'Containers/cashier-notifications.jsx';
import BaseStore from '../base-store';

export default class CashierStore extends BaseStore {
    constructor({ root_store, WS }) {
        super({ root_store });
        this.WS = WS;
        this.root_store = root_store;

        when(
            () => this.root_store.client.is_logged_in,
            () => {
                this.attachCashierToMenu();
            }
        );

        if (!this.has_set_currency) {
            this.changeSetCurrencyModalTitle();
        }

        this.init();
    }

    @observable is_loading = false;
    @observable is_p2p_visible = false;
    @observable p2p_notification_count = 0;
    @observable cashier_route_tab_index = 0;
    @observable is_deposit = false;
    @observable should_show_all_available_currencies = false;
    @observable is_cashier_default = true;
    @observable deposit_target = '';
    @observable crypto_amount = '';
    @observable fiat_amount = '';
    @observable insufficient_fund_error = '';
    @observable should_set_currency_modal_title_change = false;
    @observable p2p_advertiser_error = undefined;
    @observable has_set_currency = false;
    @observable should_percentage_reset = false;
    @observable percentage = 0;
    @observable show_p2p_in_cashier_default = false;

    @observable config = {
        account_transfer: this.root_store.modules.cashier?.account_transfer_store,
        payment_agent: this.root_store.modules.cashier?.payment_agent_store,
        payment_agent_transfer: this.root_store.modules.cashier?.payment_agent_transfer_store,
    };
    active_container = this.root_store.modules.cashier?.deposit_store.container;
    onRemount = () => {};
    is_populating_values = false;

    containers = [
        this.root_store.modules.cashier?.deposit_store.container,
        this.root_store.modules.cashier?.withdraw_store.container,
    ];

    map_action = {
        [this.root_store.modules.cashier?.withdraw_store.container]: 'payment_withdraw',
        [this.root_store.modules.cashier?.payment_agent_store.container]: 'payment_agent_withdraw',
    };

    @computed
    get is_crypto() {
        const { currency } = this.root_store.client;
        return !!currency && isCryptocurrency(currency);
    }

    @computed
    get is_p2p_enabled() {
        return this.is_p2p_visible && !this.root_store.client.is_eu;
    }

    @action.bound
    showP2pInCashierDefault() {
        const is_p2p_restricted = this.p2p_advertiser_error === 'RestrictedCountry';
        const has_usd_currency = this.root_store.client.account_list.some(account => account.title === 'USD');
        const has_user_fiat_currency = this.root_store.client.account_list.some(
            account => !isCryptocurrency(account.title) && account.title !== 'Real'
        );

        if (is_p2p_restricted || this.root_store.client.is_virtual || (has_user_fiat_currency && !has_usd_currency)) {
            this.show_p2p_in_cashier_default = false;
        } else {
            this.show_p2p_in_cashier_default = true;
        }
    }

    @action.bound
    attachCashierToMenu() {
        if (!this.has_set_currency) {
            this.setHasSetCurrency();
        }

        this.root_store.menu.attach({
            id: 'dt_cashier_tab',
            icon: <CashierNotifications p2p_notification_count={this.p2p_notification_count} />,
            text: () => localize('Cashier'),
            link_to: this.has_set_currency && routes.cashier,
            onClick: !this.has_set_currency && this.root_store.ui.toggleSetCurrencyModal,
            login_only: true,
        });
    }

    @action.bound
    replaceCashierMenuOnclick() {
        this.setHasSetCurrency();

        this.root_store.menu.update(
            {
                id: 'dt_cashier_tab',
                icon: <CashierNotifications p2p_notification_count={this.p2p_notification_count} />,
                text: () => localize('Cashier'),
                link_to: this.has_set_currency && routes.cashier,
                onClick: !this.has_set_currency ? this.root_store.ui.toggleSetCurrencyModal : false,
                login_only: true,
            },
            1
        );
    }

    @action.bound
    setHasSetCurrency() {
        this.has_set_currency =
            this.root_store.client.account_list
                .filter(account => !account.is_virtual)
                .some(account => account.title !== 'Real') || !this.root_store.client.has_active_real_account;
    }

    @action.bound
    changeSetCurrencyModalTitle() {
        this.should_set_currency_modal_title_change = true;
    }

    @action.bound
    async onMountCashierDefault() {
        if (!this.has_set_currency) {
            this.setHasSetCurrency();
        }
        this.setIsCashierDefault(true);
        this.root_store.modules.cashier.account_prompt_dialog_store.resetIsConfirmed();

        this.setLoading(true);
        if (
            this.root_store.modules.cashier.payment_agent_store.all_payment_agent_list?.paymentagent_list?.list ===
            undefined
        ) {
            const agent_list = await this.root_store.modules.cashier.payment_agent_store.getAllPaymentAgentList();
            this.root_store.modules.cashier.payment_agent_store.setAllPaymentAgentList(agent_list);
        }
        this.setLoading(false);
    }

    @action.bound
    calculatePercentage(amount = this.root_store.modules.cashier.account_transfer_store.converter_from_amount) {
        if (this.active_container === this.root_store.modules.cashier.account_transfer_store.container) {
            this.percentage = +(
                (amount / +this.root_store.modules.cashier.account_transfer_store.selected_from.balance) *
                100
            ).toFixed(0);
        } else {
            this.percentage = +((amount / +this.root_store.client.balance) * 100).toFixed(0);
        }
    }

    @action.bound
    percentageSelectorSelectionStatus(should_percentage_reset) {
        this.should_percentage_reset = should_percentage_reset;

        if (should_percentage_reset) {
            this.percentage = 0;
        }
    }

    @action.bound
    setIsDeposit(is_deposit) {
        this.is_deposit = is_deposit;
    }

    @action.bound
    setShouldShowAllAvailableCurrencies(value) {
        this.should_show_all_available_currencies = value;
    }

    @action.bound
    setIsCashierDefault(is_cashier_default) {
        this.is_cashier_default = is_cashier_default;
    }

    @action.bound
    setDepositTarget(target) {
        this.deposit_target = target;
    }

    @action.bound
    continueRoute() {
        this.root_store.common.routeTo(this.deposit_target);
    }

    @action.bound
    setAccountSwitchListener() {
        // cashier inits once and tries to stay active until switching account
        // since cashier calls take a long time to respond or display in iframe
        // so we don't have any unmount function here and everything gets reset on switch instead
        this.disposeSwitchAccount();
        this.onSwitchAccount(this.accountSwitcherListener);
    }

    // Initialise P2P attributes on app load without mounting the entire cashier
    @action.bound
    init() {
        when(
            () => this.root_store.client.is_logged_in,
            async () => {
                await this.getAdvertizerError();
                this.checkP2pStatus();
            }
        );
        when(
            () => this.is_payment_agent_visible,
            () => this.root_store.modules.cashier?.payment_agent_store.filterPaymentAgentList()
        );

        reaction(
            () => [
                this.root_store.client.switched,
                this.root_store.client.is_logged_in,
                this.root_store.client.currency,
            ],
            async () => {
                // wait for client settings to be populated in client-store
                await this.WS.wait('get_settings');

                if (this.root_store.client.is_logged_in) {
                    await this.getAdvertizerError();
                    this.root_store.modules.cashier.account_prompt_dialog_store.resetLastLocation();
                    if (!this.root_store.client.switched) this.checkP2pStatus();
                }
            }
        );

        reaction(
            () => [this.root_store.client.currency],
            () => {
                this.root_store.modules.cashier?.withdraw_store.setIsWithdrawConfirmed(false);
            }
        );
    }

    @action.bound
    async getAdvertizerError() {
        const advertiser_info = await this.WS.authorized.p2pAdvertiserInfo();
        this.setP2pAdvertiserError(getPropertyValue(advertiser_info, ['error', 'code']));
    }

    @action.bound
    setP2pAdvertiserError(value) {
        this.p2p_advertiser_error = value;
    }

    @action.bound
    checkP2pStatus() {
        const advertiser_error = this.p2p_advertiser_error;
        const is_p2p_restricted = advertiser_error === 'RestrictedCountry' || advertiser_error === 'RestrictedCurrency';
        this.setIsP2pVisible(!(is_p2p_restricted || this.root_store.client.is_virtual));
    }

    @action.bound
    async onMountCommon(should_remount) {
        if (this.root_store.client.is_logged_in) {
            // avoid calling this again
            if (this.is_populating_values) {
                return;
            }

            this.is_populating_values = true;

            if (should_remount) {
                this.onRemount = this.onMountCommon;
            }
            // we need to see if client's country has PA
            // if yes, we can show the PA tab in cashier
            if (!this.root_store.modules.cashier?.payment_agent_store.list.length) {
                this.root_store.modules.cashier?.payment_agent_store
                    .setPaymentAgentList()
                    .then(this.root_store.modules.cashier?.payment_agent_store.filterPaymentAgentList);
            }

            if (!this.root_store.modules.cashier?.payment_agent_transfer_store.is_payment_agent) {
                this.root_store.modules.cashier?.payment_agent_transfer_store.checkIsPaymentAgent();
            }

            if (!this.root_store.modules.cashier?.account_transfer_store.accounts_list.length) {
                this.root_store.modules.cashier?.account_transfer_store.sortAccountsTransfer();
            }

            if (
                !this.root_store.modules.cashier.onramp.is_onramp_tab_visible &&
                window.location.pathname.endsWith(routes.cashier_onramp)
            ) {
                this.root_store.common.routeTo(routes.cashier_deposit);
            }

            if (
                !this.root_store.modules.cashier.transaction_history.is_crypto_transactions_visible &&
                window.location.pathname.endsWith(routes.cashier_crypto_transactions)
            ) {
                this.root_store.common.routeTo(routes.cashier_deposit);
                this.root_store.modules.cashier.transaction_history.setIsCryptoTransactionsVisible(true);
                this.root_store.modules.cashier.transaction_history.onMount();
            }
        }
    }

    @action.bound
    setCashierTabIndex(index) {
        this.cashier_route_tab_index = index;
    }

    @action.bound
    setNotificationCount(notification_count) {
        this.p2p_notification_count = notification_count;
    }

    @action.bound
    setIsP2pVisible(is_p2p_visible) {
        this.is_p2p_visible = is_p2p_visible;
        if (!is_p2p_visible && window.location.pathname.endsWith(routes.cashier_p2p)) {
            this.root_store.common.routeTo(
                this.root_store.modules.cashier.account_prompt_dialog_store.last_location ?? routes.cashier_deposit
            );
        }
    }

    @action.bound
    async onMount(verification_code) {
        this.onRemount = this.onMount;
        await this.onMountCommon();

        if (
            this.containers.indexOf(this.active_container) === -1 &&
            !this.root_store.client.is_switching &&
            this.active_container !== this.root_store.modules.cashier.payment_agent_store.container
        ) {
            throw new Error('Cashier Store onMount requires a valid container name.');
        }
        this.root_store.modules.cashier.deposit_store.onMountDeposit(verification_code);
    }

    @computed
    get is_cashier_locked() {
        if (!this.root_store.client.account_status?.status) return false;
        const { status } = this.root_store.client.account_status;

        return status.some(status_name => status_name === 'cashier_locked');
    }

    @computed
    get is_system_maintenance() {
        if (!this.root_store.client.account_status?.cashier_validation) return false;
        const { cashier_validation } = this.root_store.client.account_status;

        return cashier_validation.some(validation => validation === 'system_maintenance');
    }

    @action.bound
    setLoading(is_loading) {
        this.is_loading = is_loading;
    }

    @action.bound
    setActiveTab(container) {
        this.active_container = container;
    }

    accountSwitcherListener() {
        this.root_store.modules.cashier?.withdraw_store.verification.clearVerification('payment_withdraw');
        this.root_store.modules.cashier.payment_agent_store.verification.clearVerification('payment_agent_withdraw');

        this.root_store.modules.cashier?.deposit_store.iframe.setIframeUrl('');
        this.root_store.modules.cashier?.deposit_store.iframe.clearTimeoutCashierUrl();
        this.root_store.modules.cashier?.deposit_store.iframe.setSessionTimeout(true);

        this.root_store.modules.cashier?.withdraw_store.setIframeUrl('');
        this.root_store.modules.cashier?.withdraw_store.clearTimeoutCashierUrl();
        this.root_store.modules.cashier?.withdraw_store.setSessionTimeout(true);

        this.payment_agent = this.root_store.modules.cashier?.payment_agent_store;
        this.config.account_transfer = this.root_store.modules.cashier?.account_transfer_store;
        this.config.payment_agent_transfer = this.root_store.modules.cashier?.payment_agent_transfer_store;
        this.is_populating_values = false;

        this.onRemount();

        return Promise.resolve();
    }
}
