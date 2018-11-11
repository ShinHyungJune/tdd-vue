require('jsdom-global')();

// window.Date = Date 추가 안하면 오류남. 특정 버전 이상에서 나는 오류라고 함.
window.Date = Date;