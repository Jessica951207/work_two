let loginUser = layui.sessionData('sessionData').userSession;

let bo_state = [
    {value: 1, html: '待分配'},
    {value: 2, html: '待接受'},
    {value: 3, html: '待跟进'},
    {value: 4, html: '成单'},
    {value: 5, html: '结束'},
    {value: 6, html: '失效'},
];

function getBoStateName(state) {
    for (let boState of bo_state) {
        if (boState.value === state) {
            return boState.html;
        }
    }
    return '未知';
}
