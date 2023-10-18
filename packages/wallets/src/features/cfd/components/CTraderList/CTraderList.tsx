import React from 'react';
import { TradingAccountCard } from '../../../../components';
import { WalletButton } from '../../../../components/Base';
import CTrader from '../../../../public/images/ctrader.svg';
import './CTraderList.scss';

const ctraderMapper = [
    {
        description: 'This account offers CFDs on a feature-rich trading platform.',
        icon: <CTrader />,
        title: 'Deriv cTrader',
    },
];

const CTraderList: React.FC = () => {
    return (
        <div className='wallets-ctrader'>
            <div className='wallets-ctrader__title'>
                <h1>Deriv cTrader</h1>
            </div>
            <div className='wallets-ctrader__content'>
                {ctraderMapper.map(account => (
                    <TradingAccountCard
                        {...account}
                        key={`ctrader--${account.title}`}
                        leading={() => <div className='wallets-ctrader__content__icon'>{account.icon}</div>}
                        trailing={() => <WalletButton color='primary-light' text='Get' />}
                    >
                        <div className='wallets-ctrader__content__details'>
                            <p className='wallets-ctrader__content__details-title'>{account.title}</p>
                            <p className='wallets-ctrader__content__details-description'>{account.description}</p>
                        </div>
                    </TradingAccountCard>
                ))}
            </div>
        </div>
    );
};

export default CTraderList;
