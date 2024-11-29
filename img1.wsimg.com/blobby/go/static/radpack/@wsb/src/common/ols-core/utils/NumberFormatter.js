/* eslint-disable camelcase */

import { assign } from 'lodash';

let numberFormat = {
  strip_insignificant_zeros: false,
  pattern: '[\\d\\,]*(\\.[\\d\\,]+)?',
  precision: 3,
  thousands_separator: ',',
  significant: false,
  decimal_mark: '.'
};

let currencyFormat = {
  symbol_first: true,
  with_currency: false,
  currency: 'USD',
  pattern: '[\\d\\,]*(\\.[\\d\\,]+)?',
  symbol: '$',
  precision: 2,
  thousands_separator: ',',
  decimal_mark: '.'
};

let percentageFormat = {
  symbol_first: false,
  pattern: '[\\d\\,]*(\\.[\\d\\,]+)?',
  symbol: '%',
  precision: 2,
  thousands_separator: ',',
  decimal_mark: '.'
};

const NumberFormatter = {
  getNumberFormat: function () {
    return numberFormat;
  },

  setNumberFormat: function (newNumberFormat) {
    numberFormat = assign({}, numberFormat, newNumberFormat);
  },

  getCurrencyFormat: function () {
    return currencyFormat;
  },

  setCurrencyFormat: function (newCurrencyFormat) {
    currencyFormat = assign({}, currencyFormat, newCurrencyFormat);
  },

  getPercentageFormat: function () {
    return percentageFormat;
  },

  setPercentageFormat: function (newPercentageFormat) {
    percentageFormat = assign({}, percentageFormat, newPercentageFormat);
  },

  toNumber: function (formattedNumber, forceInteger) {
    if (typeof formattedNumber !== 'string' || formattedNumber === '') {
      return formattedNumber;
    }

    var delimiterRegex = new RegExp((this.getNumberFormat().thousands_separator === '.' ? '\\' : '') + this.getNumberFormat().thousands_separator, 'g');
    const output = formattedNumber.replace(delimiterRegex, '').replace(this.getNumberFormat().decimal_mark, '.').replace(/ /g, '');

    if (isNaN(output)) {
      return output;
    } else if (forceInteger) {
      return ~~(+output);
    }
    return +output;
  },

  toFormattedNumber: function (number, forceDecimal, useExactPrecision, precision) {
    if (typeof number !== 'number') {
      return number;
    }

    let isNegative = false;
    if (number < 0) {
      isNegative = true;
    }

    let parts = number.toString().replace('-', '').split('.');
    // NEMO-11597: certain deltas in JS (like 16.99 - 14.99) generate
    // a floating number like 1.9999999999999982. We want to round this number
    // correctly according to the proper precision before we do anything else
    precision = typeof precision === 'number' ? precision : this.getCurrencyFormat().precision;
    const neededPrecision = parts[0].length + precision;
    const preciseNumber = Number(parseFloat(number).toPrecision(neededPrecision));
    parts = preciseNumber.toString().replace('-', '').split('.');

    let output = '';

    for (let i = parts[0].length - 1, delimiterCount = 0; i >= 0; i--, delimiterCount++) {
      if (delimiterCount === 3) {
        output += this.getNumberFormat().thousands_separator;
        delimiterCount = 0;
      }
      output += parts[0][i];
    }

    output = (isNegative ? '-' : '') + output.split('').reverse().join('');

    if ((parts.length === 1 && !forceDecimal) || precision === 0) {
      return output;
    } else if (parts.length === 1 && forceDecimal) {
      let zeroes = '';
      for (let i = 0; i < precision; i++) zeroes += '0';
      return output + this.getNumberFormat().decimal_mark + zeroes;
    }

    let decimal = parts[1];
    decimal = this.fill(decimal, '0', precision, true);

    output += this.getNumberFormat().decimal_mark + decimal;

    return output;
  },

  roundDecimal: function (decimal, precision) {
    return Math.round(('1.' + decimal) * (Math.pow(10, precision))).toString().substring(1);
  },

  fill: function (number, character, minimumLength, to_the_right) {
    let result = number;

    while (result.length < minimumLength) {
      result = to_the_right ? result + character : character + result;
    }

    return result;
  },

  toFormattedCurrency: function (number, forceDecimal, useExactPrecision) {
    const currencyFormat = this.getCurrencyFormat();
    const { symbol_first, with_currency, currency, symbol, precision } = currencyFormat;
    const baseNumber = this.toFormattedNumber(number, forceDecimal, useExactPrecision, precision);
    let formattedCurrency = symbol;

    if (symbol_first) {
      if (baseNumber < 0) {
        formattedCurrency = '-' + formattedCurrency + baseNumber.substr(1);
      } else {
        formattedCurrency += baseNumber;
      }
    } else {
      formattedCurrency = `${baseNumber} ${formattedCurrency}`;
    }

    if (symbol_first && with_currency && currency) {
      formattedCurrency += ' ' + currency;
    }

    return formattedCurrency;
  },

  toFormattedPercentage: function (number, forceDecimal, useExactPrecision) {
    const baseNumber = this.toFormattedNumber(number, forceDecimal, useExactPrecision, this.getPercentageFormat().precision);
    const format  = this.getPercentageFormat();

    return format.symbol_first ? format.symbol + baseNumber : baseNumber + format.symbol;
  },

  getNumberPattern: function () {
    const numberFormat = this.getNumberFormat();
    const decimalMark = (numberFormat.decimal_mark === '.' ? '\\' : '') + numberFormat.decimal_mark;
    const thousandSeparator = (numberFormat.thousands_separator === '.' ? '\\' : '') + numberFormat.thousands_separator;
    const pattern = '[\\d' + thousandSeparator + ']*(' + decimalMark + '[\\d' + thousandSeparator + ']+)?';

    return pattern;
  }
};

export default NumberFormatter;
