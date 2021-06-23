function Validation () {

    this.kiemTraRong = function (value,selectorError,name) {
        if(value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống !';
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraTatCaKyTu = function (value,selectorError,name) {
        var regexLetter = /^[A-Z a-z]+$/;
        if(regexLetter.test(value)){//Chuỗi phù hợp định dạng
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' không hợp lệ!';
        return false;
    }

    this.kiemTraTatCaSo = function  (value,selectorError,name)  {
        var regexNumber = /^[0-9]+$/;
        if(regexNumber.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' phải nhập số!';
        return false;
    }


    this.kiemTraEmail = function (value,selectorError,name) {
        var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(regexEmail.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' không đúng định dạng!';
        return false;
    }

    this.kiemTraGiaTri = function (value,selectorError,minValue,maxValue,name) {
        if(value < minValue || value > maxValue) {

            document.querySelector(selectorError).innerHTML = `${name} từ ${minValue} - ${maxValue}`;
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraDoDai = function (value,selectorError,minLength,maxLength,name) {
        if(value.trim().length < minLength || value.trim().length > maxLength) {
            document.querySelector(selectorError).innerHTML = `${name} từ ${minLength} - ${maxLength} ký tự`;
            return false;
        }
        
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

}