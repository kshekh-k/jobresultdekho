vcl 4.1;

import std;

backend default {
    .host = "strapi";
    .port = "1337";
}

# Respond to incoming requests
sub vcl_recv {
    # Only cache GET and HEAD requests
    if (req.method != "GET" && req.method != "HEAD") {
        return (pass);
    }

    # Don't cache admin panel or authenticated requests
    if (req.url ~ "^/admin" || req.http.Authorization) {
        return (pass);
    }

    # Strip cookies for static assets
    if (req.url ~ "\.(jpg|jpeg|png|gif|ico|css|js)$") {
        unset req.http.Cookie;
        return (hash);
    }

    # Remove all cookies for non-admin requests
    if (req.url !~ "^/admin") {
        unset req.http.Cookie;
    }

    return (hash);
}

sub vcl_backend_response {
    # Cache static assets for 1 day
    if (bereq.url ~ "\.(jpg|jpeg|png|gif|ico|css|js)$") {
        set beresp.ttl = 24h;
        set beresp.grace = 12h;
        unset beresp.http.Set-Cookie;
        return (deliver);
    }

    # Cache API responses for 5 minutes
    if (bereq.url ~ "^/api/" && bereq.method == "GET") {
        set beresp.ttl = 5m;
        set beresp.grace = 1h;
        unset beresp.http.Set-Cookie;
        return (deliver);
    }

    # Don't cache other responses
    if (beresp.ttl <= 0s || beresp.http.Set-Cookie || beresp.http.Vary == "*") {
        set beresp.uncacheable = true;
        set beresp.ttl = 120s;
        return (deliver);
    }

    return (deliver);
}

sub vcl_deliver {
    # Add a header to indicate cache status
    if (obj.hits > 0) {
        set resp.http.X-Cache = "HIT";
    } else {
        set resp.http.X-Cache = "MISS";
    }
    return (deliver);
}