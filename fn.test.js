//const { default: test } = require('node:test');  <=이거 자꾸 생기는데 없애고 하자
const fn = require('./fn');

//에러에 대한 테스트에 대한 사용법


//실패하는 것들은 전부 주석처리 되어 있음

test('이 부분은 무슨 테스트인지 알기 쉽게 작성', () => {
    expect(1).toBe(1);
});

test('2더하기 3은 5가 나와야 한다.', () =>{
    expect(fn.add(2,3)).toBe(5)     //테스트 결과는 5가 나와야한다는 뜻
})

test('3더하기 3은 5가 아니다..', () =>{//이건 일부로 실패하는 코드
    expect(fn.add(3,3)).not.toBe(5)     //not을 쓰면 부정형
})

test('2더하기 3은 5가 나와야 한다.', () =>{
    expect(fn.add(2,3)).toEqual(5)     //toBe 와 toEqual은 비슷하다
})


//여기는 tobe와 toequal과 tostrictequal의 차이를 본다.===============================================
// test('이름과 나이를 받아서 객체로 반환', () =>{//이것은 실패한다. 객체나 배열은 주기적으로 돌면서 값을 확인해야 하기 때문에 toBe가 아닌 toEqual을 써야한다.
//     expect(fn.makeUser('Mike', 30)).toBe({
//         name: "Mike",
//         age: 30
//     })
// })



test('이름과 나이를 받아서 객체로 반환', () =>{//이것은 성공한다. 파라미터중 하나인gender를 무시하였지만 Equal은 언급되지 않은 것을 판단하지 않는다.
    expect(fn.makeUser('Mike', 30)).toEqual({
        name: "Mike",
        age: 30
    })
})

// test('이름과 나이를 받아서 객체로 반환', () =>{//이것은 실패한다. 파라미터중 하나인 gender를 무시하였기 때문이다.
//     expect(fn.makeUser('Mike', 30)).toStrictEqual({
//         name: "Mike",
//         age: 30
//     })
// })

//===============================null과 bool값을 테스트
test("null은 null로 반환", () =>{//null은 null이다.
    expect(null).toBeNull();//고로 통과
})


test("0은 false로 반환", () =>{ // 1과 -1을 더하는 함수를 실행했고 이것은 0이므로 false가 된다.
    expect(fn.add(1, -1)).toBeFalsy();//고로 이것또한 통과
})

test("비어있지 않은 문자열은 true로 반환", () =>{ // 문자열 두개를 더했으니 빈 문자열이 아니고 이것은 true가 된다.
    expect(fn.add("hello", "world")).toBeTruthy();//고로 이것또한 통과
})

//===============================크거나 작다를 테스트

// test("ID 길이는 10자 이하", () =>{ 
//     const id = 'THE_BLACK_ORDER'// 10자를 넘는 텍스트, 고로 이건 실패
//     expect(id.length).toBeLessThanOrEqual(10);// id의 길이가 10 보다 작거나 같은가에 대한 테스트, 당연히 실패 toBeGreaterThan // toBeGreaterThanOrEqual // toBeLessThan 은 무슨기능인지 스킵
// })

test("비번은 4자리", () =>{ 
    const pw = '1234'// 딱 4글자
    expect(pw.length).toBe(4);// 딱 4글자인지에 대한 테스트, toBe 대신 toEqual을 써도 된다.
})
//#####주의사항, 소숫점 사칙연산은 정확한 계산이 불가능하다. 예를 들어 0.1 + 0.1은 0.2가 아니다.
//#####왜냐하면 소숫점을 2진수로 변환하면 무한소수가 되는지라 어디까지가 0.1이 아닌 0.1과 근접한 숫자를 기준을 계산하기 때문이다.
//#####때문에 소숫점 계산은 아래를 사용한다.

test("0.1 + 0.2는 0.3인가에 대한 테스트", () =>{ 
    expect(fn.add(0.1, 0.2)).toBeCloseTo(0.3);      //0.1과 0.2를 더한 값이 0.3에 근접한가에 대한 테스트, 소숫점 계산은 이걸로 해야한다.
})


//===============================글자를 포함하는가에 대한 테스트

// test("Hello World에 a라는 글자가 있나?", () =>{ 
//     expect("HelloWorld").toMatch(/a/);      //쓰는법이 조금 독특한 것을 알 수 있다. 당연히 이건 실패, 참고로 대소문자 구분 한다.
// })

