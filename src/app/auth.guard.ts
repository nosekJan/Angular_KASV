import {CanActivateFn, Router} from '@angular/router';
import {UserService} from "../services/user.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  if (userService.token) {
    return true;
  }else {
    router.navigateByUrl('/login');
    return false;
  }
};
