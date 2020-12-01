# ts-nexus-apollo-prisma

### 이 프로젝트는 Typesciprt 기반, Graphql API 서버로, nexus/apollo/prisma 를 활용하여 구현되었습니다.

------
### How to run
- Install dependencies
    ```
    $yarn install
    ```
- Run postgresql server
    ```
    $docker run --detach --publish 5432:5432 -e POSTGRES_PASSWORD=postgres --name postgres postgres:10.12
    ```
- Set database url(prisma/.env)
    ```
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/myapp"
    ```
- Prisma & Nexus generate
    ```
    $yarn generate
    ```
- Prisma migrate
    ```
    $yarn migrate
    ```
- Run server
    ```
    $yarn dev
    ```
------
### How to Test
    
    $yarn test
    
    

  
