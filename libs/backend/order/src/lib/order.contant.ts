export const OrderQuantity = {
  Min: 1,
  Max: 50
}

export const OrderValidationMessage = {
  TypeOfOrderWrongType: 'TypeOfOrder must be string',
  TrainingIdWrongType: 'TrainingId must be UUID',
  PriceWrongType: 'Price must be integer',
  QuantityWrongNumber: `Quantity must be from ${OrderQuantity.Min} to ${OrderQuantity.Max}`,
  QuantityWrongType: 'Quantity must be integer',
  PaymentWrongType: 'Payment must be VISA, MIR or UMONEY'
}
