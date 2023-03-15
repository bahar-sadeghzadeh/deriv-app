import React from 'react';
import { useStore, observer } from '@deriv/stores';
import { Real } from '../../../components/cashier-container';
import { useCashierStore } from '../../../stores/useCashierStores';

const Withdraw = observer(() => {
    const { client, ui } = useStore();
    const {
        verification_code: { payment_withdraw: verification_code },
    } = client;
    const { is_dark_mode_on } = ui;
    const { iframe, general_store, withdraw } = useCashierStore();
    const { is_loading, setActiveTab } = general_store;
    const { iframe_height, iframe_url, clearIframe, changeTheme } = iframe;
    const { container, onMountWithdraw: onMount } = withdraw;

    React.useEffect(() => {
        setActiveTab(container);
        onMount(verification_code);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Real
            iframe_height={iframe_height}
            iframe_url={iframe_url}
            clearIframe={clearIframe}
            is_loading={is_loading}
            changeTheme={changeTheme}
            is_dark_mode_on={is_dark_mode_on}
        />
    );
});

export default Withdraw;
