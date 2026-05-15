import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { Observable, map } from 'rxjs';

interface TokensResponse {
  accessToken: string;
  refreshToken: string;
  message: string;
}

@Injectable()
export class SetTokensInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const response = ctx.switchToHttp().getResponse<FastifyReply>();

    return next.handle().pipe(
      map((data: TokensResponse) => {
        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite:
            process.env.NODE_ENV === 'production'
              ? ('none' as const)
              : ('strict' as const),
          path: '/',
        };

        if (data.accessToken && data.refreshToken) {
          response.setCookie('access_token', data.accessToken, {
            ...cookieOptions,
            maxAge: 15 * 60, // 15 minutos em segundos
          });

          response.setCookie('refresh_token', data.refreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60, // 7 dias em segundos
          });
        } else {
          const clearOptions = {
            path: '/',
          };

          response.clearCookie('access_token', clearOptions);
          response.clearCookie('refresh_token', clearOptions);
        }

        return { message: data.message };
      }),
    );
  }
}
