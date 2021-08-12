module.exports.helpers = {
    toLocaleString: a => Number(a).toLocaleString("da-DK"),

    subPCP: a => a-1,

    checkMember: a => (30<=Number(a)?`Bạn đã đủ điều kiện để nhận thưởng`:
    `Bạn phải Like / View / Subscribe ít nhất ${30-Number(a)} trang nữa để nhận thưởng hằng ngày!`),

    classMember: a => 30<=Number(a)?'active':'',

    checkType: a => a=='sub'?true:false,

    checkBool: (bool, value, html_1, html_2) =>{
        if (bool == value) {
            return html_1;
        } else {
            return html_2;
        }
    },

    clickMax: a => a>=1000?'Đạt giới hạn':'',

    coinInteractive: a => a*50,

    oldTime: (time) => {
        let timeCmt = new Date(time);
        let day = timeCmt.getDate();
        let month = timeCmt.getMonth()+1;
        let year = timeCmt.getFullYear();
        return `${day} tháng ${month} ${year}`;
    },
    
    pagination: (total, size, page) => {
        var pages = Math.ceil(total / size);
        let out = `<ul class="pagination">`;
        for (var i = 1; i <= pages; i++) {
            if (i == page) {
                out =
                    out +
                    `
            <li class="page-item active">
                <a class="page-link" href ="?page=` +
                    i +
                    `">` +
                    i +
                    `</a>
            </li>
            `;
            } else {
                out =
                    out +
                    `
            <li class="page-item">
                    <a class="page-link" href ="?page=` +
                    i +
                    `">` +
                    i +
                    `</a>
            </li>
            `;
            }
        }
        return ( out +`</ul>` );
    }
}