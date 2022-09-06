import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from 'Stores';
import { Wizard } from '@deriv/ui';
import { localize } from '@deriv/translations';
import {
    AddressDetailsStep,
    PersonalDetailsStep,
    TermsOfUseStep,
    WalletStep,
    SelectedWallet,
} from 'Components/wizard-containers';
import WalletDescription from 'Components/wallet-description';
import './wallet-wizard.scss';

type WalletWizardProps = {
    close: () => void;
};

type CreateWalletState = {
    currency?: string;
    [x: string]: any;
};

const WalletWizard = ({ close }: WalletWizardProps) => {
    const [create_wallet_state, setCreateWalletState] = React.useState<CreateWalletState>({});
    const [current_step_key, setCurrentStepKey] = React.useState<string>();

    const { ui, wallet_store } = useStores();

    const updateState = (new_state: Partial<CreateWalletState>) => {
        setCreateWalletState({ ...create_wallet_state, ...new_state });
    };

    const onChangeStep = (_current_step: number, _current_step_key?: string) => {
        setCurrentStepKey(_current_step_key);
    };

    const is_final_step = current_step_key === 'terms_of_use';

    const { currency } = create_wallet_state;

    const onComplete = () => {
        wallet_store.setSelectedWalletName(currency);
        wallet_store.createRealWalletAccount(create_wallet_state);
        close();
    };

    return (
        <div className='wallet-wizard'>
            <Wizard
                onComplete={onComplete}
                onClose={() => close()}
                wizard_title={localize("Let's get you a new wallet.")}
                primary_button_label={is_final_step ? 'Add wallet' : 'Next'}
                secondary_button_label='Back'
                onChangeStep={onChangeStep}
                dark={ui.is_dark_mode_on}
            >
                <Wizard.Step title='Wallet' is_submit_disabled={!currency}>
                    <WalletStep wallet_type={currency} onSelect={type => updateState({ currency: type })} />
                </Wizard.Step>
                <Wizard.Step title='Personal details'>
                    <PersonalDetailsStep onUpdateState={updateState} />
                </Wizard.Step>
                <Wizard.Step title='Address'>
                    <AddressDetailsStep onUpdateState={updateState} />
                </Wizard.Step>
                <Wizard.Step
                    step_key='terms_of_use'
                    title='Terms of use'
                    // is_submit_disabled={!(create_wallet_state.non_pep_declaration && create_wallet_state.agreed_tnc)}
                    is_submit_disabled={!create_wallet_state.non_pep_declaration}
                >
                    <TermsOfUseStep onUpdateState={updateState} />
                </Wizard.Step>
                <Wizard.RightPanel>
                    <div className='wallet-wizard__right-panel'>
                        {currency && <SelectedWallet selected_wallet={currency} />}
                        <WalletDescription selected_wallet={currency} />
                    </div>
                </Wizard.RightPanel>
            </Wizard>
        </div>
    );
};

export default observer(WalletWizard);
