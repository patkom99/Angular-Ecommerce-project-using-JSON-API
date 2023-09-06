import { CanActivateFn } from '@angular/router';
import { SellerServiceService } from './service/seller-service.service';
import { inject } from '@angular/core';

export const sellerGuard: CanActivateFn = (route, state) => {
  const sellerService=inject(SellerServiceService);
  return sellerService.isSellerLoggedIn;
};
