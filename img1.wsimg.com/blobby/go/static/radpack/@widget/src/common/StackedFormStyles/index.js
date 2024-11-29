const Styles = function Styles() {
  this.marginBottom = {
    marginBottom: 'medium'
  };

  this.centeredMarginBottom = {
    ...this.marginBottom,
    textAlign: 'center'
  };

  this.notAMember = {
    '@md': { marginTop: 'xlarge' }
  };

  this.honeypotContainer = {
    background: 'white',
    fontSize: '1px',
    height: '0',
    overflow: 'hidden'
  };

  this.honeypotTextField = {
    fontSize: '1px',
    width: '1px !important',
    height: '1px !important',
    border: '0 !important',
    lineHeight: '1px !important',
    padding: '0 0',
    minHeight: '1px !important'
  };

  this.formButtonBlock = {
    textAlign: 'center'
  };
};

export default Styles;
