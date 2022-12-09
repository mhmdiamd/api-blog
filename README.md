# api-blog
Api ini saya buat untuk belajar membantu proses belajar dan mengetahui path belajar saya dimasa mendatang, saya juga mempersilahakan siapapun jika ingin menggunakan api ini,
API ini saya buat menggunakan monggo DB, jadi sangat disarankan menggunakan MongoDB baik itu local maupun dengan Cloud Service

## Configurasi API
1.  Lakukan installasi package manager terlebih dahulu (npm install / npm i)
2.  buat file .env
    dan copy code dibawah ini :
    DB = (your Database)
    SECRET_KEY = (secret key for access_token)
    SECRET_KEY_REFRESH = (secret key for refresh_token)
3.  lakukan installasi nodemon (npm install nodemon --dev)
4.  Jalankan "nodemon index" pada directory terminal folder ini

## Endpoint
### Authentikasi
  1.  http://localhost:8800/api/v1/auth/register (POST) -> {username, password, email, password}
  2.  http://localhost:8800/api/v1/auth/login (POST) -> {username, password}
  3.  http://localhost:8800/api/v1/auth/logout (POST) -> Authorization : Bearer (token)
  4.  http://localhost:8800/api/v1/auth/refresh (POST) -> Headers Authorization : Bearer (token)

### Posts
  1.  http://localhost:8800/api/v1/posts (GET)
  2.  http://localhost:8800/api/v1/posts/:slug (GET) -> Single Post
  3.  http://localhost:8800/api/v1/posts/:slug (PUT) 
  4.  http://localhost:8800/api/v1/posts (POSTS) -> Authorization : Bearer (token) 
  5.  http://localhost:8800/api/v1/posts/:postId (DELETE) 
  
  ** Filter **
 -  http://localhost:8800/api/v1/posts?search=&category= (GET)
 ** Pagination **
    Default limit is 10 data
 -  http://localhost:8800/api/v1/posts?page=&limit= (GET)
  
### Users 
  1.  http://localhost:8800/api/v1/users (GET)
  2.  http://localhost:8800/api/v1/users/:userId (GET) -> Authorization : Bearer (token)
  3.  http://localhost:8800/api/v1/users/:userId (PUT) -> Authorization : Bearer (token)
  4.  http://localhost:8800/api/v1/users/:userId (DELETE) -> Authorization : Bearer (token)
  
  
## Thank You
    
