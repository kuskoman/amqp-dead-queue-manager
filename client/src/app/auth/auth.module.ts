import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, JwtInterceptor],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
