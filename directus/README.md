# Directus

Directus is a headless CMS and data platform that provides an admin app, authentication, permissions, and auto-generated APIs (REST/GraphQL) on top of your SQL database.

## Docker Folder Requirements

When running Directus with Docker bind mounts, you must create both folders below inside `directus/` before starting containers:

- `uploads` (stores uploaded files and media assets)
- `extensions` (stores custom Directus extensions)

You can create them with:

```bash
mkdir -p directus/uploads directus/extensions
```
