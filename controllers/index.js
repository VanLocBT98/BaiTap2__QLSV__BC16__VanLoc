// addEventListener for button
var arr = [];
$('#btnSv').addEventListener('click', function () {
   var sv = new SinhVien();
   var Test = new Validation();

   sv.maSv = $('#txtMaSV').value;
   sv.tenSv = $('#txtTenSV').value;
   sv.email = $('#txtEmail').value;
   sv.pass = $('#txtPass').value;
   sv.dateborn = $('#txtNgaySinh').value;
   sv.khoaHoc = $('#khSV').value;
   sv.diemToan = $('#txtDiemToan').value;
   sv.diemLy = $('#txtDiemLy').value;
   sv.diemHoa = $('#txtDiemHoa').value;
   sv.DiemTB = sv.tinhDiemTB();
   console.log(sv)

   // validation

   // dặt cờ 
   var valid = true;
   // check maSinhVien;

   valid &= Test.isRequired(sv.maSv, '#error_masv', 'Mã sinh viên không được bỏ trống') &&
      Test.TestLength(sv.maSv, '#error_masv', 4, 10, 'Vui lòng nhập mã tối thiểu là 4 ký tự và tối đa 10 ký tự') &&
      Test.testMaSV(sv.maSv,'#error_masv',arr,'ma da ton tai') ;
   // check tenSV
   valid &= Test.isRequired(sv.tenSv, '#error_tensv', 'Tên sinh viên không được bỏ trống') &&
      Test.TestLength(sv.tenSv, '#error_tensv', 4, 999, 'Vui lòng nhập đầy đủ họ và tên của bạn') &&
      Test.testString(sv.tenSv, '#error_tensv', 'Vui lòng nhấp tên bằng chữ ');
   // check email
   valid &= Test.isRequired(sv.email, '#error_emailsv', 'Vui lòng nhập Email') &&
      Test.Email(sv.email, '#error_emailsv', 'Vui lòng nhập Email hợp lệ');
   // check pass
   valid &= Test.isRequired(sv.pass, '#error_pass', 'Vui lòng nhập Mật khẩu') &&
      Test.TestLength(sv.pass, '#error_pass', 6, 25, 'Vui lòng nhập mật khẩu tối thiểu là 6 ký tự và tối đa 25 ký tự');
   // check date
   valid &= Test.testDate(sv.dateborn, '#error_dateborn', 'Vui lòng nhấp ngày sinh');
   // check selec
   valid &= Test.TestSelec(sv.khoaHoc, '#khSV', '#error_khoahoc', 'Vui lòng chọn khóa học');
   // check diemToan
   valid &= Test.isRequired(sv.diemToan, '#error_diemToan', 'Vui lòng nhập  điểm Toán ') &&
      Test.testNumber(sv.diemToan, '#error_diemToan', 'Vui lòng nhập điểm là số') &&
      Test.testPoint(sv.diemToan, '#error_diemToan', 'Vui lòng nhập điểm trong từ 0 đến 10');
   // check diemly
   valid &= Test.isRequired(sv.diemLy, '#error_diemLy', 'Vui lòng nhập điểm Lý') &&
      Test.testNumber(sv.diemLy, '#error_diemLy', 'Vui lòng nhập điểm là số') &&
      Test.testPoint(sv.diemLy, '#error_diemLy', 'Vui lòng nhập điểm trong từ 0 đến 10');
   // check điểm hóa
   valid &= Test.isRequired(sv.diemHoa, '#error_diemHoa', 'Vui lòng nhập điểm Hóa') &&
      Test.testNumber(sv.diemHoa, '#error_diemHoa', 'Vui lòng nhập điểm là số') &&
      Test.testPoint(sv.diemHoa, '#error_diemHoa', 'Vui lòng nhập điểm trong từ 0 đến 10');

   if (!valid) {
      return;
   }
   // push arr
   arr.push(sv);
   // print table
   rendertableSV(arr)
   // delete form when clicked
   resetForm()
   // save thong tin
   saveLocalStorage()

})
// create function innerhtml table
function rendertableSV(arr) {
   var htmls = '';
   for (i = 0; i < arr.length; i++) {
      var sv = arr[i];
      htmls +=
         `
       <tr>
       <td>${sv.maSv}</td>
       <td>${sv.tenSv}</td>
       <td>${sv.email}</td>
       <td>${sv.dateborn}</td>
       <td>${sv.khoaHoc}</td>
       <td>${sv.DiemTB}</td>

       <td>
       <button class="btn btn-outline-danger" onclick = "Delete('${sv.maSv}')" >
       Delete
       </button>
       <button class="btn btn-outline-warning" onclick = "Edit('${sv.maSv}')">
       Edit
       </button>
       </td>
       </tr>
       `
   }
   $('#tbodySinhVien').innerHTML = htmls;
}
// delete form
function resetForm() {
   var form = $$('#form input');
   for (i = 0; i < form.length; i++) {
      var input = form[i];
      input.value = '';
   }
}
// Delete tr table
function Delete(ma) {
   // từ mã sinh viên tìm ra vị trí sinh viên trong arr và xóa đi
   for (i = arr.length - 1; i >= 0; i--) {
      var sv = arr[i];
      if (sv.maSv === ma) {
         arr.splice(i, 1);
      }
   }
   // sau khi xóa render lại mảng để tạo lại giao diện
   rendertableSV(arr);
   // lưư sau khi xóa
   // saveLocalStorage()
}
$('#btnupdate').style.display = 'none';

