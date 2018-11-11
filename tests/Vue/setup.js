require('jsdom-global')();

let see = (text, selector) => {
    let wrap = selector ? wrapper.find(selector) : wrapper;

    expect(wrap.html()).toContain(text);
};

let type = (selector, text) => {
    let node = wrapper.find(selector);

    node.element.value = text;
    node.trigger('input');
};

let click = (selector) => {
    wrapper.find(selector).trigger('click');
};

// window.Date = Date 추가 안하면 오류남. 특정 버전 이상에서 나는 오류라고 함.
window.Date = Date;