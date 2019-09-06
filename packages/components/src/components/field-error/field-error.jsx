import classNames from 'classnames';
import PropTypes  from 'prop-types';
import React      from 'react';

const FieldError = ({ message, className }) => (
    <p className={ classNames('dc-field__error', className) }>
        { message }
    </p>
);

FieldError.propTypes = {
    className: PropTypes.string,
    message  : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]),
};

export default FieldError;
