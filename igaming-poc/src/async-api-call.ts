import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function ASYNC_API_CALL(originValue: string, headers: any, method: HttpMethod, payload: any, systemToken: any, endpoint: string, httpService: HttpService, extraData: any = '{}'
): Promise<any> {
    const url = `${originValue?.trim()}/${endpoint}`;

    console.log(` -- SYSTEM_API_CALL (${method}) -> URL: ${url}`, ', payload -> ', payload, ', systemToken -> ', systemToken, ', extraData -> ', extraData);

    const finalHeaders = {
        authorization: `SYSTEM ${systemToken?.jwtToken}`,
        'x-content-source': 'internal',
        'x-system-admin': 'true',
        origin: originValue,
        "Content-Type": headers['content-type'] || "application/json",
        accept: headers.accept || "*/*",
        host: headers.host,
        connection: headers.connection,
        content_length: headers['content-length'] || "0",
        extra_data: JSON.stringify(extraData)
    };

    // Map the method to the correct HttpService call
    const requestMap = {
        GET: httpService.get(url, { headers: finalHeaders }),
        POST: httpService.post(url, payload, { headers: finalHeaders }),
        PUT: httpService.put(url, payload, { headers: finalHeaders }),
        PATCH: httpService.patch(url, payload, { headers: finalHeaders }),
        DELETE: httpService.delete(url, { headers: finalHeaders, data: payload }),
    };

    return firstValueFrom(requestMap[method]);
}