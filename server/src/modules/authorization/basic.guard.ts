import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class BasicGuard implements CanActivate {
  constructor(private readonly authService: AuthorizationService) {}
  private decodeAuthHeader(header: string) {
    const b64auth = header.split(' ')[1];
    if (!b64auth) return undefined;
    const decoded = Buffer.from(b64auth, 'base64').toString().split(':');
    if (decoded.length != 2) return undefined;
    return {
      username: decoded[0],
      password: decoded[1],
    };
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers['authorization'];
    if (!auth) return false;
    const { username, password } = this.decodeAuthHeader(auth);
    if (!username || !password) return false;
    const user = await this.authService.verifyUser(username, password);
    if (!user) return false;
    request.userId = user.id;
    return true;
  }
}
