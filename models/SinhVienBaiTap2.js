// create function SinhVien()
function SinhVien(){
    this.maSv = '';
    this.tenSv = '';
    this.email = '';
    this.pass = '';
    this.dateborn = '';
    this.khoaHoc = '';
    this.diemToan = '';
    this.diemLy = '';
    this.diemHoa = '';
    this.DiemTB = 0;
    this.tinhDiemTB = function(){
        var dtb = ((Number(this.diemToan) + Number(this.diemLy) + Number(this.diemHoa))/3).toFixed(2);
        return dtb;
    }

 }