test("Hello World에 a라는 글자가 있나?", () =>{ 
    expect("HelloWorld").toMatch(/h/i);      //대소문자를 구분하지 않겠다면 저렇게 i를 넣어주면 된다.
})


//===============================배열에 대한 테스트

// test("유저리스트에 Mike가 있나?", () =>{ 
//     const user = "Mike";
//     const userList = ["Tom", "Jane", "Kai"];
//     expect(userList).toContain(user);      //마이크가 없으니 이건 실패
// })

//===============================에러에 대한 테스트

test("에러가 나나?", () =>{ 
    expect(() => fn.throwErr()).toThrow();      //fn.js의 throwErr는 에러가 나도록 되어 있기 때문에 성공한다.
})

// test("에러가 나나?", () =>{ 
//     expect(() => fn.throwErr()).toThrow('oo');      //fn.js의 throwErr는 xx 에러메시지를 반환하도록 되어있다. 때문에 oo메시지가 나오지 않으며 때문에 여기는 실패한다.
// })


//=========중급 테스트===================
//===============================콜백함수
//아래는 전부 성공이지만 시간을 잡아먹는 관계로 전부 주석처리한다.


// test("3초후에 Mike이름을 받아온다.", done =>{       //이 테스트에는 3초이상이 걸려야 한다.
//     function callback(name){
//         expect(name).toBe("Mike");
//         done();                                    //일정 시간을 기다려야 하는 것에는 done을 넣어주자 만약 이부분만 안 넣어주면 5초정도 기다리다가 타임아웃으로 실패하게 된다.
//     }
//     fn.getName(callback)            //fn의 getName에 callback함수를 전달하고 실행한다.. callback은 바로 위에 정의되어 있다.
// })

// test("3초후에 받아온 나이는 30.", () =>{       //이 테스트 또한 3초이상이 걸려야 한다. 이 테스트에는 프로미스가 사용 되었다.
//     return fn.getAge().then(age =>{            //프로미스를 사용했을 때는 retrun을 사용해 주어야 한다.
//         expect(age).toBe(30);
//     })
// });

// test("3초후에 받아온 나이는 30.", () =>{       //바로 위의 테스트를 보다 간결하게 한 것이다.
//     return expect(fn.getAge()).resolves.toBe(30);   //resolves를 사용하면 보다 간결하게 작성이 가능하다.(단, 이것은 res에 할당했기 때문이다. 
// });             //rejects상황에서도 같은결과를 얻고 싶다면 resolves를 rejects로 바꿔주자. 단, 테스트 대상도 res를 rej로 변경해주어야 한다.


// test("3초후에 받아온 나이는 30. async", async () =>{     //async를 사용한 경우 
//     await expect(fn.getAge()).resolves.toBe(30);
// });          

//테스트전후작업에 대한것========================

//예를들어 이 테스트코드에 num이라는 변수를 만들고 이 변수로 테스트를 하고자 한다면
//테스트 결과 값이 num에 계속반영되기 때문에 여러개의 테스트를 동시에 돌리는 것에 문제가 생긴다.
//그때 필요한 것이 바로 beforeEach(()=>{})다.

let a = 0;

beforeEach(()=>{    //이것은 모든 테스트가 실행되기 전에 실행하기 때문에 a가 테스트 전에 초기화 시켜주는 역할을 한다.
    a = 0;
})

afterEach(()=>{ //이것은 테스트가 실행된 이후에 실행된다.
    a=0;
})          //이러한 함수는 DB에서 자료를 가져올때 실행전에 자료를 가져오고 실행 후에 자료를 DB에 다시 넣는 식으로 활용한다.

//beforeAll과 afterAll도 있다. 이것은 실행전 한번에 가져오기 때문에 이걸 쓰면 테스트 시간이 줄어든다.
//beforeAll, afterAll, beforeEach, afterEach가 같이 있다면 이중에서 beforeAll이 먼저 실행되고 afterAll이 마지막에 실행된다.


//자, 만약 여기에 아래 코드만 있다고 가정할 때, 실행 순서는 다음과 같다.
beforeAll(() => console.log())        // 1                      즉, 이건 모든 것이 시작되기 전에 실행된다.
beforeEach(() => console.log())       // 2, 6
afterEach(() => console.log())        // 4, 10
afterAll(() => console.log())         // 마지막                 즉, 이건 모든 것이 끝나고 실행한다.

test("테스트", ()=>{
    expect(fn.add(0,1)).toBe(1);      // 3
})