function Edit(ma) {
   // từ mã sinh viên được click tìm ra sinh viên cần sửa
   for (i = 0; i < arr.length; i++) {
      var maSv = arr[i];
      if (maSv.maSv === ma) {
         $('#txtMaSV').value = ma;
         $('#txtTenSV').value = maSv.tenSv;
         $('#txtEmail').value = maSv.email;
         $('#txtPass').value = maSv.pass;
         $('#txtNgaySinh').value = maSv.dateborn;
         $('#khSV').value = maSv.khoaHoc;
         $('#txtDiemToan').value = maSv.diemToan;
         $('#txtDiemLy').value = maSv.diemLy;
         $('#txtDiemHoa').value = maSv.diemHoa;
      }
   }
   $('#txtMaSV').disabled = true;
   $('#btnupdate').style.display = 'inline-block';
}
$('#btnupdate').addEventListener('click', function(){
   var svUpdate = new SinhVien();
   svUpdate.maSv = $('#txtMaSV').value;
   svUpdate.tenSv = $('#txtTenSV').value;
   svUpdate.email = $('#txtEmail').value;
   svUpdate.pass = $('#txtPass').value;
   svUpdate.dateborn = $('#txtNgaySinh').value;
   svUpdate.khoaHoc = $('#khSV').value;
   svUpdate.diemToan = $('#txtDiemToan').value;
   svUpdate.diemLy = $('#txtDiemLy').value;
   svUpdate.diemHoa = $('#txtDiemHoa').value;
   svUpdate.DiemTB = svUpdate.tinhDiemTB();
   // Loop check and update 
   for( i = 0; i < arr.length;i++){
      var sved = arr[i];
      if(sved.maSv === svUpdate.maSv){
         sved.maSv =  svUpdate.maSv;
         sved.tenSv =svUpdate.tenSv;
         sved.email = svUpdate.email;
         sved.pass = svUpdate.pass;
         sved.dateborn = svUpdate.dateborn;
         sved.khoaHoc = svUpdate.khoaHoc;
         sved.diemToan = svUpdate.diemToan;
         sved.diemLy = svUpdate.diemLy;
         sved.diemHoa = svUpdate.diemHoa;
         sved.DiemTB = svUpdate.DiemTB 
      }
   }
   $('#txtMaSV').disabled = false;
   // tạo lại nội dung 
   rendertableSV(arr);
   // xóa form
   resetForm();
$('#btnupdate').style.display = 'none';


})
function saveLocalStorage() {
   // lưu mảng sinh viên
   var sMangSV = JSON.stringify(arr);
   // lưu chuổi vào storage
   localStorage.setItem('arr', sMangSV)

}
// lấy giá trị đã lưu đauw ra giao diện
function init() {
   if (localStorage.getItem('arr')) {
      var smangSV = localStorage.getItem('arr');
      arr = JSON.parse(smangSV);
      rendertableSV(arr);

   }
}
init()
//button search
$('#xtxSearch').addEventListener('keyup',function(){
   var tuKhoa = $('#xtxSearch').value.toLowerCase().trim();
   var arrSearch = [];
   console.log(tuKhoa);
   // duyệt qua mảng để lấy ra giá trị
   for (i = 0; i < arr.length; i++) {
      var nameSV = arr[i];
      if (nameSV.tenSv.toLowerCase().trim().search(tuKhoa) != -1) {
         arrSearch.push(nameSV);
      }
   }
   // gọi hàm tạo lại table
   rendertableSV(arrSearch);
}) 