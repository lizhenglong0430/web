var dateArr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    function oneday() {
        var date2 = new Date();
        var date3 = new Date(2021,7,22,0,0,0)

        var day2 = date2.getDate();
        var month2 = date2.getMonth(); //getMonth()是从0开始
        var year2 = date2.getFullYear();

        var day3 = date3.getDate();
        var month3 = date3.getMonth(); //getMonth()是从0开始
        var year3 = date3.getFullYear();

        var hours2 = date2.getHours() + 1
        var minutes2 = date2.getMinutes()
        var seconds2 = date2.getSeconds()
        var result = 0; // 目标年
        var result2 = 0; // 初始年
        var result3 = 0; // 总共
        for (var i = 0; i < month2; i++) {
            result += dateArr[i];
        }
        result += day2;
        //判断是否闰年 目标年
        if (month2 > 1 && (year2 % 4 == 0 && year2 % 100 != 0) || year2 % 400 == 0) {
            result += 1;
        }
        // console.log(result);


        for (var j = 0;j < month3; j++){
            result2 += dateArr[j]
        }
        result2 += day3
        // 判断是否闰年 初始年
        if (month3 > 1 && (year3 % 4 == 0 && year3 % 100 != 0) || year3 % 400 == 0) {
            result2 += 1;
        }
        for(var n = year3;n < year2;n++){

            if ((n % 4 == 0 && n % 100 != 0) || n % 400 == 0) {
                result3 += 1;
            }
            result3 += 365
        }
        result3 = result3 + result - result2
        document.getElementById("showtime2").innerHTML = "站点已稳定运行：" + result3 + "天" + hours2 + ':' + minutes2 + ':' + seconds2;
        setTimeout("oneday()", 100);
    }