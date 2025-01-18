import { Request, Response } from 'express';

export interface ApiSuccess {
    req: Request;
    res: Response;
    data: Record<string, any> | {};
    message: string;
    status?: number | 200;
}

export interface ApiError {
    message: string;
    status?: number;
    statusCode?: number;
    errorCode?: string;
    details?: any;
    stack?: any;
    stackTrace?: any; // designed for custom error
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
    label: 'RESPONSE_INFO',
    correlationId: string,
    processingTime: string,
    message: string
}

export interface ControllerLog {
    position: 'START' | 'END',
    correlationId: string,
    label: string // Controller name
    httpMethod: string,
    url: string
}
export interface ServiceLog {
    position: 'Service Execution Start' | 'Service Execution End',
    correlationId: string,
    label: string,
    method: string,
    url: string
}
export interface RegistryLog {
    position: 'Registry Execution Start' | 'Registry Execution End',
    correlationId: string,
    label: string,
    method: string,
    url: string
}
export interface HelperLog {
    position: 'Helper Execution Start' | 'Helper Execution End',
    correlationId: string,
    label: string,
    method: string,
    url: string
}
export interface UtilLog {
    position: 'Util Execution Start' | 'Util Execution End',
    correlationId: string,
    label: string,
    method: string,
    url: string
}

export interface CommonLog {
    position: 'Execution Start' | 'Execution End',
    correlationId: string,
    label: string,
    method: string,
    url: string
}
