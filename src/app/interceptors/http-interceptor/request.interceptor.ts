import { catchError, finalize, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { defer, Observable, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      return next.handle(request)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.body.status != 200) {
              this.toastr.error(event.body.message);
              throwError(() => event.body.message);
            }
          } 
          return event;
        }),
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.statusText);
          return throwError(() => err.statusText);
        })
      );
  }
}
