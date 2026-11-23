import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Executado pelo Angular antes de abrir uma rota protegida.
export const authGuard: CanActivateFn = () => {
  // inject() obtém os serviços que este guard precisa usar.
  const authService = inject(AuthService);
  const router = inject(Router);

  // Com sessão, libera a navegação; sem sessão, redireciona para o login.
  if (authService.estaAutenticado()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
