module.exports = {
    //입력한 이메일 주소에는 "@" 문자가 1개만 있어야 이메일 형식이다.
    //입력한 이메일 주소에 공백(스페이스)이 존재하면 이메일 형식이 아니다.     
    //입력한 이메일 주소 맨 앞에 하이픈(-)이 있으면 이메일 형식이 아니다.
    //입력한 이메일 주소중, 로컬 파트(골뱅이 기준 앞부분)에는 영문 대소문자와 숫자, 특수문자는 덧셈기호(+), 하이픈(-), 언더바(_) 3개 외에 다른 값이 존재하면 이메일 형식이 아니다.
    //입력한 이메일 주소중, 도메인(골뱅이 기준 뒷부분)에는 영문 대소문자와 숫자, 하이픈(-) 외에 다른 값이 존재하면 이메일 형식이 아니다.

    // value가 이메일 형식에 맞으면 true, 형식에 맞지 않으면 false를 return 하도록 구현해보세요
    isEmail: (value) => {
        const email = (value || '');
//value에 값이 없으면 ''를 넣어준다. 이는 만약 value에 아무것도 넣지 않은 경우, 에러가 발생할 수 있기 때문에 에러 방지용으로 넣어준다.
//email에는 들어온 파라미터(value)를 넣어준다.


        const [localPart, domain, ...etc] = email.split("@");
//파라미터를 @를 기준으로 나누고 그걸 각각 localPart와 domain에 할당한다. 만약 @가 많아서 3개 이상으로 쪼개진다면 ...etc에 할당한다.



        if(!localPart || !domain || etc.length !== 0){ //들어온 파라미터를 @를 기준으로 나눈 것중 etc에 할당 된 것이 0개보다 많거나 localPart가 존재하지 않거나 domain이 존재하지 않다면
            return false;                   //false로 리턴한다.
        }else if(email.includes(' ')){ //들어온 파라미터에 공백이 있다면
            return false;                   //false로 리턴한다.
        }else if(email[0] === '-'){ //들어온 파라미터 첫 글자가 - 라면
            return false;                   //false로 리턴한다.
        }


        for(const word of localPart.toLowerCase().split('')){//소문자로 전부 바꿔서 글자 하나하나를 전부 쪼갠다음
            if(!['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0','-','+','_'].includes(word)){
                //위에 표현된 글자 이외의 것이 포함된다면
                return false ; //   false를 반환

            }
        }
        for(const word of domain.toLowerCase().split('')){//소문자로 전부 바꿔서 글자 하나하나를 전부 쪼갠다음
           if(!['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0','.','-'].includes(word)){
               return false;
           }
        }

        return true; //모든 조건을 통과했으니 true로 반환
    },
};