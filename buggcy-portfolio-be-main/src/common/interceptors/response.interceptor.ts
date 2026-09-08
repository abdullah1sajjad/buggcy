import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  success:   boolean;
  data:      T;
  message:   string;
  timestamp: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        // Preserve paginated responses: { data: [...], total, page, limit, totalPages }
        const isPaginated =
          data && typeof data === 'object' && Array.isArray(data.data) && 'total' in data && 'page' in data;

        return {
          success:   true,
          data:      isPaginated ? data : (data?.data ?? data),
          message:   data?.message ?? 'Success',
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
