const ERROR_MESSAGE = {
    HTTP_CONTINUE: "Everything so far is OK.",
    HTTP_SWITCHING_PROTOCOLS: "Switching Protocols",
    HTTP_PROCESSING: "Server has received and is processing the request, but no response is available yet.", // RFC2518
    HTTP_EARLY_HINTS: "Preloading resources while the server prepares a response", // RFC8297
    HTTP_OK: "The request succeeded.",
    HTTP_CREATED: "The request succeeded, and a new resource was created as a result.",
    HTTP_ACCEPTED: "The request has been received but not yet acted upon.",
    HTTP_NON_AUTHORITATIVE_INFORMATION: "The returned metadata is not exactly the same as is available from the origin server, but is collected from a local or a third-party copy.",
    HTTP_NO_CONTENT: "There is no content to send for this request, but the headers may be useful.",
    HTTP_RESET_CONTENT: "Please reset the document which sent this request.",
    HTTP_PARTIAL_CONTENT: "The range header is sent from the client to request only part of a resource.",
    HTTP_MULTI_STATUS: "Multiple status codes might be appropriate.", // RFC4918
    HTTP_ALREADY_REPORTED: "Used inside a response element to avoid repeatedly enumerating the internal members of multiple bindings to the same collection.", // RFC5842
    HTTP_IM_USED: "The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.", // RFC3229
    HTTP_MULTIPLE_CHOICES: "The request has more than one possible response.",
    HTTP_MOVED_PERMANENTLY: "The URL of the requested resource has been changed permanently.",
    HTTP_FOUND: "The URI of requested resource has been changed temporarily",
    HTTP_SEE_OTHER: 303,
    HTTP_NOT_MODIFIED: 304,
    HTTP_USE_PROXY: 305,
    HTTP_RESERVED: 306,
    HTTP_TEMPORARY_REDIRECT: 307,
    HTTP_PERMANENTLY_REDIRECT: 308, // RFC7238
    HTTP_BAD_REQUEST: 400,
    HTTP_UNAUTHORIZED: 401,
    HTTP_PAYMENT_REQUIRED: 402,
    HTTP_FORBIDDEN: 403,
    HTTP_NOT_FOUND: 404,
    HTTP_METHOD_NOT_ALLOWED: 405,
    HTTP_NOT_ACCEPTABLE: 406,
    HTTP_PROXY_AUTHENTICATION_REQUIRED: 407,
    HTTP_REQUEST_TIMEOUT: 408,
    HTTP_CONFLICT: 409,
    HTTP_GONE: 410,
    HTTP_LENGTH_REQUIRED: 411,
    HTTP_PRECONDITION_FAILED: 412,
    HTTP_REQUEST_ENTITY_TOO_LARGE: 413,
    HTTP_REQUEST_URI_TOO_LONG: 414,
    HTTP_UNSUPPORTED_MEDIA_TYPE: 415,
    HTTP_REQUESTED_RANGE_NOT_SATISFIABLE: 416,
    HTTP_EXPECTATION_FAILED: 417,
    HTTP_I_AM_A_TEAPOT: 418, // RFC2324
    HTTP_MISDIRECTED_REQUEST: 421, // RFC7540
    HTTP_UNPROCESSABLE_ENTITY: "Invalid data given on request.", // RFC4918
    HTTP_LOCKED: 423, // RFC4918
    HTTP_FAILED_DEPENDENCY: 424, // RFC4918
    HTTP_TOO_EARLY: 425, // RFC-ietf-httpbis-replay-04
    HTTP_UPGRADE_REQUIRED: 426, // RFC2817
    HTTP_PRECONDITION_REQUIRED: 428, // RFC6585
    HTTP_TOO_MANY_REQUESTS: 429, // RFC6585
    HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE: 431, // RFC6585
    HTTP_UNAVAILABLE_FOR_LEGAL_REASONS: 451,
    HTTP_INTERNAL_SERVER_ERROR: "Internal server error",
    HTTP_NOT_IMPLEMENTED: 501,
    HTTP_BAD_GATEWAY: "HTTP bad gateway",
    HTTP_SERVICE_UNAVAILABLE: 503,
    HTTP_GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL: 506, // RFC2295
    HTTP_INSUFFICIENT_STORAGE: 507, // RFC4918
    HTTP_LOOP_DETECTED: 508, // RFC5842
    HTTP_NOT_EXTENDED: 510, // RFC2774
    HTTP_NETWORK_AUTHENTICATION_REQUIRED: 511, // RFC6585
};

module.exports = ERROR_MESSAGE;
