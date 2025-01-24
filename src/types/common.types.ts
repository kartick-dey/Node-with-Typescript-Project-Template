import { NextFunction, Request, Response } from 'express';

export interface ApiSuccessResponse {
    req: Request;
    res: Response;
    data: Record<string, any> | {};
    message: string;
    status?: number | 200;
}

export interface ApiErrorResponse {
    req: Request;
    res: Response;
    next: NextFunction;
    error: Record<string, any> | {};
}

export interface RequestLog {
    label: 'REQUEST_INFO';
    correlationId: string;
    httpMethod: string;
    url: string;
    deviceInfo: string | undefined; // req.headers['user-agent']
    ip: any;
}

export interface ResponseLog {
    label: 'RESPONSE_INFO';
    correlationId: string;
    processingTime: string;
    message: string;
}

export interface ControllerLog {
    position: 'START' | 'END';
    correlationId: string;
    label: string; // Controller name
    httpMethod: string;
    url: string;
}
export interface ServiceLog {
    position: 'Service Execution Start' | 'Service Execution End';
    correlationId: string;
    label: string;
    method: string;
    url: string;
}
export interface RegistryLog {
    position: 'Registry Execution Start' | 'Registry Execution End';
    correlationId: string;
    label: string;
    method: string;
    url: string;
}
export interface HelperLog {
    position: 'Helper Execution Start' | 'Helper Execution End';
    correlationId: string;
    label: string;
    method: string;
    url: string;
}
export interface UtilLog {
    position: 'Util Execution Start' | 'Util Execution End';
    correlationId: string;
    label: string;
    method: string;
    url: string;
}

export interface CommonLog {
    position: 'Execution Start' | 'Execution End';
    correlationId: string;
    label: string;
    method: string;
    url: string;
}

export interface ENV {
    NODE_ENV: ENVIRONMENT;
    PORT: number;
    CORS_ORIGIN: string;
    HTTP_METHODS: string;
    REQUEST_SIZE: number;
    API_BASE_URL: string;
    HTTP_HEADERS: string;
}

export type ENVIRONMENT = 'dev' | 'prod' | 'uat';
