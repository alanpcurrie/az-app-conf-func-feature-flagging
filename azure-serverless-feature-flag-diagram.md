```mermaid
graph LR
    A[Azure App Configuration] -->|Configuration settings| B[Azure Functions]
    B -->|Serverless execution| C[Feature Flag Service]
    C -->|Feature toggle state| B
    D[Developers] -->|Manage flags| C
    E[Clients] -->|Requests| B
    B -->|Responses| E
    F[Azure Portal] -->|Manage| A
    F -->|Monitor & Deploy| B
    F -->|Configure| C
    G[Azure Cache for Redis] -->|Cached data| B
    B -->|Cache requests/updates| G
    A -.->|Cache config| G
    C -.->|Cache flags| G
 ```


