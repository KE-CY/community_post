## Description
使用 Nest 框架開發簡易貼文留言功能

## Q1. DB desing
![Community_Post](https://user-images.githubusercontent.com/54132183/172594698-8f5f654b-d326-4869-b64e-e410e695d032.png)


## Q2. Engineering planning
1. 設計 Database 
2. 撰寫貼文的 CRUD
3. 撰寫留言的 CRUD

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

## Q3. 應⽤程式反應過慢，會如何找到問題所在並且優化?
A. 如果是 DB 搜尋的速度太慢，會將搜尋方式，改成索引進行查詢，通過創建唯一索引可以保證數據庫表中每一行數據的唯一性，在實現數據的參考完整性方面可以加速表與表之間的連接。<br>
A. 如果是同時收到大量的回覆，導致伺服器無法負荷，會增加使用 Redis 操作，因為 Redis 是純記憶體操作每 1 秒可以處理 10 萬次的讀寫操作。

## Docker run
```bash
$ docker-compose build --no-cache
$ docker-compose up -d
```

## Running the app

```bash
$ npm i
$ npm run start:dev
```

## Author

- Author - [Chih Yi, Ko](https://github.com/KE-CY)

