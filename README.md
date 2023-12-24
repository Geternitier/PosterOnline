# PosterOnline

Developed with Vue 3 in Vite.

## 说明
### 申请
代码实现在ApplicationForm.vue中，submitForm会将含有以下内容的formData以```Content-Type: multipart/form-data```的格式POST到```SERVER_ADDR + "/api/users/application"```：
```
  name: string,
  date: string,
  department: string,
  description: string
  file: rawFile
```

### 审核
代码实现在PosterList和AuditComponent。

POST等请求还未具体实现。

基本思路是后端将海报分类为已审核(通过)、未审核、已撤回、已过期，前端会请求其中一个分类的海报列表。

海报列表中每个海报需要包含以下信息：
```
  name: string,
  date: string,
  department: string,
  description: string
  url: string
```
同时，前端会给后端发送包含海报名称的通过和撤回请求：

已撤回or未审核 通过 > 已审核

已审核or未审核 撤回 > 已撤回

所有日期在今天之前的海报视为已过期海报。

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
