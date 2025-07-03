function Validator(options) {
    var formElement = document.querySelector(options.form);
    function validate(inputElement,rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage = rule.test(inputElement.value);
        if(errorMessage) {
            errorElement.innerHTML = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerHTML = "";
            inputElement.parentElement.classList.remove('invalid');

        }
    }
    options.rules.forEach(function(rule) {
        var inputElement = document.querySelector(rule.selector);

        if(inputElement) {
            inputElement.onblur = function() {
                validate(inputElement,rule);
            }
            // xữ lý mỗi khi người duhng2 nhập vào input
            inputElement.oninput = function() {
             var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                errorElement.innerHTML = "";
                inputElement.parentElement.classList.remove('invalid');
            }
        }
    });

}
// định nghĩa các rule
// nguyên tắt của các rules:
// 1 khi có lỗi => trả về mess lỗi 
// 2. khi hợp lệ : trả trả ra gì cả (undefined)
Validator.isRequired = function(selector,message) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined :message || 'Vui lòng nhập trường này';
        }
    };
}
Validator.isNumberPhone = function(selector,message) {
    return {
        selector: selector,
            test: function(value) {
                var regex =  /^\d{10}$/;
                return regex.test(value) ? undefined :message || 'Vui lòng nhập số điện thoại';
            }
    };
}
Validator.isEmail = function(selector,message) {
    return {
        selector: selector,
        test: function(value) {
            var regex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined :message || 'Vui lòng nhập email';
        }
    };
}
Validator.minLength = function(selector,min,message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined :message || 'Vui lòng nhập tối thiểu '+min+' ký tự';
        }
    };
}
Validator.isCofirmed = function(selector, getComfirmValue,message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getComfirmValue() ? undefined :message || 'Giá trị nhập vào chưa chính xác';
        }
    }
}