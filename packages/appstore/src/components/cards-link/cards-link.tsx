import React from 'react';
import { Icon } from '@deriv/components';
import AppStoreAppCard from 'Components/app-card';
import AppStoreSkeletonCard from 'Components/skeleton-card';
import AppStoreWalletCard from 'Components/wallet';

type TCardsLinkDetails = {
    app_card?: Partial<typeof AppStoreAppCard>;
    app_card_label?: string;
    wallet_card?: Partial<typeof AppStoreWalletCard>;
    is_linked: boolean;
    should_app_card_highlight?: boolean;
};

const CardsLink = ({
    app_card,
    app_card_label,
    wallet_card,
    is_linked,
    should_app_card_highlight,
}: TCardsLinkDetails) => {
    return (
        <>
            {(!is_linked || !wallet_card || !app_card) && (
                <div className='unlinked-cards' data-testid='unlinked-cards'>
                    <div
                        className={`unlinked-cards__wallet-card ${
                            wallet_card && !app_card && 'unlinked-cards__wallet-card--overlap'
                        }`}
                    >
                        {wallet_card || <AppStoreSkeletonCard label='Wallet' />}
                    </div>
                    <div className='unlinked-cards__app-card'>
                        <div className='unlinked-cards__app-card__link-element'>
                            <div className='unlinked-cards__app-card__link-element__horizontal-line' />
                            <div className='unlinked-cards__app-card__link-element__vertical-line' />
                            <Icon
                                icon='IcAppstoreLinkWallet'
                                width='11.45'
                                height='16'
                                className='unlinked-cards__app-card__link-element__link-icon'
                            />
                        </div>
                        {app_card || (
                            <AppStoreSkeletonCard
                                label={app_card_label ?? 'App'}
                                should_highlight={should_app_card_highlight}
                            />
                        )}
                    </div>
                </div>
            )}
            {is_linked && wallet_card && app_card && (
                <div className='linked-cards' data-testid='linked-cards'>
                    {wallet_card}
                    <div className='linked-cards__link-element'>
                        <Icon icon='IcAppstoreLinkedWallets' width='9.5' height='13.27' />
                    </div>
                    <div className='linked-cards__app-card'>{app_card}</div>
                </div>
            )}
        </>
    );
};

export default CardsLink;