const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function Validation() {
    this.isRequired = function (value, selecterError, mess) {
        if (value.trim() === '') {
            $(selecterError).innerHTML = mess;
            return false;
        } else {
            $(selecterError).innerHTML = "";
            return true;
        }
    }
    this.TestLength = function (value, selecterError, min, max, mess) {
        var le = value.trim().length;
        if (le >= min && le <= max) {
            $(selecterError).innerHTML = "";
            return true;
        }
        $(selecterError).innerHTML = mess;
        return false;
    }
    this.testString = function (value, selecterError, mess) {
        var letters = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letters)) {
            $(selecterError).innerHTML = "";
            return true;
        }
        $(selecterError).innerHTML = mess;
        return false;
    }
    this.testNumber = function (value, selecterError, mess) {
        var numbers = /^[0-9]+$/;
        if (value.match(numbers)) {
            $(selecterError).innerHTML = "";
            return true;
        }
        $(selecterError).innerHTML = mess;
        return false;
    }
    this.testPoint = function (value, selecterError, mess) {

        if (value >= 0 && value <= 10) {
            $(selecterError).innerHTML = "";
            return true;
        }
        $(selecterError).innerHTML = mess;
        return false;
    }
    this.Email = function (value, selecterError, mess) {
        var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value.match(mailformat)) {
            $(selecterError).innerHTML = "";
            return true;
        }
        $(selecterError).innerHTML = mess;
        return false;
    }
    // check date
    this.testDate = function (value, selecterError, mess) {
        var date = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
        if (value.match(date)) {
            $(selecterError).innerHTML = "";
            return true;
        }
        $(selecterError).innerHTML = mess;
        return false;
    }
   
    // check selector
    this.TestSelec = function (value, selected, selecterError, mess) {
        var slkhoahoc = $(selected);
        var index = slkhoahoc.selectedIndex;
        if (index == 0) {
            $(selecterError).innerHTML = mess;
            return false;
        }
        $(selecterError).innerHTML = "";
        return true;
    }
     // check maSinhvien trùng lặp hay không
     this.testMaSV = function (value, selecterError, arr, mess) {
        var status = true;

        for (var i = 0; i < arr.length; i++) {
          if (value === arr[i].maSv) {
            //ma sv da ton tai
            status = false;
            break;
          }
        }
    
        if (status) {
          $(selecterError).innerHTML = "";
          return true;
        }
    
        $(selecterError).innerHTML = mess;
        return false;
    }
    
}