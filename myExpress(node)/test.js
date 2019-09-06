const myex=require('./myexpress');/**看着像是引入文件夹 实则是执行这个文件夹下的index.js文件 */
const app=myex();
app.listen(3000);