describe("내부",()=>{                                             //여긴 구역이 또 나누어졌기에 이 구역에서 또 돈다.
    beforeAll(() => console.log())    // 5
    beforeEach(() => console.log())   // 7                        //each는 안에 있던 밖에 있던 밖의 것이 먼저 실행하고 안의 것이 실행된다.
    afterEach(() => console.log())    // 9
    afterAll(() => console.log())     // 마지막 -1
    test("테스트", () =>{
        expect(fn.add(0,1)).toBe(1);  // 8
    })
})
//===================================================================

//테스트 코드를 작성하다보면 다른건 다 통과하는데 유독 통과를 못하는게 있을 수 있다.
//그 경우, only메소드를 사용하자. 아래는 다 성공이지만 편의를 위해 주석처리

// test.only("온니?",() => {       //only를 사용하면, 나머지 다 스킵하고 이것만 테스트한다.
//     expect(fn.add(1,5)).toBe(6)
// })

// test.skip("스킵?",() => {       //only와는 다르게, 이것만 스킵한다. 물론 주석처리해도 상관없다.
//     expect(fn.add(1,5)).toBe(6)
// })

//mock함수==============================================================
//목함수는 테스트를 위해 흉내만 내는 함수다.

const mockFn = jest.fn();
mockFn();
mockFn(5);                      //mockFn을 두번 호출 했다..

test('dd',() =>{
    //console.log(mockFn.mock.calls);         //이걸 출력하면 [ [], [5] ]가 나온다. 위에 넣었던 값이 저장이 되어있다.(.mock)
    expect('dd').toBe("dd")
});
//목함수 고급==================================

const mockFn_2 = jest.fn();
function forEachAdd1(arr){
    arr.forEach(num =>{
        mockFn_2(num+1)
    })
}

forEachAdd1([10,20,30])                 //값을 3개를 넣었으니 3번 호출된 격이다. 단, 위의 함수를 보면 알곘지만 들어간 값에 1이 들어가 있다.

test("함수호출이 3번 됌",() =>{
    expect(mockFn_2.mock.calls.length).toBe(3);      //목함수가 호출된 횟수(길이)가 3이 되어야 한다는 뜻
});

test("전달된 값은 11, 21, 31이 된다.",() =>{
    //console.log(mockFn_2.mock.calls);               //이걸 출력하면 [[11],[21],[31]]
    expect(mockFn_2.mock.calls[0][0]).toBe(11)      //목함수의 0번 배열의 0번값은 11이 되어야한다.
    expect(mockFn_2.mock.calls[1][0]).toBe(21)      //
    expect(mockFn_2.mock.calls[2][0]).toBe(31)      //두번째와 세번째 전부 동일
})

//목함수 추가======================================
const mockFn_3 = jest.fn(num => num +1);            //위와 비슷한데, 여기선 별다른 펑션없이 화살표 함수로 바로 넣어줌
mockFn_3(10)
mockFn_3(20)
mockFn_3(30)

test("전달된 값은 11, 21, 31이 된다.",() =>{
    //console.log(mockFn_3.mock.results);             //이걸 출력하면 [{type: 'return' , value: 11},{type: 'return' , value: 21},{type: 'return' , value: 31}]이 나온다.
    expect(mockFn_3.mock.results[0].value).toBe(11)      //목함수의 0번값은 11이 되어야한다. 아까완 다르게 배열 지정을 한번만 함
    expect(mockFn_3.mock.results[1].value).toBe(21)      //
    expect(mockFn_3.mock.results[2].value).toBe(31)      //
})

//목함수 메소드들

const mockFn_4 = jest.fn();
mockFn_4(10,20);
mockFn_4();
mockFn_4(30,40);

test(".toBeCalled()는 한번 이상 호출되었으면 통과된다.",() =>{
    expect(mockFn_4).toBeCalled();      
})

test(".toBeCalledTimes()는 괄호안에 호출횟수를 넣고 그것이 맞으면 통과된다.",() =>{
    expect(mockFn_4).toBeCalledTimes(3);      
})

test(".toBeCalledWith()는 파라미터로 뭘 받았는지 체크한다,.",() =>{ //10과 20을 받은 적 있으니 통과, 30과 40을 넣어도 통과한다.
    expect(mockFn_4).toBeCalledWith(10,20);      
})

test(".lastCalledWith()는 마지막 호출 때 들어간 파라미터를 체크한다.",() =>{ //마지막엔 30과 40을 받았으니 역시 통과 (10,20)을 넣으면 실패
    expect(mockFn_4).lastCalledWith(30,40);      
})


