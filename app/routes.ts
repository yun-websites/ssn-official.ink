import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("podcasts", "routes/podcasts.tsx"),
    route("association", "routes/association.tsx"),
    route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
