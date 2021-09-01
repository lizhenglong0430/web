class Pagination {
    constructor (ele,options={}){
        this.ele = document.querySelector(ele)

        // 1.设置一套默认值出来
        this.default = {
            current:options.current || 1, // 当前是第几页
            total:options.total || 90, // 一共多少条数据
            totalpage:9, // 多少页
            pagesize:options.pagesize || 10, // 一页上多少条数据
            first:options.first || 'first', // 默认首页文本 
            prev:options.prev || 'prev', // 默认上一页文本
            next:options.next || 'next', // 默认下一页文本
            last:options.last || 'last', // 默认尾页文本
            go:options.go || 'go', // 默认跳转按钮文本
            change:options.change || (()=>{}), // 每次改变的时候出发的函数
            // styles:{}, // 用户设置的独立样式
        }
        // 单独提取一套按钮样式
        this.btnCss = {
            float: 'left',
            padding: '5px',
            margin: '5px',
            border: '1px solid #333',
            cursor: 'pointer',
        }

        this.init()
    }

    init () {
        // 计算总页数
        this.default.totalpage = Math.ceil(this.default.total / this.default.pagesize)
        this.renderHtml()
        this.setBoxStyle()
        this.bindEvent()
    }
    // 2.渲染 DOM 结构
    renderHtml (){
        const {first,prev,next,last,current} = this.default
      
        // 因为要渲染很多的结构进去
        // 准备一个“筐”
        const frg = document.createDocumentFragment()

        // 1.创建一个首页标签
        frg.appendChild(setCss(creEle('div','first',first),this.btnCss))
        frg.appendChild(setCss(creEle('div','prev',prev),this.btnCss))
        
        // list 单独接受一个变量
        const list = setCss(creEle('div','list',''),{margin:0,padding:0,float:'left'})
        list.appendChild(this.creItem())
        frg.appendChild(list)
        
        frg.appendChild(setCss(creEle('div','next',next),this.btnCss))
        frg.appendChild(setCss(creEle('div','last',last),this.btnCss))
        
        // jump 单独收到一个变量
        const jump = setCss(creEle('div','jump',''),{margin:0,padding:0,float:'left'})
        jump.appendChild(this.creJump())
        frg.appendChild(jump)


        // 最后一次性放到 this.ele
        this.ele.innerHTML = ''
        this.ele.appendChild(frg)

        // 调用用户传递进来的函数
        this.default.change(current)
    }
    // 2-2.创建 item 标签页的方法
    creItem () {
        const {current,totalpage} = this.default

        // 创建一个筐
        const frg = document.createDocumentFragment()

        // 当总页数 <= 9 的时候，不管多少个直接渲染
        if (totalpage <= 9){
            for(let i = 1; i <= 2; i++){   // 原来是9
                const p = setCss(creEle('p','item',i),this.btnCss)
                p.dataset.index = i
                if (i === current) setCss(p,{backgroundColor: 'orange'})
                frg.appendChild(p)
            }
            return frg
        }
        // 准备一个 ...
        const point = document.createElement('p')
        point.innerHTML = '...'
        setCss(point,{
            padding:'5px',
            margin:"5px",
            float:'left'
        })

        // 当总页数 > 9 的时候
        // 当 current < 5 的时候，1 2 3 4 5 ... 99 100
        if (current < 5 ){
            for(let i = 1; i <= 5; i++){
                const p = setCss(creEle('p','item',i),this.btnCss)
                p.dataset.index = i
                if (i === current) setCss(p,{backgroundColor: 'orange'})
                frg.appendChild(p)
            }
            // 加一个...
            frg.appendChild(point.cloneNode(true))

            for(let i = totalpage - 1; i <= totalpage; i++){
                const p = setCss(creEle('p','item',i),this.btnCss)
                p.dataset.index = i
                frg.appendChild(p)
            }

            return frg
        }

        
        // 当 current == 5 的时候，1 2 3 4 5 6 7... 99 100
        if (current === 5){
            for(let i = 1; i <= 7; i++){
                const p = setCss(creEle('p','item',i),this.btnCss)
                p.dataset.index = i
                if (i === current) setCss(p,{backgroundColor: 'orange'})
                frg.appendChild(p)
            }
            // 加一个...
            frg.appendChild(point.cloneNode(true))

            for(let i = totalpage - 1; i <= totalpage; i++){
                const p = setCss(creEle('p','item',i),this.btnCss)
                p.dataset.index = i
                frg.appendChild(p)
            }

            return frg
        }
        // 当 current > 5 && current < 倒数第五个 的时候，1 2 ... 5 6 current 8 9... 99 100
        if (current > 5 && current < totalpage -4){
            for(let i = 1; i <= 2; i++){
                const p = setCss(creEle('p','item',i),this.btnCss)
                p.dataset.index = i
                if (i === current) setCss(p,{backgroundColor: 'orange'})
                frg.appendChild(p)
            }
            // 加一个...
            frg.appendChild(point.cloneNode(true))

            // 放中间五个
            for (let i = current - 2;i <= current +2;i++){
                const p = setCss(creEle('p','item',i),this.btnCss)
                p.dataset.index = i
                if (i === current) setCss(p,{backgroundColor: 'orange'})
                frg.appendChild(p)
            }

            frg.appendChild(point.cloneNode(true))

            for(let i = totalpage - 1; i <= totalpage; i++){
                const p = setCss(creEle('p','item',i),this.btnCss)
                p.dataset.index = i
                frg.appendChild(p)
            }

            return frg
        }
        // 当 current == 倒数第五个 的时候，1 2 ... 94 95 current 97 98 99 100
        if(current === totalpage - 4){
            for(let i = 1; i <= 2; i++){
                const p = setCss(creEle('p','item',i),this.btnCss)
                p.dataset.index = i
                if (i === current) setCss(p,{backgroundColor: 'orange'})
                frg.appendChild(p)
            }
            // 加一个...
            frg.appendChild(point.cloneNode(true))

            for(let i = totalpage - 6; i <= totalpage; i++){
                const p = setCss(creEle('p','item',i),this.btnCss)
                p.dataset.index = i
                if (i === current) setCss(p,{backgroundColor: 'orange'})
                frg.appendChild(p)
            }

            return frg
        }
        // 当 current > 倒数第五个 的时候，1 2 ... current 97 98 99 100
        if(current > totalpage - 4){
            for(let i = 1; i <= 2; i++){
                const p = setCss(creEle('p','item',i),this.btnCss)
                p.dataset.index = i
                if (i === current) setCss(p,{backgroundColor: 'orange'})
                frg.appendChild(p)
            }
            // 加一个...
            frg.appendChild(point.cloneNode(true))

            for(let i = totalpage - 4; i <= totalpage; i++){
                const p = setCss(creEle('p','item',i),this.btnCss)
                p.dataset.index = i
                if (i === current) setCss(p,{backgroundColor: 'orange'})
                frg.appendChild(p)
            }

            return frg
        }



        return frg
    }
    // 2-3.创建 jump 跳转结构
    creJump () {
        const {go,current} = this.default
        const frg = document.createDocumentFragment()
        // 創建一個 input 标签
        const inp = document.createElement('input')
        inp.value = current
        setCss(inp,{
            height:'28px',
            width:'30px',
            float:'left',
            outline:'none',
            margin:'5px',
        })
        frg.appendChild(inp)

        // 创建一个 button 标签
        const btn = document.createElement('button')
        btn.className = 'go'
        btn.innerHTML = go
        setCss(btn,{
            height:'30px',
            width:'30px',
            float:'left',
            outline:'none',
            margin:'5px',
            cursor:'pointer'
        })
        frg.appendChild(btn)

        return frg
    }
    // 3.设置大盒子样式 
    setBoxStyle () {
        setCss(this.ele,{
            width:"800px",
            height:"50px",
            padding:"10px 30px 0",
            position:"absolute"
        })
    }
    // 4.绑定事件 - 事件委托
    bindEvent () {
        this.ele.addEventListener('click',e => {
            e = e || window.event
            const target = e.target || e.srcElement

            // 解构赋值
            const {current,totalpage} = this.default

            // 判断下一页，并且是在最后一页
            if (target.className === 'next' && current < totalpage) {
                this.default.current++
                this.renderHtml()
            }
            // 判断上一页，并且是在第一页之后
            if(target.className === 'prev' && current > 1){
                this.default.current--
                this.renderHtml()
            }
            // 判断最后一页，并且在最后一页之前
            if(target.className === 'last' && current < totalpage){
                this.default.current = totalpage
                this.renderHtml()
            }
            // 判断是第一页，并且是在第一页之后
            if(target.className === 'first' && current > 1){
                this.default.current = 1
                this.renderHtml()
            }
            // 判断是某一页
            if(target.className === 'item') {
                const index = target.dataset.index - 0
                if(index === current) return
                this.default.current = index
                this.renderHtml()
            }
            // 判断是跳转按钮
            if(target.className === 'go') {
                // 我要拿到前面 input 文本里面的文本
                let index = target.previousElementSibling.value - 0
                if(index <= 1) index = 1
                if(index >= totalpage) index = totalpage
                if(index === current) return
                this.default.current = index
                this.renderHtml()
            }
        })
    }
}

// 额外的两个方法

// 创建 DOM 结构
// 社么标签？
// 社么类名？
// 社么文本内容？
function creEle(nodeName,className,text) {
    const ele = document.createElement(nodeName)
    ele.className = className
    // 最好使用innerHTML
    ele.innerHTML = text

    return ele
}

// 添加 css 样式
// 给谁添加？
// 添加设么样式
function setCss(ele,styles) {
    for(let key in styles) {
        ele.style[key] = styles[key]
    }
    // 上面的for 循环，是在ele 添加样式
    // ele 就是要添加样式的元素
    return ele
}