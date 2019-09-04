let dessert="dessert",
     drink="drink";
let breakfast=kitchen`内容\n${dessert}内容${drink}内容`
function kitchen(strings,...values){
 console.log(strings);//[ '内容', '内容', '内容' ]
 console.log(values);//[ 'dessert', 'drink' ]
let result="";
for(let i=0;i<values.length;i++){
    result+=strings[i];
    result+=values[i];
}
result+=strings[strings.length-1];
return result;
}
console.log(breakfast)

console.log(breakfast.startsWith('内容'))
console.log(breakfast.endsWith('内容'))
console.log(breakfast.includes('内容'))


function handle(dessert="dessert",drink="drink"){
    return `${dessert}${drink}`
   }
   console.log(handle());

   function breakfast(dessert,drink,...foods){
    console.log(dessert,drink,foods);
   }
   breakfast('11','22','33','44','55');


   function breakfast(dessert,drink,{location,restatrant}={}){
    console.log(dessert,drink,location,restatrant);
   }
   breakfast('11','22',{location:"3333",restatrant:"44444"});

   function breackfast(){
   }
   console.log(breackfast.name);

function breackfast(){
}
console.log(breackfast.name);

let breakfast=function superBreakfast (){
}
console.log(breakfast.name)
console.log(superBreakfast.name);//superBreakfast is not defined

var breakfast=dessert=>dessert;
    console.log(breakfast('111'));
    console.log((x=>x*3)(3));
    console.log(x);
'use strict'
    let  breakfast=(dessert)=>{
        console.log(arguments);
        return dessert
        }
        console.log(breakfast('11111'))


        let food={};
food.dessert="drink";
console.log(food)
food['hot drink']='drink';
console.log(food)

NaN==NaN;//false
Object.is(NaN,NaN);//true
Object.is(+0,-0);//false
var obj={name:111,'bbbb':222}
var arr=[1,2,3,4,524]
var obj1={aaaa:111,1:222}
console.log(obj==obj1)
console.log(Object.getOwnPropertyNames(arr))
console.log(Object.keys(arr))
console.log(Object.is(obj,obj1));

let breakfast={
    getDrink(){
        return 'desert'
    }
}
let dinner={
    getDrink(){
        return 'slide'
    }
}
let sunday=Object.create(breakfast);
console.log(sunday.getDrink());
console.log(Object.getPrototypeOf(sunday)===breakfast)
Object.setPrototypeOf(sunday,dinner)
console.log(sunday.getDrink(),Object.getPrototypeOf(sunday)===breakfast)


let breakfast={
    getDrink(){
        return 'desert'
    }
}
let dinner={
    getDrink(){
        return 'slide'
    }
}
let sunday={
 __proto__:breakfast,
 getDrink(){
 return super.getDrink()+'muke';
}
}
console.log(sunday.getDrink())

function* fn(){
    yield "遇到第一个"
    yield '遇到第二'
}
let f=fn();
console.log(f)
console.log(f.next());

//chef厨师 foods食物
function chef(foods){
    let i=0;
    return {
        next(){
            let done=(i>=foods.length);
            let value=!done?foods[i++]:undefined;
            return {
                value:value,
                done:done
            }
        }
    }
}
let wanghao=chef(['t','egg']);
console.log(wanghao)
console.log(wanghao.next())
console.log(wanghao.next())
console.log(wanghao.next())


let chef=function*(){
    yield console.log('1111')
}
che=chef();
che.next();

function* chef(){
    yield 't';
    yield 'ott'
   }
   let wanghao=chef();
   console.log(wanghao.next());//{value:"t",done:false}
   console.log(wanghao.next());//{value:"ott",done:true}
   console.log(wanghao.next());//{value:"ott",done:true}


   function* chef(foods){
    for(var i=0;i<foods.length;i++){
        yield foods[i];
    }
   }
   let caocao=chef(['a','ott']);
   console.log(caocao.next())
   console.log(caocao.next())



   class Chef{
    constructor(food){
    this.food=food;
     this._dish=[];
    }
    get dish(){
     return this._dish;
    }
    set dish(dish){
     return this._dish.push(dish);
    }
   }
let caocao=new Chef('caocao');
   console.log(caocao.dish='333')
   console.log(caocao.dish='555')
   console.log(caocao.dish)


   class Chef{

    constrctor(food){
        this.food=food;
    }
    
    static cook(data){
        this.prototype.food=[];
        this.prototype.food.push(data);
    let newFood=new this(data);
     return newFood;
    }
    cooked(data){
        console.log(data);
        console.log(this.prototype)
    }
   }
   console.log(che=Chef.cook(':tom'));
   console.log(che.food,che.cooked('data'))
//    console.log(che.cooked('1111'))
//    console.log(che.cooked('data'));
//    let caocao=new Chef();



class Person{
    constructor(name,birthday){
     this.name=name;
     this.birthday=birthday;
    }
    
    intro(){
    return `${this.name},${this.birthday}`
    }
   }

   class Chef extends Person{
    constructor(name,birthday,foods){
     super(name,birthday);
     this.foods=foods;
    }
    intro(){
       console.log(this.name,this.birthday,this.foods);
       return super.intro();
    }
   }
   let caocao=new Chef('caocao','2000','19')
    console.log(caocao.intro());

    //创建set 
    let desserts=new Set('123');
desserts.add('4'); 
desserts.add('4');//失败
console.log(desserts.has('1'))