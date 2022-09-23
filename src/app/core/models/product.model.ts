export class ProductModel {
  constructor(
    public alias: string,
    public availableBalance: number,
    public balanceWithlineCredit: number,
    public currency: string,
    public productName: string,
    public productNameCore: string,
    public productNumber: string,
    public productStatus: string,
    public productType: string,
    public icon: string,
    public borderClass: string,
    public availableBalanceStr: string[],
    public descriptionDisplay?: string
  ) {}

  public static getIcon(productType: string) {
    return productType === 'CA' ? 'icon-accountSaving' : 'icon-creditCard';
  }

  public static getBorderClass(productType: string) {
    return productType === 'CA' ? 'card--boder-ca' : 'card--boder-cc';
  }

  public static formatAvailableBalance(balance: number) {
    return balance.toString().split('.');
  }

  public static import(rawData: any) {

    const icon = this.getIcon(rawData.productType);
    const border = this.getBorderClass(rawData.productType);
    const formatBalance = this.formatAvailableBalance(rawData.availableBalance);

    return new ProductModel(
      rawData.alias,
      rawData.availableBalance,
      rawData.balanceWithlineCredit,
      rawData.currency,
      rawData.productName,
      rawData.productNameCore,
      rawData.productNumber,
      rawData.productStatus,
      rawData.productType,
      icon,
      border,
      formatBalance,
      rawData.descriptionDisplay ? rawData.descriptionDisplay : ''
    );
  }
}
