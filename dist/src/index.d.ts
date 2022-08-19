interface Logger {
    (formatter: any, ...args: any[]): void;
    error: (formatter: any, ...args: any[]) => void;
    trace: (formatter: any, ...args: any[]) => void;
}
declare function Logger(namespace: string): Logger;
declare namespace Logger {
    var disable: () => void;
    var enable: (namespaces: string) => void;
    var enabled: (namespaces: string) => boolean;
}
export = Logger;
