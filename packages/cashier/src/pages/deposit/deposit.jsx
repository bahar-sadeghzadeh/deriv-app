import PropTypes from 'prop-types';
import React from 'react';
import { Loading } from '@deriv/components';
import { connect } from 'Stores/connect';
import CashierContainer from 'Components/cashier-container.jsx';
import CashierLocked from 'Components/Error/cashier-locked.jsx';
import DepositsLocked from 'Components/Error//deposit-locked.jsx';
import CryptoTransactionsHistory from 'Components/Form/crypto-transactions-history';
import Error from 'Components/Error/error.jsx';
import FundsProtection from 'Components/Error/funds-protection.jsx';
import USDTSideNote from 'Components/usdt-side-note.jsx';
import RecentTransaction from 'Components/recent-transaction.jsx';
import Virtual from 'Components/Error/virtual.jsx';
import CashierOnboarding from 'Components/onboarding';
import CryptoDeposit from './crypto-deposit.jsx';

const Deposit = ({
    crypto_transactions,
    container,
    currency,
    current_currency_type,
    error,
    is_cashier_locked,
    is_cashier_onboarding,
    is_crypto,
    is_crypto_transactions_visible,
    is_deposit,
    is_deposit_locked,
    is_eu,
    iframe_height,
    iframe_url,
    clearIframe,
    is_loading,
    is_switching,
    is_system_maintenance,
    is_virtual,
    onMount,
    recentTransactionOnMount,
    setActiveTab,
    setErrorMessage,
    setIsDeposit,
    setSideNotes,
    tab_index,
}) => {
    React.useEffect(() => {
        if (!is_crypto_transactions_visible) {
            recentTransactionOnMount();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [is_switching]);

    React.useEffect(() => {
        setActiveTab(container);
        onMount();
        return () => {
            setIsDeposit(false);
            setErrorMessage('');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setActiveTab, onMount, container, setErrorMessage]);

    React.useEffect(() => {
        if (typeof setSideNotes === 'function') {
            if (is_switching || is_deposit) setSideNotes(null);
            if (is_crypto && is_deposit && !is_switching) {
                const side_notes = [
                    ...(crypto_transactions.length ? [<RecentTransaction key={2} />] : []),
                    ...(/^(UST)$/i.test(currency) ? [<USDTSideNote type='usdt' key={1} />] : []),
                    ...(/^(eUSDT)$/i.test(currency) ? [<USDTSideNote type='eusdt' key={1} />] : []),
                ];
                if (side_notes.length > 0) setSideNotes(side_notes);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, tab_index, crypto_transactions, is_cashier_onboarding]);

    if ((is_switching || (is_loading && !iframe_url)) && !is_crypto_transactions_visible) {
        return <Loading is_fullscreen />;
    }
    if (is_virtual) {
        return <Virtual />;
    }
    if (is_system_maintenance) {
        if (is_cashier_locked || (is_deposit_locked && current_currency_type === 'crypto')) {
            return <CashierLocked />;
        }
    }
    if (error.is_ask_uk_funds_protection) {
        return <FundsProtection />;
    }
    if (is_cashier_locked) {
        return <CashierLocked />;
    }
    if (is_deposit_locked) {
        return <DepositsLocked />;
    }
    if (is_crypto_transactions_visible) {
        return <CryptoTransactionsHistory />;
    }

    if (is_deposit || is_eu) {
        if (error.message) {
            return <Error error={error} />;
        }
        if (is_crypto) {
            return <CryptoDeposit />;
        }

        return (
            <CashierContainer
                iframe_height={iframe_height}
                iframe_url={iframe_url}
                is_loading={is_loading}
                clearIframe={clearIframe}
            />
        );
    }
    return <CashierOnboarding setSideNotes={setSideNotes} />;
};

Deposit.propTypes = {
    crypto_transactions: PropTypes.array,
    container: PropTypes.string,
    current_currency_type: PropTypes.string,
    error: PropTypes.object,
    is_cashier_onboarding: PropTypes.bool,
    is_cashier_locked: PropTypes.bool,
    is_deposit: PropTypes.bool,
    is_crypto: PropTypes.bool,
    is_crypto_transactions_visible: PropTypes.bool,
    is_deposit_locked: PropTypes.bool,
    is_eu: PropTypes.bool,
    iframe_height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    iframe_url: PropTypes.string,
    is_loading: PropTypes.bool,
    is_switching: PropTypes.bool,
    is_system_maintenance: PropTypes.bool,
    is_virtual: PropTypes.bool,
    onMount: PropTypes.func,
    recentTransactionOnMount: PropTypes.func,
    setActiveTab: PropTypes.func,
    setIsDeposit: PropTypes.func,
    setSideNotes: PropTypes.func,
    standpoint: PropTypes.object,
    tab_index: PropTypes.number,
};

export default connect(({ client, modules }) => ({
    crypto_transactions: modules.cashier.transaction_history.crypto_transactions,
    container: modules.cashier.deposit.container,
    currency: client.currency,
    current_currency_type: client.current_currency_type,
    error: modules.cashier.deposit.error,
    is_cashier_onboarding: modules.cashier.general_store.is_cashier_onboarding,
    is_cashier_locked: modules.cashier.general_store.is_cashier_locked,
    is_crypto: modules.cashier.general_store.is_crypto,
    is_crypto_transactions_visible: modules.cashier.transaction_history.is_crypto_transactions_visible,
    is_deposit: modules.cashier.general_store.is_deposit,
    is_deposit_locked: modules.cashier.deposit.is_deposit_locked,
    is_eu: client.is_eu,
    iframe_height: modules.cashier.iframe.iframe_height,
    iframe_url: modules.cashier.iframe.iframe_url,
    clearIframe: modules.cashier.iframe.clearIframe,
    is_loading: modules.cashier.general_store.is_loading,
    is_system_maintenance: modules.cashier.general_store.is_system_maintenance,
    is_switching: client.is_switching,
    is_virtual: client.is_virtual,
    onMount: modules.cashier.deposit.onMountDeposit,
    recentTransactionOnMount: modules.cashier.transaction_history.onMount,
    setActiveTab: modules.cashier.general_store.setActiveTab,
    setErrorMessage: modules.cashier.deposit.error.setErrorMessage,
    setIsDeposit: modules.cashier.general_store.setIsDeposit,
    standpoint: client.standpoint,
    tab_index: modules.cashier.general_store.cashier_route_tab_index,
}))(Deposit);
