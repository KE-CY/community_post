## Description
使用 Nest 框架開發簡易貼文留言功能

## DB desing
![Community_Post](https://user-images.githubusercontent.com/54132183/172594698-8f5f654b-d326-4869-b64e-e410e695d032.png)


## Engineering planning
Step 1. 設計 Database 
Step 2. 撰寫貼文的 CRUD
Step 3. 撰寫留言的 CRUD

## Q3 應⽤程式反應過慢，會如何找到問題所在並且優化?
A. 如要加快搜尋速度，可以使用 MySQL 的索引方式做搜尋

## Running the app

```bash
# watch mode
$ npm run start:dev
```
## Docker run
```bash
$ docker-compose build --no-cache
$ docker-compose up -d
```

## Api 
### Post
1. Get all post -> Get: `/post`
2. Get top10 comment -> Get:  `/post/top10`
3. Create post -> Post: `/post`
4. Update post -> Patch: `/post/:id`
5. Delete post -> Delete: `/post/:id`

### Comment
1. Create comment -> Post: `/comment`
2. Reply comment -> Post: `/comment/:id`
3. Update comment -> Patch: `/comment/:id`
4. Delete comment -> Delete: `/comment/:id`

## Author

- Author - [Chih Yi, Ko](https://github.com/KE-CY)

